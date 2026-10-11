import os

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from langchain_pinecone import PineconeVectorStore
from langchain_groq import ChatGroq
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough

from src.helper import download_embeddings
from src.prompt import prompt

load_dotenv()  # app.py sits next to .env

INDEX_NAME = "medical-chatbot"

# Your Groq key may be stored as GROQ_API_KEY or (as you had it) OPEN_AI_API_KEY
GROQ_API_KEY = os.getenv("GROQ_API_KEY") or os.getenv("OPEN_AI_API_KEY")
if not GROQ_API_KEY:
    raise RuntimeError("Groq key missing. Add GROQ_API_KEY=... to backend/.env")

# Put GROQ_MODEL=<model id> in backend/.env. If it's missing, list the models
# your key can use so you can pick one.
GROQ_MODEL = os.getenv("GROQ_MODEL")
if not GROQ_MODEL:
    from groq import Groq

    available = [m.id for m in Groq(api_key=GROQ_API_KEY).models.list().data]
    raise RuntimeError(
        "GROQ_MODEL is not set in backend/.env. Models available to your key:\n  "
        + "\n  ".join(available)
        + "\nPick a chat model and add e.g. GROQ_MODEL=<model id> to .env"
    )

# Loaded once at startup, not on every request
embeddings = download_embeddings()
docsearch = PineconeVectorStore.from_existing_index(
    index_name=INDEX_NAME, embedding=embeddings
)
retriever = docsearch.as_retriever(search_type="similarity", search_kwargs={"k": 3})
llm = ChatGroq(model=GROQ_MODEL, temperature=0, api_key=GROQ_API_KEY)


def format_docs(docs):
    return "\n\n".join(d.page_content for d in docs)


rag_chain = (
    {"context": retriever | format_docs, "input": RunnablePassthrough()}
    | prompt
    | llm
    | StrOutputParser()
)

app = FastAPI(title="Medical Chatbot API")

# Allows the React dev server to call this API from the browser
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class ChatRequest(BaseModel):
    message: str


@app.get("/")
def health():
    return {"status": "ok"}


@app.post("/chat")
def chat(req: ChatRequest):
    question = req.message.strip()
    if not question:
        raise HTTPException(status_code=400, detail="Message is empty")
    try:
        r = rag_chain.invoke(question)
        return {"answer": r}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))