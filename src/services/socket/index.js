let io = null;
const { Server } = require("socket.io");

exports.bootstrap = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connection", async (socket) => {
    io.of("/").adapter.on("create-room", (room) => {
      // console.log(`room ${room} was created`);
    });
    io.of("/").adapter.on("join-room", (room, id) => {
      // console.log(`socket ${id} has joined room ${room}`);
    });
    console.log("connected");
    socket.on("join-room", (room) => {
      socket.join(room);
    });
  });
};

exports.emitToRoom = (room, event, data) => {
  io.to(room).emit(event, data);
};
