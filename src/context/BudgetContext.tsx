import { useReducer, createContext, Dispatch, ReactNode, } from "react"
import { BudgetState, budgetReducer, initialState, BudgetActions } from "../reducers/budget-reducer"

type BudgetContextProps = {
    state: BudgetState
    dispatch:Dispatch<BudgetActions>
}

type BudgetProviderProps = {
  children:ReactNode
}

export const BudgetContext = createContext<BudgetContextProps>(null!) /* Funcion de tener estado global */

export const BudgetProvider = ({children}: BudgetProviderProps) => { /* Datos que toma el context */

    const [state, dispatch] = useReducer(budgetReducer, initialState) 

  return (
    <BudgetContext.Provider
      value={{
        state,
        dispatch
    }}
    >
      {children}
    </BudgetContext.Provider>
  )
}
