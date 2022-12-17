import { Order as OrderType } from '@prisma/client';
import useSWR from 'swr';

import AdminLayout from '../components/layouts/AdminLayout';
import OrderComponent from '../components/quiosco/Order';
export default function Admin() {
  const fetcher = () => fetch('/api/orders').then((res) => res.json());
  const { data, error, isLoading } = useSWR('/api/orders', fetcher, {
    refreshInterval: 1,
  }) as {
    data: {
      orders: OrderType[];
    };
    error: any;
    isLoading: boolean;
  };

  console.log(data);
  return (
    <AdminLayout pagina="Admin">
      <h1 className="text-4xl font-black">Panel de administracion</h1>
      <p className="text-2xl my-10">Administra las ordenes</p>

      {data?.orders && data.orders.length ? (
        data.orders.map((order) => {
          return <OrderComponent key={order.id} order={order} />;
        })
      ) : (
        <p>No hay ordenes pendientes</p>
      )}
    </AdminLayout>
  );
}
