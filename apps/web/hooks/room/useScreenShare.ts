import { useState, useRef } from "react";

export const useScreenShare = () => {
  const [isScreenSharing, setIsScreenSharing] = useState(false);
  const screenShareRef = useRef<HTMLVideoElement>(null);

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

  return { screenShareRef, isScreenSharing, toggleScreenShare };
};
