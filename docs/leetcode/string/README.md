---
sidebar: auto
---

# 字符串

## 求最长公共前缀

**例：**
输入: ["flower","flow","flight"]
输出: "fl"

解法1

```js

var longestCommonPrefix = function(strs) {
		if(!strs.length)return '';
		strs.sort((a,b)=>a.length-b.length);
		let vlength = strs[0].length;
		for(let i = 1;i<strs.length;i++){
			let flag = false;
			while(vlength!==0 && flag === false){
				let o = strs[0].substring(0,vlength);
				let n = strs[i].substring(0,vlength);
				if(o === n){
					flag = true
				}else{
					vlength--
				}
			}
		}
		return strs[0].substring(0,vlength)
};

```


## 有效的括号

**例：**

输入: "()[]{}"
输出: true

输入: "([)]"
输出: false

输入: "{[]}"
输出: true



```js

var isValid = function(s) {
	let arr = []
	let len = s.length
	if (len%2) return false
	for (let i = 0; i < len; i++) {
		let letter = s[i]
		switch(letter) {
			case "(": {
				arr.push(letter)
				break;
			}
			case "[": {
				arr.push(letter)
				break;
			}
			case "{": {
				arr.push(letter)
				break;
			}
			case ")": {
				if (arr.pop() !== "(") return false
				break;
			}
			case "]": {
				 if (arr.pop() !== "[") return false
				break;
			}
			case "}": {
				if (arr.pop() !== "{") return false
				break;
			}
		}
	}
	return !arr.length
};



```


## 回文数

来源：[力扣（LeetCode）](https://leetcode-cn.com/problems/palindrome-number)

**说明：**

判断一个整数是否是回文数。回文数是指正序（从左向右）和倒序（从右向左）读都是一样的整数。

示例 1:

输入: 121
输出: true
示例 2:

输入: -121
输出: false
解释: 从左向右读, 为 -121 。 从右向左读, 为 121- 。因此它不是一个回文数。


```js

var isPalindrome = function(x) {
	if(x<0)return false;
	x = String(x);
	let s = 0;
	let e = x.length-1;
	while(s<=e){
		if(x[s] === x[e]){
			s++;
			e--;
		}else{
			return false;
		}
	}
	return true;
};

```


## 最后一个单词的长度

来源：[力扣（LeetCode）](https://leetcode-cn.com/problems/length-of-last-word/)

**说明：**

给定一个仅包含大小写字母和空格 ' ' 的字符串 s，返回其最后一个单词的长度。如果字符串从左向右滚动显示，那么最后一个单词就是最后出现的单词。

如果不存在最后一个单词，请返回 0 。

说明：一个单词是指仅由字母组成、不包含任何空格字符的 最大子字符串。

输入: "Hello World"
输出: 5

输入: "a "
输出: 1

**解法一：**

```js

var lengthOfLastWord = function(s) {
	if(!s)return 0;
	let arr = s.trim().split(" ");
    return arr[arr.length-1].length
};

```

**解法二：**

```js

var lengthOfLastWord = function(s) {
	if(!s)return 0;
	s = s.trim();
	s = ' '+s;
	let index = 0;
	for(let i=s.length-1;i>=0;i--){
		if(s[i] === ' '){
			index = i;
			break
		}
	}
	return s.length-1-index
};

```

## 字符串中的第一个唯一字符

给定一个字符串，找到它的第一个不重复的字符，并返回它的索引。如果不存在，则返回 -1。

 

示例：

s = "leetcode"
返回 0

s = "loveleetcode"
返回 2


```js

/**
 * @param {string} s
 * @return {number}
 */
var firstUniqChar = function(s) {
	for(let i=0;i<s.length;i++){
		if(s.indexOf(s[i]) === s.lastIndexOf(s[i])){
			return i;
		}
	}
	return -1;
};

```
