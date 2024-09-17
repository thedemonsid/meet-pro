import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatPanelProps {
  messages: { sender: string; text: string }[];
  newMessage: string;
  setNewMessage: React.Dispatch<React.SetStateAction<string>>;
  sendMessage: (sender: string, text: string) => void;
  chatContainerRef: React.RefObject<HTMLDivElement>;
  toggleChat: () => void; // Add toggleChat for closing
}

const ChatPanel: React.FC<ChatPanelProps> = ({
  messages,
  newMessage,
  setNewMessage,
  sendMessage,
  chatContainerRef,
  toggleChat, // toggleChat function for closing
}) => {
  return (
    <aside className="fixed inset-0 sm:inset-y-0 sm:right-0 sm:w-80 bg-white dark:bg-[#111116] border-l border-[#EBEDF0] dark:border-[#1a2330] flex flex-col z-50 shadow-lg">
      <div className="p-4 border-b border-[#EBEDF0] dark:border-[#1a2330] flex justify-between items-center bg-[#F6F7F8] dark:bg-[#000000]">
        <h2 className="font-semibold">Chat</h2>
        <Button
          onClick={toggleChat}
          variant="ghost"
          size="sm"
          className="text-gray-500 hover:text-red-500"
        >
          <X className="h-6 w-6" />
        </Button>
      </div>
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F6F7F8] dark:bg-[#111116]"
      >
        {messages.map((msg, index) => (
          <div
            key={index}
            className="bg-white dark:bg-[#1F1F24] p-2 rounded-lg shadow-md"
          >
            <p className="font-semibold text-[#076DDD]">{msg.sender}</p>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              {msg.text}
            </p>
          </div>
        ))}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (newMessage.trim()) sendMessage("You", newMessage.trim());
        }}
        className="p-4 border-t border-[#EBEDF0] dark:border-[#1a2330] bg-[#F6F7F8] dark:bg-[#111116]"
      >
        <Input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="w-full dark:text-white dark:bg-[#1F1F24]"
        />
      </form>
    </aside>
  );
};

export default ChatPanel;
