import type { GetServerSideProps, NextPage } from "next"
import { Category, PrismaClient } from "@prisma/client"
import Layout from "../components/layouts/Layout"
import { useContext } from "react"
import { QuioscoContext } from "../context/quiosco"
import Product from "../components/quiosco/Product"

type Props = {
  categories: Category[]
}

const Home: NextPage<Props> = () => {
  const { categorySelected } = useContext(QuioscoContext)
  const { products } = categorySelected
  return (
    <Layout title={`Menú ${categorySelected.name}`}>
      <h1 className="text-4xl font-black">{categorySelected.name} 🦄🦄🦄🦄</h1>
      <p className="text-2xl my-10">
        Elige y personaliza tu pedido a continuación.
      </p>
      <section className="grid gap-4 grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        {products.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </section>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  // const prisma = new PrismaClient()

  // const categories = await prisma.category.findMany()

  // console.log(categories)

  return {
    props: {},
  }
}

export default Home
