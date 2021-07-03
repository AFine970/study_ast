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
- 抽象语法树本质上就是一个 JS 对象，将 DOM 标签以字符串的视角，解析为 JS 对象
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

## 需要的算法储备

- 递归
  - 使用的场景技巧：规则复现
- 栈
  - 使用的场景技巧：词法分析、模板字符串

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
        |-- index.js
        |-- parse.js
        |-- examples // 算法储备案例
            |-- max_count.js // 连续重复最多次的字符
            |-- recursion_one.js // 递归案例一：斐波那契数列
            |-- recursion_two.js // 递归案例二
            |-- stack.js // 栈，smartRepeat智能重复字符串问题
```
