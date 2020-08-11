# 原型和原型链


## 原型
* 原型分为显式原型(prototype)和隐式原型(__proto__)
* **原型对象：**当我们创建了一个函数，就会根据某种特定的规则为该函数创建一个prototype属性，这个属性指向函数的原型对象。
* Object.getPrototypeOf()方法用来返回一个对象的原型

## 构造函数
* 每个函数都有prototype(原型)属性，这个属性是一个指针，指向一个对象，这个对象会自动获得一个constructor（**构造函数**）属性，这个属性包含了一个指向prototype属性所在函数的指针
* 当该函数作为构造函数生成实例时，实例对象直接继承其prototype上面得方法及属性

## prototype 和 __proto__

* 每个实例内部都有一个指向原型对象的指针，即__proto__属性
* __proto__是每个对象都有的属性，目前所有浏览器（包括ie11）都部署了这个属性。
* __proto__用来读取或设置当前对象的prototype对象（该属性并没有写入es6正文，而是附录，前后双下划线，说明本质是一个内部属性）
（因此从语义和兼容性考虑，不要使用这个属性，而是用 Object.setPrototypeOf(),Object.getPrototypeOf(),Object.create()代替）
```javascript
function B(){}

//即
 B.prototype.constructor === B
//即
 B.prototype.__proto__ === Object.prototype 

var b = new B()

b.__proto__ === B.prototype


var a1 = {}

a1.__proto__ === Object.prototype

var a2 = []

a2.__proto__ === Array.prototype

```
## 原型链
在js里，__proto__是每个对象都有的属性，当js引擎查找该对象某一个属性时，会先查找该对象本身有没有该属性，如果不存在，
就会在其__proto__属性上面寻找，如果仍然没有，__proto__属性仍是一个对象，仍然有其__proto__属性，以此类推，
这一条用__proto__连起来的线就叫做原型链

```javascript
var c = {name:"proto"}

var d = Object.create(c)

//d.name->proto

var e = Object.create(d)

//e.name->proto

//即 
d.__proto__ === c
e.__proto__ === d

e.__proto__.__proto__ === d.__proto__

Array.prototype.__proto__ === Object.prototype
Date.prototype.__proto__ === Object.prototype
RegExp.prototype.__proto__ === Object.prototype

```