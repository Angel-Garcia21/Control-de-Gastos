
import { useEffect, useMemo } from "react"
import BudGetForm from "./components/BudGetForm"
import { useBudget } from "./hooks/useBudget"
import BudgetTracker from "./components/BudgetTracker"
import ExpenseModal from "./components/ExpenseModal"
import ExpenseList from "./components/ExpenseList"
import FilterByCategory from "./components/FilterByCategory"



function App() {

  const {state} = useBudget()

  const isValidBudget = useMemo(() => state.budget > 0, [state.budget])

  useEffect(() => {
    localStorage.setItem('budget', state.budget.toString())
    localStorage.setItem('expenses', JSON.stringify(state.expenses))
  }, )

  return (
    <>
      <header className="bg-blue-700 md:py-8 md:max-h-72 items-center">
        <h1 className="uppercase text-center font-black md:text-4xl text-white text-2xl">Planificador de gastos</h1>
      </header>

      <div className="max-w-3xl mx-auto shadow-xl bg-white rounded-lg mt-10 md:p-10 p-5 ">
        {isValidBudget ?<BudgetTracker/> : <BudGetForm/>}
      </div>
      {isValidBudget && (
        <main className="max-w-3xl mx-auto md:py-10 py-7 ">
          <FilterByCategory/>
          <ExpenseModal/>
          <ExpenseList/>
        </main>

      )}
    </>
  )
}

export default App
