import { Router } from "express";
import { configureRagChain } from "../../chains/rag_chain";
import { getVectorStore } from "../../vector_store";
import { index } from "../../vector_store/pinecone";

const qaRoutes = (mainRouter: Router) => {
    const router = Router();

    mainRouter.use("/qa", router);

    router.post('/', async (req, res) => {
        const { question } = req.body;
        console.log(question);

        const vs = await getVectorStore({ pineconeIndex: index });
        console.log('vs created');
        const docs = await vs.similaritySearch(question, 20);
        console.log('docs created');

        const chain = await configureRagChain();
        const answer = await chain.invoke({
            input: question,
        });

        res.status(200).json({ message: "OK", answer: answer.answer });
    });
}

export default qaRoutes;