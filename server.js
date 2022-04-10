const http = require("http");
const { v4: uuidv4 } = require("uuid");
const { headers } = require("./httpHeader");
const { errorHandle, resWriteData } = require("./httpMsg");
const port = process.env.PORT || 3005;

todos = [];
const requestListener = (req, res) => {
	let body = "";
	req.on("data", (chunk) => {
		body += chunk;
	});

	if (req.url == "/todos" && req.method == "GET") {
		resWriteData(res, todos);
	} else if (req.url == "/todos" && req.method == "POST") {
		req.on("end", () => {
			try {
				const title = JSON.parse(body).title;
				if (title !== undefined) {
					const todo = {
						title: title,
						id: uuidv4(),
					};
					todos.push(todo);
					resWriteData(res, todo);
				} else {
					errorHandle(res, 40001);
					return false;
				}
			} catch (error) {
				errorHandle(res, 40002);
			}
		});
	} else if (req.url == "/todos" && req.method == "DELETE") {
		todos.length = 0;
		resWriteData(res, todos);
	} else if (req.url.startsWith("/todos/") && req.method == "DELETE") {
		const id = req.url.split("/").pop();
		const index = todos.findIndex((element) => element.id == id);
		const todo = { ...todos[index] };
		if (index !== -1) {
			todos.splice(index, 1);
			resWriteData(res, todo);
		} else {
			errorHandle(res, 40001);
		}
	} else if (req.url.startsWith("/todos/") && req.method == "PATCH") {
		req.on("end", () => {
			try {
				const id = req.url.split("/").pop();
				const index = todos.findIndex((element) => element.id == id);
				const todo = JSON.parse(body).title;
				if (index !== -1 && todo !== undefined) {
					todos[index].title = todo;
					resWriteData(res, todos[index]);
				} else {
					errorHandle(res, 40001);
				}
			} catch (error) {
				errorHandle(res, 40002);
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
