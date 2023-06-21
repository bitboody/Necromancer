const net = require("net");
const port = 5000;
const host = "127.0.0.1";

const client = new net.Socket();

function connect() {
  client.connect(port, host, () => {
    console.log(`Connected to ${host}:${port}`);
    client.write("Hello, server! Love, Client.");
  });
}

client.on("data", (data) => {
  console.log(data.toString());
  // client.destroy();
});

client.on("close", (e) => {
  console.log(`${host}:${port} not found. Attempting to reconnect.`);
  client.setTimeout(10000, () => {
    client.connect(port, host);
  });
});

client.on("error", (err) => {
  setTimeout(() => {
    connect();
  }, 10000);
});

client.connect(port, host);
