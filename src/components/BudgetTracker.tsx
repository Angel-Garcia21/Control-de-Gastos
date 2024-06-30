import {CircularProgressbar,buildStyles} from'react-circular-progressbar'
import AmountDisplay from "./AmountDisplay";
import { useBudget } from "../hooks/useBudget";
import 'react-circular-progressbar/dist/styles.css'


export default function BudgetTracker() {

    const {state, totalExpenses, reaminingBudget, dispatch} = useBudget()

    const percentage = +((totalExpenses / state.budget) * 100).toFixed(2)

    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-5 gap-3">
            <div className="flex justify-center">
                <CircularProgressbar
                value={percentage}
                styles={buildStyles({
                    pathColor: percentage === 100? '#DC2626': '#3B82F6',
                    trailColor:'#D3D3D3',
                    textSize: 10,
                    textColor:percentage === 100? '#DC2626': '#3B82F6'
                    
                })}
                text={`${percentage}%Gastado`}
                />
            </div>

            <div className="flex flex-col justify-center items-center md:gap-8 gap-4">
                <button
                    className="bg-red-700 w-full p-1 md:p-2 text-white uppercase font-bold rounded-lg "
                    type="button"
                    onClick={() => dispatch({type:'reset-app'})}
                >
                    Resetear App
                </button>

                <AmountDisplay
                        label = "Presupuesto"
                        amount = {state.budget}
                        
                />

                    <AmountDisplay
                        label = "Disponible"
                        amount = {reaminingBudget}
                    />

                    <AmountDisplay
                        label = "Gastado"
                        amount = {totalExpenses}
                    />
            </div>
        </div>
    )
}
