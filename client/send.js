import http from "http";
import fs from "fs";

export default function send(host, port, dir, fileName) {
	if (port === undefined) port = 3000;

	const options = {
		hostname: host,
		port: port,
		method: "POST",
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
			"Content-Length": fs.statSync(dir + "\\" + fileName).size,
		},
	};

	const req = http.request(options, (res) => {
		console.log("STATUS:", res.statusCode);
		console.log("HEADERS:", JSON.stringify(res.headers));

		res.setEncoding("utf8");

		res.on("data", (chunk) => {
			console.log("Response chunk:", chunk);
		});

		res.on("end", () => {
			console.log("Request End");
		});
	});

	req.on("error", (e) => {
		console.log("Problem with request:", e.message);
	});

	let readStream = fs.createReadStream(dir + "\\" + fileName);

	console.log(readStream);

	readStream.pipe(req);
}

