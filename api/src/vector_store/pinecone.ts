import { Pinecone } from "@pinecone-database/pinecone";
import config from "../config";

const pinecone = new Pinecone({
    apiKey: config.pinecone.apiKey,
});

const index = pinecone.Index(config.pinecone.index);

export { index, pinecone };

