import { Router } from "express";
import healthRoutes from "./health_routes";

export default function publicRoutes() {
    const router = Router();

    healthRoutes(router);

    return router;
}

