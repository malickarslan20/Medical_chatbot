from typing import List
from langchain_community.document_loaders import PyPDFLoader, DirectoryLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_core.documents import Document


def load_pdf_files(data: str) -> List[Document]:
    """Load all PDFs from a directory and return a list of Documents."""
    loader = DirectoryLoader(data, glob="*.pdf", loader_cls=PyPDFLoader)
    return loader.load()


def filter_documents(docs: List[Document]) -> List[Document]:
    """Keep only page_content and the 'source' metadata."""
    filtered_docs: List[Document] = []
    for doc in docs:
        if doc.metadata.get("source"):
            filtered_docs.append(
                Document(
                    page_content=doc.page_content,
                    metadata={"source": doc.metadata.get("source")},
                )
            )
    return filtered_docs


def text_splitter(minimal_docs: List[Document]) -> List[Document]:
    """Split documents into chunks."""
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=500,
        chunk_overlap=50,
        length_function=len,
    )
    return splitter.split_documents(minimal_docs)


def download_embeddings() -> HuggingFaceEmbeddings:
    """Download and return the Hugging Face embedding model."""
    model_name = "sentence-transformers/all-MiniLM-L6-v2"
    return HuggingFaceEmbeddings(model_name=model_name)