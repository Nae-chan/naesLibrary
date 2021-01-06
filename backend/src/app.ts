/**
 * This is the backend Server for Naes Library's management
 * system.
 */
import express from "express";
import cors from "cors";
// import { sessionMiddleware } from './middleware/session.middleware';
import { requestLoggerMiddleware } from "./middleware/request.logger.middleware";
import { userRoutes } from "./routers/userController";
import { adminRoutes } from "./routers/adminController";

// App setup
const app = express();
app.use(express.json());
app.use(cors());

// Middleware
// app.use(sessionMiddleware);
app.use(requestLoggerMiddleware);

// Routes
app.use("/users", userRoutes);
app.use("/admin", adminRoutes);

export { app };
