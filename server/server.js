const express = require("express");
const app = express();
const cors = require("cors");
const port = 8080;
const http = require("http");
const socket = require("./socket");
// app.use(cors());

const server = http.createServer(app);
const io = require("socket.io")(server);

app.get("/", (req, res) => {
  console.log("get request");
  res.status(200).send("hello");
});

io.on("connection", (client) => {
  console.log("a user connected");
  socket.initializeGame(io, client);

  client.on("disconnect", () => {
    console.log("user disconnected");
  });
});

app.listen(port, () => {
  console.log(`express listening on port ${port}`);
});
