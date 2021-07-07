# 学习笔记

## 快速开始

```bash
npm install
```

```bash
npm run serve
```

## 什么是 AST？

- AST 是 Abstract Syntax Tree 的首字母的缩写，中文名称为：抽象语法树
- 抽象语法树本质上就是一个 JS 对象，以字符串的视角，将 Html 标签 解析为 JS 对象
- 渲染函数（h 函数），既是 AST 的产物，也是 vnode 的起源

```JavaScript
h('div', { attrs: { className: 'box' } }, [
    h('ul', {}, [
        h('li', {}, '1'),
        h('li', {}, '2'),
        h('li', {}, '3')
    ])
])
```

## 抽象语法树和虚拟节点的关系

![抽象语法树和虚拟节点的关系.jpg](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2e6cc81a583e4cea9f9fbdcaa3601643~tplv-k3u1fbpfcp-watermark.image)

## 工作机理

```html
<div>
  <h3 class="box" title="标题" data-type="3">你好</h3>
  <ul>
    <li>A</li>
    <li>B</li>
    <li>C</li>
  </ul>
</div>
```

转换为以下 AST 树

```javaScript
{
    tag: "div",
    attrs: [],
    children: [
        {
            tag: "h3",
            attrs: [
                { name: "name", value: "box" },
                { name: "title", value: "标题" },
                { name: "data-type", value: "3" }
            ],
            children: [
                {
                    text: "你好",
                    type: "3"
                }
            ]
        },
        {
            tag: "ul",
            attrs: [],
            children: [
                { tag: 'li', children: [{ text: "A", type: "3" }], attrs: [] },
                { tag: 'li', children: [{ text: "B", type: "3" }], attrs: [] },
                { tag: 'li', children: [{ text: "C", type: "3" }], attrs: [] }
            ]
        }
}
```

## 必备的算法储备

### 递归

- 使用的场景技巧：规则复现
- 递归案例一

```javaScript
斐波那契数列，求前N项的和

1 1 2 3 5 8 13 21 34 55
```

- 递归案例二

```javaScript

将高维数组 [1, 2, [3, [4, 5], 6], 7, [8], 9] 转换为一下这个对象（老师在讲解过程中搞错了，以下这个是PPT一开始的图）
{
    children: [
        { value: 1 },
        { value: 2 },
        {
            children: [
                { value: 3 },
                {
                    children: [
                        { value: 4 },
                        { value: 5 }
                    ]
                },
                { value: 6 }
            ]
        },
        { value: 7 },
        {
            children: [
                { value: 8 }
            ]
        },
        { value: 9 }
    ]
}
```

### 栈

- 使用的场景技巧：词法分析、模板字符串
- 案例

```javaScript
// smartRepeat智能重复字符串问题
将 '3[abc]' 变为 'abcabcabc'
将 '3[2[a]2[b]]' 变成 'aabbaabbaabb'
将 '2[1[a]3[b]2[3[c]4[d]]]' 变成 'abbbcccddddcccddddabbbcccddddcccdddd'
```

解题思路：遍历每一个字符

- 创建两个栈
- 如果这个字符是数字，那么就把数字压入 **栈1**，把空字符串压入 **栈2**
- 如果这个字符是字母，那么此时就把 **栈2** 的栈顶这项改为这个字母
- 如果这个字符是 `]` ，那么就将数字从 **栈1** 弹栈，就把 **栈2** 的栈顶的元素重复 **栈1** 弹出数字的次数，**栈2** 弹栈，拼接到 **栈2** 的新的栈顶

## 项目结构

```txt
|-- study-ast
    |-- .gitignore
    |-- package-lock.json
    |-- package.json
    |-- readme.md
    |-- webpack.config.js
    |-- page
    |   |-- index.html
    |-- src
        |-- index.js // 入口
        |-- parse.js // 主干功能：将模板字符串转换为AST树形结构
        |-- parseAttribute.js // 解析html标签中的attributes属性
        |-- examples // 算法储备案例
            |-- max_count.js // 连续重复最多次的字符
            |-- recursion_one.js // 递归案例一：斐波那契数列
            |-- recursion_two.js // 递归案例二
            |-- stack.js // 栈，smartRepeat智能重复字符串问题
```

## 总结

- 在写主函数 `parse.js` 的时候，使用到算法就是栈，利用到了算法储备中栈的思路
- 栈的思维在对模板字符串进行解析的时候很有用，能对嵌套 HTML 进行快速的解析
