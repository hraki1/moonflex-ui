import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    console.error("Login error:", error);
    return { message: ["Authrization Issue please dont fuck"] };
  }
};
