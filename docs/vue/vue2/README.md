---
sidebar: auto
---

# vue2.x

## 虚拟dom

**我们拿vue2.x的源码来看一下vue是如何用js对象表示虚拟dom的**

```ts

export default class VNode {
  constructor (
    tag?: string,
    data?: VNodeData,
    children?: ?Array<VNode>,
    text?: string,
    elm?: Node,
  ) {
    this.tag = tag
    this.data = data
    this.children = children
    this.text = text
    this.elm = elm
    this.key = data && data.key
  }
}

```

**以上我们可以看到：虚拟dom就是我们用js对象的方式来表示html dom对象，那么为什么 要使用虚拟dom呢？**

### 为什么要使用虚拟dom


也许你现在打开搜索依旧可以看到n多个回答告诉你，操作真实dom的代价如何如何大，为了性能，我们才使用虚拟dom，真的是这样吗？
这样的解释不能说是错的，但是并不完全正确，毕竟对于框架操作虚拟dom而言、直接原生操作dom来进行针对性的优化方式速度更快，但是如果数据量大到一定程度乃至页面上复杂到一定程度，
难道你次都要选取对应的dom去更改吗，或者是直接去更改整个innerHTML，当然你也可以特定的去优化代码，但是，难道你要再每个地方都去手动的优化这些吗？这显然是不可能的，
框架给我们的保证是，在不需要你手动优化的情况下，依旧给你过的去的性能，虚拟dom的真正价值从来都不是性能，1.函数式编程带来的可维护性。2.让js可以渲染到 DOM 以外的地方。

以上[参考链接](https://www.zhihu.com/question/31809713/answer/53544875)

**针对虚拟dom，vue内部具体做了那些优化，请看下文的diff算法篇**


## 如何通过this拿到当前data下面的值

**示例**

```javascript

new Vue({
	el:'#app',
	data(){
		return{
			name:'vue'
		}	
	},
	methods:{
		say(){
			alert("Hello World")
		}
	},
	create(){
		this.name;// 'vue'
		this.say()
	}
})

```

很简单的例子，我们直接上源码吧（😊）

```javascript
// src/core/instance/state.js
let data = vm.$options.data
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {}

 // proxy data on instance
  const keys = Object.keys(data)
  const props = vm.$options.props
  const methods = vm.$options.methods
  let i = keys.length
  while (i--) {
    const key = keys[i]
    if (process.env.NODE_ENV !== 'production') {
      if (methods && hasOwn(methods, key)) {
        warn(
          `Method "${key}" has already been defined as a data property.`,
          vm
        )
      }
    }
    if (props && hasOwn(props, key)) {
      process.env.NODE_ENV !== 'production' && warn(
        `The data property "${key}" is already declared as a prop. ` +
        `Use prop default value instead.`,
        vm
      )
    } else if (!isReserved(key)) {
      proxy(vm, `_data`, key)
    }
  }


```


我们只分析与本节相关的内容

```javascript

data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {}


const keys = Object.keys(data)
let i = keys.length
while (i--) {
	const key = keys[i]
	
	proxy(vm, `_data`, key)
}

```

我们拿到了data的值，然后遍历它，最后我们执行proxy方法，我们再来看一下proxy方法

```javascript

const sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
}

export function proxy (target: Object, sourceKey: string, key: string) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  }
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val
  }
  Object.defineProperty(target, key, sharedPropertyDefinition)
}

```

以上，当我们在取this.name得时候，通过Object.defineProperty这个方法，我们无论在存取值得时候，都是对当前实例下的data操作的


## 响应式的数组

* 众所周知，vue2.x的响应式是通过Object.defineProperty方法实现的，但是此方法有一个问题，它无法监测数组的变化，接下来我们看一下vue是如何监测实例内数组变化从而做出响应的

**先看一个示例**


```javascript

new Vue({
	el:"#app",
	template:`
	<div>
		<span v-for="(item,index) in list">{{ item }}</span>
		<button @click="change">改变数据</button>
	</div>
	`,
	data(){
		return{
			list:['a','b']
		}
	},
	methods:{
		change(){
			this.list.splice(2,0,'c')
			setTimeout(()=>{
				this.list[1] = 'd'
				console.log(this.list);//a,d,c
			},2000)
		}
	}
})


```

以上，当我们点击按钮后，执行change方法，页面会渲染为

```html

<span>a</span>
<span>b</span>
<span>c</span>

```

* 两秒后，第二个span的内容却依然是b，而不是d，然而我们输出list发现，数据已经变为[a,d,c]，为什么数据改变而内容却没有更新呢  
* 我们看一下vue内部是怎么实现监听的

**初始化数据的时候，有这么一个函数**

```javascript
// src/core/instance/state.js

function initData (vm: Component) {
//···
//...
  // observe data
  observe(data, true /* asRootData */)
}

//observe方法
// src/core/observer/index.js

export function observe (value: any, asRootData: ?boolean): Observer | void {
  //···
  ob = new Observer(value)
  //···
}

// class Observer
//

class Observer {
  value: any;
  dep: Dep;
  vmCount: number; // number of vms that have this object as root $data

  constructor (value: any) {
    this.value = value
    this.dep = new Dep()
    this.vmCount = 0
    def(value, '__ob__', this)
    if (Array.isArray(value)) {
      if (hasProto) {
        protoAugment(value, arrayMethods)
      } else {
        copyAugment(value, arrayMethods, arrayKeys)
      }
      this.observeArray(value)
    } else {
      this.walk(value)
    }
  }

  /**
   * Walk through all properties and convert them into
   * getter/setters. This method should only be called when
   * value type is Object.
   */
  walk (obj: Object) {
    const keys = Object.keys(obj)
    for (let i = 0; i < keys.length; i++) {
      defineReactive(obj, keys[i])
    }
  }

  /**
   * Observe a list of Array items.
   */
  observeArray (items: Array<any>) {
    for (let i = 0, l = items.length; i < l; i++) {
      observe(items[i])
    }
  }
}

```

以上可以看到，当处理数据的时候，如果判断当前数据是个数组，我们将会走这几行代码

```javascript

if (hasProto) {
	protoAugment(value, arrayMethods)
} else {
	copyAugment(value, arrayMethods, arrayKeys)
}
this.observeArray(value)

```

### 支持__proto__

一般情况下，hasProto（判断当前浏览器是否支持__proto__属性）都会为true，所以我们先来看一下protoAugment(value, arrayMethods)做了什么

```javascript
// src/core/observer/index.js
/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src: Object) {
  /* eslint-disable no-proto */
  target.__proto__ = src
  /* eslint-enable no-proto */
}

```

可以看出，此方法只是把当前array的原型设为 arrayMethods，我们再来看一下 arrayMethods

```javascript
// src/core/observer/array.js
const arrayProto = Array.prototype
export const arrayMethods = Object.create(arrayProto)

const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  const original = arrayProto[method]
  def(arrayMethods, method, function mutator (...args) {
    const result = original.apply(this, args)
    const ob = this.__ob__
    let inserted
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    if (inserted) ob.observeArray(inserted)
    // notify change
    ob.dep.notify()
    return result
  })
})

//def

function def (obj: Object, key: string, val: any, enumerable?: boolean) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  })
}


```

**分析：**以上我们显示拿到了Array的原型对象，然后我们再把此对象设置为arrayMethods的原型，
此时，arrayMethods是这个样子

```javascript

{
	__proto__: Array(0)
		concat: ƒ concat()
		constructor: ƒ Array()
		copyWithin: ƒ copyWithin()
		entries: ƒ entries()
		every: ƒ every()
		fill: ƒ fill()
		filter: ƒ filter()
		find: ƒ find()
		findIndex: ƒ findIndex()
		flat: ƒ flat()
		flatMap: ƒ flatMap()
		forEach: ƒ forEach()
		includes: ƒ includes()
		indexOf: ƒ indexOf()
		join: ƒ join()
		keys: ƒ keys()
		lastIndexOf: ƒ lastIndexOf()
		length: 0
		map: ƒ map()
		pop: ƒ pop()
}

```

然后我们在遍历methodsToPatch的时候执行def方法后，arrayMethods如下

```javascript

{
	pop: ƒ mutator(...args)
	push: ƒ mutator(...args)
	reverse: ƒ mutator(...args)
	shift: ƒ mutator(...args)
	sort: ƒ mutator(...args)
	splice: ƒ mutator(...args)
	unshift: ƒ mutator(...args)
	__proto__: Array(0)
		concat: ƒ concat()
		constructor: ƒ Array()
		copyWithin: ƒ copyWithin()
		entries: ƒ entries()
		every: ƒ every()
		fill: ƒ fill()
		filter: ƒ filter()
		find: ƒ find()
		findIndex: ƒ findIndex()
		flat: ƒ flat()
		flatMap: ƒ flatMap()
		forEach: ƒ forEach()
		includes: ƒ includes()
		indexOf: ƒ indexOf()
		join: ƒ join()
		keys: ƒ keys()
		lastIndexOf: ƒ lastIndexOf()
		length: 0
		map: ƒ map()
		pop: ƒ pop()
}


```

此时push，pop，shift，unshift，splice，sort，reverse等方法都重写为了mutator函数

```javascript

function mutator (...args) {
	const result = original.apply(this, args)
	const ob = this.__ob__
	let inserted
	switch (method) {
	  case 'push':
	  case 'unshift':
		inserted = args
		break
	  case 'splice':
		inserted = args.slice(2)
		break
	}
	if (inserted) ob.observeArray(inserted)
	// notify change
	ob.dep.notify()
	return result
}

```

回到最初，当我们在执行protoAugment(value, arrayMethods)方法时，就是把数组value的原型指向了arrayMethods，
所以在操作数组push，pop，shift...这些方法时我们可以在mutator内部做一些操作，例如ob.dep.notify()通知更新

### 不支持__proto__时

```javascript

function def (obj: Object, key: string, val: any, enumerable?: boolean) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  })
}

function copyAugment (target: Object, src: Object, keys: Array<string>) {
  for (let i = 0, l = keys.length; i < l; i++) {
    const key = keys[i]
    def(target, key, src[key])
  }
}
const arrayKeys = Object.getOwnPropertyNames(arrayMethods)
//arrayKeys-> ["push", "pop", "shift", "unshift", "splice", "sort", "reverse"]
copyAugment(value, arrayMethods, arrayKeys)

```

**分析：**当浏览器不支持直接把数组原型以__proto__的形式指向arrayMethods时，我们就直接给当前数组本身添加这些经过我们改写的方法，也就是mutator函数  

* 这也就是为什么在vue2.x里面，我们直接this.arr[i] = xxx 并不能让视图响应的原因

### 本地测试

```javascript

const arrayMethods = ['splice','push'];
const prototypeArray = Array.prototype;
const protoArray = Object.create(prototypeArray);
const setValue = function(target,key,value){
	Object.defineProperty(target, key, {
		value: value,
		enumerable: true,
		writable: true,
		configurable: true
	})
}

const arr = [1,2,3];
arrayMethods.forEach((method)=>{
	const original = prototypeArray[method]
	setValue(protoArray,method,function mutator(...arg){
		original.apply(this,arg)
		console.log(arg)
		console.log(`执行了${method}方法，传入的参数为${arg}`)
	})
})

arr.__proto__ = protoArray

arr.push(4);//执行了push方法，传入的参数为4
arr.splice(3,1);//执行了splice方法，传入的参数为3,1

```

**注意：这样我们在调用call,push等方法时，就一定要调用我们改写过的方法，请看下面示例**

```javascript

[].push.apply(arr,[5,6]);//并不会触发我们的输出，因为此时调用的是原始push的方法
console.log(arr);//[1, 2, 3, 5, 6]
arr.push.apply(arr,[7,8,9]);//执行了push方法，传入的参数为7,8,9
console.log(arr);//[1, 2, 3, 5, 6, 7, 8, 9]

```


## vue2.x之nextTick

也看过不少介绍nextTick的文章，感觉都不太完整，可能介绍了为什么给我们暴露了这个api，却没有介绍内部为什么要引入这个api，内部引入这个api做了什么

* **本文默认读者已经理解了js宏任务和微任务的基本概念**  
* **本文默认读者熟练运用nextTick这个api**
* **本文默认您已熟悉vue2的响应式原理**

### vue内部为什么要引入 nextTick

vue的响应式原理就不再赘述，先看一段代码

假设我们的dom如下所示

```html
<div id="app"></div>
```



```js

//我们先获取一下dom
const app = document.getElementById("app");

// 创建data数据

const data = {
	count:0
}

//渲染函数

function render(){
	console.log("渲染")
	app.innerHTML = data.count;
}

//更新函数

function update(){
	render()
}

// 响应式函数

function define(obj,key,val){
	Object.defineProperty(obj,key,{
		set(nvl){
			if(nvl === val){
				return;
			}
			val = nvl;
			//数据修改时执行我们的更新函数
			update(key)
		},
		get(){
			return val
		}
	})
}

//劫持我们的数据对象

define(data,"count",data["count"])

//执行渲染函数

render()

//输出：渲染

/*
此时的dom
<div id="app">0</div>
*/

```

**以上：我们先是定义了一个对象data，然后按照国际惯例劫持它的count属性，在count改变时，我们去更新dom**

测试：此时app的内容为0，我们在一秒后去更改count的值

```js

setTimeout(()=>{
	
	data.count = 1;
	data.count = 2;
	data.count = 3;
	
},1000)

/*
此时的dom
<div id="app">3</div>
*/

//再次输出三次渲染
"渲染"
"渲染"
"渲染"

```

**以上：我们一共更新了三次 count 所以app更新了三次，好像没什么问题，但是视觉效果上看，页面是从0直接到3到，我们应该在同一事件循环内直接取count最后的值就可以了，不必要做重复的渲染，因此nextTick应运而生**

### nextTick

做法：在每次修改count时，我们可以把渲染函数存起来，在修改结束后再执行渲染


```js

let map = {};
let flag = true;
function run(){
	flag = true;
	const copies = map;
	map = {};
	for (let key in copies) {
		copies[key]()
	}
}
function $nextTick(cb,key){
	map[key] = cb;
	if(flag){
		flag = false;
		run()
	}
}

//修改一下update函数 

function update(key){
	$nextTick(render,key)
}

```

**以上：我们创建了一个对象用于存储渲染函数，以劫持的属性key作为对象的key(为了去重)**

测试：

```js

setTimeout(()=>{
	
	data.count = 1;
	data.count = 2;
	data.count = 3;
	
},1000)

//再次输出三次渲染
"渲染"
"渲染"
"渲染"


```

依旧不行，我们上面 虽然是把函数以key的方式去了重，但是我们每次 “存” 和 “放” 都在一个 任务里，所以我们上面的代码执行的流程是

更新为1->render函数存入map->map置为空->遍历map对象执行 
更新为2->render函数存入map->map置为空->遍历map对象执行 
更新为3->render函数存入map->map置为空->遍历map对象执行 

所以我们要做的就是，更新为1->render函数存入map，更新为2->render函数存入map，更新为3->render函数存入map，map置为空->遍历map对象执行

#### 引入微任务

**修改代码**

```js

//add代码
const timerFn = ()=>{
	Promise.resolve().then(run)
}

//修改代码
function $nextTick(cb,key){
	if(key){
		map.set(cb,cb)
	}else{
		map.set(id++,cb)
	}
	if(flag){
		flag = false;
		timerFn()
	}
}

//测试
setTimeout(()=>{
	
	data.count = 1;
	data.count = 2;
	data.count = 3;
	
},1000)

//只有一次输出

"渲染"

```


**以上：我们要做的基本实现，在同一个事件循环里我们修改了三次数据，然后只执行了一次更新，达到了我们的预期，但是我们依旧有一个问题，如下**

```js
setTimeout(()=>{
	
	data.count = 1;
	data.count = 2;
	data.count = 3;
	console.log(app.innerHTML)
	//输出  0
},1000)


```

**以上：我们只拿到了更新之前的值，这显然是不合理的，所以我们要如何拿到改变后的值呢？**

### 暴露出来的api nextTick

我们可以把我们的代码修改一下

```js

let id = 0;
function $nextTick(cb,key){
	if(key){
		map[key] = cb;
	}else{
		map[id++] = cb;
	}
	if(flag){
		flag = false;
		timerFn()
	}
}


//测试

setTimeout(()=>{
	data.count = 1;
	data.count = 2;
	data.count = 3;
	
	$nextTick(()=>{
		console.log(app.innerHTML);//0
	})
},1000)

```

结果：依旧失败

分析原因：当我们用for in遍历map对象时，并不是我们后面加入的值就一定在后面，所以我们再次修改一下代码 

#### nextTick2

修改代码我们把map改为Map

```js

let map = new Map();
let flag = true;
const timerFn = ()=>{
	Promise.resolve().then(run)
}
function run(){
	flag = true;
	const copies = map;
	map = new Map();
	for (let [key,fn] of copies) {
		fn()
	}
}
function $nextTick(cb,key){
	if(key){
		map.set(cb,cb)
	}else{
		map.set(id++,cb)
	}
	if(flag){
		flag = false;
		timerFn()
	}
}


setTimeout(()=>{
	data.count = 1;
	data.count = 2;
	data.count = 3;
	
	$nextTick(()=>{
		console.log(app.innerHTML);
		// 3
	})
},1000)


```

### 源码内部的timerFn函数有时候是宏任务,有时候是微任务

**再看一个例子**

```html
<div id="btn-margin">
	<button id="btn">更改数据</button>
</div>
```

假设我们代码如下

```js
	document.querySelector("#btn").addEventListener("click",function(){
		console.log(1)
		Promise.resolve().then(()=>{
			console.log(2)
		})
	})
	document.querySelector("#btn-margin").addEventListener("click",function(){
		console.log(3)
		Promise.resolve().then(()=>{
			console.log(4)
		})
	})
```

**结果：1，2，3，4。我们可以看出，微任务Promise.resolve执行的速度比冒泡要慢，那么就产生了一个问题，请看下面示例**

```js
document.querySelector("#btn").addEventListener("click",function(){
	Promise.resolve().then(()=>{
		data.count = 5;
	})
})
document.querySelector("#btn-margin").addEventListener("click",function(){
	Promise.resolve().then(()=>{
		data.count = 6;
	})
})

输出两次
//渲染
```

**以上显然不是我们想要的结果，因此我们可以修改一下timerFn函数**

```js
const timerFn = ()=>{
	//Promise.resolve().then(run);
	setTimeout(run,0)
}

document.querySelector("#btn").addEventListener("click",function(){
	Promise.resolve().then(()=>{
		data.count = 5;
	})
})
document.querySelector("#btn-margin").addEventListener("click",function(){
	Promise.resolve().then(()=>{
		data.count = 6;
	})
})

输出一次
//渲染
```

### vue nextTick的历史

* 2.5之前因为 microtask 优先级比较高，事件会在顺序事件（[＃4521](https://github.com/vuejs/vue/issues/4521)，[＃6690](https://github.com/vuejs/vue/issues/6690) 有变通方法）之间甚至在同一事件的冒泡过程中触发[＃6566](https://github.com/vuejs/vue/issues/6566)。  
* 2.5版本是 macrotask 结合 microtask。但是，在重绘之前状态改变时会有小问题（如[＃6813](https://github.com/vuejs/vue/issues/6813)）。此外，在事件处理程序中使用 macrotask 会导致一些无法规避的奇怪行为（[＃7109](https://github.com/vuejs/vue/issues/7109)，[＃7153](https://github.com/vuejs/vue/issues/7153)，[＃7546](https://github.com/vuejs/vue/issues/7546)，[＃7834](https://github.com/vuejs/vue/issues/7834)，[＃8109](https://github.com/vuejs/vue/issues/8109)）。  
* 2.6版本又改回了microtask······。

### 2.4版本

```html
<div class="panel" id="app">
  <div class="header" v-if="expand">
    <i @click="click1">Expand is True</i>
  </div>
  <div class="expand" v-if="!expand" @click="click2">
    <i>Expand is False</i>
  </div>
  <div>
    countA: {{countA}}
  </div>
  <div>
    countB: {{countB}}
  </div>
  Please Click `Expand is Ture`.
</div>
</body>
</html>
<script>
	new Vue({
	  el: '#app',
	  data: {
	    expand: true,
	    countA: 0,
	    countB: 0,
	  },
	  methods:{
		click1(){
			console.log(event.target,event.currentTarget)
			this.expand = false;
			this.countA++;
		},
		click2(){
			console.log(event.target,event.currentTarget)
			this.expand = true;
			this.countB++
		}
	  }
	})
</script>


```

关于[＃6566](https://github.com/vuejs/vue/issues/6566)，以上代码，尤雨溪回复：  

So, this happens because:

The inner click event on "i" fires, triggering a 1st update on nextTick (microtask)
The microtask is processed before the event bubbles to the outer div. During the update, a click listener is added to the outer div.
Because the DOM structure is the same, both the outer div and the inner element are reused.
The event finally reaches outer div, triggers the listener added by the 1st update, in turn triggering a 2nd update.
This is quite tricky in fix, and other libs that leverages microtask for update queueing also have this problem (e.g. Preact). React doesn't seem to have this problem because they use a synthetic event system (probably due to edge cases like this).

To work around it, you can simply give the two outer divs different keys to force them to be replaced during updates. This would prevent the bubbled event to be picked up:


### 2.5版本

**说明：通过打断点的方式发现，当我们点击button时，在页面上，count一共更新了一次，也就是说冒泡结束后才执行的更新**
```html
<div id="app">
	<div @click="click2">
		<button  @click="click1">
			{{count}}
		</buttton>
	</div>
</div>
<script>
	var app = new Vue({
		el: "#app",
		data: {
			count:0,
		},
		methods: {
			click1() {
				//debugger
				this.count = 1;
				
			},
			click2(){
				//debugger
				this.count = 2;
			}
		}
	});
</script>
```

### 2.61版本

**说明：当我们点击button时，在页面上，count一共更新了两次（当然，这说的是当我们的浏览器内部支持Promise，MutationObserver时）**
::: tip
代码同上
:::

之所以重新改为微任务的原话：
```html
// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
//这里我们有使用微任务的异步延迟包装器。

//在2.5中，我们使用了（宏）任务（与微任务相结合）。

//然而，当状态在重新绘制之前被更改时，它会有一些微妙的问题

//（例如#6813，输出转换）。

//另外，在事件处理程序中使用（宏）任务会导致一些奇怪的行为

//这是无法回避的（例如#7109，#7153，#7546，#7834，#8109）。

//所以我们现在到处都在使用微任务。

//这种权衡的一个主要缺点是存在一些情况

//如果微任务的优先级太高，而且可能介于两者之间

//顺序事件（例如#4521，#6690，有解决办法）

//甚至是在同一事件的冒泡之间。
```

## vue2.x之diff算法


### 创建虚拟节点，并渲染到我们的页面上

我们以对象的形式表示一个个dom元素，然后每次更新的时候通过对比，在一定程度上可以复用而并非新建

假设我们的html如下

```html

<div id="app"></div>

```


```js

//用来创建虚拟dom节点
function h(tag,key,...children){
	children = children.map(child=>{
		if(typeof child === 'object'){
			return  child
		}else{
			return {
				undefined,undefined,undefined,text:child
			}
		}
	})
	return {
		tag,
		key,
		children
	}
}

//把虚拟dom转化为真是节点

function createElement(vnode){
	const { tag ,children,text} = vnode;
	if(typeof tag === 'string'){
		vnode.el = document.createElement(tag);
		children &&  children.forEach(child=>{
			render(child,vnode.el)
		})
	}else{
		vnode.el = document.createTextNode(text)
	}
	
	return vnode.el;
}

//创建render函数

function render(vnode,container){
	const el = createElement(vnode);
	container.appendChild(el);
}

//创建一个包含子节点的虚拟节点

var vnode = h("div",1,
			h("div","a","a"),
			h("div","b","b"),
			h("div","c","c"),
			h("div","d","d"),
		)
		
//执行我们的渲染函数

render(vnode,app)

```


### 通过diff算法优化更新

**分析：我们可以在每次拿旧的节点去比较新节点，如果节点的类型和key一样，我们就认为他们是一样的元素，直接复用旧的节点**

```js

//工具方法，判断是否是同一个dom

function sameVnode(oldVnode,newVnode){
	return oldVnode.tag === newVnode.tag && oldVnode.key === newVnode.key
}

//patch方法，拿新的节点比较旧的节点

function patch(oldVnode,newVnode){
	//假设两个元素的节点类型不同，直接拿新节点替换老节点 
	if(newVnode.tag !== oldVnode.tag){
		let el = createElement(newVnode);
		oldVnode.el.parentNode.replaceChild(el,oldVnode.el);
		return el;
	}
	//假设两个节点都是文字节点 ，如果节点不一样，直接拿新的文字替换老的文字 
	if(!oldVnode.tag){
		if (oldVnode.text !== newVnode.text) {
			oldVnode.el.textContent = newVnode.text
		}
		return oldVnode.el;
	}
	// 假设两个节点类型相同，我们直接拿旧节点赋给新节点
	let el = newVnode.el = oldVnode.el;
	let oldChildren = oldVnode.children || [];
	let newChildren = newVnode.children || [];
	// 子元素对比
	if(newChildren.length>0 && newChildren.length>0){
		//如果新旧节点都有子节点，那么我们去对比子节点
		updateChildren(el,oldChildren,newChildren)
	}else if(newChildren.length>0){
		//如果新节点 有子元素，而旧节点没有，我们 直接把新的子节点放入父元素中
		for (let i = 0; i < newChildren.length; i++) {
			let child = newChildren[i];
			el.appendChild(createElement(child))
		}
	}else if(oldChildren>0){
		//假设老节点 有子元素，而新节点没有，那么我们直接把元素的内容清空即可
		el.innerHTML = ''
	}
	return el;
}

```


**以上：更新子节点时，后面两种情况都很好理解，我们主要关注新旧节点都有的情况下时如何做对比的。请看下面代码**


### 对比更新子节点

#### 优化层面的对比

**说明：我们在操作dom时，一般会有几种操作**


#### 1，尾部插入元素。

例：
```js
//老节点
a,b,c,d
//新节点
a,b,c,d,e

function updateChildren(parentElm, oldCh, newCh){
	//双指针对比 
	let oldStartIndex = 0;
	let oldEndIndex = oldCh.length-1;
	let oldStartVnode = oldCh[0];
	let oldEndVnode = oldCh[oldEndIndex];
	
	let newStartIndex = 0;
	let newEndIndex = newCh.length-1;
	let newStartVnode = newCh[0];
	let newEndVnode = newCh[newEndIndex];
	
	while(oldStartIndex<=oldEndIndex && newStartIndex<=newEndIndex){
		//假设新节点的首个元素和旧节点的首个元素相同，那我们直接把复用老节点，并且新旧节点的头部指针都向后移位
		if(sameVnode(oldStartVnode,newStartVnode)){
			patch(oldStartVnode,newStartVnode)
			oldStartVnode = oldCh[++oldStartIndex];
			newStartVnode = newCh[++newStartIndex];
		}
	}
	//此时新节点的头部指针和新节点的尾部指针重合
	if(newStartIndex<=newEndIndex){
		for(let i=newStartIndex;i<=newEndIndex;i++){
			let el = newCh[newEndIndex+1] == null ? null : newCh[newEndIndex+1].el;
			//此时el为null,因此下方的操作 等同于 parentElm.appendChild(createElement(newCh[i]))
			parentElm.insertBefore(createElement(newCh[i]),el)
		}
	}
}

```


#### 2，往头部插入元素。
```js

//老节点
a,b,c,d
//新节点
e,a,b,c,d

function updateChildren(parentElm, oldCh, newCh){
	//双指针对比 
	//同上
	
	while(oldStartIndex<=oldEndIndex && newStartIndex<=newEndIndex){
		
		//假设新节点的末尾元素和旧节点的末尾元素相同，我们依旧直接把复用老节点，并且新旧节点的尾部指针都前移
		if(sameVnode(oldEndVnode,newEndVnode)){
			patch(oldEndVnode,newEndVnode);
			//尾指针前移
			oldEndVnode = oldCh[--oldEndIndex];
			newEndVnode = newCh[--newEndIndex];
		}
	}
	//此时新节点的头部指针和新节点的尾部指针重合为0
	if(newStartIndex<=newEndIndex){
		for(let i=newStartIndex;i<=newEndIndex;i++){
			//此时newCh[newEndIndex+1]指向新节点a
			let el = newCh[newEndIndex+1] == null ? null : newCh[newEndIndex+1].el;
			//此时el为a，节点a的el复用了旧节点的el
			//因此我们直接创建节点e的真实节点 并直接插入在节点a前
			parentElm.insertBefore(createElement(newCh[i]),el)
		}
	}
}


```


#### 3，交叉对比

**尾移头或者头移尾**

```js
//1，头移尾
//老节点 
a,b,c,d
新节点
b,c,d,a

或者

//2.尾移头
//老节点 
a,b,c,d
新节点
d,a,b,c,

再或者

//3.反转
 //老节点 
 a,b,c,d
 新节点
 d,c,b,a

function updateChildren(parentElm, oldCh, newCh){
			/*
			...
			*/
		while(oldStartIndex<=oldEndIndex && newStartIndex<=newEndIndex){
			
			if(sameVnode(oldStartVnode,newStartVnode)){
				/*
				...
				*/
			}else if(sameVnode(oldEndVnode,newEndVnode)){
				/*
				...
				*/
			}else if(sameVnode(oldStartVnode,newEndVnode)){
				//头移尾
				//a,b,c,d => b,c,d,a
				patch(oldStartVnode,newEndVnode)
				//把头部元素添加到尾部元素的下一个元素之前
				parentElm.insertBefore(oldStartVnode.el,oldEndVnode.el.nextSibling)
				//旧节点头部指针向后移
				oldStartVnode = oldCh[++oldStartIndex];
				//新节点尾部指针向前移
				newEndVnode = newCh[--newEndIndex];
			}else if(sameVnode(oldEndVnode,newStartVnode)){
				//尾移头
				//a,b,c,d => d,a,b,c
				patch(oldEndVnode,newStartVnode)
				//把尾部元素移动到头部元素之前
				parentElm.insertBefore(oldEndVnode.el,oldStartVnode.el)
				//旧节点尾指针向前移
				oldEndVnode = oldCh[--oldEndIndex];
				//新节点头部指针向后移
				newStartVnode = newCh[++newStartIndex];
			}
		}
		
		if(newStartIndex<=newEndIndex){
			for(let i=newStartIndex;i<=newEndIndex;i++){
				let el = newCh[newEndIndex+1] == null ? null : newCh[newEndIndex+1].el;
				parentElm.insertBefore(createElement(newCh[i]),el)
			}
		}
	}



```

**以上其实都是一些优化策略，那么如果是乱序呢？**

#### 乱序

老节点a,b,c,d

新节点e,a,f,c,g

**头和头不同，尾和尾不同，头和尾，尾和头，都不同，此时我们可以把旧节点用key生成一个映射表，然后每次在表里去找新节点，请看最后一种情况**

```js

function updateChildren(parentElm, oldCh, newCh){
	let oldStartIndex = 0;
	let oldEndIndex = oldCh.length-1;
	let oldStartVnode = oldCh[0];
	let oldEndVnode = oldCh[oldEndIndex];
	
	let newStartIndex = 0;
	let newEndIndex = newCh.length-1;
	let newStartVnode = newCh[0];
	let newEndVnode = newCh[newEndIndex];
	
	let map = createIndexByKey(oldCh)
	
	while(oldStartIndex<=oldEndIndex && newStartIndex<=newEndIndex){
		
		if(!oldStartVnode){
			oldStartVnode = oldCh[++oldStartIndex]
		}else if(!oldEndVnode){
			oldEndVnode = oldCh[--oldEndIndex]
		}else if(sameVnode(oldStartVnode,newStartVnode)){
			patch(oldStartVnode,newStartVnode)
			oldStartVnode = oldCh[++oldStartIndex];
			newStartVnode = newCh[++newStartIndex];
		}else if(sameVnode(oldEndVnode,newEndVnode)){
			patch(oldEndVnode,newEndVnode)
			oldEndVnode = oldCh[--oldEndIndex];
			newEndVnode = newCh[--newEndIndex];
		}else if(sameVnode(oldStartVnode,newEndVnode)){
			patch(oldStartVnode,newEndVnode)
			parentElm.insertBefore(oldStartVnode.el,oldEndVnode.el.nextSibling)
			oldStartVnode = oldCh[++oldStartIndex];
			newEndVnode = newCh[--newEndIndex];
		}else if(sameVnode(oldEndVnode,newStartVnode)){
			patch(oldEndVnode,newStartVnode)
			parentElm.insertBefore(oldEndVnode.el,oldStartVnode.el)
			oldEndVnode = oldCh[--oldEndIndex];
			newStartVnode = newCh[++newStartIndex];
		}else{
			//乱序
			//用旧的节点的key生成一个映射表，那新的节点的key再映射表里面寻找，找到就做移动操作，找不到就直接插入即可
			//debugger
			let  findedIndex = map[newStartVnode.key];
			if(findedIndex){
				let findVnode = oldCh[findedIndex];
				//防止数组塌陷，此处置为空
				oldCh[findedIndex] = undefined;
				//当旧节点重有这个key时，直接把找到的这个节点元素移动到开始节点的前面
				parentElm.insertBefore(findVnode.el,oldStartVnode.el)
				patch(findVnode,newStartVnode)
			}else{
				//如果找不到，直接创建新节点，移动旧的开始节点前
				parentElm.insertBefore(createElement(newStartVnode),oldStartVnode.el)
				
			}
			//新节点头指针向后移动
			newStartVnode = newCh[++newStartIndex]
		}
	}
	
	if(newStartIndex<=newEndIndex){
		for(let i=newStartIndex;i<=newEndIndex;i++){
			let el = newCh[newEndIndex+1] == null ? null : newCh[newEndIndex+1].el;
			parentElm.insertBefore(createElement(newCh[i]),el)
		}
	}
	if(oldStartIndex <= oldEndIndex){
		for(let i=oldStartIndex;i<=oldEndIndex;i++){
			let child = oldCh[i];
			if(child){
				parentElm.removeChild(child.el)
			}
		}
	}
}

```

### 完整代码

```js

function createIndexByKey(children){
		let map = {};
		children.forEach((item,index)=>{
			if(item.key){
				map[item.key] = index
			}
		})
		return map;
	}
	function sameVnode(oldVnode,newVnode){
		return oldVnode.tag === newVnode.tag && oldVnode.key === newVnode.key
	}
	function patch(oldVnode,newVnode){
		if(newVnode.tag !== oldVnode.tag){
			let el = createElement(newVnode);
			oldVnode.el.parentNode.replaceChild(el,oldVnode.el);
			return el;
		}
		if(!oldVnode.tag){
			if (oldVnode.text !== newVnode.text) {
				oldVnode.el.textContent = newVnode.text
			}
			return oldVnode.el;
		}
		
		let el = newVnode.el = oldVnode.el;
		let oldChildren = oldVnode.children || [];
		let newChildren = newVnode.children || [];
		
		if(newChildren.length>0 && newChildren.length>0){
			updateChildren(el,oldChildren,newChildren)
		}else if(newChildren.length>0){
			for (let i = 0; i < newChildren.length; i++) {
				let child = newChildren[i];
				el.appendChild(createElement(child))
			}
		}else if(oldChildren>0){
			el.innerHTML = ''
		}
		return el;
	}
	function updateChildren(parentElm, oldCh, newCh){
		let oldStartIndex = 0;
		let oldEndIndex = oldCh.length-1;
		let oldStartVnode = oldCh[0];
		let oldEndVnode = oldCh[oldEndIndex];
		
		let newStartIndex = 0;
		let newEndIndex = newCh.length-1;
		let newStartVnode = newCh[0];
		let newEndVnode = newCh[newEndIndex];
		
		let map = createIndexByKey(oldCh)
		
		while(oldStartIndex<=oldEndIndex && newStartIndex<=newEndIndex){
			
			if(!oldStartVnode){
				oldStartVnode = oldCh[++oldStartIndex]
			}else if(!oldEndVnode){
				oldEndVnode = oldCh[--oldEndIndex]
			}else if(sameVnode(oldStartVnode,newStartVnode)){
				patch(oldStartVnode,newStartVnode)
				oldStartVnode = oldCh[++oldStartIndex];
				newStartVnode = newCh[++newStartIndex];
			}else if(sameVnode(oldEndVnode,newEndVnode)){
				patch(oldEndVnode,newEndVnode)
				oldEndVnode = oldCh[--oldEndIndex];
				newEndVnode = newCh[--newEndIndex];
			}else if(sameVnode(oldStartVnode,newEndVnode)){
				patch(oldStartVnode,newEndVnode)
				parentElm.insertBefore(oldStartVnode.el,oldEndVnode.el.nextSibling)
				oldStartVnode = oldCh[++oldStartIndex];
				newEndVnode = newCh[--newEndIndex];
			}else if(sameVnode(oldEndVnode,newStartVnode)){
				patch(oldEndVnode,newStartVnode)
				parentElm.insertBefore(oldEndVnode.el,oldStartVnode.el)
				oldEndVnode = oldCh[--oldEndIndex];
				newStartVnode = newCh[++newStartIndex];
			}else{
				//乱序
				//用旧的节点的key生成一个映射表，那新的节点的key再映射表里面寻找，找到就做移动操作，找不到就直接插入即可
				//debugger
				let  findedIndex = map[newStartVnode.key];
				if(findedIndex){
					let findVnode = oldCh[findedIndex];
					oldCh[findedIndex] = undefined;
					parentElm.insertBefore(findVnode.el,oldStartVnode.el)
					patch(findVnode,newStartVnode)
				}else{
					parentElm.insertBefore(createElement(newStartVnode),oldStartVnode.el)
					
				}
				newStartVnode = newCh[++newStartIndex]
			}
		}
		
		if(newStartIndex<=newEndIndex){
			for(let i=newStartIndex;i<=newEndIndex;i++){
				let el = newCh[newEndIndex+1] == null ? null : newCh[newEndIndex+1].el;
				parentElm.insertBefore(createElement(newCh[i]),el)
			}
		}
		if(oldStartIndex <= oldEndIndex){
			for(let i=oldStartIndex;i<=oldEndIndex;i++){
				let child = oldCh[i];
				if(child){
					parentElm.removeChild(child.el)
				}
			}
		}
	}

function h(tag,key,...children){
		children = children.map(child=>{
			if(typeof child === 'object'){
				return  child
			}else{
				return {
					undefined,undefined,undefined,text:child
				}
			}
		})
		return {
			tag,
			key,
			children
		}
	}
	var  app = document.getElementById("app");
	function createElement(vnode){
		const { tag ,children,text} = vnode;
		if(typeof tag === 'string'){
			vnode.el = document.createElement(tag);
			children &&  children.forEach(child=>{
				render(child,vnode.el)
			})
		}else{
			vnode.el = document.createTextNode(text)
		}
		
		return vnode.el;
	}
	function render(vnode,container){
		const el = createElement(vnode);
		container.appendChild(el);
	}
	var vnode = h("div",1,
			h("div","a","a"),
			h("div","b","b"),
			h("div","c","c"),
			h("div","d","d"),
		)
	render(vnode,app)
	var newVnode =  h("div",1,
			h("div","d","d"),
			h("div","a","a"),
			h("div","f","f"),
			h("div","c","c"),
			h("div","g","g"),
		)
	setTimeout(()=>{
		patch(vnode,newVnode)
	},2000)


```

**当然，真实的情况肯定是更加的复杂，比如说同一个节点相同的key，我们在patch中肯定还是要更新新旧props  style  attr等，然而这些并不是本节的重点**


### 关于key

#### 带有key的优化

**假如新旧节点如下**

```html
旧节点
<li key="a">a</li>
<li key="b">b</li>
<li key="c">c</li>
<li key="d">d</li>
新节点

<li key="d">d</li>
<li key="c">c</li>
<li key="b">b</li>
<li key="a">a</li>

```

如以上带有key，我们在比对的时候，直接移动复用就好了

**假设没有key**

```html
旧节点
<li>a</li>
<li>b</li>
<li>c</li>
<li>d</li>
新节点

<li>d</li>
<li>c</li>
<li>b</li>
<li>a</li>

```

如上，没有key，那么我们需要更新四次，即依次更改每一个li里面的内容


### 为什么有时候不建议用index作为key

```html
假设数据如下

list = [a,b,c,d]

循环后在html里

旧节点
<li key="0">a</li>
<li key="1">b</li>
<li key="2">c</li>
<li key="3">d</li>

新节点
<li key="0">d</li>
<li key="1">c</li>
<li key="2">b</li>
<li key="3">a</li>

```

**如上：我们在对比时本来可以直接移动复用的，但是此时，根据上面对比，会得到首位元素是相同的，然后依次更新其内容及其它，这完全是不必要的**