import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { PaperclipIcon, SmileIcon } from "lucide-react"

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
        <Button variant="ghost" size="icon">
          <PaperclipIcon className="w-4 h-4" />
          <span className="sr-only">Attach file</span>
        </Button>
        <Button variant="ghost" size="icon">
          <SmileIcon className="w-4 h-4" />
          <span className="sr-only">Add emoji</span>
        </Button>
      </div>
    </header>
  )
}
