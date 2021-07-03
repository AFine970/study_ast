/*
 * @Date: 2021-07-02 11:09:08
 * @LastEditors: cunhang_wwei
 * @LastEditTime: 2021-07-03 16:31:14
 * @Description: 生成 AST 抽象语法树
 */
import parseAttribute from './parseAttribute'

export default function parse(templateString) {
    let index = 0
    // 未处理的字符串
    let tailStr = templateString
    // 匹配开始的html标签
    const startTagRegExp = /^\<([a-z]+[1-6]?)(\s[^\<]+)?\>/
    // 匹配结束的html标签
    const endTagRegExp = /^\<\/([a-z]+[1-6]?)\>/
    // 抓取结束标签前的文字
    const wordRegExp = /^([^\<]+)\<\/[a-z]+[1-6]?\>/

    // 准备两个栈
    let stack1 = [] // 存储匹配到的开始html标签
    let stack2 = []
    let result = null

    while (index < templateString.length - 1) {
        tailStr = templateString.substring(index)

        if (startTagRegExp.test(tailStr)) {
            // 匹配开始标签
            const res = tailStr.match(startTagRegExp)
            const startTag = res[1]
            console.log('匹配到开始标记', startTag)
            const attrsString = res[2]

            // 开始将标记放入到栈1中
            stack1.push(startTag)
            // 将对象推入数组
            stack2.push({ tag: startTag, children: [], attrs: parseAttribute(attrsString)})
            // 指针移动标签的长度 + 2 + ,为什么 +2,因为 <> 也占两个长度
            index += startTag.length + 2
        } else if (endTagRegExp.test(tailStr)) {
            // 匹配结束标签
            const endTag = tailStr.match(endTagRegExp)[1]
            // console.log('匹配到结束标记', endTag)

            // 栈1和栈2都需要弹栈
            const pop_tag = stack1.pop()
            const pop_obj = stack2.pop()
            // 此时栈1的栈顶的元素肯定和endTag相同
            if (endTag === pop_tag) {
                if (stack2.length > 0) {
                    stack2[stack2.length - 1].children.push(pop_obj)
                } else if (stack2.length === 0) {
                    // 匹配到结束标签，且stack2出栈完毕，证明已经遍历结束，那么结果就是stack2最后出栈的那一项
                    result = pop_obj
                }
            } else {
                throw new Error(`${pop_tag}便签没有封闭！！`)
            }

            // console.log('stack1', stack1)
            // console.log('stack2', JSON.parse(JSON.stringify(stack2)))
            // 指针移动标签的长度 + 3,为什么 +3,因为 </> 也占三个长度
            index += endTag.length + 3
        } else if (wordRegExp.test(tailStr)) {
            // 识别遍历到的这个字符，是不是文字，并且不能全是空字符
            const word = tailStr.match(wordRegExp)[1]
            if (!/^\s+$/.test(word)) {
                stack2[stack2.length - 1].children.push({
                    text: word,
                    type: '3'
                })
            }
            index += word.length
        } else {
            index++
        }
    }

    return result
}