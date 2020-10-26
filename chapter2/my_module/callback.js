//用回调处理一次性事件
const http = require('http');
const fs = require('fs');
const path = require('path');

/**
 * 创建HTTP服务器并用回调定义响应逻辑
 */
http.createServer((req, res) => {
    if (req.url === '/') {
       getTitle(res);
    } else {
        res.end('404');
    }
}).listen(3000, '127.0.0.1', (err) => {
    if (err) {
        console.error(err);
        res.end('Server Error');
    }
});

/**
 * @description 获取json文件中的标题
 * @param {Object} res 响应对象
 */
function getTitle(res) {
    if(!(res instanceof Object)) {
        throw new TypeError('getTitle(): arguments type error');
    }

    const filePath = path.join(__dirname, 'source/title.json');
    fs.readFile(filePath, (err, data) => {
        if(err) {
            //返回错误
            throw err;
        }

        const titles = JSON.parse(data.toString()).title;

        getTemplate(res, titles);
    });
}

/**
 * @description 将一段文本添加入HTML页面中并返回
 * @param {Object} res 响应对象
 * @param {String} titles 文本
 */
function getTemplate(res, titles) {
    if(!(res instanceof Object)) {
        throw new TypeError('getTemplate(): arguments type error');
    }

    if(typeof titles !== 'string') {
        throw new TypeError('getTemplate(): arguments type error');
    }

    const filePath = path.join(__dirname, 'source/template.html');
    fs.readFile(filePath, (err, data) => {
        if (err) {
            throw err;
        }

        const html = data.toString().replace('%', titles);

        res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8;'});
        res.end(html);
    });
}