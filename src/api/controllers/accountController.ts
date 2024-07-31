import { Request, Response } from "express";
import { JwtPayload, verify, sign } from "jsonwebtoken";
import { config } from "@/config";
import AccountModel from "@/models/account";

export const getAccount = async (req: Request, res: Response) => {
  const { jwt } = req.params;

  try {
    const decoded: JwtPayload = verify(
      jwt,
      config.jwtSecret || "",
    ) as JwtPayload;
    const account: any = await AccountModel.findById(decoded.userId);
    res.json({ ...account._doc, at_hash: null });
  } catch (error) {
    console.error("Error handling /accounts/:jwt:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const googleAuth = async (req: Request, res: Response) => {
  const { profile } = req.body;
  const { email, name, given_name, family_name, picture, at_hash } = profile;

  try {
    let account = await AccountModel.findOne({ email });

    if (!account) {
      account = new AccountModel({
        name,
        hashedPassword: at_hash,
        profilePicture: picture,
        email,
        firstName: given_name,
        lastName: family_name,
        teams: [],
      });
      await account.save();
    }

    const token = sign(
      {
        userId: account._id,
        email: account.email,
        name: account.name,
        picture: account.profilePicture,
        firstName: account.firstName,
        lastName: account.lastName,
        teams: account.teams,
      },
      config.jwtSecret || "",
      { expiresIn: "1D" },
    );

    res.json({ jwt: token });
  } catch (error) {
    console.error("Error handling /auth/google:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
