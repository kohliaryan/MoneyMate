import { Hono } from "hono";
import app from "..";
import { listCategory } from "../controller/category";
import { authMiddleware } from "../middleware/authorization";

export const categoryRouter = new Hono<{
    Bindings: {
      PDATABASE_URL: string;
      JWT_Secret: string;
    };
    Variables: {
      user_id: number;
    };
  }>();


categoryRouter.use(authMiddleware);
categoryRouter.get("/list", listCategory)