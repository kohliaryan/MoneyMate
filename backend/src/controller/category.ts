import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Context } from "hono";


export async function listCategory(c: Context){
    try{
        const prisma = new PrismaClient({
            datasourceUrl: c.env.PDATABASE_URL,
          }).$extends(withAccelerate());
        const categories = await prisma.category.findMany()
        return c.json(categories)

    } catch {
        return c.json(
          {
            msg: "Something went wrong!",
          },
          500
        );
      }
}