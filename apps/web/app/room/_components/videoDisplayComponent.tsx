import React from "react";

interface VideoDisplayProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  isCameraOn: boolean;
  isMicOn: boolean;
}

const VideoDisplay: React.FC<VideoDisplayProps> = ({
  videoRef,
  isCameraOn,
  isMicOn,
}) => {
  return (
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
          <span className="text-gray-400">Camera Off</span>
        </div>
      )}
      <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
        You {!isMicOn && "(Muted)"}
      </div>
    </div>
  );
};

export default VideoDisplay;
