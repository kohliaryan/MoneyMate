import { Hono } from "hono";
import { userRouter } from "./routes/user";
import { expenseRouter } from "./routes/expense";
import { categoryRouter } from "./routes/category";

const app = new Hono();

app.route("/api/v1/user", userRouter);
app.route("/api/v1/expense", expenseRouter)
app.route("/api/v1/category", categoryRouter)
export default app;
