import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"
import { Link } from "react-router-dom"

export function ChatHeader() {
  return (
    <header className="flex h-14 items-center border-b bg-muted/40 px-4 sm:px-6">
      <div className="flex items-center gap-2">
        <Avatar className="w-8 h-8 border">
          <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
          <AvatarFallback>AC</AvatarFallback>
        </Avatar>
        <div className="font-medium">Acme Inc</div>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <Link to="/cart">
          <ShoppingCart className='w-4 h-4' />
          <span className="sr-only">Cart icon</span>
        </Link>
      </div>
    </header>
  )
}
