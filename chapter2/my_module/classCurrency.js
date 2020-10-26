//使用module.exports导出模块

/**
 * @description 货币转换类
 */
class Currency {
    constructor(canadianDollar) {
        this.canadianDollar = canadianDollar;
    }

    roundTwoDecimals(amount) {
        return Math.round(amount * 100) / 100;
    }

    /**
     * @description 将加元转换为美元
     * @param {number} canadian 加元
     * @returns 返回转换后的美元金额
     */
    canadianToUS(canadian) {
        return this.roundTwoDecimals(canadian * this.canadianDollar);
    }

    /**
     * @description 将美元转换为加元
     * @param {number} us 美元
     * @returns 返回转换后的加元金额
     */
    USToCanadian(us) {
        return this.roundTwoDecimals(us / this.canadianDollar);
    }
}

//导出类
module.exports = Currency;