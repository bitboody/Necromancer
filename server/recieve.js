import http from "http";
import fs from "fs";

const agent = new http.Agent({
    keepAlive: false
})

export default function recieve(fileName, port) {
	const server = http.createServer().listen(port);

	server.on("request", (req, res) => {
		if (req.method != "POST") return res.end();
		let recievedFile = fileName;
		const writeStream = fs.createWriteStream("../config/yanked/" + recievedFile);

		req.pipe(writeStream);

		req.on("end", () => {
			res.writeHead(200, { "Content-Type": "text/plain" });
			res.end("saved as:\n\t" + recievedFile);
            console.log(`Recieved ${recievedFile}! Press enter.`)
            server.close();
		});
	});

	console.log(`Listening on port ${port}`);
}