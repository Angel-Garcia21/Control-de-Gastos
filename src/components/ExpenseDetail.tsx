import { useMemo } from "react"
import { useBudget } from "../hooks/useBudget";
import { LeadingActions, SwipeableList, SwipeableListItem, SwipeAction, TrailingActions,} from 'react-swipeable-list';
import 'react-swipeable-list/dist/styles.css';
import { formatDate } from "../helpers"
import { Expense } from "../types"
import AmountDisplay from "./AmountDisplay"
import { categories } from "../data/categories"


type ExpenseDetailProps = {
    expense: Expense
}

export default function ExpenseDetail({expense}: ExpenseDetailProps) {

    const categoryInfo = useMemo(() =>categories.filter(cat => cat.id === expense.category)[0], [expense])

    const {dispatch} = useBudget()
    // Funcioens de Barra Interactiva
    const leadingActions = () => (
        <LeadingActions>
            <SwipeAction
            onClick={() => dispatch({type:'get-expense-by-id', payload:{id:expense.id}})}
            >
                Actualizar
            </SwipeAction>
        </LeadingActions>
    )

    const trailingActions = () => (
        <TrailingActions>
            <SwipeAction
            onClick={() => dispatch({type:'remove-expense', payload:{id:expense.id}})}
            destructive = {true}
            >
                Eliminar
            </SwipeAction>
        </TrailingActions>
    )

    return (

        //configuracion depencia swipe
        <SwipeableList>
            <SwipeableListItem
            maxSwipe={1}
            leadingActions={leadingActions()}
            trailingActions={trailingActions()}
            >
        <div className="bg-white shadow-xl md:p-10 p-5 w-full border-b border-gray-200 flex gap-5 items-center ">
            <div>
                <img 
                    src={`/icono_${categoryInfo.icon}.svg`} 
                    alt="Icono Gasto"
                    className="w-20"
                    />
            </div>
            <div className="flex-1 md:space-y-2 space-y-1" >
                <p className="text-sm font-bold uppercase text-slate-500">{categoryInfo.name}</p>
                <p>{expense.expenseName}</p>
                <p className="text-slate-600 text-sm">{ formatDate(expense.date!.toString()) }</p>
            </div>

            <AmountDisplay
            amount={expense.amount}
            
            />
        </div>
            </SwipeableListItem>
        </SwipeableList>
    )
}
