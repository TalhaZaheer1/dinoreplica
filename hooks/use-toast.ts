// Simplified mock of shadcn/ui toast hook
import { useState } from "react"

export function useToast() {
    const [toasts, setToasts] = useState([])

    const toast = ({ title, description, variant }: any) => {
        console.log("Toast:", title, description, variant)
        // In a real app this would add to state context
        alert(`${title}: ${description}`)
    }

    return { toast, toasts }
}
