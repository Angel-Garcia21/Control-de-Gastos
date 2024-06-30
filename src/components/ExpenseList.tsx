import { useMemo } from "react"
import { useBudget } from "../hooks/useBudget"
import ExpenseDetail from "./ExpenseDetail"


export default function ExpenseList() {
    const {state} = useBudget()

    const filteredExpenses = state.currentCategory? state.expenses.filter(expense => expense.category === state.currentCategory): state.expenses

    const isEmpty = useMemo(() => filteredExpenses.length === 0, [filteredExpenses])

    
    return (
        <div className="md:mt-10 mt-5 bg-white shadow-xl rounded-lg md:p-10 p-5">
            {isEmpty? <p className="text-gray-700 md:text-2xl text-xl font-bold ">No Hay Gastos</p> : (
                <>
                    <p className="text-gray-700 md:text-2xl text-xl font-bold md:my-5 my-2    "> Listado De Gastos:</p>

                        {filteredExpenses.map(expense => (
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
