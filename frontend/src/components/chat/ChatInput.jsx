import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import api from "@/utils/axios";
import { ArrowUpIcon, Mic } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useChat } from "@/context/ChatContext";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";

export function ChatInput({ message, setMessage, setMessages }) {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const { chatId } = useChat();
  const mediaRecorderRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [slectedCategory, setSelectedCategory] = useState(null);

  const category = [
    { name: "grocery_and_gourmet_food", title: "Grocery & Gourmet Food" },
    { name: "home_and_kitchen", title: "Home & Kitchen" },
    { name: "electronics", title: "Electronics" },
    { name: "shoes", title: "Shoes" },
  ]

  useEffect(() => {
    if (isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  }, [isRecording, chatId]);

  const handleClick = async () => {
    if (!(message.trim() === "")) {
      setIsModalOpen(true); // Open modal on button click
    }
  };

  const createChat = async () => {
    try {
      const { data } = await api.post("/chat/createChat", { firstMessage: message, category: slectedCategory });
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const updateChat = async () => {
    try {
      const { data } = await api.put(`/chat/updateChat/${chatId}`, { message, category: slectedCategory });
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      mediaRecorderRef.current.start();

      const audioChunks = [];
      mediaRecorderRef.current.addEventListener('dataavailable', (event) => {
        audioChunks.push(event.data);
      });

      mediaRecorderRef.current.addEventListener('stop', async () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const formData = new FormData();
        formData.append('audio', audioBlob);

        try {
          const { data } = await api.post(`/chat/audio/${chatId}`, formData);
          console.log(data);
          setMessages(prevMessages => [...prevMessages, ...data.messages]);

        } catch (error) {
          console.error("Error sending audio message:", error);
        }
      });
    } catch (error) {
      console.error("Error accessing microphone:", error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== "inactive") {
      mediaRecorderRef.current.stop();
    }
  };

  const handleMicClick = () => {
    setIsRecording((prevState) => !prevState);
  };

  const handleCloseModal = async () => {
    setIsModalOpen(false);
    // Continue with the logic after closing the modal
    if (!(message.trim() === "")) {
      console.log(`Sending message: ${message}`)

      setMessage("")

      if(chatId === "chat") {
        const res = await createChat()
        setSelectedCategory(null);
        navigate(`/chat/${res?.chat?._id}`)
      } else {
        setMessages((prev) => [...prev, { sender: "user", message }])
        const res = await updateChat()
        const { sender, products } = res.response
        setMessages((prev) => [...prev, { sender, products }])
      }
    }
    setSelectedCategory(null);
  };

  return (
    <div className="bg-[#0E100F] p-4">
      <div className="relative">
        <Textarea
          placeholder="Type your message..."
          name="message"
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={1}
          className="min-h-[48px] rounded-2xl resize-none p-4 border bg-[#2F2F2F] border-neutral-400 shadow-sm pr-20"
        />
        <Mic 
          className={`absolute w-6 h-6 top-4 right-14 ${isRecording ? 'text-red-500' : ''}`} 
          onClick={() => handleMicClick()}
        />
        <Button 
          type="submit" 
          size="icon" 
          className="group absolute w-8 h-8 top-3 right-3 bg-white"
          onClick={() => handleClick()}
        >
          <ArrowUpIcon className="w-4 h-4 stroke-black group-hover:stroke-white" />
          <span className="sr-only ">Send</span>
        </Button>
      </div>

      {isModalOpen && (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="w-[90%] mx-auto">
            <DialogHeader>
              <DialogTitle className="text-black" >Select a category</DialogTitle>
              <DialogDescription>Choose one category who wish to look into.</DialogDescription>
            </DialogHeader>
            <div className="flex flex-wrap gap-2" >
              {
                category.map((item) => (
                  <div 
                    key={item.name} 
                    onClick={() => setSelectedCategory(item.name)}
                    className={`px-4 py-2 rounded-full ${slectedCategory === item.name ? 'bg-black text-white' : 'bg-[#ccc] text-black'} `}
                  >
                    {item.title}
                  </div>
                ))
              }
            </div>
            <DialogFooter>
              <Button onClick={() => handleCloseModal()}>Submit</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
