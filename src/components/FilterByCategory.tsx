import { ChangeEvent } from "react";
import { categories } from "../data/categories";
import { useBudget } from "../hooks/useBudget";


export default function FilterByCategory() {

    const {dispatch,  } = useBudget()

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch({type:'add-filter-category', payload:{id:e.target.value}})

    }
    return (
        <div className="bg-white shadow-xl rounded-lg md:p-10 p-5">
            <form>
                <div className="flex flex-col md:flex-row md:items-center md:gap-5 gap-3 ">
                    <label htmlFor="category" className="font-semibold">Filtar Gastos</label>
                    <select 
                        id="category"
                        className="bg-slate-100 md:p-3 p-2 flex-1 rounded-md border border-gray-200 hover:shadow-lg"
                        onChange={handleChange}
                    
                    >
                        <option value="">--Todas las categorias--</option>
                        {categories.map(category =>( 
                            <option 
                            value={category.id}
                            key={category.id}
                            >
                                    {category.name}
                            </option>
                        ))}
                    </select>
                </div>
            </form>
        </div>
    )
}
