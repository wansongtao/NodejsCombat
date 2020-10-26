/**
 * @description 用期约解决回调地狱
 * @author wansongtao
 * @date 2020-10-25
 */

const http = require('http');
const fs = require('fs');
const path = require('path');

/**
 * async: es8语法，声明一个异步函数
 * 使用async关键字可以让函数具有异步
 * 特征，但总体上其余代码仍然是同步求值的。
 */
http.createServer(async (req, res) => {
    if (req.url === '/') {
        /**
         * await: es8语法，暂停异步代码的执行，等待期约解决。即等待
         * readFile()方法返回的期约执行完毕，在执行后面的代码。
         * 如果异步函数不包含await关键字，则和同步函数没有区别。
         */
        let titleData = await readFile('source/title.json');
        let htmlData = await readFile('source/template.html');

        htmlData = htmlData.replace('%', JSON.parse(titleData).title);

        res.writeHead(200, {
            'Content-Type': 'text/html;charset=utf-8'
        });

        res.end(htmlData);
    } else {
        res.end('404');
    }
}).listen(5000, '127.0.0.1', (err) => {
    if (err) {
        throw err;
    }
});

/**
 * @description 读取文件内容
 * @param {String} url 相对路径
 * @returns 返回一个期约，期约变为解决状态后返回文件内容（字符串格式）
 */
function readFile(url) {
    if (!(typeof url === 'string')) {
        throw new TypeError('readFile(): arguments type error.');
    }

    return new Promise((resolve, reject) => {
        const filePath = path.join(__dirname, url);

        fs.readFile(filePath, (err, data) => {
            if (err) {
                throw err;
            }

            //期约从待定状态变为解决状态后，返回一个值
            resolve(data.toString());

            //拒接状态报错
            reject(() => {
                throw new Error('readFile(): Promise => reject');
            });

        });
    });
}