import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

interface UseWebRTCProps {
  roomId: string;
  handleSignal: (type: "offer" | "answer" | "ice-candidate", data: any) => void;
}

function useWebRTC({ roomId, handleSignal }: UseWebRTCProps): Socket | null {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const socketInstance: Socket = io(
      `${process.env.BACKEDN_URL}` || "http://localhost:5000"
    ); 

    socketInstance.emit("join-room", roomId);

    socketInstance.on("offer", (offer) => handleSignal("offer", offer));
    socketInstance.on("answer", (answer) => handleSignal("answer", answer));
    socketInstance.on("ice-candidate", (candidate) =>
      handleSignal("ice-candidate", candidate)
    );

    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, [roomId, handleSignal]);

  return socket;
}

export default useWebRTC;
