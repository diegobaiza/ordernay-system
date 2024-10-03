// middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { TokenPayload } from "../../types/TokenPayLoad";

declare global {
  namespace Express {
    interface Request {
      usernameID?: TokenPayload;
    }
  }
}

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access not" });
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token", error: err });
    }

    req.usernameID = decoded as TokenPayload;
    next();
  });
};

export default authenticateToken;
