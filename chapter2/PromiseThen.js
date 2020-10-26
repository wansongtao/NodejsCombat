//测试期约连锁解决回调地狱

function promiseTest() {
    return new Promise((resolve, reject) => {
        resolve('1');
    });
}

promiseTest()
.then((data) => {
    return data + '2';
})
.then((data) => {
    console.log(data + '3');  //123
});