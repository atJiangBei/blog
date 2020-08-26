# WebWorker


详细介绍请看[MDN文档](https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker)，兼容性实在太差了。

**web worker 是运行在后台的 JavaScript，独立于其他脚本，不会影响页面的性能。您可以继续做任何愿意做的事情：点击、选取内容等等，而此时 web worker 在后台运行。**

## 不会按时触发的延时器

**创建一个延时器，输出时间差**

```js
var start = Date.now();
setTimeout(()=>{
	console.log(Date.now()-start)
},500)
var a = 0;
for(var i=0;i<1000000000;i++){
	a++
}
console.log("结束",a,Date.now()-start)
//第一次输出 结束 1000000000 1656
//第二次输出 1658
```

**分析：**由于setTimeout是一个异步的，所以以上代码，当浏览器遇到延时器时，先把其放入宏任务队列，然后计时。接下来走当前任务队列里的其它代码（下面的for循环），for循环走完后，时间已经超过了延时器设定的时间，所以直接执行延时器内部的函数。所以此时延时器内部函数输出的毫秒数为for循环执行的时长。


**或者按下面这样**

```js
var start = Date.now();

var a = 0;
for(var i=0;i<1000000000;i++){
	a++
}
console.log("结束",a,Date.now()-start)
setTimeout(()=>{
	console.log(Date.now()-start)
},500)
//第一次输出 结束 1000000000 1788
//第二次输出 2289
```

**分析：**以上代码，浏览器先遇到for循环，然后直接执行，执行完之后遇到延时器，直接压入宏任务队列，然后当前主线程执行完，500毫秒后直接执行函数。所以此时延时器内部函数输出的毫秒数为上面for循环执行的时长 加上 延时器延时



## 引入webworker

**以上两种方式，都无法让我们在500毫秒执行延时器内部的函数，因此我们可以考虑把for循环放在主线程之外的地方执行**

```js
//worker.js
var  startWork = Date.now();
var a = 0;
for(var i=0;i<1000000000;i++){
	a++
}
console.log("结束",a,Date.now()-startWork)
postMessage(i)
```

```js
//主程序
var w = new Worker("worker.js");

var start = Date.now();

setTimeout(()=>{
	console.log(Date.now()-start)
},500)

//第一次输出 502
//第二次输出 结束 1000000000 1624
```

**以上：我们如愿以偿的实现了我们想要的**


**未完待续（由于兼容性太差，择日再更）···**