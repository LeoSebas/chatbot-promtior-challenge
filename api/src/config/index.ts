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
    },
    sources: {
        pdf: process.env.DATA_PDF_URL!,
    },
    frontend: {
        host: process.env.WEB_APP_URL!,
    }
}

export default config;