import { PromptTemplate } from "@langchain/core/prompts";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";
import llm from "../llm";
import { getVectorStore } from '../vector_store';
import { index } from "../vector_store/pinecone";

const configureRagChain = async () => {
  try {
    const store = await getVectorStore({ pineconeIndex: index });

    const prompt = PromptTemplate.fromTemplate(`
      You are a helpful assistant that answers questions based solely on the provided context.
      
      Context: {context}
      
      Question: {input}
      
      Instructions:
      1. Answer the question using ONLY the information from the provided context.
      2. If the necessary information is not in the context, respond with "I'm sorry, I don't have enough information in the context to answer this question."
      3. Give more information about the context.
      4. If the context is empty, indicate that no information is available.
      
      Answer: `);

    return createRetrievalChain({
      retriever: store.asRetriever(),
      combineDocsChain: await createStuffDocumentsChain({
        llm,
        prompt
      }),
    });
  } catch (error) {
    console.error('Error configuring RAG chain:', error);
    throw new Error('Failed to configure RAG chain');
  }
}

export { configureRagChain };

