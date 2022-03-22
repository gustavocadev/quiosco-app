import Image from "next/image"
import { useContext, useState, useEffect } from "react"
import { QuioscoContext } from "../../context/quiosco"
import { formatMoney } from "../../helpers"
import { Product } from "@prisma/client"
import { NewOrderType } from "../../context/quiosco/QuioscoProvider"
type Props = {}

const ModalProduct = (props: Props) => {
  const { product, handleToggleModal, handleAddOrder, orders } =
    useContext(QuioscoContext)
  const [quantity, setQuantity] = useState(1)
  const [editProduct, setEditProduct] = useState(false)

  useEffect(() => {
    if (orders.some((order) => order.id === product?.id)) {
      const productToEdit = orders.find((order) => order.id === product?.id)!
      setEditProduct(true)
      console.log(productToEdit)
      setQuantity(productToEdit.quantity)
    }
  }, [orders, product])

  return (
    <section className="md:flex gap-10">
      <section className="md:w-1/3">
        <Image
          width={300}
          height={400}
          alt={`Imagen Platillo ${product?.name}`}
          src={`/assets/img/${product?.image}.jpg`}
        />
      </section>
      <section className="md:w-2/3">
        <section className="flex justify-end">
          <button onClick={() => handleToggleModal()}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </section>
        <h1 className="text-3xl font-bold mt-5">{product?.name}</h1>
        <p className="mt-5 font-black text-5xl text-amber-500">
          {formatMoney(product?.price as number, "USD")}
        </p>
        <section className="flex gap-4 mt-5">
          <button
            onClick={() => {
              if (quantity <= 1) return
              setQuantity(quantity - 1)
            }}
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>

          <p className="text-3xl">{quantity}</p>

          <button
            onClick={() => {
              if (quantity >= 5) return
              setQuantity(quantity + 1)
            }}
          >
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </button>
        </section>

        <button
          type="button"
          className="bg-indigo-600 hover:bg-indigo-800 font-bold uppercase w-full mt-3 p-3 rounded text-white"
          onClick={() =>
            handleAddOrder({
              ...product!,
              quantity,
            })
          }
        >
          {editProduct ? "Editar" : "Agregar"}
        </button>
      </section>
    </section>
  )
}

export default ModalProduct
