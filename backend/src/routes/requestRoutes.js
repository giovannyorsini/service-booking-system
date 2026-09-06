import { Router } from "express";
import * as requestController from "../controllers/requestController.js";

const router = Router();

router.get("/", requestController.getRequests);

router.get("/:id", requestController.getRequestById);

router.post("/", requestController.createRequest);

router.patch("/:id", requestController.updateRequest);

router.delete("/:id", requestController.deleteRequest);

export default router;
