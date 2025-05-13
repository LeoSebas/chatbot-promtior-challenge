# ✅ Project Overview

For this challenge, I implemented a Retrieval-Augmented Generation (RAG) system using **JavaScript** and **LangChain.js**, fully integrated with **OpenAI's embedding and language model APIs**, and **Pinecone** as the vector database.

## 🧩 Approach and Implementation Logic

I began by extracting information from the Promtior website and the company’s presentation PDF. The content was chunked using `RecursiveCharacterTextSplitter`, and I used **PDF** and **Cheerio** web loaders for parsing.

For the generation part, I used the `RetrievalQAChain` from LangChain.js, configured with **OpenAI's GPT model**. When a question is submitted, the system queries **Pinecone** to retrieve the most relevant documents, and the LLM generates a natural language response based on those chunks.

For the frontend, I used a simple chatbot template from [Lovable.dev](https://lovable.dev).

## ⚙️ Challenges and Solutions

The most challenging part was researching and understanding the **RAG architecture flow** and learning how to properly manage a **vector database** like Pinecone.
