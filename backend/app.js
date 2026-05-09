import express from "express";
import cors from "cors";

const app = express();

// Parse JSON request bodies so route handlers can consume req.body safely.
app.use(express.json());

// Allow browser-based clients to make requests from other origins
app.use(cors());

export default app;
