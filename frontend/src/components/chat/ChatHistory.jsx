import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Link } from "react-router-dom"

export function ChatHistory() {
  

  return (
    <aside className="hidden w-64 border-r bg-muted/40 sm:flex flex-col">
      <div className="flex h-14 items-center border-b px-4">
        <h2 className="text-lg font-semibold">Chat History</h2>
      </div>
      <div className="flex-1 overflow-auto p-4">
        <div className="grid gap-4">
          <ChatLink
            href="#"
            avatarSrc="/placeholder-user.jpg"
            name="Acme Inc"
            message="Hey, can you help me with..."
            time="2h"
          />
          <ChatLink
            href="#"
            avatarSrc="/placeholder-user.jpg"
            name="Acme Inc"
            message="Sure, I can help you with that. Let me know the details."
            time="1d"
          />
          <ChatLink
            href="#"
            avatarSrc="/placeholder-user.jpg"
            name="Acme Inc"
            message="Awesome, thanks for your help!"
            time="3d"
          />
        </div>
      </div>
    </aside>
  )
}

function ChatLink({ href, avatarSrc, name, message, time }) {
  return (
    <Link
      to={href}
      className="flex items-center gap-3 rounded-md bg-muted p-3 transition-colors hover:bg-muted/50"
    >
      <Avatar className="w-10 h-10 border">
        <AvatarImage src={avatarSrc} alt={`@${name}`} />
        <AvatarFallback>AC</AvatarFallback>
      </Avatar>
      <div className="flex-1 overflow-hidden">
        <div className="font-medium truncate">{name}</div>
        <div className="text-sm text-muted-foreground truncate">{message}</div>
      </div>
      <div className="text-xs text-muted-foreground">{time}</div>
    </Link>
  )
}
