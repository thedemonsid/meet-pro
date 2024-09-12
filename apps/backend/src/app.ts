import express from "express";
import http from "http";
import { Server as SocketIOServer } from "socket.io";
import { handleSignaling } from "./signaling";
import roomRoutes from "./routes";

// Initialize Express
const app = express();

// Enable JSON parsing middleware
app.use(express.json());

// Use routes for room management
app.use("/room", roomRoutes);

// Create HTTP server and bind it with Socket.io
const server = http.createServer(app);
const io = new SocketIOServer(server);

// Initialize WebRTC signaling with Socket.io
handleSignaling(io);

// Start the server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
