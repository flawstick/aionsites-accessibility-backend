import express from "express";
import {
  createSubscription,
  getSubscriptions,
} from "@/api/controllers/subscriptionController";

const router = express.Router();

router.post("/", createSubscription);
router.get("/", getSubscriptions);

export default router;
