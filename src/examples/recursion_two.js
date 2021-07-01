/*
 * @Date: 2021-07-01 09:44:21
 * @LastEditors: cunhang_wwei
 * @LastEditTime: 2021-07-01 19:40:07
 * @Description: 储备算法题二：递归
 */

// 将高维数组 [1, 2, [3, [4, 5], 6], 7, [8], 9] 转换为一下这个对象（老师在讲解过程中搞错了，以下这个是PPT一开始的图）
// {
//     children: [
//         { value: 1 },
//         { value: 2 },
//         {
//             children: [
//                 { value: 3 },
//                 {
//                     children: [
//                         { value: 4 },
//                         { value: 5 }
//                     ]
//                 },
//                 { value: 6 }
//             ]
//         },
//         { value: 7 },
//         {
//             children: [
//                 { value: 8 }
//             ]
//         },
//         { value: 9 }
//     ]
// }

// 写法一
function convert(arr) {
    let result = {}

    for (let index = 0; index < arr.length; index++) {
        const element = arr[index]
        if (typeof element === 'number') {
            if (!result.children) {
                result.children = []
            }
            result['children'].push({ value: element })
        } else if (Array.isArray(element)) {
            const val = convert(element)
            result['children'].push(val)
        }
    }

    return result
}

// 写法二
function convert2(item) {
    if (typeof item === 'number') {
        return { value: item }
    } else if (Array.isArray(item)) {
        return {
            children: item.map(each => convert2(each))
        }
    }
}

// 写法三 自己的写法
function convert3(arr) {
    return arr.reduce((prev, curr) => {
        if (typeof curr === 'number') {
            if (!prev.children) {
                prev.children = []
            }
            prev['children'].push({ value: curr })
        } else if (Array.isArray(curr)) {
            let res = convert3(curr)
            prev['children'].push(res)
        }
        return prev
    }, {})
}


// 测试用例
const array = [1, 2, [3, [4, 5], 6], 7, [8], 9]

const result = convert(array)
console.log('result', result)

const result2 = convert2(array)
console.log('result2', result2)

const result3 = convert3(array)
console.log('result3', result3)