import { Category, Product } from "@prisma/client"
import { createContext, FormEvent } from "react"
import { CategoriesType, OrderDataType, NewOrderType } from "./QuioscoProvider"

export type CategorySelectedType = Category & {
  products: Product[]
}

export type QuioscoContextType = {
  products: Product[]
  getCategories: () => Promise<void>
  categories: CategoriesType[]
  getCategoryById: (id: number) => Promise<void>
  categorySelected: CategorySelectedType
  setProduct: (id: Product) => void
  handleToggleModal: () => void
  modal: boolean
  product: Product | null
  orders: NewOrderType[]
  handleAddOrder: (orderData: OrderDataType) => void
  handleEditQuantities: (id: number) => void
  handleDeleteProduct: (id: number) => void
  setName: (name: string) => void
  name: string
  sendOrderToServer: (e: FormEvent<HTMLFormElement>) => Promise<void>
  setTotal: (total: number) => void
  total: number
}

export const QuioscoContext = createContext({} as QuioscoContextType)
