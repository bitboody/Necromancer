const net = require("net");
require('dotenv').config({path: '../config/.env'})

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Keep track of the chat clients
const clients = [];
let clientCount = 0;

const PORT = process.env.PORT;
const HOST = process.env.HOST;

// Start a TCP Server
net
  .createServer((socket) => {
    // Identify this client

    socket.name = `${socket.remoteAddress}:${socket.remotePort}`;

    // Put this new client in the list
    clients.push(socket);

    clientCount++;
    console.log(`User ${socket.name} has connected.\n`);

		prompt();
		
    // Remove the client from the list when it leaves
    function userDisconnected() {
      clients.splice(clients.indexOf(socket), 1);
      clientCount--;
      console.log(`User ${socket.name} has disconnected.\n`);
      if (clientCount < 1) console.log("Waiting for clients to connect.\n");
    }

    // Send a message to all clients
    function broadcast(message) {
      clients.forEach((client) => {
        client.write(message);
      });
      // Log it to the server output too
      process.stdout.write(message);
    }

    function prompt() {
      readline.question(">> ", (msg) => {
        broadcast(msg);
        // readline.close();
        return prompt();
      });
    }

    socket.on("data", function (data) {
      broadcast(socket.name + "> " + data, socket);
			prompt();
    });

    socket.on("end", () => {
      userDisconnected();
    });
    socket.on("error", () => {
      userDisconnected();
    });
  })
  .listen(PORT, HOST);

console.log(`Server running on ${HOST}:${PORT}.`);
console.log(`Waiting for connections.\n`);
