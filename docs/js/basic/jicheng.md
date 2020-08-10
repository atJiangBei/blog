# js的继承

## 原型链继承
* 将子类的原型设置为父类的实例，这样通过原型链继承父类的方法及属性

```javascript

function Parentclass(name){
	this.name = name || "伟大的父类"
	this.familyMembers = ["媳妇"]
}
Parentclass.prototype.sayName = function (){
	console.log(this.name)
}

function Childrenclass(){}
Childrenclass.prototype = new Parentclass()
Childrenclass.prototype.name = "子类"
const child = new Childrenclass()
child.sayName()
console.log(child.familyMembers)
//["媳妇"]
const child1 = new Childrenclass()
child1.familyMembers.push("儿子")
console.log(child1.familyMembers)
//["媳妇", "儿子"]
console.log(child.familyMembers)
//["媳妇", "儿子"]

```
**总结：**
以上的继承方式很简单，但是又不能传参，所有的子类又同时共享了父类的属性


## 构造函数继承
* 在子类的构造函数中继承父类的构造函数

```javascript

function Parentclass(name){
	this.name = name || "伟大的父类"
}
Parentclass.prototype.sayName = function (){
	console.log(this.name)
}
function Parentclass1(name){
	this.maxAge = 1000
}
function Childrenclass(){
	Parentclass.call(this)
}
const child = new Childrenclass();
console.log(child.name)
//伟大的父类
function Childrenclass1(name){
	Parentclass.call(this,name)
	this.name = name || "子类"
}
const child1 = new Childrenclass1();
console.log(child1.name)
//子类
function Childrenclass2(name){
	Parentclass.call(this,name)
	Parentclass1.call(this)
}
const child2 = new Childrenclass2("我是子类2");
console.log(child2.name)
console.log(child2.maxAge)
//我是子类2
//1000
console.log(child instanceof Parentclass); // false
console.log(child instanceof Childrenclass); // true
child2.sayName()
//err TypeError: child1.sayName is not a function

```

**总结：**
构造函数继承我们实现了子类可以给父类传参，同时子类也可以继承多个父类。但是此种模式下，子类并不是父类的实例，只是子类的实例，
并且子类只继承了父类的实例属性和方法，并没有继承父类原型（prototype）上的属性和方法，当然，我们可以把父类原型上面的方法和属性直接定义在父类本身，
这样所有的子类都可以继承，但是如此一来，每个子类生成一份实例，都会初始化一遍这些方法，由此也失去了函数复用的能力


## 组合继承
* **组合继承**有时候也叫作伪经典继承，指的是将原型链和借用构造函数的技术组合在一块儿，从而发挥二者之长的一种继承模式。
* 使用原型链实现对原型属性和方法的继承，而通过借用构造函数来实现对实例属性的继承，这样，既通过在原型上定义方法实现了函数复用，又能够保证么每个实例都有自己的属性。
* 子类通过构造函数继承父类的属性，通过原型链直接继承父类的方法，再重新将子类的构造函数重新指向子类

```javascript
function Parentclass(name){
	this.name = name || "伟大的父类"
}
Parentclass.prototype.sayName = function (){
	console.log(this.name)
}
function Childrenclass(name,age){
	Parentclass.call(this,name);//第二次调用Parentclass
	this.age = age || 18
}
console.log(new Childrenclass().constructor === Childrenclass)
//true
Childrenclass.prototype = new Parentclass();;//第一次调用Parentclass
//以上 子类构造函数通过原型继承父类原型链上面的属性和方法
console.log(new Childrenclass().constructor === Parentclass)
//true
console.log(new Childrenclass().constructor === Childrenclass)
//false
//以上 此时子类的构造函数指向了父类，这是不合理的，因此：
Childrenclass.prototype.constructor = Childrenclass
const child = new Childrenclass();
console.log(child.constructor === Childrenclass)
//true
console.log(child instanceof Parentclass); // true
console.log(child instanceof Childrenclass); // true
```
**总结：**
组合继承实现了子类继承了父类的实例属性和方法，也继承了父类原型（prototype）上的属性/方法，实现了函数的复用
同时每个子类在实例化的同时内部又执行了一遍Parentclass.call(this),由于每个子类的实例的this都是唯一的，这样避免了属性的共享
但是这种方式每次都要多实例化一遍父类，而其最大的问题是每次都会调用两次超类型的构造函数

## 实例继承
```javascript
function Parentclass(name){
	this.name = name || "伟大的父类"
}
Parentclass.prototype.sayName = function (){
	console.log(this.name)
}
function Childrenclass(age){
	const parent = Object.create(new Parentclass())
	parent.name = name || "子类"
	parent.age = age || 18
	return parent;
}
const child = new Childrenclass()
console.log(child instanceof Parentclass)
//true
console.log(child instanceof Childrenclass)
//false
```
**总结：**
实例继承的子类可以不用new调用，可以直接Childrenclass()调用，但是实例是父类的实例却不是子类的实例


## 寄生式继承
* 寄生式继承是于原型式继承紧密相关的一种思路。寄生式基础的思路与寄生构造函数和工厂模式类似，既创建一个仅用于封装继承过程的函数，该函数内部以某种方式来增强对象，最后再像真地是它做了所有工作一样返回对象
* 寄生式继承是原型式继承（之所以没拿出来作为一个大节介绍，是因为我感觉这样的意义很小）的加强版，在拿到对象的基础上，在内部再来增强对象，最后返回
* 此种方式主要考虑对象而不是自定义类型和构造函数
### 原型式继承
* 不使用严格意义上的构造函数
* 借助原型基于已有的对象创建新的对象

```javascript
//定义一个方法
const createObj = Object.create || function (obj){
	function Temporary(){}
　　Temporary.prototype = obj;
　　 return new Temporary();
}

const Parent = {
	name:"父类",
	sayName(){
		console.log(this.name)
	}
}
const child = createObj(Parent)
child.name = "子类"
child.sayName()
```
原型式继承要求你必须有一个对象可以作为另一个对象的基础，Object.create()规范了原型式继承

### 加强版（寄生式继承）

```javascript
function CreateChildren(obj){
	const Temporary = createObj(obj)
	Temporary.sayAge = function(){
		console.log(this.age)
	}
	return Temporary;
}
const Parent1 = {
	name:"父类",
	age:1000,
	sayName(){
		console.log(this.name)
	}
}
const child1 = new CreateChildren(Parent1)
child1.sayAge()
//1000
```
**总结：**
感觉没有什么可说的

## 寄生组合式继承
* 组合继承其实已经很完美了，但是下面的方式更加完美

```javascript
const createObj = Object.create || function (obj){
	function Temporary(){}
　　Temporary.prototype = obj;
　　 return new Temporary();
}

function Parentclass(name){
	this.name = name || "伟大的父类"
}
Parentclass.prototype.sayName = function (){
	console.log(this.name)
}
function Childrenclass(name,age){
	Parentclass.call(this,name)
	this.age = age || 18
}
Childrenclass.prototype.sayAge = function (){
	console.log(this.age)
}
Childrenclass.prototype = createObj(Parentclass.prototype);//这里不再使用父类的实例去继承其原型链而是直接指向父类的原型
Childrenclass.prototype.constructor = Childrenclass
const child = new Childrenclass("子类")
child.sayName()
//子类
child.sayAge()
child.sayAge is not a function
```

以上：createObj(Parentclass)覆盖了前面我们加在子类原型上面的方法，因此我们可以借助es6修改如下

```javascript

~~Childrenclass.prototype = createObj(Parentclass.prototype)~~
Object.setPrototypeOf(Childrenclass.prototype,createObj(Parentclass.prototype));
//子类的原型复制父类的原型指针

console.log(child instanceof Parentclass); // true
console.log(child instanceof Childrenclass); // true

```