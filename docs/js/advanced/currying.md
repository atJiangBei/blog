# 柯里化

在计算机科学中，柯里化（Currying）是把接受多个参数的函数变换成接受一个单一参数(最初函数的第一个参数)的函数，并且返回接受余下的参数且返回结果的新函数的技术。
这个技术由 Christopher Strachey 以逻辑学家 Haskell Curry 命名的，尽管它是 Moses Schnfinkel 和 Gottlob Frege 发明的

## 示例1

```javascript
function add(a,b){
	return a+b
}
add(1,2);//3
//柯里化之后
function add1(a){
	return function (b){
		return a+b
	}
}
```

上面的例子看起来很简单，然而，似乎也没什么意义，请往下看：

## 示例2

```javascript
function add(a,b){
	return a+b
}
function factorial(a,b){
	return a*b
}
function currying(fn){
	const args = []
	return (...reset)=>{
		args.push(...reset)
		return (...reset2)=>{
			args.push(...reset2)
			return fn.apply(null,args)
		}
	}
}
const addcurry = currying(add)
console.log(addcurry(1)(2))
//3
const factorialcurry = currying(factorial)
console.log(factorialcurry(1)(2))
//2
```

## 示例3

```javascript
//原生的bind方法

console.log(Math.max.bind(null)(1,5));
//5
var a = "123";
var b = {
	a:"456",
	alert(){
		console.log(this.a)
	}
}
/* 
输出123 
 */

b.alert.bind(this)()
//123

//借助柯里化手动实现一个bind函数

function bind(fn,context){
	return function(){
		return fn.apply(context,arguments)
	}
}

bind(Math.max)(1,2);
//2
bind(b.alert,this)();
//123

```

## 示例4

递归式

```javascript

function curry(fn, args) {
    var length = fn.length;
    args = args || [];
    return function(){
        let connected = args.concat([...arguments]);
        if (connected.length < length) {
            return curry.call(this,fn,connected);
        }else{
            return fn.apply(this,connected);
        }
    }
}

function factorial(a,b,c){
	return a * b * c;
}
var factorialFn = curry(factorial);
factorialFn(2,3,4);//24
factorialFn(3)(3)(4);//36
factorialFn(4,2)(3);//24

function cumulative(a,b,c,d){
	return a + b + c + d
}
var cumulativeFn = curry(cumulative);

cumulativeFn(5,6,7,8);//26
cumulativeFn(5)(6)(7)(8);//26
cumulativeFn(5,6,7)(8);//26

```