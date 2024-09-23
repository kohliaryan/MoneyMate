import { MiddlewareHandler } from "hono";
import { verify } from "hono/jwt";

export const authMiddleware: MiddlewareHandler = async (c, next) => {
  const jwt = c.req.header("Authorization");
  if (!jwt) {
    return c.json(
      {
        msg: "No Token",
      },
      400
    );
  }
  try {
    const token = jwt?.split(" ")[1];
    const payload = await verify(token, c.env.JWT_Secret);
    const user_Id = Number(payload.user_id) || 0;
    c.set("user_id", user_Id);

    await next();
  } catch {
    return c.json(
      {
        msg: "Invalid Token",
      },
      400
    );
  }
};
