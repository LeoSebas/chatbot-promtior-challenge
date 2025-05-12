import { VectorStore } from '@langchain/core/vectorstores';
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from '@langchain/pinecone';
import { Index, RecordMetadata } from '@pinecone-database/pinecone';
import { loadWebPages } from '../loaders/web_loader';
import { createChunksFromDocument } from '../utils';

type VectorStoreParams = {
  pineconeIndex: Index<RecordMetadata>;
}

const createVectorStore: (params: VectorStoreParams) => Promise<VectorStore> = async ({ pineconeIndex, }: VectorStoreParams) => {
  try {
    const webTexts = await loadWebPages([
      "https://www.promtior.ai/service"
    ]);

    const embeddings = new OpenAIEmbeddings({
      model: "text-embedding-3-small",
    });

    console.log('embeddings created');

    const chunks = await createChunksFromDocument(webTexts[0]);
    console.log('chunks created');
    const vectorStore = await PineconeStore.fromDocuments(chunks,
      embeddings,
      { pineconeIndex }
    );
    console.log('vector store created');
    return vectorStore;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export {
  createVectorStore
};

