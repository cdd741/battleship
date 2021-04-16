const express = require("express");
const cors = require("cors");
const port = 8080;
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);

const app = express();
app.use(cors());

io.on("connection", (socket) => {
  console.log("a user connected");
});

app.listen(port, () => {
  console.log(`express listening on port ${port}`);
});
