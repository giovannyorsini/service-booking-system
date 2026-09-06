import express from "express";
import cors from "cors";

import requestRoutes from "./routes/requestRoutes.js";
import { notFoundHandler } from "./middlewares/notFound.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(express.json());

// Allow browser-based clients to make requests from other origins
app.use(cors());

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Service Booking API is running",
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
  });
});

app.use("/requests", requestRoutes);

app.use(notFoundHandler);

app.use(errorHandler);

export default app;
