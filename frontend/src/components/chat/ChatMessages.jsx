import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { useChat } from "@/context/ChatContext";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import api from "@/utils/axios"
import CardsSection from "../CardsSection"

export function ChatMessages({ messages, setMessages }) {
  const { chatId } = useParams();
  const { setChatId } = useChat();
  
  useEffect(() => {
    if (chatId) {
      setChatId(chatId);
    }
  }, [chatId, setChatId]);

  useEffect(() => {
    fetchData()
  }, [chatId])

  const fetchData = async () => {
    try {
      const { data } = await api.get(`/chat/getMessages/${chatId}`)
      setMessages(data.message)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="h-[calc(100vh-88px-56px)] overflow-y-scroll p-4 flex flex-col-reverse">
      <div className="grid gap-4">
        {messages.map((message) => (
          message.sender === "user" ? (
            <Message
              key={message._id}
              message={message.message}
              isUser={true}
            />
          ) : (
            <>
              <Message
                key={message._id}
                avatarSrc="/placeholder-user.jpg"
                name="Wall-e"
                message="Hi there ! Can I help me out?"
                isUser={false}
              />
              <CardsSection products={message.products} />
            </>
          )
        ))}
      </div>
    </div>
  )
}

function Message({ avatarSrc, name, message, isUser }) {
  return (
    <div
      className={`flex items-start gap-4 ${isUser ? "justify-end" : ""} my-3`}
    >
      {!isUser && (
        <Avatar className="w-8 h-8 border">
          <AvatarImage src={avatarSrc} alt={`@${name}`} />
          <AvatarFallback>{name ? name.charAt(0) : "U"}</AvatarFallback>
        </Avatar>
      )}
      <div
        className={`grid gap-1 px-3 rounded-md max-w-[80%] ${
          isUser ? "bg-[#2F2F2F] text-white p-3" : ""
        }`}
      >
        {!isUser && <div className="font-medium">{name}</div>}
        <div>{message}</div>
      </div>
    </div>
  )
}
