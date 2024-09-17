import React from "react";
import { Button } from "@/components/ui/button";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  Monitor,
  PhoneOff,
  MessageSquare,
  Users,
} from "lucide-react";

interface ControlBarProps {
  isMicOn: boolean;
  toggleMic: () => void;
  isCameraOn: boolean;
  toggleCamera: () => void;
  isScreenSharing: boolean;
  toggleScreenShare: () => void;
  toggleChat: () => void;
  toggleParticipantList: () => void;
  leaveMeeting: () => void;
}

const ControlBar: React.FC<ControlBarProps> = ({
  isMicOn,
  toggleMic,
  isCameraOn,
  toggleCamera,
  isScreenSharing,
  toggleScreenShare,
  toggleChat,
  toggleParticipantList,
  leaveMeeting,
}) => {
  return (
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
  );
};

export default ControlBar;
