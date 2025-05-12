import { Document } from "@langchain/core/documents";
import { RecursiveCharacterTextSplitter } from '@langchain/textsplitters';

const createChunksFromText = async (text: string) => {
    const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200,
    });
    const chunks = await textSplitter.splitText(text);
    return chunks;
};

const createChunksFromDocument = (documents: Document[]) => {
    const textSplitter = new RecursiveCharacterTextSplitter({
        chunkSize: 1000,
        chunkOverlap: 200
    })
    const chunks = textSplitter.splitDocuments(documents);
    return chunks;
};

export {
    createChunksFromDocument, createChunksFromText
};

