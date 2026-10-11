import os
from dotenv import load_dotenv
from pinecone import Pinecone, ServerlessSpec
from langchain_pinecone import PineconeVectorStore
from src.helper import load_pdf_files, filter_documents, text_splitter, download_embeddings

load_dotenv()  # store_index.py sits next to .env

PINECONE_API_KEY = os.getenv("PINECONE_API_KEY")
if not PINECONE_API_KEY:
    raise ValueError("PINECONE_API_KEY missing in backend/.env")

pc = Pinecone(api_key=PINECONE_API_KEY)
index_name = "medical-chatbot"

if index_name in pc.list_indexes().names():
    print(f"Index '{index_name}' already exists, skipping upload.")
else:
    extracted_data = load_pdf_files("D:/MERN Projects/5_Medical_Chatbot/data")
    if not extracted_data:
        raise ValueError("No PDFs found. Check the data folder path.")

    filter_data = filter_documents(extracted_data)
    text_chunks = text_splitter(filter_data)
    print("chunks:", len(text_chunks))

    embeddings = download_embeddings()

    pc.create_index(
        name=index_name,
        dimension=384,  # matches all-MiniLM-L6-v2
        metric="cosine",
        spec=ServerlessSpec(cloud="aws", region="us-east-1"),
    )

    PineconeVectorStore.from_documents(
        documents=text_chunks,
        embedding=embeddings,
        index_name=index_name,
    )
    print("Upload complete.")