import { useMemo, useState, ChangeEvent, FormEvent } from "react"
import { useBudget } from "../hooks/useBudget"

export default function BudGetForm() {

    const [budget, setBudget] = useState(0)
    const {dispatch} = useBudget()

    const handleChange = (e :ChangeEvent<HTMLInputElement>) => {
        setBudget(+e.target.value)
    }

    const isValidBudget = useMemo(() => {
        return isNaN(budget) || budget <= 0
    },[budget]) 

    const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        dispatch({type:'add-budget', payload:{budget}})
    }

    return (
        <form className="md:space-y-5" onSubmit={handleSubmit}>
            <div className="flex flex-col space-y-5">
                <label htmlFor="budget" className="md:text-3xl text-xl text-blue-700 font-bold text-center mx-4">
                    Definir Presupuesto
                </label>
                <input
                    type="number"
                    className="w-full bg-white border border-gray-200 p-2 shadow-sm"
                    id="budget"
                    placeholder="Define tu Presupuesto"
                    name="budget"
                    value={budget}
                    onChange={handleChange}
                />
            </div>

            <input
            className="bg-blue-700 hover:cursor-pointer w-full text-white uppercase font-bold p-1 disabled:opacity-40"
            type="submit"
            value='Definir Presupuesto'
            disabled={isValidBudget}
            />
        </form>
    )
}

