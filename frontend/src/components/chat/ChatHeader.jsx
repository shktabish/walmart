import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { Link } from "react-router-dom"

export function ChatHeader() {
  return (
    <header className="flex h-14 items-center bg-[#0E100F] px-4 sm:px-6">
      
      <div className="ml-auto flex items-center gap-2">
        <Link to="/cart">
          <ShoppingCart className='w-4 h-4' />
          <span className="sr-only">Cart icon</span>
        </Link>
      </div>
    </header>
  )
}
