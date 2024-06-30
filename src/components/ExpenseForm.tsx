import { useState, ChangeEvent  , FormEvent, useEffect } from "react";
import { DraftExpense, Value } from "../types";
import { categories } from "../data/categories";
import DatePicker from 'react-date-picker'
import 'react-date-picker/dist/DatePicker.css'
import 'react-calendar/dist/Calendar.css'
import ErrorMessage from "./ErrorMessage";
import { useBudget } from "../hooks/useBudget";



export default function ExpenseForm() {

    const {dispatch,state,reaminingBudget} = useBudget()

    const [expense, setExpense] = useState<DraftExpense>({
            amount:0,
            expenseName:'',
            category:'',
            date: new Date()
            })

    const [error, setError] = useState('')

    const [previousAmount, setPreviousAmount] = useState(0)

    useEffect(() => {
        if(state.editingId) {
            const editingExpense = state.expenses.filter(currentExpense => currentExpense.id === state.editingId) [0]
            setExpense(editingExpense)
            setPreviousAmount(editingExpense.amount)

        }
    }, [state.editingId]) 

        const handleChange = ( e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>  ) => {
            const {name, value} = e.target
            const isAmountField = ['amount'].includes(name)
            setExpense({
                ...expense, 
                [name] : isAmountField ? +value : value
            })
        }

        const handleChangeDate = (value:Value) => {
            setExpense({
                ...expense,
                date:value
            })
        }

        const handleSubmit = (e:FormEvent<HTMLFormElement>) => {
            e.preventDefault()

            //Validando
            if(Object.values(expense).includes('') 
            ) {
                setError('Todos los campos son obligatorios')
                return
                
            } 

            //Validando limite
            if((expense.amount - previousAmount) > reaminingBudget) {
                setError('Presupuesto arrebasado')
                return
                
            } 

                    if(state.editingId) {
                        dispatch({type:'update-expense', payload:{expense:{id:state.editingId, ...expense}}})


                    }else{
                        dispatch({type:'add-expense', payload:{expense}})
                    }
            

            setExpense({
                amount:0,
                expenseName:'',
                category:'',
                date: new Date()
            })
        setPreviousAmount(0)

        }

        
    return (
        <form className="md:space-y-5 space-y-2" onSubmit={handleSubmit} >
            <legend
            className="uppercase text-center md:text-2xl text-xl font-black border-b-4 border-blue-500 md:py py-2"
            >{state.editingId ? 'Guardar Cambios': 'Nuevo Gasto'}</legend>
            {error && <ErrorMessage>{error}</ErrorMessage> }
            <div className="flex flex-col gap-2">
                <label
                htmlFor="expenseName"
                className="md:text-xl text-base"
                >
                    Nombre Gasto:
            </label>
            <input
                type="text"
                id="expenseName"
                placeholder="Añade el nombre del gasto"
                className="bg-slate-200 md:p-2 p-1"
                name='expenseName'
                value={expense.expenseName}
                onChange={handleChange}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label
                htmlFor="amount"
                className="md:text-xl text-base"
                >
                    Cantidad:
                </label>

                <input
                type="number"
                id="amount"
                placeholder="Añadela cantidad del gasto"
                className="bg-slate-200 md:p-2 p-1"
                name='amount'
                value={expense.amount}
                onChange={handleChange}
                />
            </div>

            <div className="flex flex-col gap-2">
                <label
                htmlFor="category"
                className="md:text-xl text-base"
                >
                    Categoria:
                </label>
                <select
                id="category"
                className="bg-slate-200 md:p-2 p-1"
                name='category'
                value={expense.category}
                onChange={handleChange}
                > 

                    <option value="">-- Seleccione --</option>
                    {categories.map(category => (
                        <option 
                        value={category.id}
                        key={category.id}
                        >
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col gap-2">
                <label
                htmlFor="date"
                className="md:text-xl text-base"
                
                >
                    Fecha Gasto:
            </label>
            <DatePicker
            className='bg-slate-300'
            value={expense.date}
            onChange={handleChangeDate}
            />
            </div>

            <input
            type="submit"
            className="bg-blue-600 uppercase text-white rounded-lg md:p-2 p-1 font-bold w-full cursor-pointer text-center"
            value={state.editingId ? 'Actualizar Cambios': 'Registar Gasto'}
            />

            
        </form>
    )
}
