//node inspect hello.js  inspect: 打开调试器
/**
 * repl 命令允许远程地运行代码。 next 命令会单步进入下一行。
 *  键入 help 可以查看其他可用的命令。
 *  .exit退出调式台
 * 在不键入命令的情况下按 enter 键，则会重复上一个调试器命令。
 * node --inspect hello.js 进入Chrome调试台
 */
const http = require('http');
const port = 8080;

const server = http.createServer((req, res) => {
    res.end('Hello, world.');
});

server.listen(port, (err) => {
    if(err) {
        throw err;
    } else {
        console.log('Server listening on: http://localhost:%s', port);
    }
});