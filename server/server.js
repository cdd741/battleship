const express = require("express");
const cors = require("cors");
const port = 8080;
const http = require("http");
const app = express();
app.use(cors());
const server = http.createServer(app);
const io = require("socket.io")(server);

io.on("connection", (socket) => {
    console.log("a user connected");
    socket.emit("FromAPI", "This is your game id: 45162451623");
});

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.listen(port, () => {
    console.log(`express listening on port ${port}`);
});
