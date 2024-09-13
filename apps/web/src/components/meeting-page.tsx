"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  MessageSquare,
  Users,
  Monitor,
  Copy,
  X,
} from "lucide-react";

export function MeetingPageComponent() {
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isParticipantListOpen, setIsParticipantListOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>(
    []
  );
  const [newMessage, setNewMessage] = useState("");
  const videoRef = useRef<HTMLVideoElement>(null);
  const screenShareRef = useRef<HTMLVideoElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    startVideoAudio();
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const startVideoAudio = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing media devices:", err);
    }
  };

  const toggleMic = () => {
    setIsMicOn(!isMicOn);
    if (videoRef.current && videoRef.current.srcObject instanceof MediaStream) {
      videoRef.current.srcObject
        .getAudioTracks()
        .forEach((track) => (track.enabled = !isMicOn));
    }
  };

  const toggleCamera = () => {
    setIsCameraOn(!isCameraOn);
    if (videoRef.current && videoRef.current.srcObject instanceof MediaStream) {
      videoRef.current.srcObject
        .getVideoTracks()
        .forEach((track) => (track.enabled = !isCameraOn));
    }
  };

  const toggleScreenShare = async () => {
    if (!isScreenSharing) {
      try {
        const screenStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
        });
        if (screenShareRef.current) {
          screenShareRef.current.srcObject = screenStream;
        }
        setIsScreenSharing(true);

        // Listen for when the user stops sharing the screen
        screenStream?.getVideoTracks()[0]?.addEventListener("ended", () => {
          if (screenShareRef.current) {
            screenShareRef.current.srcObject = null;
          }
          setIsScreenSharing(false);
        });
      } catch (err) {
        console.error("Error sharing screen:", err);
      }
    } else {
      if (
        screenShareRef.current &&
        screenShareRef.current.srcObject instanceof MediaStream
      ) {
        screenShareRef.current.srcObject
          .getTracks()
          .forEach((track) => track.stop());
      }
      setIsScreenSharing(false);
    }
  };

  const toggleChat = () => setIsChatOpen(!isChatOpen);
  const toggleParticipantList = () =>
    setIsParticipantListOpen(!isParticipantListOpen);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      setMessages([...messages, { sender: "You", text: newMessage.trim() }]);
      setNewMessage("");
    }
  };

  const copyMeetingCode = () => {
    const meetingCode = "abc-defg-hij"; // Replace with actual meeting code generation
    navigator.clipboard
      .writeText(meetingCode)
      .then(() => alert("Meeting code copied to clipboard!"))
      .catch((err) => console.error("Failed to copy meeting code:", err));
  };

  const leaveMeeting = () => {
    // Implement leave meeting logic here
    alert("Leaving the meeting...");
  };

  return (
    <div className="flex flex-col h-screen bg-white dark:bg-[#111116] text-[#171E27] dark:text-white relative">
      {/* Main content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Video Grid */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 overflow-auto">
          {/* Your Video */}
          <div className="w-full h-56 sm:h-64 md:h-72 lg:h-80 bg-[#F6F7F8] dark:bg-[#000000] rounded-xl overflow-hidden relative">
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className={`w-full h-full object-cover ${isCameraOn ? "" : "hidden"}`}
            />
            {!isCameraOn && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                <Users className="h-16 w-16 text-gray-400" />
              </div>
            )}
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
              You {!isMicOn && "(Muted)"}
            </div>
          </div>

          {/* Screen Share */}
          {isScreenSharing && (
            <div className="w-full h-56 sm:h-64 md:h-72 lg:h-80 bg-[#F6F7F8] dark:bg-[#000000] rounded-xl overflow-hidden relative col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-4">
              <video
                ref={screenShareRef}
                autoPlay
                playsInline
                className="w-full h-full object-contain"
              />
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
                Your Screen
              </div>
            </div>
          )}

          {/* Placeholder participants */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-full h-56 sm:h-64 md:h-72 lg:h-80 bg-[#F6F7F8] dark:bg-[#000000] rounded-xl overflow-hidden relative"
            >
              <img
                src={`/image.svg?height=720&width=1280`}
                alt={`Participant ${i + 1}`}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
                Participant {i + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Controls */}
        <div className="h-16 bg-[#F6F7F8] dark:bg-[#000000] border-t border-[#EBEDF0] dark:border-[#1a2330] flex items-center justify-between px-2 sm:px-4">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Button
              onClick={toggleMic}
              className={`${isMicOn ? "bg-[#076DDD]" : "bg-red-500"} text-white hover:bg-opacity-80 p-2 sm:p-3`}
            >
              {isMicOn ? (
                <Mic className="h-5 w-5" />
              ) : (
                <MicOff className="h-5 w-5" />
              )}
            </Button>
            <Button
              onClick={toggleCamera}
              className={`${isCameraOn ? "bg-[#076DDD]" : "bg-red-500"} text-white hover:bg-opacity-80 p-2 sm:p-3`}
            >
              {isCameraOn ? (
                <Video className="h-5 w-5" />
              ) : (
                <VideoOff className="h-5 w-5" />
              )}
            </Button>
            <Button
              onClick={toggleScreenShare}
              className={`${isScreenSharing ? "bg-[#076DDD]" : "bg-[#F6F7F8] dark:bg-[#000000]"} text-[#076DDD] dark:text-[#428ECC] hover:bg-opacity-80 p-2 sm:p-3`}
            >
              <Monitor className="h-5 w-5" />
            </Button>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Button
              onClick={copyMeetingCode}
              className="hidden sm:flex bg-[#F6F7F8] dark:bg-[#000000] text-[#076DDD] dark:text-[#428ECC] hover:bg-opacity-80 p-2 sm:p-3"
            >
              <Copy className="h-5 w-5" />
              <span className="hidden md:inline ml-2">Copy code</span>
            </Button>
            <Button
              onClick={toggleChat}
              className="bg-[#F6F7F8] dark:bg-[#000000] text-[#076DDD] dark:text-[#428ECC] hover:bg-opacity-80 p-2 sm:p-3"
            >
              <MessageSquare className="h-5 w-5" />
            </Button>
            <Button
              onClick={toggleParticipantList}
              className="bg-[#F6F7F8] dark:bg-[#000000] text-[#076DDD] dark:text-[#428ECC] hover:bg-opacity-80 p-2 sm:p-3"
            >
              <Users className="h-5 w-5" />
            </Button>
            <Button
              onClick={leaveMeeting}
              className="bg-red-500 text-white hover:bg-opacity-80 p-2 sm:p-3"
            >
              <PhoneOff className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </main>

      {/* Chat Panel */}
      {isChatOpen && (
        <aside className="fixed inset-0 sm:inset-y-0 sm:right-0 sm:w-80 bg-white dark:bg-[#111116] border-l border-[#EBEDF0] dark:border-[#1a2330] flex flex-col z-50">
          <div className="p-4 border-b border-[#EBEDF0] dark:border-[#1a2330] flex justify-between items-center">
            <h2 className="font-semibold">Chat</h2>
            <Button
              onClick={toggleChat}
              variant="ghost"
              size="sm"
              className="sm:hidden"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          <div
            ref={chatContainerRef}
            className="flex-1 overflow-y-auto p-4 space-y-4"
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className="bg-[#F6F7F8] dark:bg-[#000000] p-2 rounded-lg"
              >
                <p className="font-semibold">{msg.sender}</p>
                <p>{msg.text}</p>
              </div>
            ))}
          </div>
          <form
            onSubmit={handleSendMessage}
            className="p-4 border-t border-[#EBEDF0] dark:border-[#1a2330]"
          >
            <Input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="w-full"
            />
          </form>
        </aside>
      )}

      {/* Participant List Panel */}
      {isParticipantListOpen && (
        <aside className="fixed inset-0 sm:inset-y-0 sm:right-0 sm:w-80 bg-white dark:bg-[#111116] border-l border-[#EBEDF0] dark:border-[#1a2330] flex flex-col z-50">
          <div className="p-4 border-b border-[#EBEDF0] dark:border-[#1a2330] flex justify-between items-center">
            <h2 className="font-semibold">Participants</h2>
            <Button
              onClick={toggleParticipantList}
              variant="ghost"
              size="sm"
              className="sm:hidden"
            >
              <X className="h-6 w-6" />
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5" />
              <span>You</span>
            </div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-2">
                <Users className="h-5 w-5" />
                <span>Participant {i + 1}</span>
              </div>
            ))}
          </div>
        </aside>
      )}
    </div>
  );
}
