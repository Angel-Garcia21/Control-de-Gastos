import { useReducer, createContext, Dispatch, ReactNode,useMemo } from "react"
import { BudgetState, budgetReducer, initialState, BudgetActions } from "../reducers/budget-reducer"

type BudgetContextProps = {
    state: BudgetState
    dispatch:Dispatch<BudgetActions>
    totalExpenses:number
    reaminingBudget: number
}

type BudgetProviderProps = {
  children:ReactNode
}

export const BudgetContext = createContext<BudgetContextProps>(null!) /* Funcion de tener estado global */

export const BudgetProvider = ({children}: BudgetProviderProps) => { /* Datos que toma el context */

    const [state, dispatch] = useReducer(budgetReducer, initialState) 

    const totalExpenses = useMemo(() => state.expenses.reduce((total, expense) => expense.amount + total, 0), [state.expenses])

    const reaminingBudget = state.budget - totalExpenses

  return (
    <BudgetContext.Provider
      value={{
        state,
        dispatch,
        totalExpenses,
        reaminingBudget
    }}
    >
      {children}
    </BudgetContext.Provider>
  )
}
