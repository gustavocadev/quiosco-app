import type { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient, Category } from "@prisma/client"

type Data = {
  categories: Category[]
}

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const categories = await prisma.category.findMany({
    include: {
      products: true,
    },
  })
  res.status(200).json({ categories })
}
