import { Hono } from "hono";
import { authMiddleware } from "../middleware/authorization";
import {
  profileController,
  signinController,
  signupController,
  updateController,
} from "../controller/user";

export const userRouter = new Hono<{
  Bindings: {
    PDATABASE_URL: string;
    JWT_Secret: string;
  };
  Variables: {
    user_id: number;
  };
}>();

userRouter.post("/signup", signupController);
userRouter.post("/signin", signinController);
userRouter.get("/profile", authMiddleware, profileController);
userRouter.put("/update", authMiddleware, updateController);
