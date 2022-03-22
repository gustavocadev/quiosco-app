import { CategoriesType, QuioscoState } from "./"
import { Category, Product } from "@prisma/client"
import { CategorySelectedType } from "./QuioscoContext"
import { OrderDataType, NewOrderType } from "./QuioscoProvider"

type QuioscoActionType =
  | {
      type: "GET_CATEGORIES"
      payload: CategoriesType[]
    }
  | {
      type: "GET_CATEGORY_BY_ID"
      payload: CategorySelectedType
    }
  | {
      type: "SET_PRODUCT"
      payload: Product
    }
  | {
      type: "TOGGLE_MODAL"
      payload: boolean
    }
  | {
      type: "ADD_ORDER"
      payload: NewOrderType | NewOrderType[]
    }
  | {
      type: "SET_MODAL"
      payload: boolean
    }
  | {
      type: "CHANGE_STEP"
      payload: number
    }
  | {
      type: "SET_NAME"
      payload: string
    }
  | {
      type: "SET_TOTAL"
      payload: number
    }

export const QuioscoReducer = (
  state: QuioscoState,
  action: QuioscoActionType
) => {
  switch (action.type) {
    case "GET_CATEGORIES":
      return {
        ...state,
        categories: action.payload,
      }
    case "GET_CATEGORY_BY_ID":
      return {
        ...state,
        categorySelected: action.payload,
      }
    case "SET_PRODUCT":
      return {
        ...state,
        product: action.payload,
      }
    case "TOGGLE_MODAL":
      return {
        ...state,
        modal: !action.payload,
      }
    case "ADD_ORDER":
      return {
        ...state,
        orders:
          action.payload instanceof Array
            ? action.payload
            : [...state.orders, action.payload],
      }
    case "SET_MODAL":
      return {
        ...state,
        modal: action.payload,
      }
    case "SET_NAME":
      return {
        ...state,
        name: action.payload,
      }
    case "SET_TOTAL":
      return {
        ...state,
        total: action.payload,
      }
    default:
      return state
  }
}
