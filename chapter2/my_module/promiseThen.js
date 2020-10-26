//使用期约连锁解决地狱回调(失败)

const http = require('http');
const fs = require('fs');
const path = require('path');

http.createServer((req, res) => {
    if (req.url == '/') {
        readFile('source/title.json')
        .then((data) => {
            let html = readFile('source/template.html');

            console.log(JSON.parse(data), html);
        });
    } else {
        res.end('404');
    }
}).listen(5555, '127.0.0.1', (err) => {
    if (err) {
        throw err;
    }
});


function readFile(url) {
    return new Promise((resolve, reject) => {
        const titleurl = path.join(__dirname, url);

        fs.readFile(titleurl, (err, data) => {
            if(err) {
                reject(err => {throw err;});
            }

            // data = data.toString();
            resolve(data.toString());
        });
    });
}