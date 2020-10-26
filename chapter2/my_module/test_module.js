//引入自定义模块
const Currency = require('./classCurrency');  //js扩展名可以省略

let currency = new Currency(0.91);

console.log('50 Canadian dollars equals this amount of US dollars:');
console.log(currency.canadianToUS(50));

console.log('30 US dollars equals this amount of Canadian dollars:');
console.log(currency.USToCanadian(30));

// console.log(currency);