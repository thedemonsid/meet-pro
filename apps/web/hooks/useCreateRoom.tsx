import api from "@/lib/api";
import axios from "axios";
import { useState } from "react";

interface useCreateRoomReturn {
  roomId: string | null;
  loading: boolean;
  error: string | null;
  createRoom: () => Promise<void>;
}

function useCreateRoom(): useCreateRoomReturn {
  const [roomId, setRoomId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createRoom = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post("/room/create");
      setRoomId(response.data.roomId);
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

  return { roomId, loading, error, createRoom };
}

export default useCreateRoom;
