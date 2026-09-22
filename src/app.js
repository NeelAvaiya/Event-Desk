import express from "express";

const app = express();

app.use(express.json());

// Your routes will go here
// app.use("/api/events", eventRoutes);
// app.use("/api/users", userRoutes);

export default app;