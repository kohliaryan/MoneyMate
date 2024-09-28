import { expenseAddSchema, updateExpenseSchema } from "@aryankohli/moneymate-common";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Context } from "hono";
import { z } from "zod";

export async function expenseAdd(c: Context) {
  try {
    const body = await c.req.json();
    if (!expenseAddSchema.safeParse(body).success){
      return c.json({
        msg: "Invalid Inputs"
      }, 400)
    }
    const prisma = new PrismaClient({
      datasourceUrl: c.env.PDATABASE_URL,
    }).$extends(withAccelerate());
    const user_id = c.get("user_id");
    await prisma.expense.create({
      data: {
        user_id: user_id,
        category_id: body.category_id,
        amount: body.amount,
        description: body.description,
        date_of_expense: new Date(body.date_of_expense),
      },
    });
    return c.json({
      msg: "Created Successfully",
    });
  } catch {
    return c.json(
      {
        msg: "Something went wrong!",
      },
      500
    );
  }
}

export async function listController(c: Context) {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.PDATABASE_URL,
    }).$extends(withAccelerate());

    const user_id = c.get("user_id");

    const expense_list = await prisma.expense.findMany({
      where: {
        user_id: user_id,
      },
      select: {
        expense_id: true,
        amount: true,
        description: true,
        date_of_expense: true,
      },
    });
    return c.json(expense_list);
  } catch {
    return c.json(
      {
        msg: "Something went wrong!",
      },
      500
    );
  }
}

export async function updateExpense(c: Context) {
  try {
    const body = await c.req.json();
    if (!updateExpenseSchema.safeParse(body).success) {
      return c.json(
        {
          msg: "Invalid Inputs",
        },
        400
      );
    }
    const prisma = new PrismaClient({
      datasourceUrl: c.env.PDATABASE_URL,
    }).$extends(withAccelerate());
    const user_id = c.get("user_id");
    await prisma.expense.update({
      where: {
        expense_id: Number(c.req.param("expense_id")),
        user_id: user_id,
      },
      data: {
        amount: body.amount,
        description: body.description,
        date_of_expense: new Date(body.date_of_expense),
      },
    });
    return c.json({
      msg: "Successfully update",
    });
  } catch {
    return c.json(
      {
        msg: "Something went wrong!",
      },
      500
    );
  }
}

export async function deleteExpense(c: Context) {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.PDATABASE_URL,
    }).$extends(withAccelerate());
    const user_id = c.get("user_id");
    await prisma.expense.delete({
      where: {
        expense_id: Number(c.req.param("expense_id")),
        user_id: user_id,
      },
    });
    return c.json({
      msg: "Deleted Successfully!",
    });
  } catch {
    return c.json(
      {
        msg: "Something went wrong!",
      },
      500
    );
  }
}
