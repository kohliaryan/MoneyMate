import { Hono } from "hono";
import app from "..";

const categoryRouter = new Hono<{
    Bindings: {
      PDATABASE_URL: string;
      JWT_Secret: string;
    };
    Variables: {
      user_id: number;
    };
  }>();

app.post()