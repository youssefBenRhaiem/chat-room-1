const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const express = require("express");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");

const homeRouter = require("./src/Routes/homeRouter");
const roomRouter = require("./src/Routes/roomRouter");
const { ServerRoom } = require("./src/serverRoom");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

//express
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: "true",
  })
);
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

const users = {};
const serverRooms = {
  1: new ServerRoom({ id: 1, name: "test", password: "" }),
};

// Home Router
app.use(
  "/api/home",
  (req, res, next) => {
    req.rooms = serverRooms;
    next();
  },
  homeRouter
);
// Room Router
app.use(
  "/api/room",
  (req, res, next) => {
    req.rooms = serverRooms;
    next();
  },
  roomRouter
);

//io

io.on("connect", (socket) => {
  //create a room
  socket.on("join", (roomID) => {
    if (!serverRooms.hasOwnProperty(roomID))
      return socket.emit("error", "No room found !");
    users[socket.id] = roomID;
    const room = serverRooms[roomID];

    room.join();
    socket.join(roomID);
    io.in(roomID).emit("onlineUsers", users);
    io.in(roomID).emit("annoucement", `${socket.id} has connected`);
    // io.in(roomID).emit("announcement", {
    //   username: socket.id,
    //   status: "online",
    // });
    if (room.getMsg().length)
      io.in(roomID).emit("receiveMessages", room.getMsg());
    console.log(`user ${socket.id} has joined ${room.name} `);
  });

  socket.on("sendMessage", (msg) => {
    const roomID = users[socket.id];
    if (!serverRooms.hasOwnProperty(roomID))
      return socket.emit("error", "No room found !");
    const room = serverRooms[roomID];
    room.setMsg(socket.id, msg);
    console.log("message: " + msg);
    io.in(roomID).emit("receiveMessages", room.getMsg());
  });
  socket.on("disconnect", () => {
    if (!users.hasOwnProperty(socket.id)) return socket.disconnect();
    const roomID = users[socket.id];
    if (!serverRooms.hasOwnProperty(roomID)) return;
    serverRooms[roomID].disconnect();
    console.log(`user ${socket.id} has left ${serverRooms[roomID].name} `);
    delete users[socket.id];

    if (serverRooms[roomID].clients == 0) {
      console.log(`Room ${serverRooms[roomID].name} has been destroyed`);
      delete serverRooms[roomID];
      return;
    }
    io.in(roomID).emit("annoucement", `${socket.id} has disconnected`);

    // io.in(roomID).emit("announcement", {
    //   username: socket.id,
    //   status: "offline",
    // });
    io.in(roomID).emit("onlineUsers", users);
  });
});

const PORT = process.env.PORT;
httpServer.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
