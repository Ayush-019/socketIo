const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const socketIO = require("socket.io");
const io = socketIO(server, {
  cors: {
    origin: "*",
  },
});
require("dotenv").config();

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("callwaiter", (data) => {
    console.log("callwaiter:", data);
    io.emit("callwaiter", data);
  });
});

server.listen(PORT, () => {
  console.log("listening on *:", PORT);
});
