/*
 * @Date: 2021-07-03 16:19:14
 * @LastEditors: cunhang_wwei
 * @LastEditTime: 2021-07-03 16:54:27
 * @Description: 解析attribute属性
 */

export default function (attrsString) {
    let result = []
    if (!attrsString) {
        return result
    } else {
        console.log('attrsString', attrsString)
        // 案例 class="box" title="标题" data-type="3"
        let isMatchQuot = false // 是否遇到引号
        // 改变了一下写法，采用双指针来记录 "" 之间走过的字符串
        let i = 0
        let j = 0

        while (j < attrsString.length) {
            // 当前指针指向的这一项
            const char = attrsString.charAt(j)
            if (char === '"') {
                // 匹配 " 字符
                isMatchQuot = !isMatchQuot
            } else if (!isMatchQuot && char === ' ') {
                // 没匹配到 " 字符，而且当前项是空格

                // 尝试拿到 i 和 j 指针之间的目标字符串
                const target = attrsString.substring(i, j).trim()
                
                if (target) {
                    result.push(target)
                }
                
                // 让指针i 追上 指针j
                i = j
            }
            j++
        }

        // filter过滤空字符 
        return result.filter(item => item).map(item => {
            const res = item.match(/^(.+)="(.+)"$/)
            return {
                name: res[1],
                value: res[2]
            }
        })
    }
}