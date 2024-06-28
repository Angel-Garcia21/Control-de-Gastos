import AmountDisplay from "./AmountDisplay";


export default function BudgetTracker() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-5 gap-3">
            <div className="flex justify-center">
                <img src="/grafico.jpg" alt="Imagen de grafico" />
            </div>

            <div className="flex flex-col justify-center items-center md:gap-8 gap-4">
                <button
                    className="bg-pink-700 w-full p-1 md:p-2 text-white uppercase font-bold rounded-lg "
                    type="button"
                >
                    Resetear App
                </button>

                <AmountDisplay
                        label = "Presupuesto"
                        amount = {300}
                        
                />

                    <AmountDisplay
                        label = "Disponible"
                        amount = {300}
                    />

                    <AmountDisplay
                        label = "Gastado"
                        amount = {300}
                    />
            </div>
        </div>
    )
}
