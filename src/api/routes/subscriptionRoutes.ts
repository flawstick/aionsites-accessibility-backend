import express from "express";
import { createSubscription } from "@/api/controllers/subscriptionController";

const router = express.Router();

router.post("/", createSubscription);

export default router;
