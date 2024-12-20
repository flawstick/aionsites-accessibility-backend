import express from "express";
import cors from "cors";
import authRouter from "@/api/routes/authRoutes";
import accountRouter from "@/api/routes/accountRoutes";
import uploadRouter from "@/api/routes/uploadRoutes";
import subscriptionRouter from "@/api/routes/subscriptionRoutes";
import { loggerMiddleware, verifyJsonWebToken } from "@/api/middleware";
import { initializeServices } from "@/services/startup";
import { config } from "@/config";
import { log } from "@/utils/log";

const app = express();

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    allowedHeaders: "Content-Type,Authorization",
  }),
);

// Middleware
app.use(express.json());
app.use(loggerMiddleware);
app.use(verifyJsonWebToken);

// New routes for the accessibility service
const accessibilityRouter = express.Router();

// Use the router instance to define all routes
accessibilityRouter.use("/auth", authRouter);
accessibilityRouter.use("/accounts", accountRouter);
accessibilityRouter.use("/subscriptions", subscriptionRouter);
accessibilityRouter.use("/upload", uploadRouter);

// Mount the router instance on the /accessibility path
app.use("/accessibility", accessibilityRouter);

initializeServices()
  .then(() => {
    app.listen(config.port, () => {
      log.sysInfo(`Server started on port ${config.port}`);
    });
  })
  .catch((error: any) => {
    log.error("Server failed to start due to initialization error:", error);
    process.exit(1);
  });
