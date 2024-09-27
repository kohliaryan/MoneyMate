import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Context } from "hono";

export async function summaryController(c: Context) {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.PDATABASE_URL,
    }).$extends(withAccelerate());

    const user_id = c.get("user_id");
    if (typeof user_id !== "number") {
      throw new Error("Invalid user_id");
    }

    // Total expenses for the user
    const totalExpense = await prisma.expense.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        user_id: user_id,
      },
    });

    // Highest expense category for the user
    const highestCategory = await prisma.expense.groupBy({
      by: ["category_id"],
      _sum: {
        amount: true,
      },
      where: {
        user_id: user_id,
        category_id: { not: null },
      },
      orderBy: {
        _sum: {
          amount: "desc",
        },
      },
      take: 1,
    });

    let highestCategoryDetails = null;
    if (highestCategory.length > 0 && highestCategory[0].category_id) {
      highestCategoryDetails = await prisma.category.findUnique({
        where: { category_id: highestCategory[0].category_id },
      });
    }

    // Monthly expenses breakdown for the user
    const monthlyExpenses = await prisma.expense.groupBy({
      by: ["date_of_expense"],
      _sum: {
        amount: true,
      },
      where: {
        user_id: user_id,
      },
      orderBy: {
        date_of_expense: "asc",
      },
    });

    // Process and group monthly expenses
    const groupedMonthlyExpenses = monthlyExpenses.reduce((acc, exp) => {
      const date = new Date(exp.date_of_expense);
      const monthKey = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}`;

      if (!acc[monthKey]) {
        acc[monthKey] = 0;
      }
      acc[monthKey] += exp._sum.amount || 0;

      return acc;
    }, {} as Record<string, number>);

    // Create the response payload
    return c.json({
      total_expense: totalExpense._sum.amount ?? 0,
      highest_expense_category: highestCategoryDetails
        ? {
            category_name: highestCategoryDetails.category_name,
            total_amount: highestCategory[0]._sum.amount ?? 0,
          }
        : null,
      monthly_expenses: Object.entries(groupedMonthlyExpenses)
        .map(([month, total]) => ({
          month,
          total_monthly_expense: total,
        }))
        .sort((a, b) => a.month.localeCompare(b.month)),
    });
  } catch (err) {
    console.error("Error in summaryController:", err);
    return c.json(
      {
        msg: "Something went wrong!",
      },
      500
    );
  }
}

export async function categoryExpenseController(c: Context) {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.PDATABASE_URL,
    }).$extends(withAccelerate());

    const user_id = c.get("user_id");
    const category_id = parseInt(c.req.param("category_id"));

    if (typeof user_id !== "number" || isNaN(category_id)) {
      throw new Error("Invalid user_id or category_id");
    }

    // Total expenses for the user in the specific category
    const totalExpenseInCategory = await prisma.expense.aggregate({
      _sum: {
        amount: true,
      },
      where: {
        user_id: user_id,
        category_id: category_id,
      },
    });

    // Monthly expenses breakdown for the user in the specific category
    const monthlyExpenses = await prisma.expense.groupBy({
      by: ["date_of_expense"],
      _sum: {
        amount: true,
      },
      where: {
        user_id: user_id,
        category_id: category_id,
      },
      orderBy: {
        date_of_expense: "asc",
      },
    });

    // Process and group monthly expenses
    const groupedMonthlyExpenses = monthlyExpenses.reduce((acc, exp) => {
      const date = new Date(exp.date_of_expense);
      const monthKey = `${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}`;

      if (!acc[monthKey]) {
        acc[monthKey] = 0;
      }
      acc[monthKey] += exp._sum.amount || 0;

      return acc;
    }, {} as Record<string, number>);

    // Create the response payload
    return c.json({
      total_expense_in_category: totalExpenseInCategory._sum.amount ?? 0,
      monthly_expenses_in_category: Object.entries(groupedMonthlyExpenses)
        .map(([month, total]) => ({
          month,
          total_monthly_expense: total,
        }))
        .sort((a, b) => a.month.localeCompare(b.month)),
    });
  } catch (err) {
    console.error("Error in categoryExpenseController:", err);
    return c.json(
      {
        msg: "Something went wrong!",
      },
      500
    );
  }
}
