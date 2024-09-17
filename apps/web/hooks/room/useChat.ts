import { useState, useRef, useEffect } from "react";

export const useChat = () => {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>(
    []
  );
  const [newMessage, setNewMessage] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const sendMessage = (sender: string, text: string) => {
    setMessages([...messages, { sender, text }]);
    setNewMessage("");
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return { messages, newMessage, setNewMessage, sendMessage, chatContainerRef };
};
