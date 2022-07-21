const { bootstrap } = require("../services/rabbit");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { bootstrap: bootstrapSocket } = require("../services/socket");

bootstrap();
bootstrapSocket(server);

server.listen(process.env.PORT || 80, () => {
  console.log("server is listening");
});
