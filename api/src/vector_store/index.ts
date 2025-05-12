import { VectorStore } from '@langchain/core/vectorstores';
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from '@langchain/pinecone';
import { Index, RecordMetadata } from '@pinecone-database/pinecone';
import config from '../config';
import { SOURCE_WEB_PAGES } from '../const';
import { getPdfFromUrl } from '../loaders/pdf_loader';
import { loadWebPages } from '../loaders/web_loader';
import { createChunksFromDocument } from '../utils';
type VectorStoreParams = {
  pineconeIndex: Index<RecordMetadata>;
}

const createVectorStore: (params: VectorStoreParams) => Promise<VectorStore> = async ({ pineconeIndex }: VectorStoreParams) => {
  try {
    const webTexts = await loadWebPages(SOURCE_WEB_PAGES);

    const pdfText = await getPdfFromUrl({ path: config.sources.pdf });

    const embeddings = new OpenAIEmbeddings({
      model: "text-embedding-3-small",
    });

    console.log('embeddings created');

    const chunks = await createChunksFromDocument(webTexts[0]);
    const chunks2 = await createChunksFromDocument(webTexts[1]);
    const pdfChunks = await createChunksFromDocument(pdfText);
    console.log('chunks created');
    const vectorStore = await PineconeStore.fromExistingIndex(
      embeddings,
      { pineconeIndex }
    );

    await vectorStore.addDocuments(chunks);
    await vectorStore.addDocuments(chunks2);
    await vectorStore.addDocuments(pdfChunks);
    console.log('vector store created');
    return vectorStore;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getVectorStore: (params: VectorStoreParams) => Promise<VectorStore> = async ({ pineconeIndex }: VectorStoreParams) => {
  try {
    const vectorStore = await PineconeStore.fromExistingIndex(
      new OpenAIEmbeddings({
        model: "text-embedding-3-small",
      }),
      { pineconeIndex }
    );
    return vectorStore;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const deleteVectorStore: (params: VectorStoreParams) => Promise<void> = async ({ pineconeIndex }: VectorStoreParams) => {
  try {
    await pineconeIndex.deleteAll();
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export { createVectorStore, deleteVectorStore, getVectorStore };

