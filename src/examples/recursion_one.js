/*
 * @Date: 2021-06-30 18:49:46
 * @LastEditors: cunhang_wwei
 * @LastEditTime: 2021-07-01 19:40:18
 * @Description: 储备算法题二：递归 斐波那契数列 
 */

//   
/**
 * 斐波那契数列
 * 求前 N 项的和
 * 1 1 2 3 5 8 13 21 34 55
 */


// 写法一 
function fibo1(n) {
    return n === 0 || n === 1 ? 1 : fibo1(n - 1) + fibo1(n - 2)
}

// 写法二  增加缓存
function fibo2(n) {
    let cahce = {}

    if (n in cahce) {
        return cahce[n]
    }

    const v = n === 0 || n === 1 ? 1 : fibo1(n - 1) + fibo1(n - 2)
    cahce[n] = v

    return v
}

console.log(fibo1(10))
// 89

console.log(fibo2(10))
// 89
