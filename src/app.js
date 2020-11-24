const express = require("express");
const server = express();

const hostname = "127.0.0.1";
const port = 3000;

const mongoose = require("mongoose");
// mongoose.connect('mongodb://mongo/apinodejs'); with docker

mongoose
  .connect("mongodb://localhost/nodeproject", { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log("Not Connected to Database ERROR! ", err);
  });

const bodyParser = require("body-parser");
server.use(bodyParser.urlencoded());
server.use(bodyParser.json());

const postRoute = require("./api/routes/postRoute");
const commentRoute = require("./api/routes/commentRoute");
postRoute(server);
commentRoute(server);

server.listen(port, hostname);
