//货币转换模块
const canadianDollar = 0.91;

function roundTwo(amount) {
    return Math.round(amount * 100) / 100;
}

/**
 * @description 将加元转换为美元
 * @param {number} canadian 加元
 * @returns 返回转换后的美元金额
 */
function canadianToUS(canadian) {
    return roundTwo(canadian * canadianDollar);
}

/**
 * @description 将美元转换为加元
 * @param {number} us 美元
 * @returns 返回转换后的加元金额
 */
function USToCanadian(us) {
    return roundTwo(us / canadianDollar);
}

//导出模块  将函数设定在export模块中，所以引入这个模块的代码可以使用它。
exports.canadianToUS = canadianToUS;
exports.USToCanadian = USToCanadian;