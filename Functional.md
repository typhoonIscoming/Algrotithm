- [高阶函数](#高阶函数(Higher-order-Function))
- [使用高阶函数的意义](#使用高阶函数的意义)
- [闭包(Closure)：函数和周围状态(此法环境)的引用捆绑在一起形成闭包](#闭包(Closure)：函数和周围状态(此法环境)的引用捆绑在一起形成闭包)
- [纯函数的好处](#纯函数的好处)
- [科里化](#科里化)
- [模拟科里化的实现](#模拟科里化的实现)
- [函数组合(compose)](#函数组合(compose))
- [组合函数原理模拟](#组合函数原理模拟)

# 函数式编程

- Functional Programming, FP(函数式编程), FP是编程范式之一
- 常听说的范式还有面向过程编程、面向对象编程

- 面向对象：把现实世界的实物抽象成程序世界中的类和对象，通过继承，封装，多态来演示事物的联系
- 函数式编程的思维方式：把现实世界的事物和事物之间的联系抽象到程序世界（对运算过程抽象）
   
   - 程序的本质：根据输入某种运算获得相应的输出，程序开发过程会涉及到很多输入输出的函数。
   - x -> f(联系，映射) -> y;  y = f(x)
   - 函数式编程中的函数不是指程序中的函数(方法)，而是数学中函数，即映射关系。y = sin(x)
   - 相同的输入得到相同的输出（纯函数）
   - 函数式编程用来描述数据(函数)之间的关系

```javascript
// 非函数式
let num1 = 1;
let num2 = 2;
let num3 = num1 + num2;
console.log(num3)

// 函数式
function add(n1, n2) {
    return n1 + n2
}
let sum = add(1, 2)
console.log(sum)
// 函数可以无数次的重用，抽取出来的函数式细粒度的函数，可以组合成更多用途的函数
```

# 函数是一等公民(First class Function)
- 函数可以存储在变量中
- 函数作为参数
- 函数作为返回值

在JS中，**函数就是一个普通对象**，我们可以把函数存储在变量/数组中，它还可以作为另一个函数的参数或返回值，甚至在运行时通过
new Function()来构造一个新函数
```javascript
// 把函数赋值给变量
let fn = function() {
    console.log(12345)
}
fn()
```

# 高阶函数(Higher-order Function)
- 可以把函数作为参数传给另一个函数
- 可以把函数作为另一个函数的返回值
```javascript
// forEach
function forEach(array, fn) {
    for(let i = 0; i < array.length; i++) {
        fn(array[i])
    }
}
// filter
function filter(array, fn) {
    let results = [];
    for(let i = 0; i < array.length; i++) {
        if (fn(array[i])) {
            results.push(array[i])
        }
    }
    return results
}
```
[高级函数例子](./src/high-order-function.js)

# 函数作为返回值
- 函数生成一个函数
```javascript
function makeFn() {
    let msg = 'hello function'
    return function() {
        console.log(msg)
    }
}
// const fn = makeFn()
// fn()
// makeFn()()
```
- once函数,对一个函数只执行一次(使用场景如：支付)
模拟lodash中的once <br>
```javascript
function once(fn) {
    let done = false;
    return function() {
        if (!done) {
            done = true
            return fn.apply(this, arguments); // 传arguments即是给fn传值
        }
    }
}
let pay = once(function(money) {
    console.log(`支付了￥${money}元`)
})
pay(5)
pay(5)
pay(5)
```
# 使用高阶函数的意义
- 抽象可以帮我们屏蔽细节，只需要关注于我们的目标
- 高阶函数是用来抽象通用问题

# 常用的高阶函数
- forEach、map、filter、every、some、find/findIndex、reduce、sort
```javascript
// every,判断数组中每个元素否满足条件
const every = (array, fn) => {
    let result = true
    for(let value of array) {
        result = fn(value)
        if (!result) break;
    }
    return result
}
```

## 闭包(Closure)：函数和周围状态(此法环境)的引用捆绑在一起形成闭包
可以在另一个作用域中调用一个函数的内部函数并访问到该函数作用域中的成员<br>
```javascript
// 函数作为返回值
function makeFn() {
    let msg = 'Hello function'
    return function() {
        console.log(msg)
    }
}
const fn = makeFn()
fn()
// 如果定义一个函数makeFn() { let msg = '...' },执行过程是，定义一个变量msg，赋值，执行完毕，成员变量被释放
// 如果返回了一个函数，并且在这个返回的函数中又访问了外部的成员，这就是一个闭包。fn()就引用了makeFn中返回的函数，当外部对内部有引用时，内部成员就不能被释放。
```
**闭包的本质：函数在执行的时候会放到执行栈上，当函数执行完毕后会从执行栈移出，但是堆上的作用域成员因为被外部引用不能释放，因此内部函数依然可以访问外部函数成员**<br>

# 纯函数的概念
- **相同的输入会得到相同的输出**，而且没有任何可观察的副作用
   
   - 纯函数就类似于数学中的函数（用来描述输入和输出之间的关系），y = f(x)

- lodash是一个纯函数的功能库，提供了对数字、数组、字符串、函数等一系列操作
- 数组的slice和splice就是纯函数和不纯函数
- slice返回数组中指定的部分，不改变原数组
- splice对数组进行操作返回该数组，会改变原数组

# 纯函数的好处
- 1、可缓存
   
   - 因为纯函数对相同的输入有相同的输出，所以可以把纯函数的结果缓存起来
lodash提供了一个记忆函数memoize<br>
```javascript
const _ = require('lodash')
function getArea(r) {
    console.log(r)
    return Math.PI * r * r
}
const getAreaWithMemoize = _.memoize(getArea)
console.log(getAreaWithMemoize(5)) // print -> 5  and result
console.log(getAreaWithMemoize(5)) // print result
console.log(getAreaWithMemoize(5)) // print result
// 只有第一次会打印5，第二、三次不会打印5，因为结果被缓存起来了，直接读缓存值
```
- 模拟memoize的实现
```javascript
function memoize(fn) { // 需要传递一个函数
    // 根据相同的输入始终有相同的输出的概念，所以可以把函数fn参数作为对象的键，把函数的结果作为对象的值
    let cache = {}
    return function() {
        let key = JSON.stringify(arguments)
        cache[key] = cache[key] || fn.apply(fn, arguments)
        return cache[key]
    }
}
```
- 2、可测试
   
   - 纯函数让测试更方便
- 3、并行处理
   
   - 在多线程环境下并行操作共享的内存数据可能会造成意外情况
   - 纯函数不需要访问共享的内存数据，所以在并行环境下可以任意运行纯函数(web worker)

# 副作用
如果函数依赖于外部状态就无法保证相同输出，就会带来副作用。<br>
- 副作用来源
   
   - 配置文件
   - 数据库
   - 获取用户的输入
   - ......
所有的外部交互都有可能代理副作用，副作用也使得函数通用性下降，不适合扩展和可重用性。同时副作用会给程序带来安全隐患和不确定性，但是副作用不可能完全禁止，尽可能控制他们在可控范围内发生。<br>

# 科里化
- 使用科里化解决硬编码的问题
**当一个函数有多个参数的时候，先传递一部分参数调用它(这部分的参数以后永远不会变)，然后返回一个新函数接收剩余参数，返回结果**<br>
```javascript
function checkAge(standard, age) {
    return age >= standard
}
// 科里化
function checkAge(standard) {
    return function(age) {
        return age >= standard
    }
}
// 科里化ES6写法
const checkAge = standard => age => age >= standard
const adult = checkAge(18)
console.log(adult(20))
```
## lodash中的科里化

- _.curry(func)
   
   - 功能：创建一个函数，该函数接收一个或多个func函数的参数，如果func的函数的参数都被提供则执行func并返回执行结果，否则继续返回该函数并等待接收剩余参数
   - 参数：需要科里化的函数
   - 返回值：科里化后的函数
```javascript
const _ = require('lodash')
function getSum(a, b, c) {
    return a + b + c
}
const curried = _.curry(getSum)
console.log(curried(1, 2, 3)); // print: 6
console.log(curried(1)(2, 3)); // print: 6
```

## 模拟科里化的实现
```javascript
function myCurry(func) {
    return function curried(...args) {
        // 判断实参和形参个数
        if (args.length < func.length) {
            return function() {
                return curried(...args.concat(Array.from(arguments)))
            }
        }
        return func(...args)
    }
}
```
## 总结：
- 科里化可以让我们给一个函数传递较少的参数得到一个记住了某些固定了参数的新函数
- 这是一种对函数参数的缓存
- 让函数更灵活，让函数颗粒度更小
- 可以把多元函数转换成一元函数，可以组合函数组成更强大功能

## 函数组合(compose)
- 可以让细粒度的函数组合成一个新的函数
- 管道：
----> a ----> Fn ----> b<br>
给函数Fn输入参数a，返回结果b<br>
当函数Fn比较复杂时，我么可以把函数Fn拆分成多个小函数，此时多了中间原酸过程的m和n<br>
--------------|---------------------Fn---------------|<br>
----> a ----> |---> F3 ---> m ---> F2 ---> n ---> F1 | ----> b<br>

Fn = compose(F1, F2, F3)<br>
b = Fn(a)<br>

- 如果一个函数要经过多个函数处理才能得到最终值，这个时候可以把中间过程的函数合并成一个函数
   
   - 函数就像数据管道，函数组合就是把这些管道组合起来，让数据经过多个管道形成最终结果
   - **函数组合默认是从右往左执行。**<br>
模拟函数组合:
```javascript
function compose(f, g) {
    return function(value) {
        return f(g(value))
    }
}
function reverse(array) {
    return array.reverse()
}
function first(array) {
    return array[0]
}
const last = compose(first, reverse)
console.log(last([1, 3, 5, 7, 9]))
```

## lodash中的函数组合
- lodash中的flow()和flowRight()，他们可以组合多个函数
- flow是从左到右，flowRight是从右到左(使用得更多)

## 组合函数原理模拟
```JavaScript
function compose(...args) {
    return function(value) {
        return args.reverse().reduce(function(result, fn) {
            return fn(result)
        }, value)
    }
}
```



























