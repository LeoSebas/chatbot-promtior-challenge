import { Router } from "express";
import { createVectorStore, deleteVectorStore } from "../../vector_store";
import { index } from "../../vector_store/pinecone";
const loadRoutes = (mainRouter: Router) => {
    const router = Router();

    mainRouter.use("/load", router);

    router.post("/", async (req, res) => {
        const vectorStore = await createVectorStore({ pineconeIndex: index });
        res.json(vectorStore);
    });

    router.delete("/", async (req, res) => {
        await deleteVectorStore({ pineconeIndex: index });
        res.json({ message: "Vector store deleted" });
    });

}

export default loadRoutes;