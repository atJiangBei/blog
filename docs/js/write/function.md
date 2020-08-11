# 函数

## call

```javascript

Function.prototype.myCall = function(){
	const arr = [...arguments];
	const obj = arr.shift() || window;
	obj.fn = this;
	const result = obj.fn(...arr);
	delete obj.fn
	return result;
}
	
console.log(Math.max.myCall(null,1,2,3))


```

## apply

```javascript

Function.prototype.myApply = function(){
	const arr = [...arguments];
	const obj = arr[0] || window;
	obj.fn = this;
	const result = obj.fn(...arr[1]);
	delete obj.fn
	return result;
}
console.log(Math.max.myApply(null,[1,2,5]))


```

## bind

```javascript

Function.prototype.myBind = function(){
	const _this = this;
	const fn = [].shift.call(arguments) || window;
	return function(){
		return _this.apply(fn,arguments)
	}
}


console.log(Math.max.myBind(null)(1,3,6))


```