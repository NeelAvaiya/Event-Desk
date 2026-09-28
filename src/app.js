import express from "express";
import healthRoutes from "./module/health/health.routes.js";
import eventRoutes from "./module/events/event.routes.js";
import authRoutes from "./module/auth/auth.routes.js";
import { errorHandler } from "./middlewares/errorHandler.js";

const app = express();

app.use(express.json());
app.use(healthRoutes);

// Your routes will go here
// app.use("/api/events", eventRoutes);
// app.use("/api/users", userRoutes);

app.use("/api/v1/events", eventRoutes);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/login", authRoutes);

app.use(errorHandler);

export default app;