import { Hono } from "hono";
import { userRouter } from "./routes/user";
import { expenseRoute } from "./routes/expense";

const app = new Hono();

app.route("/api/v1/user", userRouter);
app.route("/api/v1/expense", expenseRoute)
export default app;
