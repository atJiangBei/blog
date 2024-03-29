## if(a == 1;a == 2;a == 3)

**问：**

```javascript

var a = ?;

if(a == 1;a == 2;a == 3){
	console.log("您好")
}

```

**JavaScript 中对象到字符串经历了如下这些步骤**

- 如果对象具有 valueOf()方法，则调用这个方法。如果它返回一个原始值，JavaScript 将这个值转换为字符串（如果本身不是字符串的话），并返回这个字符串结果。
- 如果对象没有 valueOf()方法，或者这个方法并不返回一个原始值，那么 JavaScript 会调用 toString()方法。如果存在这个方法，则 JavaScript 调用它。如果返回值是原始值，JavaScript 将这个值转化为字符串（如果本身不是字符串的话），并返回这个字符串结果。
- 否则 JavaScript 无法从 valueOf()或 toString()获得一个原始值。因此，这时它将抛出一个类型错误异常。

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
  x: 0,
  valueOf() {
    return ++this.x;
  },
};

if (a == 1 && a == 2 && a == 3) {
  console.log('您好');
}

// 2
var a = {
  x: 0,
  toString() {
    return ++this.x;
  },
};

if (a == 1 && a == 2 && a == 3) {
  console.log('您好');
}

//3
//[1,2,3].toString();//'1,2,3'
//[1].toString();//'1'

var a = [1, 2, 3];
a.toString = a.shift;
if (a == 1 && a == 2 && a == 3) {
  console.log('您好');
}

// 第二大类
//数据劫持

//1

var i = 0;
Object.defineProperty(window, 'a', {
  get() {
    return ++i;
  },
});

if (a == 1 && a == 2 && a == 3) {
  console.log('您好');
}
```

## 数据处理问题

```javascript
const data = [
  {
    id: 1,
    label: '1',
    children: [
      {
        id: 2,
        label: '2',
        children: [
          { id: 4, label: '4' },
          { id: 5, label: '5' },
        ],
      },
      {
        id: 3,
        label: '3',
        children: [
          { id: 6, label: '6' },
          { id: 7, label: '7' },
        ],
      },
    ],
  },
  {
    id: 11,
    label: '11',
    children: [
      {
        id: 21,
        label: '21',
        children: [
          { id: 41, label: '41' },
          { id: 51, label: '51' },
        ],
      },
      {
        id: 31,
        label: '31',
        children: [
          { id: 61, label: '61' },
          { id: 71, label: '71' },
        ],
      },
    ],
  },
];
//把上面数据处理为
//
//[
//	{
//		ids:[1,2,4],
//		labels:['1','2','4']
//	},
//	{
//		ids:[1,2,5],
//		labels:['1','2','5']
//	},
//	{
//		ids:[1,3,6],
//		labels:['1','3','6']
//	},
//	{
//		ids:[1,3,7],
//		labels:['1','3','7']
//	},
//	.....
//	....格式如上
//]
//

//方法一，创建新数组，从上到下合并，并把新值从上到下合并

const transform = (arr) => {
  const newArr = [];
  const cb = (obj, ids = [], labels = []) => {
    if (obj.children) {
      const children = obj.children;
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        cb(child, [...ids, obj.id], [...labels, obj.label]);
      }
    } else {
      newArr.push({
        ids: [...ids, obj.id],
        labels: [...labels, obj.label],
      });
    }
  };
  for (let i = 0; i < arr.length; i++) {
    const obj = arr[i];
    cb(obj);
  }
  return newArr;
};
console.log(transform(data));

//方法二，把父数据依次向子数据内部合并
const transform = (arr) => {
  //深拷贝原数据避免改变原数据
  arr = JSON.parse(JSON.stringify(arr));
  let newArr = [];
  const cb = (obj) => {
    const children = obj.children;
    if (children) {
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        let ids = Array.isArray(obj.id) ? obj.id : [obj.id];
        let labels = Array.isArray(obj.label) ? obj.label : [obj.label];
        ids = ids.concat(child.id);
        labels = labels.concat(child.label);
        child.id = ids;
        child.label = labels;
        cb(child);
      }
    } else {
      newArr.push(obj);
    }
  };
  for (let i = 0; i < arr.length; i++) {
    const obj = arr[i];
    cb(obj);
  }
  return newArr;
};
```

## 经典去重

```javascript
//1
const arr = [1, 1, 2, 2, 3, 4, 1];
let len = arr.length;

for (let i = 0; i < len; i++) {
  for (let j = i + 1; j < len; j++) {
    if (arr[i] === arr[j]) {
      arr.splice(j, 1);
      len--;
      j--;
    }
  }
}

arr; //[1,2,3,4]

//2
const arr = [1, 1, 2, 1, 2, 3, 4, 1, 2, 3, 4, 5];
const newArr = [];
let len = arr.length;

for (i = 0; i < len; i++) {
  for (j = i + 1; j < len; j++) {
    if (arr[i] === arr[j]) {
      i++;
    }
    console.log(1);
  }
  newArr.push(arr[i]);
}

newArr; //[1,2,3,4,5]

//3
const arr = [1, 2, 3, 4, 4, 5, 3, 4, 2, 2, 3, 4, 2];
const newArr = [];

arr.forEach((ele) => {
  if (newArr.indexOf(ele) < 0) {
    newArr.push(ele);
  }
});
newArr; //[1, 2, 3, 4, 5]
```

## 冒泡排序

```javascript
//1，利用Math.max或者Math.min实现
// 但是会改变原数组

function cb(newArr, arr, fn) {
  if (!arr.length) return;
  const result = fn.apply(null, arr);
  arr.splice(arr.indexOf(result), 1);
  newArr.push(result);
  cb(newArr, arr, fn);
}
从大到小排列;
const arr = [1, 2, 3, 7, 6, 5, 8, 4, 8];
const newArr = [];
cb(newArr, arr, Math.max);
newArr; //[8, 8, 7, 6, 5, 4, 3, 2, 1]
arr; //[]
从小到大排列;
const arr1 = [1, 2, 3, 7, 6, 5, 8, 4, 8];
const newArr1 = [];
cb(newArr1, arr1, Math.min);
newArr1; // [1, 2, 3, 4, 5, 6, 7, 8, 8]
arr1; //[]

//2相邻两项相比

const arr = [1, 10, 2, 3, 7, 6, 5, 8, 4, 8, 10];
for (let i = 0; i < arr.length - 1; i++) {
  for (let j = i + 1; j < arr.length; j++) {
    if (arr[i] > arr[j]) {
      let n = arr[i];
      arr[i] = arr[j];
      arr[j] = n;
    }
  }
}
console.log(arr);
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
Number('1'); //1//number
String(1); //1//string
parseInt('2'); //2//number
parseFloat('1.23'); //1.23//number
```

## 如何判断一个值是不是 NaN

```javascript
parseInt('a'); //NaN
Number('a'); //NaN
```

js 提供了一个内置函数，但是...

```javascript
isNaN(NaN); //true
isNaN({}); //true
isNaN(() => {}); //true
isNaN(undefined); //true
isNaN(); //true
```

因此，es6 中，建议用 Number.isNaN 方法

```javascript
Number.isNaN(NaN); //true
Number.isNaN({}); //false
Number.isNaN(() => {}); //false
Number.isNaN(undefined); //false
Number.isNaN(); //false
```

或者我们可以

```javascript
function checkNaN(val) {
  return val !== val;
}
```

## 串行输出问题

**原文称：一道价值 25k 的蚂蚁金服异步串行面试题**

题目

```js
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const subFlow = createFlow([() => delay(1000).then(() => log('c'))]);

createFlow([
  () => log('a'),
  () => log('b'),
  subFlow,
  [() => delay(1000).then(() => log('d')), () => log('e')],
]).run(() => {
  console.log('done');
});

// 需要按照 a,b,延迟1秒,c,延迟1秒,d,e, done 的顺序打印
```

**解（我只放我自己的了，原文的解法我就不放了，我觉得我这个更好(自己的瓜最甜嘛 😀)）：**

```js
class CreateRecursion {
  constructor(arr) {
    this.arr = arr;
  }
  async run(fn) {
    const arr = this.arr;
    const loop = async (arr) => {
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] instanceof Function) {
          await arr[i]();
        }
        if (arr[i] instanceof Array) {
          await loop(arr[i]);
        }
        if (arr[i].arr) {
          await loop(arr[i].arr);
        }
      }
    };
    return loop(arr).then(fn);
  }
}
function createFlow(arr) {
  return new CreateRecursion(arr);
}

const subFlow = createFlow([
  () => delay(1000).then(() => log('c')),
  createFlow([
    () => delay(1000).then(() => log('f')),
    createFlow([() => delay(1000).then(() => log('g'))]),
  ]),
]);
const log = console.log;
createFlow([
  () => log('a'),
  () => log('b'),
  subFlow,
  [() => delay(1000).then(() => log('d')), () => log('e')],
]).run(() => {
  console.log('done');
});
```

## 前端处理并发

题目如下

```js
const asyncLimit = (arr,max,iteratorFn)=>{
	//
})
//假设最大并发为2，请求函数如下，请编写asyncLimit
const cs = (count = 0)=>{
	//createFetch
	return new Promise(res=>{
		setTimeout(res,count*1000)
	})
}
asyncLimit([1,2,3,4,5],2,cs).then(data=>{
		console.log(data)
	})
```

解：

```js
const asyncLimit = (arr, max, iteratorFn) => {
  let i = 0;
  const all = [];
  const queue = [];
  let start = Date.now();
  const step = () => {
    if (i === arr.length) {
      return Promise.resolve();
    }
    const p = Promise.resolve(iteratorFn(arr[i++]));
    queue.push(p);
    all.push(p);
    p.then(() => {
      queue.splice(queue.indexOf(p), 1);
    });

    if (queue.length < max) {
      return step();
    } else {
      return Promise.race(queue).then(step);
    }
  };
  return step().then(() => {
    return Promise.all(all);
  });
};
```

**(2)**

```javascript
//JS实现一个带并发限制的异步调度器Scheduler,
//保证同时运行的任务最多有两个。
//完善代码中Scheduler类,使得以下程序能正确输出：
//Scheduler内部可以写其他的方法

class Scheduler {
  constructor() {
    this.list = [];
    this.arr = [];
  }
  async add(promiseCreator, time) {
    if (this.list.length > 1) {
      await new Promise((resolve) => this.arr.push(resolve));
    }
    const pro = promiseCreator().then(() => {
      this.list.splice(this.list.indexOf(pro), 1);
      if (this.arr.length) {
        this.arr.shift()();
      }
    });
    this.list.push(pro);
    return pro;
  } // ...
}

const timeout = (time) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });

const scheduler = new Scheduler();
const addTask = (time, order) => {
  scheduler.add(() => timeout(time), time).then(() => console.log(order));
};
// addTask(1000, '1')
// addTask(500, '2')
// addTask(300, '3')
// addTask(400, '4')
// output: 2 3 1 4

// 一开始,1、2两个任务进入队列
// 500ms时,2完成,输出2,任务3进队
// 800ms时,3完成,输出3,任务4进队
// 1000ms时,1完成,输出1
// 1200ms时,4完成,输出4
```

## 对象解析

例：

```javascript
const oldObj = {
  a: {
    b: 1,
  },
  c: 2,
};
function parsingObjects(obj) {}
const newObj = parsingObjects(oldObj);
//newObj=>   {"a.b":1,c:2}
const oldObj2 = {
  a: {
    b: 1,
  },
  c: [1, 2, { d: 3, e: 4 }],
};
const newObj2 = parsingObjects(oldObj2);
/*newObj2=>   
{
	'a.b': 1
	'c[0]': 1
	'c[1]': 2
	'c[2]'.d: 3
	'c[2]'.e: 4
}
*/
```

**答：**

```javascript
const isArray = (arr) => {
  return Array.isArray(arr);
};
const isObj = (obj) => {
  return Object.prototype.toString.call(obj) === '[object Object]';
};
const parsingObjects = (obj) => {
  var nbj = {};
  const setVal = (str, it) => {
    if (typeof it !== 'object') {
      nbj[str] = it;
    } else {
      fn(str, it);
    }
  };
  const forArray = (key, arr) => {
    arr.forEach((it, index) => {
      var str = key ? key + ('[' + index + ']') : '[' + index + ']';
      setVal(str, it);
    });
  };
  const forObj = (key, obj) => {
    for (let i in obj) {
      const str = key ? key + '.' + i : i;
      setVal(str, obj[i]);
    }
  };
  const fn = (key = '', item) => {
    if (isObj(item)) {
      forObj(key, item);
    }
    if (isArray(item)) {
      forArray(key, item);
    }
  };
  fn('', obj);
  return nbj;
};
var obj = {
  a: {
    b: {
      c: {
        d: 1,
        h: 2,
      },
    },
  },
  hehe: {
    a: [1, 2],
    e: {
      a: 2,
      f: [1, 2, 3, { g: 4 }],
    },
  },
};
/* 
转换后
{
	a.b.c.d: 1
	a.b.c.h: 2
	hehe.a[0]: 1
	hehe.a[1]: 2
	hehe.e.a: 2
	hehe.e.f[0]: 1
	hehe.e.f[1]: 2
	hehe.e.f[2]: 3
	hehe.e.f[3].g: 4
}
 
 */
```

## Generator 输出问题

使用 Generator 函数依次输出多维数组内的数据

```javascript
const arr = [0, [1, 2, [3, 4], 5], 6];
//0,1,2,3,4,5,6
const forFn = function* (arr) {
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      yield forFn(arr[i]);
    } else {
      yield arr[i];
    }
  }
};
const co = (results) => {
  var result = results.next();
  var done = result.done;
  var value = result.value;
  while (!done) {
    if ({}.toString.call(value) === '[object Generator]') {
      co(value);
    } else {
      console.log(value);
    }
    result = results.next();
    done = result.done;
    value = result.value;
  }
};
co(forFn(arr));
//方法二https://es6.ruanyifeng.com/#docs/generator
var arr = [1, [[2, 3], 4], [5, 6]];

var flat = function* (a) {
  var length = a.length;
  for (var i = 0; i < length; i++) {
    var item = a[i];
    if (typeof item !== 'number') {
      yield* flat(item);
    } else {
      yield item;
    }
  }
};

for (var f of flat(arr)) {
  console.log(f);
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

xhr.onreadystatechange = function () {
  //当准备情况改变时触发事件
  if (xhr.readyState == 4) {
    //当准备情况为完成状态时
    if (xhr.status == 200) {
      //当返回的状态码为200（成功返回了数据）
      console.log(xhr.responseText);
    }
  }
};
xhr.onloadstart = function () {
  console.log('请求开始');
};
xhr.onerror = function () {
  console.log('请求出错');
};
xhr.onload = function () {
  console.log('请求完成');
};
xhr.onloadend = function () {
  //无论请求出错还是完成,只要结束,就触发此事件
  console.log('请求结束');
  console.log(xhr);
};

xhr.onprogress = function (event) {
  //接收期间数据持续不断出发
  //event.loaded=>已上传数据；//event.total=>数据总量；
};

xhr.onabort = function () {
  console.log('请求被中断');
};
xhr.ontimeout = function () {
  console.log('请求超时');
};

//method=>GET,POST
//url=>地址
//async 是否异步 true false 默认为true
//xhr.open(method, url, async)
xhr.open('GET', 'http://www.baidu.com', true);

//发送数据
//xhr.send(data)
xhr.send({});

//参数设置
xhr.timeout = 10000; //超过此毫秒数,自动终止请求

withCredentials = false; //默认false,是否Access-Control应使用cookie或授权标头之类的凭据发出跨站点请求。

//方法
xhr.abort(); //如果请求已发送，则中止该请求。
xhr.getAllResponseHeaders(); //以字符串形式返回所有响应头，以CRLF分隔，或者null如果未接收到响应，则返回所有响应头。

xhr.getResponseHeader(); //返回包含指定标题的文本的字符串，或者返回null尚未接收到的响应或响应中不存在标题的字符串
xhr.open(); //初始化请求。

xhr.overrideMimeType(); //覆盖服务器返回的MIME类型。

xhr.send(); //发送请求。如果请求是异步的（默认设置），则此方法在发送请求后立即返回。

xhr.setRequestHeader(); //设置HTTP请求标头的值。您必须setRequestHeader()在之后open()但在之后致电send()。

//参数返回
xhr.readyState;
//只读 返回unsigned short，请求状态。
xhr.response;
//只读 返回ArrayBuffer，Blob，Document，JavaScript对象，或一个DOMString，这取决于的值xhr.responseType，即包含响应实体主体。
xhr.responseText;
//只读 返回一个DOMString包含对请求的响应的文本形式的，或者null请求未成功发送或尚未发送。
xhr.responseType;
//只读 是定义响应类型的枚举值。
xhr.responseURL;
//只读 返回响应的序列化URL，如果URL为null，则返回空字符串。
xhr.responseXML;
//只读 返回一个Document包含对请求的响应的，或者null如果请求不成功，尚未发送或无法将其解析为XML或HTML，则返回。在工人中不可用。
xhr.status;
//只读 返回unsigned short带有请求响应状态的。
xhr.statusText;
//只读 返回一个DOMString包含HTTP服务器返回的响应字符串的。与不同xhr.status，它包括响应消息的整个文本（200 OK例如“ ”）。
```

## Object.seal 和 Object.freeze 方法之间有什么区别

**方法的相同点：**

- ES5 新增。
- 对象不可能扩展，也就是不能再添加新的属性或者方法。
- 对象已有属性不允许被删除。
- 对象属性特性不可以重新配置。

**方法不同点：**

- Object.seal 方法生成的密封对象，如果属性是可写的，那么可以修改属性值。
- Object.freeze 方法生成的冻结对象，属性都是不可写的，也就是属性值无法更改。

## 函数表达式和函数声明

```javascript
b(); //我会被提示
a(); //error不是个函数

var a = function () {
  console.log('我不会提升');
};
var b = function () {
  console.log('我会被提示');
};
```

很明显，在当前作用域，函数表达式不会提升，而函数声明会

## 函数不同的调用方式内部的 this 指向

```javascript
var a = 'a';
var obj = {
  a: 'aa',
  alert() {
    console.log(this.a);
  },
};

obj.alert(); //aa

const alert = obj.alert;
alert(); //a
(0, obj.alert)();
```

## 聊一下箭头函数

- 1，箭头函数无法提升
- 2，箭头函数的 this 取决于外部
- 3，箭头函数没有 arguments
- 4，箭头函数无法作为构造函数（因为本身没有构造函数）

## e.target 和 e.currentTarget

Event 接口的只读属性 currentTarget 表示的，标识是当事件沿着 DOM 触发时事件的当前目标。它总是指向事件绑定的元素，而 Event.target 则是事件触发的元素。

- **e.target:发生事件的当前元素**
- **e.currentTarget:绑定事件的当前元素**

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
const ul = document.getElementById('ul');
ul.onclick = function (e) {
  console.log(e.target, e.currentTarget);
};
```

**说明：**  
以上，当鼠标单击在 button 上时候，输出 button 和 ul,由于 li 是块元素，当点击 li 时候，输出 li 和 ul

::: details
备注： event.currentTarget 的值只能在事件处理过程中被使用。如果你尝试用 console.log() 在控制台打印 event 对象，你会发现 currentTarget 的值是 null。如果你想在控制台打印 currentTarget 的值，你应该使用 console.log(event.currentTarget)，或者也可以在代码中使用 debugger 语句来暂停代码的执行从而看到 event.currentTarget 的值。
:::

## 'use strict'

"use strict" 是 ES5 特性，它使我们的代码在函数或整个脚本中处于严格模式。

- 1，变量必须声明后再使用
- 2，函数的参数不能有同名属性，否则报错
- 3，不能使用 with 语句
- 4，不能对只读属性赋值，否则报错
- 5，不能使用前缀 0 表示八进制数，否则报错
- 6，不能删除不可删除的属性，否则报错
- 7，不能删除变量 delete prop，会报错，只能删除属性 delete global[prop]
- 8，eval 不能在它的外层作用域引入变量
- 9，eval 和 arguments 不能被重新赋值
- 10，arguments 不会自动反映函数参数的变化
- 11，不能使用 arguments.callee
- 12，不能使用 arguments.caller
- 13，禁止 this 指向全局对象
- 14，不能使用 fn.caller 和 fn.arguments 获取函数调用的堆栈
- 15，增加了保留字（比如 protected、static 和 interface）

**好处：**

- 1，消除 Javascript 语法的一些不合理、不严谨之处，减少一些怪异行为;
- 2，消除代码运行的一些不安全之处，保证代码运行的安全；
- 3，提高编译器效率，增加运行速度；
- 4，为未来新版本的 Javascript 做好铺垫。

## 如何的中断 ajax 和 axios 和 fetch 的请求

**假设我们的后端代码如下**

```js
router.get('/signin', async (ctx, next) => {
  //5秒后返回结果
  await awaitfn(5000);
  ctx.body = {
    title: 'koa2 json',
  };
});
```

### ajax

```js
const xhr = new XMLHttpRequest();

xhr.open('GET', 'http://127.0.0.1:3000/signin');

xhr.onreadystatechange = function () {
  if (xhr.status === 200 && xhr.readyState === 4) {
    console.log(xhr.response);
  }
};

xhr.onabort = function () {
  console.log('请求被中断');
};

setTimeout(() => {
  xhr.abort();
}, 1000);

xhr.send();

//请求被中断
```

### fetch

先介绍一个新的 api，[AbortController](https://developer.mozilla.org/zh-CN/docs/Web/API/FetchController/AbortController)

```js
const url = 'http://127.0.0.1:3000/signin';

var controller = new AbortController();
var signal = controller.signal;

fetch(url, { signal })
  .then(function (response) {
    console.log(response);
  })
  .catch(function (e) {
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
import axios from 'axios';

const url = 'http://127.0.0.1:3000/signin';

const CancelToken = axios.CancelToken;
const source = CancelToken.source();

axios
  .get(url, {
    cancelToken: source.token,
  })
  .catch(function (thrown) {
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

## 事件委托的优缺点

**优点**

- 1.减少事件绑定，节省内存
- 2.新增子对象而无需再次绑定，尤其适合动态节点

**缺点**

- 1.部分事件 focus、blur 等无冒泡机制，所以无法委托
- 2.存在对子元素的查找过程，委托层级过深，可能会有性能问题

## 懒加载和预加载

**懒加载**

- 1.访问一个页面时，当图片进入视口区域再进行夹在

**预加载**

- 1.预先把图文等文件资源加载完成，当用户访问时可以直接从内存中取

## 浏览器的同源策略

[MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/Security/Same-origin_policy)
**同源策略**是一个重要的安全策略，它用于限制一个 origin 的文档或者它加载的脚本如何能与另一个源的资源进行交互。它能帮助阻隔恶意文档，减少可能被攻击的媒介。
**同源的定义:** 如果两个 URL 的 协议、端口号 (如果有指定的话)和 域名 都相同的话，则这两个 URL 是同源。

## 如何解决跨域

### jsonp

利用 script 标签可以跨域的特性以传递函数名的形式通过后端去触发函数而拿到数据

**具体实现**

```js
//node.js代码
router.get('/responsecrossdomin', async (ctx, next) => {
  const cbName = ctx.query.callback;
  ctx.body = cbName + '(' + JSON.stringify({ title: 'hello word' }) + ')';
});
//前端js代码
var count = 0;
var cbFix = 'cb';
function jsonp(url, fn) {
  const sc = document.createElement('script');
  const name = cbFix + count;
  sc.src = url + '?callback=' + name;
  window[name] = function (data) {
    fn(data);
    sc.parentNode.removeChild(sc);
    delete window[name];
  };
  document.head.insertBefore(
    sc,
    document.head.getElementsByTagName('script')[0]
  );
  count++;
}
jsonp('http://127.0.0.1:3000/responsecrossdomin', function (data) {
  console.log(data);
});
jsonp('http://127.0.0.1:3000/responsecrossdomin', function (data) {
  console.log(data);
});
```

### cors

```js
//nodejs代码
const origins = [
  'http://127.0.0.1:7000', //当前前端origin
];
router.get('/signin', async (ctx, next) => {
  const origin = ctx.header.origin;
  console.log(origin);
  if (origins.includes(origin)) {
    ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    ctx.set('Access-Control-Allow-Origin', origin); //允许跨域
    ctx.set('Access-Control-Allow-Credentials', true);
  }
  ctx.body = {
    title: 'hello word',
  };
});
//前端代码
axios.get('http://127.0.0.1:3000/signin').then(function (data) {
  console.log(data);
});
```

### nginx 代理

```js
//nginx配置

http:{
	server {
	listen 80;
	location /IntimateAdmin/ {
		    proxy_pass   http://127.0.0.1:3000;
		    index  index.html index.htm;
		}
	}
}
//前端代码

axios.get('http://127.0.0.1:3000/IntimateAdmin/signin').then(function(data){
  console.log(data)
})

```

## 对象的私有属性，如何模拟

```js
//a即为该对象的私有属性
function createObj() {
  var a = 0;
  class Parent {
    constructor() {}
    setA(val) {
      a = val;
    }
    getA() {
      return a;
    }
  }
  return Parent;
}

const parent1 = new (createObj())();
parent1.setA(1);
console.log(parent1.getA());
const parent2 = new (createObj())();
console.log(parent2.getA());
```

## setter(obj, 'a.b.c' ,val)

```js
const setter = (obj, attributes, val) => {
  attributes = attributes.split('.');
  return attributes.reduce((currentObj, key, index) => {
    if (index === attributes.length - 1) {
      return (currentObj[key] = val);
    }
    return currentObj[key];
  }, obj);
};
```

## 手写一个继承

```js
function Parent(name, age) {
  this.name = name;
  this.age = age;
}
Parent.prototype.sayName = function () {
  alert(this.name);
};

//实现一个子类继承父类Parent
function Child() {
  //原型继承去继承属性
  Parent.apply(this, arguments);
}
//原型链方式去继承父类的方法
Object.setPrototypeOf(Child.prototype, Parent.prototype);
```

## let、var、const 区别

- var 有变量提升的特性，且可以多次声明
- let 无法变量提升，且同一个作用域下无法多次声明
- const 声明的变量指针无法再次更改

## html 语义化的理解

语义化的意思就是标签本身就包含了一些信息，比如当浏览器遇到 h1 时就会知道这个标签内部包含了这一块儿最重要的信息，遇到 nav 就知道这是个导航，遇到 header，就知道这是头部等等

#### 为什么要语义化

- 1.代码结构: 使页面没有 css 的情况下，也能够呈现出很好的内容结构
- 2.有利于 SEO: 爬虫依赖标签来确定关键字的权重，因此可以和搜索引擎建立良好的沟通，帮助爬虫抓取更多的有效信息
- 3.提升用户体验： 例如 title、alt 可以用于解释名称或者解释图片信息，以及 label 标签的灵活运用。
- 4.便于团队开发和维护: 语义化使得代码更具有可读性，让其他开发人员更加理解你的 html 结构，减少差异化。
- 5.方便其他设备解析: 如屏幕阅读器、盲人阅读器、移动设备等，以有意义的方式来渲染网页。

## [1, 2, 3].map(parseInt)

```js
[1, 2, 3].map(parseInt); // [1, NaN, NaN]
//解
[1, 2, 3].map(function (current, index) {
  return parseInt(current, index);
});
//即为
parseInt(1, 0); //1
parseInt(2, 1); //NaN
parseInt(3, 2); //NaN
```

**parseInt**

```js
//语法
parseInt(string, radix);
```

| 参数   | 描述                                                                                                                                                                                                           |
| ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| string | 必需。要被解析的字符串。                                                                                                                                                                                       |
| radix  | 可选。表示要解析的数字的基数。该值介于 2 ~ 36 之间。如果省略该参数或其值为 0，则数字将以 10 为基础来解析。如果它以 “0x” 或 “0X” 开头，将以 16 为基数。如果该参数小于 2 或者大于 36，则 parseInt() 将返回 NaN。 |

**因此**
parseInt(1,0) => parseInt(1,16) => 1  
parseInt(2,1) => parseInt(2,1) => NaN(无法解释)  
parseInt(3,2) => parseInt(3,2) => NaN(无法解释)

## 实现 sleep 函数

```js
//1.await

const sleep = (times = 0) => {
  return new Promise((resolve) => {
    setTimeout(resolve, times);
  });
};

//2.同步阻塞
const sleep = (times = 0) => {
  var startDate = Date.now();
  while (true) {
    if (Date.now() - startDate >= times) {
      return;
    }
  }
};
```

## defer 和 async 区别

- 1.当浏览器遇到 script 标签时，若此时没有 defer 和 async，那么会立即加载并执行
- 2.当浏览器遇到 script 标签时，若此时有 asunc，浏览器会立即下载脚本，但不影响页面中的其他操作，比如下载其它资源或加载其它脚本，加载和渲染后续文档元素的过程和 main.js 的加载与执行并行进行（异步）。async 并不保证按照脚本出现的顺序先后执行，因此，确保两者之前互不依赖非常重要，指定 async 属性的目的是不让页面等待两个脚本的下载和执行，从而异步加载页面其他内容，建议异步脚本不要在加载期间修改 DOM。异步脚本一定会在页面的 load 事件前执行，但可能会在 DOMContentLoaded 事件触发之前或之后执行。
- 3.当浏览器遇到 script 标签时，若此时有 defer，表示脚本会被延迟到文档完全解析和显示之后再执行，加载后续文档元素的过程将和 main.js 并行进行，HTML5 规范要求脚本按照出现的顺序先后执行，因此第一个延迟脚本会先于第二个延迟脚本执行，而这两个脚本会先于 DOMContentLoaded 事件。而在现实生活中，延迟脚本并不会按照顺序执行，也不一定会在 DOMContentLoaded 事件之前执行，因此最好只包含一个延迟脚本。

**总结：**

- 1.两者在下载这一块儿都是异步的相对于 html 解析
- 2.他们的差别在于下载之后何时执行，显然 defer 更符合我们的要求
- 3.对于 async 来说，无论你如何声明它的顺序，它们都是下载完立即执行的。

以上[参考链接](https://www.cnblogs.com/linxuehan/p/4180285.html)

## import 和 link 区别

- 1.link 引入的 css 在加载页面时同时加载，而@import 中的 css 要在页面加载完毕后加载
- 2.link 是 HTML 提供的标签，@import 是 css 的语法规则，只能加载在 style 标签内和 css 文件中，而且必须写在第一行
- 3.@import 是 css2.1 时提出的，只能用于 IE5+，而 link 不受兼容影响
- 4.link 支持 js 控制 DOM 改变样式，而@import 不支持

## async、await 的优缺点

**优点：**

- 1.异步回调的终结解决方案，大大提高了代码的可维护性
  **缺点**
- 1.不能当作构造函数使用
- 2.编译过后的代码臃肿丑陋
- 3.异常需要 try catch 捕获

## 闭包

[函数和对其周围状态（lexical environment，词法环境）的引用捆绑在一起构成闭包（closure）。也就是说，闭包可以让你从内部函数访问外部函数作用域。在 JavaScript 中，每当函数被创建，就会在函数生成时生成闭包。](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures)

我常常因为不能系统化的解释闭包的概念而对闭包产生困惑，但是我又是常常用到的，脑海中存在一些理解，但是现实中对于闭包的内存泄漏问题我却总是没有遇到过，因此我总是觉得没有真正的理解。[这一个回答我觉得是比较好的，有一种解惑的感觉](https://www.zhihu.com/question/31078912)

在旧版本 IE 中：当一个循环中同时包含 DOM 元素和常规 JavaScript 对象时，IE 无法释放任何一个对象——因为这两类对象是由不同的内存管理程序负责管理的。

```js
/* 当指定单击事件处理程序时，就创建了一个在其封闭的环境中包含button变量的闭包。
而且，现在的button也包含一个指向闭包（onclick属性自身）的引用。
这样，就导致了在IE中即使离开当前页面也不会释放这个循环。
为了释放内存，就需要断开循环引用，例如关闭窗口,删除onclick属性。*/
$(document).ready(function () {
  var button = document.getElementById('button-1');
  button.onclick = function () {
    console.log('hello');
    return false;
  };
});
```

**优点：避免使用全局变量，防止了全局变量污染。**

**缺点：造成内存泄漏（在 IE 中，属于浏览器 bug，已修复）（应用程序没有用到的内存由于某些原因没有被释放）**

**示例 1：内部函数可以访问其所在的外部函数内部声明的变量**

```js
for (var i = 0; i < 5; i++) {
  setTimeout(() => {
    console.log(i);
  }, 0);
}
//由于输出的时候取到的是全局的变量i，因此此时为5，一共输出五次
//改成闭包的方式每次创建新的作用域
for (var i = 0; i < 5; i++) {
  ((i) => {
    setTimeout(() => {
      console.log(i);
    }, 0);
  })(i);
}
```

**示例 2：创建局部作用域避免变量造成全局污染**
假如需求如下，有一个输入框，我们需要输入的过程中每隔一秒做一些事情

```js
//常规做法 ,需要全局变量
var startDate = 0;
var nextDate = 0;
document.querySelector('#text').oninput = function () {
  if (!startDate) {
    nextDate = startDate = Date.now();
  }
  nextDate = Date.now();
  if (nextDate - startDate >= 1000) {
    console.log(this.value);
    startDate = nextDate;
  }
};
//使用闭包

function con() {
  var startDate = 0;
  var nextDate = 0;
  return function () {
    if (!startDate) {
      nextDate = startDate = Date.now();
    }
    nextDate = Date.now();
    if (nextDate - startDate >= 1000) {
      console.log(this.value);
      startDate = nextDate;
    }
  };
}
document.querySelector('#text').oninput = con();
```

## 节流和防抖

### 函数节流的思想

- **背景：**有些时候我们并不希望在事件持续触发的过程中太过频繁地去执行函数从而损耗大量的性能
- **典型事件：**onresize,onscroll,oninput,onkeypress,onmosemove
- **防抖**和**节流**是比较好的解决办法

### 函数节流

**《JavaScript 高级程序设计》**在 614 页是这样介绍节流的，浏览器中某些计算和处理要比其他昂贵的多。连续尝试进行过多的 Dom 操作可能会导致浏览器挂起，甚至崩溃。为了绕开这个问题，我们可以使用定时器对该函数进行节流
函数节流背后的基本思想是指，某些代码不可以在没有间断的情况连续重复执行。第一次调用创建一个定时器，在指定的时间间隔之后运行代码。当第二次调用该函数时，它会清除前一次的定时器并设置另一个。如果前一个定时器已经执行过了，这个操作就没有意义。然而，如果前一个定时器尚未执行，其实就是将其替换为一个新的定时器。目的是只有在执行函数的请求停止了一段时间之后才执行。

```javascript
function throttle(method, context) {
  clearTimeout(method.tId);
  method.tId = setTimeout(function () {
    method.call(context);
  }, 100);
}
```

我们的项目里常常会遇到吸顶菜单的需求：在页面滑动超过某个距离时让菜单定位在顶部，小于这个距离时回归原来的位置
我们通常这样写：

```javascript
const root = document.getElementById('root');
function fixedDiv() {
  console.log(1);
  root.style.position = 'fixed';
  root.style.marginTop = '0';
}
function staticDiv() {
  console.log(2);
  root.style.position = 'static';
  root.style.marginTop = '500px';
}
window.onscroll = function () {
  if (this.scrollY > 500) {
    throttle(fixedDiv);
  } else {
    throttle(staticDiv);
  }
};
```

以上：我们可以看到控制台，输出了很多的 1，2，

- 接下来我们用上面提供的**函数节流**方法强化一下代码：

```javascript
window.onscroll = function () {
  if (this.scrollY > 500) {
    throttle(fixedDiv);
  } else {
    throttle(staticDiv);
  }
};
```

- 以上：throttle()函数接收两个参数，要执行的函数以及在哪个作用域中执行。函数内部首先清除之前设置的定时器，定时器 ID 是存储在函数的 tId 属性中。定时器代码使用 call()方法来确保方法在适当的环境中执行。
- 问题：当我们一直滑动的时候，即使页面滑动距离超过了 500，吸顶菜单也不会吸顶，只有滑动距离超过 500 并且停顿的时候才会触发我们想要的效果，这似乎并不是我们想要的，上面的节流方法并不是太适用我们这个场景。
- 思考：在这个场景下，我们要的效果应该是滑动的过程里要执行要执行的函数，但不能那么的频繁，我们需要控制这个执行的频率，而不是像上面那样不停的清除定时器又重新计时，在停顿的时候才触发。
- 总结：规定一个单位时间，在这个单位时间内，只能有一次触发事件的回调函数执行，如果在同一个单位时间内某事件被触发多次，只有一次能生效。
  **我们修改一下函数：**我们利用闭包的特性，在我们连续滑动的过程中只有当后一次滑动的时候的时间戳大于上面某一次一定频率的时候触发我们想要触发的函数。

```javascript
function throttle(func) {
  let previous = 0;
  return function (s) {
    const now = Date.now(),
      _self = this,
      args = arguments;
    if (now - previous > s) {
      func.apply(_self, args);
      previous = now;
    }
  };
}
const fixedthrottle = throttle(fixedDiv);
const staticthrottle = throttle(staticDiv);
window.onscroll = function () {
  const Y = this.scrollY;
  if (Y > 500) {
    fixedthrottle(100);
  } else {
    staticthrottle(100);
  }
};
```

或者也可以这样实现：

```javascript
function throttle(func) {
  let timer;
  return function (s) {
    const args = arguments,
      _self = this;
    if (!timer) {
      timer = setTimeout(() => {
        timer = null;
        func.apply(_self, args);
      }, s);
    }
  };
}
```

以上：我们实现了我们想要的

### 函数的防抖

- **思考：**在某种连续触发的事件里我们并不需要函数连续的触发而造成性能的多度损耗，例如典型的搜索框事件里，假设我们用 onkeypress 事件监听键盘，在用户输入信息时请求数据，但是我们并不希望用户每按一下键盘就请求一次，而是在用户停顿的时候请求。
- **概念：**在事件被触发 n 秒后再执行回调，如果在这 n 秒内又被触发，则重新计时。

```javascript
function debonce(method, context) {
  clearTimeout(method.tId);
  method.tId = setTimeout(function () {
    method.call(context);
  }, 300);
}
const textbox = document.getElementById('textbox');
function query() {
  console.log(textbox.value); //此处模拟发送请求
}
textbox.oninput = function () {
  debonce(query);
};
```

或者通过闭包：

```javascript
function debounce(func, wait) {
  let timeout;
  return function () {
    const context = this,
      args = arguments;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}
textbox.oninput = debonce(query, 300);
```

## CDN 的作用和原理

CDN 的全称是 Content Delivery Network，即内容分发网络。CDN 是构建在网络之上的内容分发网络，
依靠部署在各地的边缘服务器，通过中心平台的负载均衡、内容分发、调度等功能模块，
使用户就近获取所需内容，降低网络拥塞，提高用户访问响应速度和命中率。CDN 的关键技术主要有内容存储和分发技术。

#### 基本原理：

CDN 的基本原理是广泛采用各种缓存服务器，将这些缓存服务器分布到用户访问相对集中的地区或网络中，
在用户访问网站时，利用全局负载技术将用户的访问指向距离最近的工作正常的缓存服务器上，由缓存服务器直接响应用户请求

**进一步理解：**

- 1、当用户点击网站页面上的内容 URL，经过本地 DNS 系统解析，DNS 系统会最终将域名的解析权交给 CNAME 指向的 CDN 专用 DNS 服务器。

- 2、DN 的 DNS 服务器将 CDN 的全局负载均衡设备 IP 地址返回用户。

- 3、用户向 CDN 的全局负载均衡设备发起内容 URL 访问请求。

- 4、CDN 全局负载均衡设备根据用户 IP 地址，以及用户请求的内容 URL，选择一台用户所属区域的区域负载均衡设备，告诉用户向这台设备发起请求。

- 5、区域负载均衡设备会为用户选择一台合适的缓存服务器提供服务，选择的依据包括：根据用户 IP 地址，判断哪一台服务器距用户最近；根据用户所请求的 URL 中携带的内容名称，判断哪一台服务器上有用户所需内容；查询各个服务器当前的负载情况，判断哪一台服务器尚有服务能力。基于以上这些条件的综合分析之后，区域负载均衡设备会向全局负载均衡设备返回一台缓存服务器的 IP 地址。

- 6、全局负载均衡设备把服务器的 IP 地址返回给用户。

- 7、用户向缓存服务器发起请求，缓存服务器响应用户请求，将用户所需内容传送到用户终端。如果这台缓存服务器上并没有用户想要的内容，而区域均衡设备依然将它分配给了用户，那么这台服务器就要向它的上一级缓存服务器请求内容，直至追溯到网站的源服务器将内容拉到本地。

#### 作用

综上：

- 1.**多域名加载资源：**
  一般情况下，浏览器都会对单个域名下的并发请求数（文件加载）进行限制，通常最多有 4 个，那么第 5 个加载项将会被阻塞，
  直到前面的某一个文件加载完毕。因为 CDN 文件是存放在不同区域（不同 IP）的，所以对浏览器来说是可以同时加载页面所需的所有文件（远不止 4 个），
  从而提高页面加载速度。
- 2.**文件可能已经被加载过并保存有缓存：**
  一些通用的 js 库或者是 css 样式库，如 jQuery，在网络中的使用是非常普遍的。当一个用户在浏览你的某一个网页的时候，
  很有可能他已经通过你网站使用的 CDN 访问过了其他的某一个网站，恰巧这个网站同样也使用了 jQuery，所以就不会再加载一次了，
  从而间接的提高了网站的访问速度。那么此时用户浏览器已经缓存有该 jQuery 文件（同 IP 的同名文件如果有缓存，浏览器会直接使用缓存文件，不会再进行加载），
- 3.**分布式的数据中心：**
  假如你的站点布置在北京，当一个香港或者更远的用户访问你的站点的时候，他的数据请求势必会很慢很慢。
  而 CDN 则会让用户从离他最近的节点去加载所需的文件，所以加载速度提升就是理所当然的了。

## 聊聊虚拟 DOM

在问题（网上都说操作真实 DOM 慢，但测试结果却比 React 更快，为什么？）下，尤雨溪[尤雨溪原话](https://www.zhihu.com/question/31809713/answer/53544875)说的很详细了

这里面有好几个方面的问题。

### 1. 原生 DOM 操作 vs. 通过框架封装操作。

这是一个性能 vs. 可维护性的取舍。框架的意义在于为你掩盖底层的 DOM 操作，让你用更声明式的方式来描述你的目的，从而让你的代码更容易维护。没有任何框架可以比纯手动的优化 DOM 操作更快，因为框架的 DOM 操作层需要应对任何上层 API 可能产生的操作，它的实现必须是普适的。针对任何一个 benchmark，我都可以写出比任何框架更快的手动优化，但是那有什么意义呢？在构建一个实际应用的时候，你难道为每一个地方都去做手动优化吗？出于可维护性的考虑，这显然不可能。框架给你的保证是，你在不需要手动优化的情况下，我依然可以给你提供过得去的性能。

### 2. 对 React 的 Virtual DOM 的误解。

React 从来没有说过 “React 比原生操作 DOM 快”。React 的基本思维模式是每次有变动就整个重新渲染整个应用。如果没有 Virtual DOM，简单来想就是直接重置 innerHTML。很多人都没有意识到，在一个大型列表所有数据都变了的情况下，重置 innerHTML 其实是一个还算合理的操作... 真正的问题是在 “全部重新渲染” 的思维模式下，即使只有一行数据变了，它也需要重置整个 innerHTML，这时候显然就有大量的浪费。我们可以比较一下 innerHTML vs. Virtual DOM 的重绘性能消耗：innerHTML: render html string O(template size) + 重新创建所有 DOM 元素 O(DOM size)Virtual DOM: render Virtual DOM + diff O(template size) + 必要的 DOM 更新 O(DOM change)Virtual DOM render + diff 显然比渲染 html 字符串要慢，但是！它依然是纯 js 层面的计算，比起后面的 DOM 操作来说，依然便宜了太多。可以看到，innerHTML 的总计算量不管是 js 计算还是 DOM 操作都是和整个界面的大小相关，但 Virtual DOM 的计算量里面，只有 js 计算和界面大小相关，DOM 操作是和数据的变动量相关的。前面说了，和 DOM 操作比起来，js 计算是极其便宜的。这才是为什么要有 Virtual DOM：它保证了 1）不管你的数据变化多少，每次重绘的性能都可以接受；2) 你依然可以用类似 innerHTML 的思路去写你的应用。

### 3. MVVM vs. Virtual DOM

相比起 React，其他 MVVM 系框架比如 Angular, Knockout 以及 Vue、Avalon 采用的都是数据绑定：通过 Directive/Binding 对象，观察数据变化并保留对实际 DOM 元素的引用，当有数据变化时进行对应的操作。MVVM 的变化检查是数据层面的，而 React 的检查是 DOM 结构层面的。MVVM 的性能也根据变动检测的实现原理有所不同：Angular 的脏检查使得任何变动都有固定的 O(watcher count) 的代价；Knockout/Vue/Avalon 都采用了依赖收集，在 js 和 DOM 层面都是 O(change)：脏检查：scope digest O(watcher count) + 必要 DOM 更新 O(DOM change)依赖收集：重新收集依赖 O(data change) + 必要 DOM 更新 O(DOM change)可以看到，Angular 最不效率的地方在于任何小变动都有的和 watcher 数量相关的性能代价。但是！当所有数据都变了的时候，Angular 其实并不吃亏。依赖收集在初始化和数据变化的时候都需要重新收集依赖，这个代价在小量更新的时候几乎可以忽略，但在数据量庞大的时候也会产生一定的消耗。MVVM 渲染列表的时候，由于每一行都有自己的数据作用域，所以通常都是每一行有一个对应的 ViewModel 实例，或者是一个稍微轻量一些的利用原型继承的 "scope" 对象，但也有一定的代价。所以，MVVM 列表渲染的初始化几乎一定比 React 慢，因为创建 ViewModel / scope 实例比起 Virtual DOM 来说要昂贵很多。这里所有 MVVM 实现的一个共同问题就是在列表渲染的数据源变动时，尤其是当数据是全新的对象时，如何有效地复用已经创建的 ViewModel 实例和 DOM 元素。假如没有任何复用方面的优化，由于数据是 “全新” 的，MVVM 实际上需要销毁之前的所有实例，重新创建所有实例，最后再进行一次渲染！这就是为什么题目里链接的 angular/knockout 实现都相对比较慢。相比之下，React 的变动检查由于是 DOM 结构层面的，即使是全新的数据，只要最后渲染结果没变，那么就不需要做无用功。Angular 和 Vue 都提供了列表重绘的优化机制，也就是 “提示” 框架如何有效地复用实例和 DOM 元素。比如数据库里的同一个对象，在两次前端 API 调用里面会成为不同的对象，但是它们依然有一样的 uid。这时候你就可以提示 track by uid 来让 Angular 知道，这两个对象其实是同一份数据。那么原来这份数据对应的实例和 DOM 元素都可以复用，只需要更新变动了的部分。或者，你也可以直接 track by $index 来进行 “原地复用”：直接根据在数组里的位置进行复用。在题目给出的例子里，如果 angular 实现加上 track by $index 的话，后续重绘是不会比 React 慢多少的。甚至在 dbmonster 测试中，Angular 和 Vue 用了 track by $index 以后都比 React 快: dbmon (注意 Angular 默认版本无优化，优化过的在下面）顺道说一句，React 渲染列表的时候也需要提供 key 这个特殊 prop，本质上和 track-by 是一回事。

### 4. 性能比较也要看场合在比较性能的时候，要分清楚初始渲染、小量数据更新、大量数据更新这些不同的场合。

Virtual DOM、脏检查 MVVM、数据收集 MVVM 在不同场合各有不同的表现和不同的优化需求。Virtual DOM 为了提升小量数据更新时的性能，也需要针对性的优化，比如 shouldComponentUpdate 或是 immutable data。初始渲染：Virtual DOM > 脏检查 >= 依赖收集小量数据更新：依赖收集 >> Virtual DOM + 优化 > 脏检查（无法优化） > Virtual DOM 无优化大量数据更新：脏检查 + 优化 >= 依赖收集 + 优化 > Virtual DOM（无法/无需优化）>> MVVM 无优化不要天真地以为 Virtual DOM 就是快，diff 不是免费的，batching 么 MVVM 也能做，而且最终 patch 的时候还不是要用原生 API。在我看来 Virtual DOM 真正的价值从来都不是性能，而是它 1) 为函数式的 UI 编程方式打开了大门；2) 可以渲染到 DOM 以外的 backend，比如 ReactNative。

### 5. 总结以上这些比较

更多的是对于框架开发研究者提供一些参考。主流的框架 + 合理的优化，足以应对绝大部分应用的性能需求。如果是对性能有极致需求的特殊情况，其实应该牺牲一些可维护性采取手动优化：比如 Atom 编辑器在文件渲染的实现上放弃了 React 而采用了自己实现的 tile-based rendering；又比如在移动端需要 DOM-pooling 的虚拟滚动，不需要考虑顺序变化，可以绕过框架的内置实现自己搞一个。

## reduce

**说明：将数组元素计算为一个值（从左到右）。**

**语法**

```js
array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
```

| 参数                                    | 描述                                        |
| --------------------------------------- | ------------------------------------------- |
| function(total,currentValue, index,arr) | 必需。用于执行每个数组元素的函数。函数参数: |
| initialValue                            | 可选。传递给函数的初始值                    |

| 参数         | 描述                                 |
| ------------ | ------------------------------------ |
| total        | 必需。初始值, 或者计算结束后的返回值 |
| currentValue | 必需。当前元素                       |
| currentIndex | 可选。当前元素的索引                 |
| arr          | 可选。当前元素所属的数组对象。       |

```javascript

Array.prototype.myReduce = function(fn, initial) {
	if (!this.length) return;
	let inititaval;
	let i = 0;
	if (initial) {
		inititaval = initial
	} else {
		i++
		inititaval = this.slice(0, 1)[0];
	}
	for (; i < this.length; i++) {
		inititaval = fn(inititaval, this[i], i, this)
	}
	return inititaval
}

const attr = [1, 2, 3, 4, 5, 6];
const total = attr.myReduce((total, currentValue, currentIndex, arr) => {
	console.log(total, currentValue, currentIndex, arr)
	return total += currentValue
})
console.log(total)
//控制台
1 2 1 [1, 2, 3, 4, 5, 6]
3 3 2 [1, 2, 3, 4, 5, 6]
6 4 3 [1, 2, 3, 4, 5, 6]
10 5 4 [1, 2, 3, 4, 5, 6]
15 6 5 [1, 2, 3, 4, 5, 6]
21

```

## filter

**说明：检测数值元素，并返回符合条件所有元素的数组。**

**语法**

```js
array.filter(function(currentValue,index,arr), thisValue)
```

| 参数                              | 描述                                                                                                           |
| --------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| function(currentValue, index,arr) | 必须。函数，数组中的每个元素都会执行这个函数函数参数:                                                          |
| thisValue                         | 可选。对象作为该执行回调时使用，传递给函数，用作 "this" 的值。如果省略了 thisValue ，"this" 的值为 "undefined" |

| 参数         | 描述                         |
| ------------ | ---------------------------- |
| currentValue | 必须。当前元素的值           |
| index        | 可选。当前元素的索引值       |
| arr          | 可选。当前元素属于的数组对象 |

**实现**

```js
Array.prototype.myFilter = function (fn, thisValue) {
  thisValue = thisValue || window;
  const arr = [];
  for (let i = 0; i < this.length; i++) {
    if (fn.call(thisValue, this[i], i, this)) {
      arr.push(this[i]);
    }
  }
  return arr;
};
```

## map

**说明：通过指定函数处理数组的每个元素，并返回处理后的数组。**

**语法**

```js
array.map(function(currentValue,index,arr), thisValue)
```

| 参数                              | 描述                                                                                                                                           |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| function(currentValue, index,arr) | 必须。函数，数组中的每个元素都会执行这个函数函数参数:                                                                                          |
| thisValue                         | 可选。对象作为该执行回调时使用，传递给函数，用作 "this" 的值。如果省略了 thisValue，或者传入 null、undefined，那么回调函数的 this 为全局对象。 |

| 参数         | 描述                         |
| ------------ | ---------------------------- |
| currentValue | 必须。当前元素的值           |
| index        | 可选。当前元素的索引值       |
| arr          | 可选。当前元素属于的数组对象 |

**实现**

```js
Array.prototype.myMap = function (fn, thisValue) {
  thisValue = thisValue || window;
  const arr = [];
  for (let i = 0; i < this.length; i++) {
    arr.push(fn.call(thisValue, this[i], i, this));
  }
  return arr;
};
```

## some

**说明：检测数组元素中是否有元素符合指定条件。**

**语法**

```js
array.some(function(currentValue,index,arr),thisValue)
```

| 参数                              | 描述                                                                                                                                           |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| function(currentValue, index,arr) | 必须。函数，数组中的每个元素都会执行这个函数函数参数:                                                                                          |
| thisValue                         | 可选。对象作为该执行回调时使用，传递给函数，用作 "this" 的值。如果省略了 thisValue，或者传入 null、undefined，那么回调函数的 this 为全局对象。 |

| 参数         | 描述                         |
| ------------ | ---------------------------- |
| currentValue | 必须。当前元素的值           |
| index        | 可选。当前元素的索引值       |
| arr          | 可选。当前元素属于的数组对象 |

**实现**

```js
Array.prototype.mySome = function (fn, thisValue) {
  thisValue = thisValue || window;
  const arr = [];
  for (let i = 0; i < this.length; i++) {
    if (fn.call(thisValue, this[i], i, this)) {
      return true;
    }
  }
  return false;
};
```

## every

**说明：检测数值元素的每个元素是否都符合条件。**

**语法**

```js
array.every(function(currentValue,index,arr), thisValue)
```

| 参数                              | 描述                                                                                                                                           |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| function(currentValue, index,arr) | 必须。函数，数组中的每个元素都会执行这个函数函数参数:                                                                                          |
| thisValue                         | 可选。对象作为该执行回调时使用，传递给函数，用作 "this" 的值。如果省略了 thisValue，或者传入 null、undefined，那么回调函数的 this 为全局对象。 |

| 参数         | 描述                         |
| ------------ | ---------------------------- |
| currentValue | 必须。当前元素的值           |
| index        | 可选。当前元素的索引值       |
| arr          | 可选。当前元素属于的数组对象 |

**实现**

```js
Array.prototype.myEvery = function (fn, thisValue) {
  thisValue = thisValue || window;
  const arr = [];
  for (let i = 0; i < this.length; i++) {
    if (!fn.call(thisValue, this[i], i, this)) {
      return false;
    }
  }
  return true;
};
```

## EventEmitter

我们知道 node 里面有一个 event 模块，用法如下

```javascript
var events = require('events');
var emitter = new events.EventEmitter();
emitter.on('someEvent', function (arg1, arg2) {
  console.log('listener1', arg1, arg2);
});
emitter.on('someEvent', function (arg1, arg2) {
  console.log('listener2', arg1, arg2);
});
emitter.emit('someEvent', 'arg1 参数', 'arg2 参数');
```

以上：同一个事件名，注册了两个监听函数，然后触发这个事件
**本文不解释观察者模式和发布订阅模式的区别，也不考虑本文实现的 EventEmitter 是观察者模式还是发布订阅模式**

```javascript
class EventEmitter {
  constructor() {
    this.events = Object.create(null);
  }
  on(event, fn) {
    this.__addEvent(event, fn);
  }
  emit(event) {
    const attr = this.events[event] || [];
    [].shift.call(arguments);
    const arg = arguments;
    let l = attr.length;
    for (let i = 0; i < l; i++) {
      const { fn, once } = attr[i];
      fn.apply(this, arg);
      if (once) {
        attr.splice(i, 1);
        i--;
        l--;
      }
    }
    return this;
  }
  removeEvent(event, fn) {
    if (!event) {
      this.events = Object.create(null);
    } else if (!fn) {
      delete this.events[event];
    } else {
      const attr = this.events[event] || [];
      let l = attr.length;
      for (let i = 0; i < l; i++) {
        if (attr[i].fn === fn) {
          attr.splice(i, 1);
          l--;
          i--;
        }
      }
    }

    return this;
  }
  once(event, fn) {
    this.__addEvent(event, fn, true);
    return this;
  }
  __addEvent(event, fn = function () {}, once = false) {
    if (!this.events[event]) {
      this.events[event] = [];
      this.events[event].push({
        fn,
        once,
      });
      return this;
    }
    this.events[event].push({
      fn,
      once,
    });
  }
}

const emitter = new EventEmitter();
function cb() {
  console.log(1);
}
emitter.on('hehe', cb);
emitter.once('hehe', function (a) {
  console.log(2);
});
emitter.once('hehe', function (a) {
  console.log(3);
});
emitter.emit('hehe'); //1,2,3
emitter.emit('hehe'); //1
emitter.removeEvent('hehe', cb);
emitter.emit('hehe'); //不执行，cb函数已移除
```

[node events 模块源码地址](https://github.com/nodejs/node/blob/master/lib/events.js)

## call

[MDN 文档](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call)

```javascript
Function.prototype.myCall = function () {
  const arr = [...arguments];
  const obj = arr.shift() || window;
  obj.fn = this;
  const result = obj.fn(...arr);
  delete obj.fn;
  return result;
};

console.log(Math.max.myCall(null, 1, 2, 3));
```

## apply

[MDN 文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)

```javascript
Function.prototype.myApply = function () {
  const arr = [...arguments];
  const obj = arr[0] || window;
  obj.fn = this;
  const result = obj.fn(...arr[1]);
  delete obj.fn;
  return result;
};
console.log(Math.max.myApply(null, [1, 2, 5]));
```

## bind

[MDN 文档](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Function/bind)

```javascript
Function.prototype.myBind = function () {
  const _this = this;
  const fn = [].shift.call(arguments) || window;
  return function () {
    return _this.apply(fn, arguments);
  };
};

console.log(Math.max.myBind(null)(1, 3, 6));
```

## 实现一个 new 操作符

```javascript
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.sayName = function () {
  console.log(this.name);
};

function New(fn) {
  const obj = {};
  const arr = [].slice.call(arguments, 1);
  fn.apply(obj, arr);
  Object.setPrototypeOf(obj, fn.prototype);
  return obj;
}
const obj = New(Person, '小米', 18);
console.log(obj);
console.log(obj instanceof Person); //true
```

## 实现 instanceof

**定义：**instanceof 运算符用来测试一个对象在其原型链中是否存在一个构造函数的 prototype 属性
**例子**

```javascript
class A {}
class B extends A {}
const b = new B();
console.log(b instanceof B); //true
console.log(b instanceof A); //true

function ins_tanceof(cu, pr) {
  let _pro = cu.__proto__;
  let pro = pr.prototype;
  while (true) {
    if (_pro === null) {
      return false;
    }
    if (_pro === pro) {
      return true;
    }
    _pro = _pro.__proto__;
  }
}
console.log(ins_tanceof(b, B));
console.log(ins_tanceof(b, A));
```

## 手写 PromiseA+

```js
//promise.js

const PENDING = Symbol('PENDING');
const RESOLVED = Symbol('RESOLVED');
const REJECTED = Symbol('REJECTED');

const resolvePromise = (promise2, x, resolve, reject) => {
  if (promise2 === x) {
    return reject(
      new TypeError('Chaining cycle detected for promise #<promise>')
    );
  }
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    //防止多次调用成功或者失败
    let called; // 内部测试的时候,会成功和失败都调用
    try {
      //预防取.then的时候错误
      let then = x.then; //Object.definePropertype
      if (typeof then === 'function') {
        //没有  x.then,因为怕再次取.then的时候出错
        then.call(
          x,
          (y) => {
            //y的结果可能还是一个promise,递归调用,直到结果是一个普通值
            //resolve(y);//采用promise的成功结果向下传递
            if (called) {
              return;
            }
            called = true;
            resolvePromise(promise2, y, resolve, reject);
          },
          (r) => {
            //r不再判断是否是promise,因为报错,直接传递
            if (called) {
              return;
            }
            called = true;
            reject(r); //失败结果向下传递
          }
        );
      } else {
        //代表向下传递的返回值是一个普通对象
        resolve(x);
      }
    } catch (e) {
      if (called) {
        return;
      }
      called = true;
      reject(e);
    }
  } else {
    resolve(x);
  }
};
class Promise {
  constructor(executor) {
    this.status = PENDING;
    this.onResolvedCallbacks = [];
    this.onRejectedCallbacks = [];
    this.value = undefined;
    this.reason = undefined;
    let resolve = (value) => {
      if (this.status === PENDING) {
        this.value = value;
        this.status = RESOLVED;
        this.onResolvedCallbacks.forEach((fn) => fn());
      }
    };
    let reject = (reason) => {
      if (this.status === PENDING) {
        this.reason = reason;
        this.status = REJECTED;
        this.onRejectedCallbacks.forEach((fn) => fn());
      }
    };
    try {
      executor(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }
  then(onfulfilled, onrejected) {
    //onfulfilled, onrejected 都是可选参数
    onfulfilled =
      typeof onfulfilled === 'function' ? onfulfilled : (data) => data;

    onrejected =
      typeof onrejected === 'function'
        ? onrejected
        : (err) => {
            throw err;
          };
    let promise2 = new Promise((resolve, reject) => {
      if (this.status === RESOLVED) {
        setTimeout(() => {
          try {
            const x = onfulfilled(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);

        return;
      }
      if (this.status === REJECTED) {
        setTimeout(() => {
          try {
            const x = onrejected(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      }
      if (this.status === PENDING) {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onfulfilled(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onrejected(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          });
        });
      }
    });
    return promise2;
  }
}
Promise.defer = Promise.deferred = function () {
  let dfd = {};
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve;
    dfd.reject = reject;
  });
  return dfd;
};

module.exports = Promise;

//test
//测试库
//promises-aplus-tests promise.js
```
