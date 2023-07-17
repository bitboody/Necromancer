// This file contains hacks and workarounds for Powershell
const fs = require("fs");

function changeDir(data, path) {
  path = path.replace(/\\/g, " ").split(" ");
  if (data.toString().toLowerCase() === "exec cd ..") {
    path.pop();
    path = path.join("\\");
  } else if (data.toString().toLowerCase().indexOf("cd") === 5) {
    if (data.toString().toLowerCase().indexOf("to") === 8)
      return data.toString().split(" ").at(-1);
    path.push(data.toString().split(" ").at(-1));
    path = path.join("\\");
  }
  return path;
}

module.exports = {
  changeDir: changeDir,
};
