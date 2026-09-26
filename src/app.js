import express from "express";
import healthRoutes from "./module/health/health.routes.js";

const app = express();

app.use(express.json());
app.use(healthRoutes);

// Your routes will go here
// app.use("/api/events", eventRoutes);
// app.use("/api/users", userRoutes);

export default app;