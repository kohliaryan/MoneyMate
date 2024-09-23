import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";

export const userRouter = new Hono<{
  Bindings: {
    PDATABASE_URL: string;
    JWT_Secret: string;
  };
}>();

userRouter.get("/a", (c)=>{
    return c.text("HYPE")
})

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.PDATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();

    const alreadtExists = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });
    if (alreadtExists) {
      return c.json(
        {
          msg: "User Already Exsists",
        },
        400
      );
    }
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
      },
      select: {
        user_id: true,
        email: true,
      },
    });
    const token = await sign(user, c.env.JWT_Secret);
    return c.json({
      msg: "User Created Successfully",
      token: token,
    });
  } catch {
    return c.json(
      {
        msg: "Something went Wrong",
      },
      500
    );
  } finally {
    await prisma.$disconnect();
  }
});
