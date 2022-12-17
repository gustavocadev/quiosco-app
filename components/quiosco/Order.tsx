import type { Order as OrderType } from '@prisma/client';
import Image from 'next/image';
import { toast } from 'react-toastify';

type Props = {
  order: OrderType;
};
export default function Order({ order }: Props) {
  console.log(order);
  const {
    id,
    name,
    total,
    order: pedido,
  } = order as {
    id: number;
    name: string;
    total: number;
    order: any;
  };

  const completeOrder = async () => {
    try {
      await fetch(`/api/orders/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          estado: true,
        }),
      });
      toast.success('Orden completada');
    } catch (error) {
      console.log(error);
      toast.error('Error al completar la orden');
    }
  };
  return (
    <section className="border p-10 space-y-5">
      <h3 className="text-2xl font-bold">Order: {id}</h3>
      <p className="text-lg font-bold">Cliente: {name}</p>

      <div>
        {pedido?.map((platillo: any) => {
          return (
            <div
              key={platillo.id}
              className="py-3 flex border-b last-of-type:border-0 items-center"
            >
              <div className="w-32">
                <Image
                  width={400}
                  height={500}
                  src={`/assets/img/${platillo.image}.jpg`}
                  alt={platillo.name}
                />
              </div>
              <section className="p-5 space-y-2">
                <h4 className="text-xl font-bold text-amber-500">
                  {platillo.name}
                </h4>
                <p className="text-lg font-bold">
                  Cantidad: {platillo.quantity}
                </p>
              </section>
            </div>
          );
        })}

        <section className="md:flex md:items-center md:justify-between my-10">
          <p className="mt-5 font-black text-4xl text-amber-500">
            Total a Pagar : {total}
          </p>
          <button
            className="bg-indigo-600 hover:bg-indigo-800 text-white mt-5 md:mt-0 py-3 px-10 uppercase font-bold rounded-lg"
            type="button"
            onClick={completeOrder}
          >
            Completar orden
          </button>
        </section>
      </div>
    </section>
  );
}
