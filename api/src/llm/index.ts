import { ChatOpenAI } from "@langchain/openai";
import config from "../config";

const llm = new ChatOpenAI({
    model: "gpt-3.5-turbo",
    temperature: 0,
    apiKey: config.openai.apiKey,
});

export default llm;
