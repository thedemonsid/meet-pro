import { useState, useRef, useEffect } from "react";

export const useMedia = () => {
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

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

  useEffect(() => {
    startVideoAudio();
  }, []);

  return { videoRef, isMicOn, isCameraOn, toggleMic, toggleCamera };
};
