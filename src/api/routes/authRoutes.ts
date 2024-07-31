import express from "express";
import verifyToken from "@/api/controllers/verifyToken";
import { googleAuth } from "@/api/controllers/accountController";

const router = express.Router();

router.post("/verify", verifyToken);
router.post("/app/google", googleAuth);

export default router;
