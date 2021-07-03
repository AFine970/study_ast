/*
 * @Date: 2021-06-30 16:17:10
 * @LastEditors: cunhang_wwei
 * @LastEditTime: 2021-07-03 17:09:36
 * @Description: 主入口
 */

import parse from './parse'

const templateString = `
<div>
    <h3 class="box" title="标题" data-type="3">你好</h3>
    <ul>
        <li>A</li>
        <li>B</li>
        <li>C</li>
    </ul>
</div>
`

const ast = parse(templateString)
console.log('AST', ast)