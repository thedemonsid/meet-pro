"use client";
import React, { useState } from "react";

// Import hooks from the correct file path
import { useMedia } from "@/hooks/room/useMedia";
import { useScreenShare } from "@/hooks/room/useScreenShare";
import { useChat } from "@/hooks/room/useChat";

// Import components from the correct file path
import VideoDisplay from "./videoDisplayComponent";
import ScreenShare from "./screenShareComponent";
import ChatPanel from "./chatPanelComponent";
import ControlBar from "./controlBarComponent";
import ParticipantsPanel from "./participantsPanelComponent";

export const MeetingPageComponent: React.FC = () => {
  const { videoRef, isMicOn, isCameraOn, toggleMic, toggleCamera } = useMedia();
  const { screenShareRef, isScreenSharing, toggleScreenShare } =
    useScreenShare();
  const { messages, newMessage, setNewMessage, sendMessage, chatContainerRef } =
    useChat();

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isParticipantListOpen, setIsParticipantListOpen] = useState(false);
  const [participants, setParticipants] = useState([
    "You",
    "Participant 1",
    "Participant 2",
  ]);

  const toggleChat = () => setIsChatOpen(!isChatOpen);
  const toggleParticipantList = () =>
    setIsParticipantListOpen(!isParticipantListOpen);

  const leaveMeeting = () => {
    alert("Leaving the meeting...");
  };

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-[#111116] text-[#171E27] dark:text-white relative">
      <main className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 overflow-auto">
          <VideoDisplay
            videoRef={videoRef}
            isMicOn={isMicOn}
            isCameraOn={isCameraOn}
          />
          <ScreenShare
            screenShareRef={screenShareRef}
            isScreenSharing={isScreenSharing}
          />
        </div>

        {/* Control Bar */}
        <ControlBar
          isMicOn={isMicOn}
          toggleMic={toggleMic}
          isCameraOn={isCameraOn}
          toggleCamera={toggleCamera}
          isScreenSharing={isScreenSharing}
          toggleScreenShare={toggleScreenShare}
          toggleChat={toggleChat}
          toggleParticipantList={toggleParticipantList}
          leaveMeeting={leaveMeeting}
        />
      </main>

      {/* Chat Panel with Toggle
      <div
        className={`fixed transition-transform duration-300 ${
          isChatOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <ChatPanel
          messages={messages}
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          sendMessage={sendMessage}
          chatContainerRef={chatContainerRef}
          toggleChat={toggleChat}
        />
      </div>

      {/* Participants Panel with Toggle */}
      {/* <div
        className={`fixed transition-transform duration-300 ${
          isParticipantListOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <ParticipantsPanel
          participants={participants}
          toggleParticipantList={toggleParticipantList}
        />
      </div> */}
    </div>
  );
};
