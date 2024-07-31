import { Request, Response } from "express";
import { hashPassword } from "@/utils/bcrypt";
import { usernameExists, clockIdExists, addUser } from "@/users";
import { IUserLean } from "@/models/user";
import { log } from "@/utils/log";

export default async function registerUser(req: Request, res: Response) {
  if (!req.body.user)
    return res.status(400).json({ message: "User data not provided" });
  const { username, password, firstName, lastName, clockId, tenantId } =
    req.body.user;

  try {
    if (await usernameExists(username, tenantId))
      return res.status(409).json({ message: "משתמש כבר קיים" });

    if (await clockIdExists(clockId, tenantId))
      return res.status(409).json({ message: "מספר שעון כבר קיים" });

    const hashedPassword = await hashPassword(password);
    await addUser({
      username,
      hashedPassword,
      tenantId,
      firstName,
      lastName,
      clockId,
      hoursWorked: 0,
      shifts: [],
      settings: { lineNotifications: false, postNotifications: true },
    } as IUserLean);

    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    log.error("Error during registration:", error as Error);
    res.status(500).json({ message: "Internal server error" });
  }
}
