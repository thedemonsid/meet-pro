"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Video, VideoOff, PhoneCall } from "lucide-react";

export function RoomPageComponent() {
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [audioLevel, setAudioLevel] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
          setupAudioAnalyser(stream);
        })
        .catch((err) => console.error("Error accessing media devices:", err));
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  const setupAudioAnalyser = (stream: MediaStream) => {
    audioContextRef.current = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    analyserRef.current = audioContextRef.current.createAnalyser();
    const source = audioContextRef.current.createMediaStreamSource(stream);
    source.connect(analyserRef.current);
    analyserRef.current.fftSize = 256;
    updateAudioLevel();
  };

  const updateAudioLevel = () => {
    if (analyserRef.current) {
      const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount);
      analyserRef.current.getByteFrequencyData(dataArray);
      const average =
        dataArray.reduce((acc, val) => acc + val, 0) / dataArray.length;
      setAudioLevel(average / 128); // Normalize to 0-1 range
    }
    animationFrameRef.current = requestAnimationFrame(updateAudioLevel);
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

  const joinMeeting = () => {
    // Implement join meeting logic here
    console.log("Joining meeting...");
  };

  const getBorderColor = () => {
    if (!isMicOn) return "rgba(255, 255, 255, 0.2)";
    if (audioLevel < 0.2) return "rgba(255, 255, 255, 0.2)";
    if (audioLevel < 0.4) return "rgba(0, 255, 0, 0.4)";
    if (audioLevel < 0.6) return "rgba(0, 255, 0, 0.6)";
    if (audioLevel < 0.8) return "rgba(0, 255, 0, 0.8)";
    return "rgba(0, 255, 0, 1)";
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-[#111116] text-[#171E27] dark:text-white">
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-[#076DDD] dark:text-[#428ECC]">
          Join Your Meeting
        </h1>
        <div className="max-w-2xl mx-auto">
          <div
            className="aspect-video bg-[#F6F7F8] dark:bg-[#000000] rounded-xl overflow-hidden mb-6 relative"
            style={{
              boxShadow: `0 0 0 4px ${getBorderColor()}`,
              transition: "box-shadow 0.1s ease-in-out",
            }}
          >
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex justify-center space-x-4 mb-8">
            <Button
              onClick={toggleMic}
              className={`${
                isMicOn ? "bg-[#076DDD]" : "bg-red-500"
              } text-white hover:bg-opacity-80`}
            >
              {isMicOn ? <Mic /> : <MicOff />}
            </Button>
            <Button
              onClick={toggleCamera}
              className={`${
                isCameraOn ? "bg-[#076DDD]" : "bg-red-500"
              } text-white hover:bg-opacity-80`}
            >
              {isCameraOn ? <Video /> : <VideoOff />}
            </Button>
            <Button
              onClick={joinMeeting}
              className="bg-green-500 text-white hover:bg-green-600 px-8"
            >
              <PhoneCall className="mr-2" />
              Join Meeting
            </Button>
          </div>
          <p className="text-center text-[#475569] dark:text-[#969ea7]">
            Make sure your mic and camera are working properly before joining
            the meeting.
            {isMicOn
              ? " Speak to test your microphone."
              : " Your microphone is currently muted."}
          </p>
        </div>
      </main>
      <footer className="py-6 border-t border-[#EBEDF0] dark:border-[#1a2330] text-center">
        <p className="text-sm text-[#475569] dark:text-[#969ea7]">
          © 2023 MeetPro. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
