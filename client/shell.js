// This file contains hacks and workarounds for Powershell

const fs = require("fs");
const client = require("./client");

function changeDir(data, path) {
		path = path.replace(/\\/g, " ").split(" ");
		if (data.toString().toLowerCase() === "exec cd ..") {
			path.pop();
			path = path.join("\\");
		} else if (data.toString().toLowerCase().includes("exec cd")) {
			path.push(data.toString().split(" ").at(-1));
			path = path.join("\\");
		}
		return path;
}

module.exports = {
	changeDir: changeDir
};
