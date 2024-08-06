import express from "express";
import {
  createSubscription,
  getSubscriptions,
  deleteSubscription,
  updateSubscription,
  getSubscription,
} from "@/api/controllers/subscriptionController";

const router = express.Router();

router.post("/", createSubscription);
router.get("/", getSubscriptions);
router.delete("/:id", deleteSubscription);
router.put("/:id", updateSubscription);
router.get("/:id", getSubscription);

export default router;
