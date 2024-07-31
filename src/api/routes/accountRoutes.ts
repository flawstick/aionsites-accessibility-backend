import express from "express";
import { getAccount } from "@/api/controllers/accountController";

const router = express.Router();

router.get("/:jwt", getAccount);

export default router;
