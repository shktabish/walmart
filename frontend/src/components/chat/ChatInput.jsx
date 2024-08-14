import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import api from "@/utils/axios"
import { ArrowUpIcon, Mic } from "lucide-react"
import { useNavigate } from "react-router-dom"

export function ChatInput({ message, setMessage, setMessages }) {
  const navigate = useNavigate()
  const url = window.location.href;
  const chatId = url.split('/').pop()

  const handleClick = async () => {
    if (!(message.trim() === "")) {
      console.log(`Sending message: ${message}`)

      setMessage("")

      if(chatId === "chat") {
        const res = await createChat()
        navigate(`/chat/${res?.chat?._id}`)
      } else {
        setMessages((prev) => [...prev, { sender: "user", message }])
        const res = await updateChat()
        const { sender, products } = res.response
        setMessages((prev) => [...prev, { sender, products }])
      }
    }
  }

  const createChat = async () => {
    try {
      const { data } = await api.post("/chat/createChat", { firstMessage: message })
      return data
    } catch (error) {
      console.error(error)
    }
  }

  const updateChat = async () => {
    try {
      const { data } = await api.put(`/chat/updateChat/${chatId}`, { message })
      return data
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
          rows={1}
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
