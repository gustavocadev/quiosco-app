import Layout from "../components/layouts/Layout"
import { useContext } from "react"
import { QuioscoContext } from "../context/quiosco/QuioscoContext"
import ProductSummary from "../components/quiosco/ProductSummary"
export default function Summary() {
  const { orders } = useContext(QuioscoContext)
  return (
    <Layout title="Resumen">
      <h1 className="text-4xl font-black">Resumen</h1>
      <p className="text-2xl my-10">Revisa tu pedido</p>
      {orders.length === 0 ? (
        <p className="text-2xl text-center">No hay productos en el carrito</p>
      ) : (
        orders.map((order) => <ProductSummary product={order} key={order.id} />)
      )}
    </Layout>
  )
}
