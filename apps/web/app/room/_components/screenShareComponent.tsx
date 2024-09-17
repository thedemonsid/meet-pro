import React from "react";

interface ScreenShareProps {
  screenShareRef: React.RefObject<HTMLVideoElement>;
  isScreenSharing: boolean;
}

const ScreenShare: React.FC<ScreenShareProps> = ({
  screenShareRef,
  isScreenSharing,
}) => {
  return (
    isScreenSharing && (
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
    )
  );
};

export default ScreenShare;
