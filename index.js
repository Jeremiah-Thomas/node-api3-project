// require your server and launch it
const express = require("express");

const server = require("./api/server");

server.listen(9001, () => {
  console.log("Listening on port 9001");
});
