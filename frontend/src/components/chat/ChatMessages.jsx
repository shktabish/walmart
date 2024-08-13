import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"

export function ChatMessages() {
  return (
    <div className="flex-1 overflow-auto p-4">
      <div className="grid gap-4">
        <Message
          avatarSrc="/placeholder-user.jpg"
          name="Acme Inc"
          message="Hi there! I'm having trouble with my order. Can you help me out?"
          isUser={false}
        />
        <Message
          message="Sure, I'd be happy to help. What seems to be the issue with your order?"
          isUser={true}
        />
        <Message
          avatarSrc="/placeholder-user.jpg"
          name="Acme Inc"
          message="Well, I placed an order last week and it still hasn't arrived. I'm starting to get worried."
          isUser={false}
        />
        <Message
          message="Okay, let me look into that for you. Can you provide the order number or your contact information?"
          isUser={true}
        />
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
          isUser ? "bg-muted text-black p-3" : ""
        }`}
      >
        {!isUser && <div className="font-medium">{name}</div>}
        <div>{message}</div>
      </div>
      {/* {isUser && (
        <Avatar className="w-8 h-8 border">
          <AvatarImage src="/placeholder-user.jpg" alt="@shadcn" />
          <AvatarFallback>YO</AvatarFallback>
        </Avatar>
      )} */}
    </div>
  )
}
