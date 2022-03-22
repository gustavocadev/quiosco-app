import { NewOrderType } from "../../context/quiosco/QuioscoProvider"
import Image from "next/image"
import { formatMoney } from "../../helpers"
import { useContext } from "react"
import { QuioscoContext } from "../../context/quiosco"

type Props = {
  product: NewOrderType
}

const ProductSummary = ({ product }: Props) => {
  const { handleEditQuantities, handleDeleteProduct } =
    useContext(QuioscoContext)
  return (
    <section className="border p-3 shadow mb-3 flex gap-10 items-center">
      <figure className="md:w-1/6">
        <Image
          width={300}
          height={400}
          alt={`Imagen Platillo ${product.name}`}
          src={`/assets/img/${product.image}.jpg`}
        />
      </figure>
      <section className="md:w-4/6">
        <p className="text-3xl font-bold">{product.name}</p>
        <p className="text-xl font-bold mt-2">Cantidad: {product.quantity}</p>
        <p className="text-xl font-bold mt-2 text-amber-700">
          Precio: {formatMoney(product.price, "USD")}
        </p>
        <p className="text-lg font-bold mt-2 text-gray-800">
          Subtotal: {formatMoney(product.price * product.quantity, "USD")}
        </p>
      </section>

      <section className="md:w-1/6">
        <button
          className="bg-sky-700 flex px-5 py-2 rounded text-gray-200 
        font-bold uppercase shadow-md w-full gap-2"
          onClick={() => handleEditQuantities(product.id)}
        >
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
              d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
            ></path>
          </svg>
          Editar
        </button>
        <button
          className="bg-red-700 flex px-5 py-2 rounded text-gray-200 font-bold uppercase shadow-md w-full  gap-2 mt-3"
          onClick={() => handleDeleteProduct(product.id)}
        >
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
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            ></path>
          </svg>
          Eliminar
        </button>
      </section>
    </section>
  )
}

export default ProductSummary
