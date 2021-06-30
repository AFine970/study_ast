/*
 * @Date: 2021-06-30 18:49:18
 * @LastEditors: cunhang_wwei
 * @LastEditTime: 2021-06-30 19:08:32
 * @Description: 寻找字符串中连续出现最多次数的字符串（案例中的双指针算法）
 */
function solution(str) {
    if (!str) return
    let i = 0
    let j = 0
    let target = ''
    let maxCount = 0

    // 开始while循环
    while (j < str.length) {
        if (str[i] !== str[j]) {
            let count = j - i
            if (count > maxCount) {
                maxCount = count
                target = str[i]
            }
            i = j
        }
        j++
    }

    // 字符串全部都是同一个字符的时候：i还在起始位置，j在最末尾
    if (j === str.length && i === 0) {
        maxCount = j
        target = str[0]
    }

    return {
        target,
        maxCount
    }
}

// 测试用例一
const str1 = '11122222222233344444'
console.log(solution(str1))
// 结果
// { target: '2', maxCount: 9 }


// 测试用例二
const str2 = '1111111111111111111'
console.log(solution(str2))
// 结果
// { target: '1', maxCount: 19 }