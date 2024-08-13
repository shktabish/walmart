import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Link } from "react-router-dom"

export default function ChatPage() {
  return (
    <div className="flex min-h-screen w-full bg-background text-black">
      <aside className="hidden w-64 border-r bg-muted/40 sm:flex flex-col">
        <div className="flex h-14 items-center border-b px-4">
          <h2 className="text-lg font-semibold">Chat History</h2>
        </div>
        <div className="flex-1 overflow-auto p-4">
          <div className="grid gap-4">
            <Link
              href="#"
              className="flex items-center gap-3 rounded-md bg-muted p-3 transition-colors hover:bg-muted/50"
              prefetch={false}
            >
              <Avatar className="w-10 h-10 border">
                <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                <AvatarFallback>AC</AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <div className="font-medium truncate">Acme Inc</div>
                <div className="text-sm text-muted-foreground truncate">Hey, can you help me with...</div>
              </div>
              <div className="text-xs text-muted-foreground">2h</div>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-md bg-muted p-3 transition-colors hover:bg-muted/50"
              prefetch={false}
            >
              <Avatar className="w-10 h-10 border">
                <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                <AvatarFallback>AC</AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <div className="font-medium truncate">Acme Inc</div>
                <div className="text-sm text-muted-foreground truncate">
                  Sure, I can help you with that. Let me know the details.
                </div>
              </div>
              <div className="text-xs text-muted-foreground">1d</div>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-3 rounded-md bg-muted p-3 transition-colors hover:bg-muted/50"
              prefetch={false}
            >
              <Avatar className="w-10 h-10 border">
                <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                <AvatarFallback>AC</AvatarFallback>
              </Avatar>
              <div className="flex-1 overflow-hidden">
                <div className="font-medium truncate">Acme Inc</div>
                <div className="text-sm text-muted-foreground truncate">Awesome, thanks for your help!</div>
              </div>
              <div className="text-xs text-muted-foreground">3d</div>
            </Link>
          </div>
        </div>
      </aside>
      <div className="flex flex-col w-full">
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
        <div className="flex-1 overflow-auto p-4">
          <div className="grid gap-4">
            <div className="flex items-start gap-4 my-3">
              <Avatar className="w-8 h-8 border">
                <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                <AvatarFallback>AC</AvatarFallback>
              </Avatar>
              <div className="grid gap-1 px-3 rounded-md max-w-[80%]">
                <div className="font-medium">Acme Inc</div>
                <div>Hi there! I'm having trouble with my order. Can you help me out?</div>
              </div>
            </div>
            <div className="flex items-start gap-4 justify-end">
              <div className="grid gap-1 bg-muted text-black p-3 rounded-md max-w-[80%]">
                {/* <div className="font-medium">You</div> */}
                <div>Sure, I'd be happy to help. What seems to be the issue with your order?</div>
              </div>
              <Avatar className="w-8 h-8 border">
                <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                <AvatarFallback>YO</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex items-start gap-4 my-3">
              <Avatar className="w-8 h-8 border">
                <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                <AvatarFallback>AC</AvatarFallback>
              </Avatar>
              <div className="grid gap-1 px-3 rounded-md max-w-[80%]">
                <div className="font-medium">Acme Inc</div>
                <div>Well, I placed an order last week and it still hasn't arrived. I'm starting to get worried.</div>
              </div>
            </div>
            <div className="flex items-start gap-4 justify-end">
              <div className="grid gap-1 bg-muted text-black p-3 rounded-md max-w-[80%]">
                {/* <div className="font-medium">You</div> */}
                <div>
                  Okay, let me look into that for you. Can you provide the order number or your contact information?
                </div>
              </div>
              <Avatar className="w-8 h-8 border">
                <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
                <AvatarFallback>YO</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
        <div className="border-t bg-muted/40 p-4">
          <div className="relative">
            <Textarea
              placeholder="Type your message..."
              name="message"
              id="message"
              rows={1}
              className="min-h-[48px] rounded-2xl resize-none p-4 border border-neutral-400 shadow-sm pr-16"
            />
            <Button type="submit" size="icon" className="absolute w-8 h-8 top-3 right-3">
              <ArrowUpIcon className="w-4 h-4" />
              <span className="sr-only">Send</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

function ArrowUpIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m5 12 7-7 7 7" />
      <path d="M12 19V5" />
    </svg>
  )
}


function PaperclipIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
  )
}


function SmileIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" x2="9.01" y1="9" y2="9" />
      <line x1="15" x2="15.01" y1="9" y2="9" />
    </svg>
  )
}