import express from "express";

import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import getConfigs from "./config/config.js";
const Configs = getConfigs();

const app = express();
app.use(express.json());

// Routes

app.use(`/api/${Configs.server.version}/auth`, authRoutes);
app.use(`/api/${Configs.server.version}/book`, bookRoutes);
app.use(`/api/${Configs.server.version}/review`, reviewRoutes);

export default app;
