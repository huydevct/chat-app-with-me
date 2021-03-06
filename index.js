const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");

const io = new Server(server);
const delay = require('delay') 

io.on("connection", (socket) => {
  console.log("user connected");
  socket.on("on-chat", (data) => {
    io.emit("user-chat", data);
  });
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

server.listen(3000, () => {
  console.log("Server is running on 3000");
});

async function broadcastBitcoinPrice() {
  while (true) {
    const price = 31750 + Math.random() * 400;
    io.emit("bitcoin-price", { price: parseFloat(price.toFixed(2)) });

    await delay(400);
  }
}

broadcastBitcoinPrice()
