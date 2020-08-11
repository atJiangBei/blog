# 对象

## 实现一个new操作符

```javascript
function Person(name,age){
	this.name = name
	this.age = age
}
Person.prototype.sayName = function(){
	console.log(this.name)
}

function New(fn){
	const obj = {};
	const arr = [].slice.call(arguments,1)
	fn.apply(obj,arr)
	Object.setPrototypeOf(obj,fn.prototype)
	return obj;
}
const obj = New(Person,"小米",18);
console.log(obj)
console.log(obj instanceof Person);//true

```


## instanceof
**定义：**instanceof 运算符用来测试一个对象在其原型链中是否存在一个构造函数的 prototype 属性
**例子**
```javascript
class A{
	
}
class B extends A{
	
}
const b = new B();
console.log(b instanceof B);//true
console.log(b instanceof A);//true

function ins_tanceof(cu,pr){
	let _pro = cu.__proto__;
	let pro = pr.prototype;
	while(true){
		if(_pro === null){
			return false;
		}
		if(_pro === pro){
			return true;
		}
		_pro = _pro.__proto__;
	}
}
console.log(ins_tanceof(b,B))
console.log(ins_tanceof(b,A))


```