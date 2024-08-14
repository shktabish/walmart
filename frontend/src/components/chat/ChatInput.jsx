import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import api from "@/utils/axios"
import { ArrowUpIcon, Mic } from "lucide-react"
import { useState } from "react"
import { useParams } from "react-router-dom"

export function ChatInput() {
  const [message, setMessage] = useState("")
  const { chatId } = useParams()

  const handleClick = () => {
    if (!(message.trim() === "")) {
      console.log(`Sending message: ${message}`)
      
      if(!chatId) {
        createChat()
      } else {
        console.log("Updating chat")
      }
    }
    setMessage("")
  }

  const createChat = async () => {
    try {
      const { data } = await api.post("/chat/createChat", { firstMessage: message })
      console.log(data)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="border-t bg-muted/40 p-4">
      <div className="relative">
        <Textarea
          placeholder="Type your message..."
          name="message"
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={2}
          className="min-h-[48px] rounded-2xl resize-none p-4 border border-neutral-400 shadow-sm pr-20"
        />
        <Mic className="absolute w-6 h-6 top-4 right-14" />
        <Button 
          type="submit" 
          size="icon" 
          className="absolute w-8 h-8 top-3 right-3"
          onClick={() => handleClick()}
        >
          <ArrowUpIcon className="w-4 h-4" />
          <span className="sr-only">Send</span>
        </Button>
      </div>
    </div>
  )
}
