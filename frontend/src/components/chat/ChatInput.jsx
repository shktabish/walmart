import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ArrowUpIcon } from "lucide-react"

export function ChatInput() {
  return (
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
  )
}
