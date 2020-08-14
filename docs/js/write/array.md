# 数组

## reduce

**说明：将数组元素计算为一个值（从左到右）。**

**语法**
```js
array.reduce(function(total, currentValue, currentIndex, arr), initialValue)
```

|  参数   | 描述  |
|  ----  | ----  |
| function(total,currentValue, index,arr)  | 必需。用于执行每个数组元素的函数。函数参数: |
| initialValue  | 可选。传递给函数的初始值 |

|  参数   | 描述  |
|  ----  | ----  |
| total  | 必需。初始值, 或者计算结束后的返回值 |
| currentValue  | 必需。当前元素 |
| currentIndex  | 可选。当前元素的索引 |
| arr  | 可选。当前元素所属的数组对象。 |

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

|  参数   | 描述  |
|  ----  | ----  |
| function(currentValue, index,arr)  | 必须。函数，数组中的每个元素都会执行这个函数函数参数: |
| thisValue  | 可选。对象作为该执行回调时使用，传递给函数，用作 "this" 的值。如果省略了 thisValue ，"this" 的值为 "undefined" |

|  参数   | 描述  |
|  ----  | ----  |
| currentValue  | 必须。当前元素的值 |
| index  | 可选。当前元素的索引值 |
| arr  | 可选。当前元素属于的数组对象 |

**实现**
```js
Array.prototype.myFilter = function(fn,thisValue){
		thisValue = thisValue || window;
		const arr = [];
		for(let i=0;i<this.length;i++){
			if(fn.call(thisValue,this[i],i,this)){
				arr.push(this[i])
			}
		}
		return arr;
	}
```


## map

**说明：通过指定函数处理数组的每个元素，并返回处理后的数组。**

**语法**
```js
array.map(function(currentValue,index,arr), thisValue)
```

|  参数   | 描述  |
|  ----  | ----  |
| function(currentValue, index,arr)	  | 必须。函数，数组中的每个元素都会执行这个函数函数参数: |
| thisValue  | 可选。对象作为该执行回调时使用，传递给函数，用作 "this" 的值。如果省略了 thisValue，或者传入 null、undefined，那么回调函数的 this 为全局对象。 |

|  参数   | 描述  |
|  ----  | ----  |
| currentValue  | 必须。当前元素的值 |
| index  | 可选。当前元素的索引值 |
| arr  | 可选。当前元素属于的数组对象 |

**实现**
```js
Array.prototype.myMap = function(fn,thisValue){
		thisValue = thisValue || window;
		const arr = [];
		for(let i=0;i<this.length;i++){
			arr.push(fn.call(thisValue,this[i],i,this))
		}
		return arr;
	}
```



## some

**说明：检测数组元素中是否有元素符合指定条件。**

**语法**
```js
array.some(function(currentValue,index,arr),thisValue)
```

|  参数   | 描述  |
|  ----  | ----  |
| function(currentValue, index,arr)	  | 必须。函数，数组中的每个元素都会执行这个函数函数参数: |
| thisValue  | 可选。对象作为该执行回调时使用，传递给函数，用作 "this" 的值。如果省略了 thisValue，或者传入 null、undefined，那么回调函数的 this 为全局对象。 |

|  参数   | 描述  |
|  ----  | ----  |
| currentValue  | 必须。当前元素的值 |
| index  | 可选。当前元素的索引值 |
| arr  | 可选。当前元素属于的数组对象 |

**实现**
```js
Array.prototype.mySome = function(fn,thisValue){
		thisValue = thisValue || window;
		const arr = [];
		for(let i=0;i<this.length;i++){
			if(fn.call(thisValue,this[i],i,this)){
				return true
			}
		}
		return false;
	}
```

## every

**说明：检测数值元素的每个元素是否都符合条件。**

**语法**
```js
array.every(function(currentValue,index,arr), thisValue)
```

|  参数   | 描述  |
|  ----  | ----  |
| function(currentValue, index,arr)	  | 必须。函数，数组中的每个元素都会执行这个函数函数参数: |
| thisValue  | 可选。对象作为该执行回调时使用，传递给函数，用作 "this" 的值。如果省略了 thisValue，或者传入 null、undefined，那么回调函数的 this 为全局对象。 |

|  参数   | 描述  |
|  ----  | ----  |
| currentValue  | 必须。当前元素的值 |
| index  | 可选。当前元素的索引值 |
| arr  | 可选。当前元素属于的数组对象 |

**实现**

```js
Array.prototype.myEvery = function(fn,thisValue){
		thisValue = thisValue || window;
		const arr = [];
		for(let i=0;i<this.length;i++){
			if(!fn.call(thisValue,this[i],i,this)){
				return false
			}
		}
		return true;
	}
```