const http = require("http");
const { v4: uuidv4 } = require("uuid");
// const errorHandle = require("./errorHandle");
const { errorHandle, resWriteData } = require("./httpMsg");
const port = process.env.PORT || 3005;

todos = [];
const requestListener = (req, res) => {
	const headers = {
		"Access-Control-Allow-Headers": "Content-Type, Authorization, Content-Length, X-Requested-With",
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "PATCH, POST, GET, OPTIONS, DELETE",
		"Content-Type": "application/json",
	};
	// POST & PATCH 需要解析 request 請求 的 body 內容
	let body = "";
	req.on("data", (chunk) => {
		body += chunk;
	});
	//! 1 + 5 +1
	// if(){}else if(){}else if(){}else if(){}else if(){}else if(){}else {}

	// if(req.method == "GET"){}else if(req.method == "POST"){}else if(req.method == "DELETE"){}else if(req.method == "DELETE"){}else if(req.method == "PATCH"){}else if(req.method == "OPTIONS"){}else {}
	if (req.url == "/todos" && req.method == "GET") {
		resWriteData(res, todos);
	} else if (req.url == "/todos" && req.method == "POST") {
		req.on("end", () => {
			try {
			} catch (e) {
				errorHandle(res, e);
			}
		});
	} else if (req.url == "/todos" && req.method == "DELETE") {
	} else if (req.url.startsWith("/todos/") && req.method == "DELETE") {
	} else if (req.url.startsWith("/todos/") && req.method == "PATCH") {
		req.on("end", () => {
			try {
			} catch (e) {
				errorHandle(res, e);
			}
		});
	} else if (req.method == "OPTIONS") {
		res.writeHead(200, headers);
		res.end();
	} else {
		errorHandle(res, 404);
	}
};

const server = http.createServer(requestListener);
server.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}/todos`);
});
