import dotenv from "dotenv";

dotenv.config();

const config = {
    api: {
        port: process.env.PORT || 3000,
    },
    pinecone: {
        apiKey: process.env.PINECONE_API_KEY!,
        index: process.env.PINECONE_INDEX!,
    },
    openai: {
        apiKey: process.env.OPENAI_API_KEY!,
    }
}

export default config;