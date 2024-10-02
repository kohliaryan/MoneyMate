import { Hono } from "hono";
import { userRouter } from "./routes/user";
import { expenseRouter } from "./routes/expense";
import { categoryRouter } from "./routes/category";
import { summaryRouter } from "./routes/summary";
import { cors } from "hono/cors";

const app = new Hono();

app.use(cors())
app.route("/api/v1/user", userRouter);
app.route("/api/v1/expense", expenseRouter);
app.route("/api/v1/category", categoryRouter);
app.route("/api/v1/summary", summaryRouter);
export default app;
