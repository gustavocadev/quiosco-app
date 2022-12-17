import type { NextApiRequest, NextApiResponse } from 'next';
import { Order, PrismaClient, Product } from '@prisma/client';

type Data = {
  orderCreated?: Order;
  orders?: Order[];
  orderUpdated?: Order;
};

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'POST':
      return await createOrder(req, res);
    case 'GET':
      return await getOrders(req, res);
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

const createOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { name, date, total, order } = req.body as {
    name: string;
    date: string;
    total: number;
    order: Product[];
  };
  const orderCreated = await prisma.order.create({
    data: {
      name,
      date,
      total,
      order,
    },
  });
  res.json({ orderCreated });
};

const getOrders = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const orders = await prisma.order.findMany({
    where: {
      estado: false,
    },
  });

  res.status(200).json({ orders });
};
