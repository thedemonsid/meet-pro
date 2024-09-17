import { useState } from "react";
import api from "@/lib/api"; 
import axios from "axios";

interface UseJoinRoomReturn {
  success: boolean;
  loading: boolean;
  error: string | null;
  joinRoom: () => Promise<void>;
}

function useJoinRoom(roomId: string, participant: string): UseJoinRoomReturn {
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const joinRoom = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      await api.post(`/room/${roomId}/join`, { participant });
      setSuccess(true);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || err.message);
      } else if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return { success, loading, error, joinRoom };
}

export default useJoinRoom;
