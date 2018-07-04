var http = require('http');
var path = require('path');
var fs = require("fs");

var server = http.createServer(function (req, res) {
    res.writeHead(200, { "Content-Type": "text/html;charset=utf-8" })//text/plain 可以返回数据或者html
    res.write(`<span>node server is running!!!</span>`);
    res.end();
})

var host = "0.0.0.0";
var port = "4000";

server.listen(port, host, () => {
    console.log(`this server is running at http://${host}:${port}`)
})
