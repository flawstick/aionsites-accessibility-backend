import jwt from "jsonwebtoken";
import { config } from "@/config";

/*
 * Generate a token for the user
 * @param {Object} user - The user Object
 * @returns {String} - The generated generateToken
 * */
export const generateToken = (user: any) => {
  const token = jwt.sign(
    {
      ...user,
      hashedPassword: undefined,
      __v: undefined,
      createdAt: undefined,
      updatedAt: undefined,
    },
    config.jwtSecret,
    { expiresIn: "7d" },
  );
  return token;
};
