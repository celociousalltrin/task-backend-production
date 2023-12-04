const { Server } = require("socket.io");

exports.sio = (server) => {
  return new Server(server, {
    cors: {
      orgin: process.env.REACT_APP_URL,
    },
  });
};

exports.connection = (io) => {
  io.on("connection", (socket) => {
    console.log("user is connected", socket.id);
    socket.on("join_room", (data) => {
      socket.join(data);
    });

    socket.on("disconnectRequest", ({ socketId }) => {
      const socketToDisconnect = io.sockets.sockets[socketId];
      if (socketToDisconnect) {
        socketToDisconnect.disconnect();
        console.log(`Socket with ID ${socketId} disconnected`);
      } else {
        console.log(`Socket with ID ${socketId} not found`);
      }
    });

    socket.on("disconnect", () => {
      console.log(`socket ${socket.id} disconnected`);
    });

    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });
  });
};
