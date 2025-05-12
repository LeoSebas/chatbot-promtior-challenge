import { Router } from "express";
import qaRoutes from "./qa_routes";

export default function privateRoutes() {
    const router = Router();

    qaRoutes(router);

    return router;
}
