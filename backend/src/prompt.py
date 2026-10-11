from langchain_core.prompts import ChatPromptTemplate

prompt = ChatPromptTemplate.from_messages([
    (
        "system",
        "You are a medical assistant. You will be provided with some context and a question. "
        "Answer the question based on the context provided. "
        "If you don't know the answer, just say that you don't know, don't try to make up an answer. "
        "Use three sentences maximum to answer the question and keep the answer concise."
        "\n\n"
        "{context}",
    ),
    ("human", "{input}"),
])