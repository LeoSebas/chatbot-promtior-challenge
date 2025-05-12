import { PromptTemplate } from "@langchain/core/prompts";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";
import { createRetrievalChain } from "langchain/chains/retrieval";
import llm from "../llm";
import { createVectorStore } from '../vector_store';
import { index } from "../vector_store/pinecone";

const configureRagChain = async () => {
  const store = await createVectorStore({ pineconeIndex: index, })
  return createRetrievalChain({
    retriever: store.asRetriever(),
    combineDocsChain: await createStuffDocumentsChain({
      llm,
      prompt: PromptTemplate.fromTemplate(`Answer the following question based only on the provided context: Context: {context}  Question: {input} Answer: `)
    }),
  })

}

export { configureRagChain };

