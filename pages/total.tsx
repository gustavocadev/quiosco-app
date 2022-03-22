import { useEffect, useContext, useCallback } from "react"
import Layout from "../components/layouts/Layout"
import { QuioscoContext } from "../context/quiosco/QuioscoContext"
import { formatMoney } from "../helpers"
export default function TotalPage() {
  const { orders, name, setName, sendOrderToServer, total } =
    useContext(QuioscoContext)

  const isValidOrder = useCallback(() => {
    return orders.length > 0 || name.length > 2
  }, [orders, name])

  useEffect(() => {
    isValidOrder()
  }, [orders, isValidOrder])
  return (
    <Layout title="Total">
      <h1 className="text-4xl font-black">Total y confirmar pedido</h1>
      <p className="text-2xl my-10">Confirma tu pedido</p>
      <form onSubmit={sendOrderToServer}>
        <section>
          <label
            htmlFor="name"
            className="block uppercase text-slate-800 font-bold text-xl"
          >
            Nombre
          </label>
          <input
            id="name"
            type="text"
            className="bg-gray-200 w-full mt-3 rounded-md lg:w-1/3 p-2"
            autoComplete="off"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </section>
        <section className="mt-10">
          <p className="text-3xl">
            Total a pagar:{" "}
            <span className="font-bold">{formatMoney(total, "USD")}</span>
          </p>
        </section>
        <section className="mt-5">
          <button
            className={`${
              !isValidOrder()
                ? "bg-indigo-100"
                : "bg-indigo-600 hover:bg-indigo-800"
            } w-full lg:w-auto px-5 py-2 rounded uppercase font-bold text-gray-200 text-center`}
            type="submit"
            disabled={!isValidOrder()}
          >
            Confirmar pedido
          </button>
          {/* <input type="text" value/> */}
        </section>
      </form>
    </Layout>
  )
}
