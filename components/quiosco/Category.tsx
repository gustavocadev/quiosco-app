import { Category } from "@prisma/client"
import Image from "next/image"
import { useContext } from "react"
import { QuioscoContext } from "../../context/quiosco"
import { useRouter } from "next/router"

type Props = Category

const Category = ({ name, icon, id }: Props) => {
  const { getCategoryById, categorySelected } = useContext(QuioscoContext)
  const router = useRouter()

  return (
    <button
      className={`${
        categorySelected?.id === id && "bg-amber-400"
      } flex items-center gap-4 w-full border p-5 hover:bg-amber-400 hover:cursor-pointer`}
      onClick={() => {
        if (router.pathname !== "/") {
          router.push("/")
        }
        getCategoryById(id)
      }}
    >
      <figure>
        <Image
          width={70}
          height={70}
          src={`/assets/img/icono_${icon}.svg`}
          alt="Imagen icono"
        />
      </figure>
      <h2 className="text-2xl font-bold ">{name}</h2>
    </button>
  )
}

export default Category
