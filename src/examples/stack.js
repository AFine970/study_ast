/*
 * @Date: 2021-07-01 19:39:01
 * @LastEditors: cunhang_wwei
 * @LastEditTime: 2021-07-01 20:42:14
 * @Description: 储备算法题四：栈
 */


// 编写“智能重复” smartRepeat 函数，实现
// 将 3[abc] 变为 abcabcabc
// 将 3[2[a]2[b]] 变成 aabbaabbaabb
// 将 2[1[a]3[b]2[3[c]4[d]]] 变成 abbbcccddddcccddddabbbcccddddcccdddd


function smartRepeat(templateStr) {
    // 指针下标
    let index = 0
    // 栈一，存放数字
    let stack1 = []
    // 栈二，存放需要重复的字符串
    let stack2 = []
    let tailStr = templateStr

    // 为啥遍历的次数为 length - 1 ? 因为要估计忽略最后的一个 ] 字符串
    while (index < templateStr.length - 1) {
        // 剩余没处理的字符串
        tailStr = templateStr.substring(index)
        
        if (/^\d+\[/.test(tailStr)) {
            // 匹配 "[" 前的数字
            let word = tailStr.match(/^(\d+)\[/)[1]
            // 转为数字类型
            let num = Number(word)
            // 入栈
            stack1.push(num)
            stack2.push('')
            index++
        } else if (/^\w+\]/.test(tailStr)) {
            // 匹配 "]" 前的需要重复的字符串
            let word = tailStr.match(/^(\w+)\]/)[1]
            // 修改栈二栈顶的字符串
            stack2[stack2.length - 1] = word
            // 让指针后移，word的长度，避免重复计算字符串
            index += word.length
        } else if (tailStr[0] === ']') {
            // 遇到 [ 字符串就需要出栈了，栈一和栈二同时出栈，栈二出栈的字符串重复栈一出栈的 数字的次数，并赋值到栈二的新栈顶上
            let times = stack1.pop()
            let word = stack2.pop()
            stack2[stack2.length - 1] += word.repeat(times)
            index++
        } else {
            index++
        }
        
        // console.log('tailStr', tailStr)
        // console.log('index', index)
        // console.log('stack1', stack1)
        // console.log('stack2', stack2)
    }
    
    // while结束之后, stack1 和 stack2 中肯定还剩余1项，若不是，则用户输入的格式错误
    if (stack1.length !== 1 || stack2.length !== 1) {
        throw new Error('输入的字符串有误，请检查')
    } else {
        return stack2[0].repeat(stack1[0])
    }
}


// 测试用例
const templateStr1 = `3[abc]`
const templateStr2 = `3[2[a]2[b]]`
const templateStr3 = `2[1[a]3[b]2[3[c]4[d]]]`

const res1 = smartRepeat(templateStr1)
const res2 = smartRepeat(templateStr2)
const res3 = smartRepeat(templateStr3)

console.log(res1)
console.log(res2)
console.log(res3)