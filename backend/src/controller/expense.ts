import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Context } from "hono";


export async function expenseAdd(c: Context){
    const prisma = new PrismaClient({
        datasourceUrl: c.env.PDATABASE_URL,
      }).$extends(withAccelerate());
      try{
        const user_id = c.get('user_id');
        const body = await c.req.json();
        await prisma.expense.create({
            data: {
                user_id: user_id,
                category_id: body.category_id,
                amount: body.amount,
                description: body.description,
                date_of_expense: new Date("2024-09-23T14:30:00Z")
            }
        })
        return c.json({
            msg: "Created Successfully"
        })
      } catch(e) {
        console.log(e)
        return c.json({
            msg: "Something went wrong!"
        }, 500)
      }
      finally {
        await prisma.$disconnect()
      }
}