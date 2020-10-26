//试验使用生成器解决地狱回调(失败，拿不到异步函数里面的返回值)

function add(num1, num2) {
    setTimeout(() => {
        return num1 + num2;
    }, 1000);
}

function multiplication(num1, num2) {
    return num1 * num2;
}

function* geneartors (num1, num2) {
    yield multiplication(num1, num2);
    yield add(num1, num2);
}

let nums = geneartors(2, 3).next().value;
let mul = geneartors(2, 3).next().value;

console.log(nums);
console.log(mul);