import React, { createContext, useState, useContext, useEffect } from 'react';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [chatId, setChatId] = useState("chat");

    useEffect(() => {
      const currentUrl = window.location.href;
      const parts = currentUrl.split('/');
      const Id = parts.pop();
      setChatId(Id);
    }, []);


  return (
    <ChatContext.Provider value={{ chatId, setChatId }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
