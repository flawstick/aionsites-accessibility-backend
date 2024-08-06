import { AccessiBeLicenseModel } from "@/models/subscription";
import { Request, Response } from "express";
import { log } from "@/utils/log";

export async function createSubscription(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const subscriptionData = new AccessiBeLicenseModel(req.body);
    await subscriptionData.save();
    log.info(`Subscription created successfully by ${req.body.email}`);
    res.status(201).json({ message: "Subscription created successfully" });
  } catch (error) {
    log.error(error as string);
    res.status(400).json({ error: (error as Error).message });
  }
}

export async function getSubscriptions(
  req: Request,
  res: Response,
): Promise<void> {
  try {
    const subscriptions = await AccessiBeLicenseModel.find();
    log.info(`Subscriptions retrieved successfully for ${req.body.user.email}`);
    res.status(200).json(subscriptions);
  } catch (error) {
    log.error(error as string);
    res.status(400).json({ error: (error as Error).message });
  }
}
