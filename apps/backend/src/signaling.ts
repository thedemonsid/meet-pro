import { Server as SocketIOServer, Socket } from 'socket.io';

export function handleSignaling(io: SocketIOServer) {
  io.on('connection', (socket: Socket) => {
    console.log('A user connected:', socket.id);

    // Join a room
    socket.on('join-room', (roomId: string) => {
      socket.join(roomId);
      console.log(`User ${socket.id} joined room ${roomId}`);
      socket.to(roomId).emit('user-connected', socket.id);

      // Handle offer
      socket.on('offer', (offer) => {
        socket.to(roomId).emit('offer', offer);
      });

      // Handle answer
      socket.on('answer', (answer) => {
        socket.to(roomId).emit('answer', answer);
      });

      // Handle ICE candidate
      socket.on('ice-candidate', (candidate) => {
        socket.to(roomId).emit('ice-candidate', candidate);
      });

      // Handle disconnection
      socket.on('disconnect', () => {
        console.log(`User ${socket.id} disconnected`);
        socket.to(roomId).emit('user-disconnected', socket.id);
      });
    });
  });
}
