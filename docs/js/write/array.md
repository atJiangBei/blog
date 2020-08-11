# 数组

## reduce

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

## map

## forEach

## splice

## slice

## some

## every