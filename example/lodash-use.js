// const _ = require('lodash')

// const array = ['jack', 'tom', 'alice', 'obama']

// console.log(_.first(array))
// console.log(_.head(array))

// // console.log(array.reverse())
// console.log(_.reverse(array))

// function memoize(fn) { // 需要传递一个函数
//     // 根据相同的输入始终有相同的输出的概念，所以可以把函数fn参数作为对象的键，把函数的结果作为对象的值
//     let cache = {}
//     return function() {
//         let key = JSON.stringify(arguments)
//         cache[key] = cache[key] || fn.apply(fn, arguments)
//         return cache[key]
//     }
// }

// function getArea(r) {
//     console.log(r)
//     return Math.PI * r * r
// }

// const getAreaWithMemoize = memoize(getArea)
// console.log(getAreaWithMemoize(5))
// console.log(getAreaWithMemoize(5))
// console.log(getAreaWithMemoize(5))

// 科里化
// const checkAge = standard => age => age >= standard
// const adult = checkAge(18)
// console.log(adult(20))
// console.log(adult(17))

// // lodash中的curry函数
// function getSum(a, b, c) {
//     return a + b + c
// }
// const curried = _.curry(getSum)
// console.log(curried(1, 2, 3)); // print: 6
// console.log(curried(1)(2, 3));

// function myCurry(func) {
//     return function curried(...args) {
//         // 判断实参和形参个数
//         if (args.length < func.length) {
//             return function() {
//                 return curried(...args.concat(Array.from(arguments)))
//             }
//         }
//         return func(...args)
//     }
// }

// const getSumWithMycurry = myCurry(getSum)
// console.log(getSumWithMycurry(1, 2, 3))
// console.log(getSumWithMycurry(1)(2, 3))
// console.log(getSumWithMycurry(1, 2)(3))

// 函数组合
// function compose(f, g) {
//     return function(value) {
//         return f(g(value))
//     }
// }
// function reverse(array) {
//     return array.reverse()
// }
// function first(array) {
//     return array[0]
// }
// const last = compose(first, reverse)
// console.log(last([1, 3, 5, 7, 9]))


const msg = 'Hello World';

const replaceSpace = str => str.replace(/\s+/g, '_')

const upperToLower = str => str.toLowerCase()

// const result = _.flowRight(upperToLower, replaceSpace)

// console.log(result(msg))

// function compose(...args) {
//     return function(value) {
//         return args.reverse().reduce(function(result, fn) {
//             return fn(result)
//         }, value)
//     }
// }
// es6
const compose = (...args) => value => args.reverse().reduce((result, fn) => fn(result), value)

const lower = compose(upperToLower, replaceSpace)
console.log(lower(msg))
