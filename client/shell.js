// This file contains hacks and workarounds for Powershell
const fs = require("fs");

function changeDir(data, path) {
  const dataStr = data.toString().toLowerCase();
  path = path.replace(/\\/g, " ").split(" ");

  if (dataStr.toLowerCase() === "exec cd ..") {
    path.pop();
    path = path.join("\\");
  } else if (dataStr.indexOf("cd") === 5) {
    if (dataStr.indexOf("to") === 8) return dataStr.split(" ").at(-1);
    path.push(dataStr.split(" ").at(-1));
    path = path.join("\\");
  }
  return path;
}

module.exports = {
  changeDir: changeDir,
};
