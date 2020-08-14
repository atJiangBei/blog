---
sidebar: auto
---

# 经典面试题之原生js

## if(a == 1;a == 2;a == 3)

**问：**

```javascript

var a = ?;

if(a == 1;a == 2;a == 3){
	console.log("您好")
}

```

**答：**

```javascript
//第一大类

//1
//原理：
// const a = {name:"小明"};
//a.valueOf();//{name:"小明"};
//a.toString();//"[object Object]"
//a.valueOf() == "[object Object]";//true,两个等号比较会隐式调用toString()方法
//a == "[object Object]";//true
//so

var a = {
	x:0,
	valueOf(){
		return ++this.x;
	}
}

if(a == 1 && a == 2 && a == 3){
	console.log("您好")
}

// 2
var a = {
	x:0,
	toString(){
		return ++this.x;
	}
}

if(a == 1 && a == 2 && a == 3){
	console.log("您好")
}

//3 
//[1,2,3].toString();//'1,2,3'
//[1].toString();//'1'

var a = [1,2,3];
a.toString = a.shift;
if(a == 1 && a == 2 && a == 3){
	console.log("您好")
}

// 第二大类
//数据劫持

//1

var i = 0;
Object.defineProperty(window,'a',{
	get(){
		return ++i
	}
})

if(a == 1 && a == 2 && a == 3){
	console.log("您好")
}


```


## 经典去重

```javascript
//1
const arr = [1,1,2,2,3,4,1];
let len = arr.length;
 
for(let i = 0; i < len; i++){
	for(let j = i + 1; j < len; j++){
		if(arr[i] === arr[j]){
			arr.splice(j,1);
			len--;
			j--;
		}
	}
}

arr;//[1,2,3,4]

//2
const arr = [1,1,2,1,2,3,4,1,2,3,4,5];
const newArr = [];
let len = arr.length;
 
    for(i = 0; i < len; i++){
        for(j = i + 1; j < len; j++){
            if(arr[i] === arr[j]){
				i++
            }
			console.log(1)
        }
        newArr.push(arr[i]);
    }

newArr;//[1,2,3,4,5]

//3
const arr = [1,2,3,4,4,5,3,4,2,2,3,4,2]
const newArr = []

arr.forEach(ele=>{
	if(newArr.indexOf(ele)<0){
		newArr.push(ele)
	}
})
newArr;//[1, 2, 3, 4, 5]


```

## 冒泡排序

```javascript
//1，利用Math.max或者Math.min实现
// 但是会改变原数组

function cb(newArr,arr,fn){
	if(!arr.length)return;
	const result = fn.apply(null,arr)
	arr.splice(arr.indexOf(result),1)
	newArr.push(result)
	cb(newArr,arr,fn)
}
从大到小排列
const arr = [1,2,3,7,6,5,8,4,8];
const newArr = [];
cb(newArr,arr,Math.max)
newArr;//[8, 8, 7, 6, 5, 4, 3, 2, 1]
arr;//[]
从小到大排列
const arr1 = [1,2,3,7,6,5,8,4,8];
const newArr1 = [];
cb(newArr1,arr1,Math.min)
newArr1;// [1, 2, 3, 4, 5, 6, 7, 8, 8]
arr1;//[]

//2相邻两项相比

const arr = [1,10,2,3,7,6,5,8,4,8,10];
for (let i=0;i<arr.length-1;i++) {
	for (let j=i+1;j<arr.length;j++) {
		if(arr[i]>arr[j]){
			let n = arr[i]
			arr[i] = arr[j]
			arr[j] = n
		}
	}
}
console.log(arr)

```

## 隐式转换和显式转换，并举例

**隐式转换**是一种将值转换为另一种类型的方法，这个过程是自动完成的，无需我们手动操作。

```javascript

console.log(2 + '3'); // 23//string
console.log(false + true); // 1
console.log(2 * '3'); // 6//number

```

**显式转换**是将值转换为另一种类型的方法

```javascript
Number('1');//1//number
String(1);//1//string
parseInt('2');//2//number
parseFloat('1.23');//1.23//number

```

## 如何判断一个值是不是NaN

```javascript

parseInt('a');//NaN
Number('a');//NaN

```

js提供了一个内置函数，但是...

```javascript
isNaN(NaN);//true
isNaN({});//true
isNaN(()=>{});//true
isNaN(undefined);//true
isNaN();//true

```

因此，es6中，建议用Number.isNaN方法

```javascript
Number.isNaN(NaN);//true
Number.isNaN({});//false
Number.isNaN(()=>{});//false
Number.isNaN(undefined);//false
Number.isNaN();//false

```

或者我们可以

```javascript

function checkNaN(val){
	return val!==val
}

```

## Ajax

老生常谈，不再说明，下方代码显而易见

```javascript

const xhr = new xhr();
/*
xhr.readyState
0: 请求未初始化
1: 服务器连接已建立
2: 请求已接收
3: 请求处理中
4: 请求已完成，且响应已就绪

xhr.status
200: "OK"
404: 未找到页面
*/

xhr.onreadystatechange = function() { //当准备情况改变时触发事件
	if (xhr.readyState == 4 ) { //当准备情况为完成状态时
		if (xhr.status == 200) {//当返回的状态码为200（成功返回了数据）
			console.log(xhr.responseText)
		}
	}
}
xhr.onloadstart = function() {
	console.log('请求开始')
}
xhr.onerror = function() {
	console.log('请求出错')
}
xhr.onload = function() {
	console.log('请求完成')
}
xhr.onloadend = function() {
	//无论请求出错还是完成,只要结束,就触发此事件
	console.log('请求结束')
	console.log(xhr)
}

xhr.onprogress = function(event) {//接收期间数据持续不断出发
//event.loaded=>已上传数据；//event.total=>数据总量；
}

xhr.onabort = function() {
	console.log('请求被中断')
}
xhr.ontimeout = function(){
	console.log('请求超时')
}


//method=>GET,POST
//url=>地址
//async 是否异步 true false 默认为true
//xhr.open(method, url, async)
xhr.open('GET', 'http://www.baidu.com', true)


//发送数据
//xhr.send(data)
xhr.send({});

//参数设置
xhr.timeout = 10000;//超过此毫秒数,自动终止请求

withCredentials = false;//默认false,是否Access-Control应使用cookie或授权标头之类的凭据发出跨站点请求。

//方法
xhr.abort()//如果请求已发送，则中止该请求。
xhr.getAllResponseHeaders()//以字符串形式返回所有响应头，以CRLF分隔，或者null如果未接收到响应，则返回所有响应头。

xhr.getResponseHeader()//返回包含指定标题的文本的字符串，或者返回null尚未接收到的响应或响应中不存在标题的字符串
xhr.open()//初始化请求。

xhr.overrideMimeType()//覆盖服务器返回的MIME类型。

xhr.send()//发送请求。如果请求是异步的（默认设置），则此方法在发送请求后立即返回。

xhr.setRequestHeader()//设置HTTP请求标头的值。您必须setRequestHeader()在之后open()但在之后致电send()。


//参数返回
xhr.readyState 
//只读 返回unsigned short，请求状态。
xhr.response
//只读 返回ArrayBuffer，Blob，Document，JavaScript对象，或一个DOMString，这取决于的值xhr.responseType，即包含响应实体主体。
xhr.responseText
//只读 返回一个DOMString包含对请求的响应的文本形式的，或者null请求未成功发送或尚未发送。
xhr.responseType
//只读 是定义响应类型的枚举值。
xhr.responseURL
//只读 返回响应的序列化URL，如果URL为null，则返回空字符串。
xhr.responseXML
//只读 返回一个Document包含对请求的响应的，或者null如果请求不成功，尚未发送或无法将其解析为XML或HTML，则返回。在工人中不可用。
xhr.status
//只读 返回unsigned short带有请求响应状态的。
xhr.statusText
//只读 返回一个DOMString包含HTTP服务器返回的响应字符串的。与不同xhr.status，它包括响应消息的整个文本（200 OK例如“ ”）。



```

## Object.seal 和 Object.freeze 方法之间有什么区别


**方法的相同点：**

* ES5新增。
* 对象不可能扩展，也就是不能再添加新的属性或者方法。
* 对象已有属性不允许被删除。
* 对象属性特性不可以重新配置。

**方法不同点：**

* Object.seal方法生成的密封对象，如果属性是可写的，那么可以修改属性值。
* Object.freeze方法生成的冻结对象，属性都是不可写的，也就是属性值无法更改。


## 函数表达式和函数声明

```javascript

b();//我会被提示
a();//error不是个函数

var a = function(){
	console.log('我不会提升')
}
var b = function(){
	console.log('我会被提示')
}

```

很明显，在当前作用域，函数表达式不会提升，而函数声明会


## 函数不同的调用方式内部的this指向

```javascript

var a = 'a'
var obj = {
	a:'aa',
	alert(){
		console.log(this.a)
	}
}

obj.alert();//aa

const alert = obj.alert;
alert();//a
(0,obj.alert)()

```


## 聊一下箭头函数

* 1，箭头函数无法提升
* 2，箭头函数的this取决于外部
* 3，箭头函数没有arguments
* 4，箭头函数无法作为构造函数（因为本身没有构造函数）


## e.target和e.currentTarget

**e.target**

发生事件的当前元素

**e.currentTarget**

绑定事件的当前元素

```html

<ul id="ul">
	<li>
		<button>1</button>
	</li>
	<li>
		<button>2</button>
	</li>
</ul>

```

```javascript

const ul = document.getElementById('ul')
ul.onclick = function(e){
	console.log(e.target,e.currentTarget)
}

```

**说明：**   
以上，没有样式，当鼠标单击在button上时候，输出 button和ul,由于li是块元素，当点击li时候，输出 li和ul


## 'use strict'

"use strict" 是 ES5 特性，它使我们的代码在函数或整个脚本中处于严格模式。

* 1，变量必须声明后再使用
* 2，函数的参数不能有同名属性，否则报错
* 3，不能使用with语句
* 4，不能对只读属性赋值，否则报错
* 5，不能使用前缀 0 表示八进制数，否则报错
* 6，不能删除不可删除的属性，否则报错
* 7，不能删除变量delete prop，会报错，只能删除属性delete global[prop]
* 8，eval不能在它的外层作用域引入变量
* 9，eval和arguments不能被重新赋值
* 10，arguments不会自动反映函数参数的变化
* 11，不能使用arguments.callee
* 12，不能使用arguments.caller
* 13，禁止this指向全局对象
* 14，不能使用fn.caller和fn.arguments获取函数调用的堆栈
* 15，增加了保留字（比如protected、static和interface）

**好处：**

* 1，消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为;
* 2，消除代码运行的一些不安全之处，保证代码运行的安全；
* 3，提高编译器效率，增加运行速度；
* 4，为未来新版本的Javascript做好铺垫。


## 如何的中断ajax和axios和fetch的请求

**假设我们的后端代码如下**

```js

router.get('/signin', async (ctx, next) => {
	//5秒后返回结果
	await awaitfn(5000)
	ctx.body = {
		title: 'koa2 json'
	}
})


```



### ajax


```js

const xhr = new XMLHttpRequest();

xhr.open('GET', 'http://127.0.0.1:3000/signin');

xhr.onreadystatechange = function() {
  if (xhr.status === 200 && xhr.readyState === 4) {
    console.log(xhr.response);
  }
};

xhr.onabort = function() {
  console.log('请求被中断');
};

setTimeout(() => {
  xhr.abort();
}, 1000);

xhr.send();

//请求被中断

```


### fetch

先介绍一个新的api，[AbortController](https://developer.mozilla.org/zh-CN/docs/Web/API/FetchController/AbortController)

```js

const url = 'http://127.0.0.1:3000/signin';

var controller = new AbortController();
var signal = controller.signal;

fetch(url, { signal })
  .then(function(response) {
    console.log(response);
  })
  .catch(function(e) {
    console.error(e);
    //2秒后输出,用户中止了一个请求
    //DOMException: The user aborted a request.
  });

setTimeout(() => {
  controller.abort();
}, 2000);



```



### axios

[中文官方文档](http://www.axios-js.com/zh-cn/docs/#取消)


```js
import axios from 'axios'

const url = 'http://127.0.0.1:3000/signin';

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

axios
  .get(url, {
    cancelToken: source.token,
  })
  .catch(function(thrown) {
    if (axios.isCancel(thrown)) {
      console.error('Request canceled', thrown.message);
    } else {
      // 处理错误
    }
  });

// 取消请求（message 参数是可选的）
setTimeout(() => {
  source.cancel('Operation canceled by the user.');
}, 1000);

```


## 虚拟dom的优点

## 事件委托的优缺点

**优点**
* 1.减少事件绑定，节省内存  
* 2.新增子对象而无需再次绑定，尤其适合动态节点


**缺点**  
* 1.部分事件focus、blur等无冒泡机制，所以无法委托  
* 2.存在对子元素的查找过程，委托层级过深，可能会有性能问题


## 懒加载和预加载

**懒加载**

* 1.访问一个页面时，当图片进入视口区域再进行夹在

**预加载**

* 1.预先把图文等文件资源加载完成，当用户访问时可以直接从内存中取

## 浏览器的同源策略

## 如何解决跨域

### jsonp

利用script标签可以跨域的特性以传递函数名的形式通过后端去触发函数而拿到数据

**具体实现**
```js
//node.js代码

//前端js代码


```


### nginx代理

### cors

## setTimeout误差

## 闭包

## 对象的私有属性，如何模拟

## 重绘（Repaint）和回流（Reflow）

## 首屏渲染性能优化

## 手写一个继承

## let、var、const区别

* var有变量提升的特性，且可以多次声明
* let无法变量提升，且同一个作用域下无法多次声明
* const声明的变量指针无法再次更改




## html 语义化的理解

##  [1, 2, 3].map(parseInt) 
##  实现sleep函数
##  defer和async区别
##  import 和 link 区别
##  说说你对 BFC 的理解
##  清除浮动的方法
##  实现一个私有变量
##  Vue 和 React 区别
##   Babel 原理
##   async、await 的优缺点
##   setter(obj, 'a.b.c' ,val)