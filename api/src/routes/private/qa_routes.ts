import { Router } from "express";
import { configureRagChain } from "../../chains/rag_chain";
import { createVectorStore } from "../../vector_store";
import { index } from "../../vector_store/pinecone";

const qaRoutes = (mainRouter: Router) => {
    const router = Router();

    mainRouter.use("/qa", router);

    router.post('/', async (req, res) => {
        const { question } = req.body;
        console.log(question);

        const vs = await createVectorStore({ pineconeIndex: index, });
        console.log('vs created');
        const docs = await vs.similaritySearch(question, 3);
        console.log('docs created');

        const chain = await configureRagChain();
        const answer = await chain.invoke({
            input: question,
            context: docs,
        });

        res.status(200).json({ message: "OK", answer: answer.answer });
    });
}

export default qaRoutes;