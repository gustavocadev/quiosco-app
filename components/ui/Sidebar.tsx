import Image from "next/image"
import { useContext } from "react"
import { QuioscoContext } from "../../context/quiosco"
import Category from "../quiosco/Category"

type Props = {}

const Sidebar = (props: Props) => {
  const { categories } = useContext(QuioscoContext)
  return (
    <>
      <Image width={300} height={100} src="/assets/img/logo.svg" alt="Image" />
      <nav className="mt-10">
        {categories.map((category) => (
          <Category key={category.id} {...category} />
        ))}
      </nav>
    </>
  )
}

export default Sidebar
