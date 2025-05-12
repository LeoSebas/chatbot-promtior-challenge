import { Router } from "express";

export default function healthRoutes(mainRouter: Router) {
    const router = Router();

    mainRouter.use("/health", router);

    router.get("/", (req, res) => {
        res.status(200).json({ message: "OK" });
    });
}
