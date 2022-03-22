import type { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient, Product } from "@prisma/client"

type Data = {
  products: Product[]
}

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const products = await prisma.product.findMany()
  res.status(200).json({ products })
}
