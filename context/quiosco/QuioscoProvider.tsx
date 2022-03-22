import { FC, useEffect, useReducer, FormEvent } from "react"
import { QuioscoContext, QuioscoReducer } from "./"
import { Product, Category } from "@prisma/client"
import { CategorySelectedType } from "./QuioscoContext"
import { toast } from "react-toastify"
import { useRouter } from "next/router"

export type CategoriesType = Category & {
  products: Product[]
}

export type NewOrderType = {
  id: number
  name: string
  price: number
  quantity: number
  image: string
}

export type OrderDataType = Product & { quantity: number }

export type QuioscoState = {
  products: Product[]
  categories: CategoriesType[]
  categorySelected: CategorySelectedType
  product: Product | null
  modal: boolean
  orders: NewOrderType[]
  name: string
  total: number
}

const quiosco_initial_state: QuioscoState = {
  products: [],
  categories: [],
  categorySelected: {
    id: 1,
    name: "Café",
    icon: "cafe",
    products: [],
  },
  product: null,
  modal: false,
  orders: [],
  name: "",
  total: 0,
}

export const QuioscoProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(QuioscoReducer, quiosco_initial_state)
  const router = useRouter()

  // ACTIONS
  const getCategories = async () => {
    const resp = await fetch("/api/categories")
    const { categories } = await resp.json()
    console.log(categories)
    dispatch({
      type: "GET_CATEGORIES",
      payload: categories,
    })
  }

  const getCategoryById = async (id: number) => {
    const { categories } = state
    const category = categories.find(
      (category) => category.id === id
    )! as CategorySelectedType

    dispatch({
      type: "GET_CATEGORY_BY_ID",
      payload: category,
    })
  }

  const setProduct = (product: Product) => {
    console.log(product)
    dispatch({
      type: "SET_PRODUCT",
      payload: product,
    })
  }

  const handleToggleModal = () => {
    dispatch({
      type: "TOGGLE_MODAL",
      payload: state.modal,
    })
  }

  const setModal = (modalState: boolean) => {
    dispatch({
      type: "SET_MODAL",
      payload: modalState,
    })
  }

  const handleAddOrder = (orderData: OrderDataType) => {
    const { categoryId, ...order } = orderData

    const { orders } = state

    if (orders.some((order) => order.id === orderData.id)) {
      // Let's update the quantity
      const newOrders: NewOrderType[] = orders.map((order) => {
        return {
          ...order,
          quantity:
            order.id === orderData.id ? orderData.quantity : order.quantity,
        }
      })
      dispatch({
        type: "ADD_ORDER",
        payload: newOrders,
      })
      toast.success("Se actualizó la cantidad correctamente")
    } else {
      // let's add the order
      dispatch({
        type: "ADD_ORDER",
        payload: order as NewOrderType,
      })
      toast.success("Producto agregado al carrito!")
    }
    setModal(false)
  }

  const resetOrders = () => {
    dispatch({
      type: "ADD_ORDER",
      payload: [],
    })
  }

  const handleEditQuantities = (id: number) => {
    console.log({ id })
    const updateProduct = state.orders.find((order) => order.id === id)!

    setProduct(updateProduct as any)
    setModal(!state.modal)
  }

  const handleDeleteProduct = (id: number) => {
    const updatedProducts = state.orders.filter((order) => order.id !== id)!
    dispatch({
      type: "ADD_ORDER",
      payload: updatedProducts,
    })
  }

  const setName = (name: string) => {
    dispatch({
      type: "SET_NAME",
      payload: name,
    })
  }
  // Send order
  const sendOrderToServer = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: state.name,
          order: state.orders,
          total: state.total,
          date: Date.now().toString(),
        }),
      })

      // reset app

      getCategoryById(1)
      resetOrders()
      setName("")
      setTotal(0)
      toast.success("Pedido enviado correctamente")
      setTimeout(() => {
        router.push("/")
      }, 3000)
    } catch (error) {
      console.log(error)
    }
  }

  const setTotal = (total: number) => {
    dispatch({
      type: "SET_TOTAL",
      payload: total,
    })
  }

  useEffect(() => {
    const newTotal = state.orders.reduce(
      (total, order) => order.price * order.quantity + total,
      0
    )
    setTotal(newTotal)
  }, [state.orders])

  useEffect(() => {
    getCategories()
  }, [])

  return (
    <QuioscoContext.Provider
      value={{
        ...state,
        getCategories,
        getCategoryById,
        setProduct,
        handleToggleModal,
        handleAddOrder,
        handleEditQuantities,
        handleDeleteProduct,
        setName,
        sendOrderToServer,
        setTotal,
      }}
    >
      {children}
    </QuioscoContext.Provider>
  )
}
