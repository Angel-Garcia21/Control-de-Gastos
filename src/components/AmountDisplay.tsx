import { formatCurrency } from "../helpers"

type AmountDisplayProps = {
    label?:string
    amount: number
}

export default function AmountDisplay({label, amount}: AmountDisplayProps) {
    return (
        <> 
            <p className="md:text-2xl text-xl text-blue-800 font-bold">
                {''}
                {label && `${label}: `}
                <span className="font-black text-black">{formatCurrency(amount)}</span>
            </p>
        </>
        
    )
}
