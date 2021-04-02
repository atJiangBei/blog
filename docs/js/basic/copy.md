# 浅拷贝和深拷贝

## 基本类型和引用类型

Javascript有六种数据类型
基本数据类型（原始类型）：Undefined，Null，Boolean，Number，String
引用数据类型：Object

### 基本数据类型
* 基本类型的值是不能添加属性的
* 它们的值在内存中占据着固定大小的空间，并被保存在栈内存中。
* 当一个变量向另一个变量复制基本类型的值，则会创建相同的值赋给它

### 引用数据类型
* 引用数据类型的值为对象，保存在堆内存中
* 包含引用类型的变量值并不是对象本身，而是一个指向该对象的指针
* 当一个变量从另一个变量复制引用类型的值得时候，其实只是复制了一个指向该对象的指针，两个变量同时指向该对象

## 浅拷贝

```javascript

const obj1 = {name:"小明"};

const obj2 = obj1;

obj2.name = "大明"

console.log(obj1.name);
//大明
```

**以上：**由于对象是引用类型，obj1和obj2指向的是同一个 引用地址

## 深拷贝


```javascript


function copyDeep(obj){
		if(!obj)return obj;
		if(typeof obj !== 'object')return obj;
		const newObj = {};
		for(let k in obj){
			if(typeof obj[k] === 'object'){
				newObj[k] = copyDeep(obj[k])
			}else{
				newObj[k] = obj[k];
			}
		}
		return newObj;
	}
	
	const obj1 = {
		name:"老明",
		next:{
			name:"小明"
		}
	};
	
	const obj2 = copyDeep(obj1);
	
	obj2.name = "大明"
	console.log(obj2.name);//小明
	console.log(obj1.next === obj2.next);//false
	console.log(obj1.next === obj2.next);//false

```

## 循环引用的深拷贝

```javascript
function typeofSelf(obj){
		return {}.toString.call(obj)
	}
	
	function copyDeep(obj){
		const weakMap = new WeakMap();
		function copyObj(obj){
			if(weakMap.get(obj)){
				return weakMap.get(obj);
			}
			let result = {};
			
			if(typeofSelf(obj) === '[object Object]'){
				weakMap.set(obj,result);
				Object.keys(obj).forEach(key=>{
					if(typeof obj[key] === 'object'){
						result[key] = copyObj(obj[key])
					}else{
						result[key] = obj[key];
					}
					
				})
			}else if(typeofSelf(obj) === '[object Array]'){
				result = [];
				weakMap.set(obj,result);
				obj.forEach((item,index)=>{
					if(typeof item === 'object'){
						result[index] = copyObj(item)
					}else{
						result[index] = item;
					}
					
				})
			}
			
			return result;
		}
		return copyObj(obj)
	}
	const obj2= {
	    a: {
	        name: 'a'
	    },
	    b: {
	        name: 'b'
	    },
	    c: {
			e:[]
	    }
	};
	obj2.c.e.push(obj2);
	
	console.log(copyDeep(obj2))


```