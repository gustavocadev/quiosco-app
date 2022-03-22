import { Product } from "@prisma/client"
import Image from "next/image"
import { formatMoney } from "../../helpers"
import { useContext } from "react"
import { QuioscoContext } from "../../context/quiosco"

type Props = {
  product: Product
}

const Product = ({ product }: Props) => {
  const { name, price, image, id } = product
  const { setProduct, handleToggleModal } = useContext(QuioscoContext)
  return (
    <section className="border p-3">
      <figure>
        <Image
          src={`/assets/img/${image}.jpg`}
          alt={`Imagen Platillo ${name}`}
          width={400}
          height={500}
        />
        <figcaption className="p-5">
          <h3 className="text-2xl font-bold">{name}</h3>
          <p className="mt-5 font-black text-4xl text-amber-500">
            {formatMoney(price, "USD")}
          </p>
          <button
            className="bg-indigo-600 hover:bg-indigo-800 font-bold uppercase w-full mt-3 p-3 rounded text-white"
            onClick={() => {
              setProduct(product)
              handleToggleModal()
            }}
          >
            Agregar
          </button>
        </figcaption>
      </figure>
    </section>
  )
}

export default Product
