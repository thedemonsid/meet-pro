import express from "express";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();
const rooms: Record<string, string[]> = {}; // In-memory room storage

// Create a room
router.post("/create", (req, res) => {
  const roomId = uuidv4(); // Generate a unique room ID
  rooms[roomId] = [];
  res.json({ roomId });
  console.log(`Room ${roomId} created`);
});

// Join a room
router.post("/:roomId/join", (req, res) => {
  const { roomId } = req.params;
  const { participant } = req.body;

  if (!rooms[roomId]) {
    return res.status(404).json({ error: "Room not found" });
  }

  if (rooms[roomId].length >= 3) {
    return res.status(403).json({ error: "Room is full" });
  }

  rooms[roomId].push(participant);
  res.json({ success: true });
  console.log(`Participant ${participant} joined room ${roomId}`);
});

export default router;
