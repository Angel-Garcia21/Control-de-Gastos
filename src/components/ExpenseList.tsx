import { useMemo } from "react"
import { useBudget } from "../hooks/useBudget"
import ExpenseDetail from "./ExpenseDetail"


export default function ExpenseList() {
    const {state} = useBudget()

    const isEmpty = useMemo(() => state.expenses.length === 0, [state.expenses])
    
    return (
        <div className="md:mt-10 mt-6 flex flex-col item-center justify-center">
            {isEmpty? <p className="text-gray-600 md:text-2xl text-xl font-bold text-center">No Hay Gastos</p> : (
                <>
                    <p className="text-gray-600 md:text-2xl text-xl font-bold md:my-5 my-2 text-center  "> Listado De Gastos:</p>

                        {state.expenses.map(expense => (
                                <ExpenseDetail
                                key={expense.id}
                                expense= {expense}
                                />
                            ))}
                </>
            )}
        </div>
    )
}
