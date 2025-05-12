import { Router } from "express";
import loadRoutes from "./load_routes";
import qaRoutes from "./qa_routes";
export default function privateRoutes() {
    const router = Router();

    qaRoutes(router);
    loadRoutes(router);

    return router;
}
