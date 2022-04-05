const http = require('http');
const  { v4: uuidv4 } = require('uuid');
const  {errorHandle, resWriteData} = require('./httpMsg');
const port = process.env.PORT || 3005;

todos = []
const requestListener = (req, res) => {
    const Headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept",
        "Access-Control-Allow-Methods": "GET, POST, PATCH, DELETE, OPTIONS",
        "Content-Type": "application/json",
    };

    let body = "";
    req.on("data", (chunk) => {
        body += chunk;
    });

    if(req.url == "/todos" && req.method == "GET"){
        resWriteData(res,todos);
    }else if(req.url == "/todos" && req.method == "POST"){

    }else if(req.url == "/todos" && req.method == "DELETE"){
        todos.length = 0;
        resWriteData(res,todos);
    }else if(req.url.startsWith("/todos/") && req.method == "DELETE"){

    }else if(req.url.startsWith("/todos/") && req.method == "PATCH"){

    }else if( req.method == "OPTIONS"){
        res.writeHead(200, Headers);
        res.end();
    }else{
        errorHandle(res,404);
    }
};
const server =http.createServer(requestListener);
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}/todos`);
});
