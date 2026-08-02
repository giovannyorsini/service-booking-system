import { Router } from "express";
import * as controller from "../controllers/requestController.js";

const router = Router();

router.get("/", controller.getRequests);
router.post("/", controller.createRequest);
router.patch("/:id", controller.updateRequestStatus);

export default router;
