import type { NextApiRequest, NextApiResponse } from 'next';
import { Order, PrismaClient, Product } from '@prisma/client';

type Data = {
  orderUpdated?: Order;
};

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'PUT':
      return await updateOrder(req, res);
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

const updateOrder = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query as {
    id: string;
  };
  const { estado } = req.body as {
    estado: boolean;
  };

  const orderUpdated = await prisma.order.update({
    where: {
      id: Number(id),
    },
    data: {
      estado: estado,
    },
  });
  res.status(200).json({ orderUpdated });
};
