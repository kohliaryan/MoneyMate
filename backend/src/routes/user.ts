import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { authMiddleware } from "../middleware/authorization";
import { profileController, signinController, signupController } from "../controller/user";

export const userRouter = new Hono<{
  Bindings: {
    PDATABASE_URL: string;
    JWT_Secret: string;
  };
  Variables: {
    user_id: number;
  };
}>();

userRouter.post("/signup", signupController)
userRouter.post("/signin", signinController);

userRouter.get("/profile", authMiddleware, profileController)