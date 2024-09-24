import { Hono } from "hono";
import { userRouter } from "./routes/user";
import { expenseRouter } from "./routes/expense";

const app = new Hono();

app.route("/api/v1/user", userRouter);
app.route("/api/v1/expense", expenseRouter)
export default app;
