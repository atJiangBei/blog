# 节流和防抖

## 函数节流的思想
* **背景：**有些时候我们并不希望在事件持续触发的过程中太过频繁地去执行函数从而损耗大量的性能
* **典型事件：**onresize,onscroll,oninput,onkeypress,onmosemove
* **防抖**和**节流**是比较好的解决办法

## 函数节流
**《JavaScript高级程序设计》**在614页是这样介绍节流的，浏览器中某些计算和处理要比其他昂贵的多。连续尝试进行过多的Dom操作可能会导致浏览器挂起，甚至崩溃。为了绕开这个问题，我们可以使用定时器对该函数进行节流
函数节流背后的基本思想是指，某些代码不可以在没有间断的情况连续重复执行。第一次调用创建一个定时器，在指定的时间间隔之后运行代码。当第二次调用该函数时，它会清除前一次的定时器并设置另一个。如果前一个定时器已经执行过了，这个操作就没有意义。然而，如果前一个定时器尚未执行，其实就是将其替换为一个新的定时器。目的是只有在执行函数的请求停止了一段时间之后才执行。
```javascript
function throttle(method,context){
	clearTimeout(method.tId)
	method.tId = setTimeout(function(){
		method.call(context)
	},100)
}

```

我们的项目里常常会遇到吸顶菜单的需求：在页面滑动超过某个距离时让菜单定位在顶部，小于这个距离时回归原来的位置
我们通常这样写：
```javascript
const root = document.getElementById("root");
function fixedDiv(){
	console.log(1)
	root.style.position = 'fixed';
	root.style.marginTop = '0';
}
function staticDiv(){
	console.log(2)
	root.style.position = 'static';
	root.style.marginTop = '500px';
}
window.onscroll = function(){
	if(this.scrollY>500){
		throttle(fixedDiv)
	}else{
		throttle(staticDiv)
	}
}

```
以上：我们可以看到控制台，输出了很多的1，2，
* 接下来我们用上面提供的**函数节流**方法强化一下代码：

```javascript
window.onscroll = function(){
	if(this.scrollY>500){
		throttle(fixedDiv)
	}else{
		throttle(staticDiv)
	}
}
```

* 以上：throttle()函数接收两个参数，要执行的函数以及在哪个作用域中执行。函数内部首先清除之前设置的定时器，定时器ID是存储在函数的tId属性中。定时器代码使用call()方法来确保方法在适当的环境中执行。
* 问题：当我们一直滑动的时候，即使页面滑动距离超过了500，吸顶菜单也不会吸顶，只有滑动距离超过500并且停顿的时候才会触发我们想要的效果，这似乎并不是我们想要的，上面的节流方法并不是太适用我们这个场景。
* 思考：在这个场景下，我们要的效果应该是滑动的过程里要执行要执行的函数，但不能那么的频繁，我们需要控制这个执行的频率，而不是像上面那样不停的清除定时器又重新计时，在停顿的时候才触发。
* 总结：规定一个单位时间，在这个单位时间内，只能有一次触发事件的回调函数执行，如果在同一个单位时间内某事件被触发多次，只有一次能生效。
**我们修改一下函数：**我们利用闭包的特性，在我们连续滑动的过程中只有当后一次滑动的时候的时间戳大于上面某一次一定频率的时候触发我们想要触发的函数。

```javascript
function throttle(func) {
	let previous = 0;
	return function(s) {
		const now = Date.now(),
			_self = this,
			args = arguments;
		if (now - previous > s) {
			func.apply(_self, args);
			previous = now;
		}
	}
}
const fixedthrottle = throttle(fixedDiv);
const staticthrottle = throttle(staticDiv)
window.onscroll = function(){
	const Y = this.scrollY;
	if(Y>500){
		fixedthrottle(100)
	}else{
		staticthrottle(100)
	}
}

```

或者也可以这样实现：

```javascript
function throttle(func) {
    let timer;
    return function(s) {
        const args = arguments,
			_self = this;
        if (!timer) {
            timer = setTimeout(() => {
                timer = null;
                func.apply(_self, args)
            }, s)
        }
    }
}
```
以上：我们实现了我们想要的
## 函数的防抖
* **思考：**在某种连续触发的事件里我们并不需要函数连续的触发而造成性能的多度损耗，例如典型的搜索框事件里，假设我们用onkeypress事件监听键盘，在用户输入信息时请求数据，但是我们并不希望用户每按一下键盘就请求一次，而是在用户停顿的时候请求。
* **概念：**在事件被触发n秒后再执行回调，如果在这n秒内又被触发，则重新计时。

```javascript
function debonce(method,context){
	clearTimeout(method.tId)
	method.tId = setTimeout(function(){
		method.call(context)
	},300)
}
const textbox = document.getElementById("textbox");
function query(){
	console.log(textbox.value);//此处模拟发送请求
}
textbox.oninput = function(){
	debonce(query)
}

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
            func.apply(context, args)
        }, wait);
    }
}
textbox.oninput = debonce(query,300)
```
