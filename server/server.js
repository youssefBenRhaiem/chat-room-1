const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { createProxyMiddleware } = require("http-proxy-middleware");

const homeRouter = require("./src/Routes/homeRouter");
const roomRouter = require("./src/Routes/roomRouter");
const { ServerRoom } = require("./src/serverRoom");

const app = express();
const httpServer = createServer(app);
//MiddleWare
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:5173", "https://little-chat-room.netlify.app"],
    credentials: true,
  },
});
app.use(
  cors({
    origin: ["http://localhost:5173", "https://little-chat-room.netlify.app"],
    credentials: "true",
  })
);
app.use(express.json());
app.use(cookieParser());

const verifyJWT = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(400).json({ msg: "No token found" });
  jwt.verify(token, process.env.SECRETTOKEN, (err, decoded) => {
    if (err) return res.status(400).json({ msg: "Authentication error" });
    req.username = decoded.username;
    next();
  });
};

// Define the proxy middleware for local development.
const localProxyMiddleware = createProxyMiddleware({
  target: "http://localhost:3000",
  changeOrigin: true,
});

// Define the proxy middleware for production.
const productionProxyMiddleware = createProxyMiddleware({
  target: "https://little-chat-room.netlify.app",
  changeOrigin: true,
});

// Use the appropriate middleware based on the environment.
if (process.env.ENV == "development") {
  // Use local proxy middleware during development.
  app.use((req, res, next) => {
    localProxyMiddleware;
    next();
  });
} else {
  // Use production proxy middleware in the production environment.
  app.use((req, res, next) => {
    productionProxyMiddleware;
    next();
  });
}

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.get("/api/verify", verifyJWT, (req, res) => {
  res.json({ msg: "Verified", user: req.username });
});

/*  1: new ServerRoom({ id: 1, name: "test1", password: "123" }),
  2: new ServerRoom({ id: 2, name: "test2", password: "123" }),
  3: new ServerRoom({ id: 3, name: "test3", password: "123" }),
  4: new ServerRoom({ id: 4, name: "test4", password: "123" }),
  5: new ServerRoom({ id: 5, name: "test5", password: "123" }),
  6: new ServerRoom({ id: 6, name: "test6", password: "123" }),
  7: new ServerRoom({ id: 7, name: "test7", password: "123" }),
  8: new ServerRoom({ id: 8, name: "test8", password: "123" }),
  9: new ServerRoom({ id: 9, name: "test9", password: "123" }),
  10: new ServerRoom({ id: 10, name: "test10", password: "123" }),
  11: new ServerRoom({ id: 11, name: "test11", password: "123" }),
  12: new ServerRoom({ id: 12, name: "test12", password: "123" }),
  13: new ServerRoom({ id: 13, name: "test13", password: "123" }), */
const users = {};
const serverRooms = {};

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
app.use("/api/", (req, res, next) => {
  res.json({ msg: "hallo there" });
});
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
    io.in(roomID).emit("onlineUsers", {
      users: Object.fromEntries(
        Object.entries(users).filter(([userID, data]) => data === roomID)
      ),
    });
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
    io.in(roomID).emit("chat", { user: socket.id, msg });
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
      return delete serverRooms[roomID];
    }
    io.in(roomID).emit("annoucement", `${socket.id} has disconnected`);

    // io.in(roomID).emit("announcement", {
    //   username: socket.id,
    //   status: "offline",
    // });

    io.in(roomID).emit("onlineUsers", {
      users: Object.fromEntries(
        Object.entries(users).filter(([userID, data]) => data === roomID)
      ),
    });
  });
});

const PORT = process.env.PORT;
httpServer.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

module.exports = {
  verifyJWT,
};