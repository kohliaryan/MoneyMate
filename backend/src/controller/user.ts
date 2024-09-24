import { PrismaClient } from "@prisma/client/edge";
import { sign } from "hono/jwt";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Context } from "hono";

export async function signupController(c: Context) {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.PDATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();

    const alreadyExists = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
    });

    if (alreadyExists) {
      return c.json(
        {
          msg: "User Already Exists",
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
  }
}

export async function signinController(c: Context) {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.PDATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const body = await c.req.json();
    const user = await prisma.user.findFirst({
      where: {
        email: body.email,
      },
      select: {
        user_id: true,
        email: true,
        password: true,
      },
    });
    if (!user) {
      return c.json(
        {
          msg: "No User Found",
        },
        400
      );
    }

    if (body.password !== user.password) {
      return c.json(
        {
          msg: "Wrong Password",
        },
        400
      );
    }

    const token = await sign(
      { user_id: user.user_id, email: user.email },
      c.env.JWT_Secret
    );

    return c.json({
      msg: "Sign In Successful",
      token,
    });
  } catch {
    return c.json(
      {
        msg: "Something Went Wrong",
      },
      500
    );
  }
}

export async function profileController(c: Context) {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.PDATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const user_id = c.get("user_id");
    const user = await prisma.user.findFirst({
      where: {
        user_id: user_id,
      },
      select: {
        name: true,
        email: true,
        created_at: true,
      },
    });

    return c.json(user);
  } catch {
    return c.json(
      {
        msg: "Something went wrong!",
      },
      500
    );
  }
}

export async function updateController(c: Context) {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.PDATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const user_id = c.get("user_id");
    const body = await c.req.json();
    await prisma.user.update({
      where: {
        user_id: user_id,
      },
      data: {
        name: body.name,
      },
    });
    return c.json({
      msg: "Update Successful",
    });
  } catch {
    return c.json(
      {
        msg: "Something went wrong",
      },
      500
    );
  }
}
