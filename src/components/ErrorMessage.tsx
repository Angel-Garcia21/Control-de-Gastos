import { ReactNode } from "react"

type ErrorMessageProps = {
    children:ReactNode
}

export default function ErrorMessage({children}: ErrorMessageProps) {
    return (
        <p className="bg-red-600 md:p-2 p-1 text-white text-sm text-center font'bold">{children}</p>
    )
}
