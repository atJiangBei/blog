---
sidebar: auto
---

# 数组篇

## 求两数之和

来源：[力扣（LeetCode）](https://leetcode-cn.com/problems/two-sum)

**例：**
给定 nums = [2, 7, 11, 15], target = 9
因为 nums[0] + nums[1] = 2 + 7 = 9
所以返回 [0, 1]

解法1

```js

var twoSum = function(nums, target) {
	const map = {};
	const length = nums.length;
	for(let i=0;i<nums.length;i++){
		let num = nums[i];
		if(map[target-num] !== undefined){
			return [i,map[target-num]]
		}else{
			map[num] = i
		}
	}
};

```


## 移除元素

来源：[力扣（LeetCode）](https://leetcode-cn.com/problems/remove-element)

**说明：**

给你一个数组 nums 和一个值 val，你需要 原地 移除所有数值等于 val 的元素，并返回移除后数组的新长度。
不要使用额外的数组空间，你必须仅使用 O(1) 额外空间并 原地 修改输入数组。
元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素。




示例：1

给定 nums = [3,2,2,3], val = 3,

函数应该返回新的长度 2, 并且 nums 中的前两个元素均为 2。

示例：2

给定 nums = [0,1,2,2,3,0,4,2], val = 2,

函数应该返回新的长度 5, 并且 nums 中的前五个元素为 0, 1, 3, 0, 4。

注意这五个元素可为任意顺序。

**解法一：**

删除符合元素 ，返回删除后的数组长度

```js

var removeElement = function(nums, val) {
     for(let i=0;i<nums.length;i++){
            if(nums[i] === val){
                nums.splice(i,1)
				i--
            }
        }
	return nums.length
};

```

**解法二：**

遇到不符合的元素就往前面放

```js

var removeElement = function(nums, val) {
    let res = 0;
    for(let i = 0; i < nums.length; i++){
        if(nums[i] !== val){
            nums[res++] = nums[i];
        }
    }
    return res;
};

```


## 删除排序数组中的重复项

来源：[力扣（LeetCode）](https://leetcode-cn.com/problems/remove-duplicates-from-sorted-array/)

**说明：**
给定一个排序数组，你需要在 原地 删除重复出现的元素，使得每个元素只出现一次，返回移除后数组的新长度。
不要使用额外的数组空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成。

**示例：**

给定数组 nums = [1,1,2], 

函数应该返回新的长度 2, 并且原数组 nums 的前两个元素被修改为 1, 2。 

你不需要考虑数组中超出新长度后面的元素。


**解法一：**

先来一个常用解法

```js

var removeDuplicates = function(nums) {
    const map = {};
	for(let i=0;i<nums.length;i++){
		if(map[nums[i]]){
			nums.splice(i,1)
			i--
		}else{
			map[nums[i]] = true
		}
	}
	return nums.length
};

```

**解法二：**

查找当前项在数组内部的下标是不是当前项的下标

```js

var removeDuplicates = function(nums) {
    for(let i=0;i<nums.length;i++){
        if(nums.indexOf(nums[i]) !== i){
            nums.splice(i,1);
            i--;
        }
    }
    return nums.length;
};


```


**解法三：**

分析题目：
1.有序数组 
2.原地修改数组

```js

var removeDuplicates = function(nums) {
    if(!nums.length)return 0;
	let j=0;
	for(let i=1;i<nums.length;i++){
		if(nums[j] !== nums[i]){
			j++;
			nums[j] = nums[i]
		}
	}
	return j+1
};

```


## 搜索插入位置

来源：[力扣（LeetCode）](https://leetcode-cn.com/problems/search-insert-position/)

给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。

你可以假设数组中无重复元素。

示例 1:

输入: [1,3,5,6], 5
输出: 2
示例 2:

输入: [1,3,5,6], 2
输出: 1

```js

var searchInsert = function(nums, target) {
	for(let i=0;i<nums.length;i++){
		if(target <= nums[i]){
			return i
		}
	}
	return nums.length;
};

```


## 只出现一次的数字

来源：[力扣（LeetCode）](https://leetcode-cn.com/problems/single-number)

给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。

说明：

你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？

示例 1:

输入: [2,2,1]
输出: 1
示例 2:

输入: [4,1,2,1,2]
输出: 4


```js

var singleNumber = function(nums) {
	nums.sort((a,b)=>a-b)
	for(let i=0;i<nums.length;i++){
		if(nums[i] !== nums[i+1]){
			return nums[i]
		}else{
			i+=1
		}
	}
};

```


## 合并两个有序数组

来源：[力扣（LeetCode）](https://leetcode-cn.com/problems/merge-sorted-array/)

给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。

说明:

初始化 nums1 和 nums2 的元素数量分别为 m 和 n 。
你可以假设 nums1 有足够的空间（空间大小大于或等于 m + n）来保存 nums2 中的元素。
 

示例:

输入:
nums1 = [1,2,3,0,0,0], m = 3
nums2 = [2,5,6],       n = 3

输出: [1,2,2,3,5,6]

```js

var merge = function(nums1, m, nums2, n) {
	let end1 = m - 1;
	let end2 = n - 1;
	let k = m + n - 1;
	while (end1 >= 0 && end2 >= 0) {
		if (nums1[end1] >= nums2[end2]) {
			nums1[k] = nums1[end1];
			k--;
			end1--;
		} else {
			nums1[k] = nums2[end2]
			k--;
			end2--;
		}
	}
	while(end2>=0){
		nums1[k] = nums2[end2]
		k--;
		end2--
	}
};

```



## 旋转数组

来源：[力扣（LeetCode）](https://leetcode-cn.com/problems/rotate-array/)

给定一个数组，将数组中的元素向右移动 k 个位置，其中 k 是非负数。

示例 1:

输入: [1,2,3,4,5,6,7] 和 k = 3
输出: [5,6,7,1,2,3,4]
解释:
向右旋转 1 步: [7,1,2,3,4,5,6]
向右旋转 2 步: [6,7,1,2,3,4,5]
向右旋转 3 步: [5,6,7,1,2,3,4]
示例 2:

输入: [-1,-100,3,99] 和 k = 2
输出: [3,99,-1,-100]
解释: 
向右旋转 1 步: [99,-1,-100,3]
向右旋转 2 步: [3,99,-1,-100]
说明:

尽可能想出更多的解决方案，至少有三种不同的方法可以解决这个问题。
要求使用空间复杂度为 O(1) 的 原地 算法。


```js

var rotate = function(nums, k) {
	let newnums = nums.splice(nums.length-k);
	for(let i=newnums.length-1;i>=0;i--){
		nums.unshift(newnums[i])
	}
	return nums
};

```

## 移动零

来源：[力扣（LeetCode）](https://leetcode-cn.com/problems/move-zeroes/)

给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。

示例:

输入: [0,1,0,3,12]
输出: [1,3,12,0,0]
说明:

必须在原数组上操作，不能拷贝额外的数组。
尽量减少操作次数。

```js

var moveZeroes = function(nums) {
	let lastIndex = nums.slice().sort((a,b)=>a-b).lastIndexOf(0)+1;
	if(lastIndex<1)return;
	let count = 0;
	for(let i=0;i<nums.length,count<=lastIndex;i++){
		const num = nums[i];
		if(num === 0){
			nums.splice(i,1);
			nums.push(0)
			i--;
			count++
		}
	}
	return nums
};

```


```js

//交换位置
//[0，1，0，3，12]
//[1，0，0，3，12]
//[1，3，0，0，12]
//[1，3，12，0，0]

var moveZeroes = function(nums) {
  let j = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] != 0) [nums[j++], nums[i]] = [nums[i], nums[j]]; 
  }
};

```



## 存在重复元素

来源：[力扣（LeetCode）](https://leetcode-cn.com/problems/contains-duplicate/)

给定一个整数数组，判断是否存在重复元素。

如果任意一值在数组中出现至少两次，函数返回 true 。如果数组中每个元素都不相同，则返回 false 。

 

示例 1:

输入: [1,2,3,1]
输出: true
示例 2:

输入: [1,2,3,4]
输出: false
示例 3:

输入: [1,1,1,3,3,4,3,2,4,2]
输出: true


```js

/**
 * @param {number[]} nums
 * @return {boolean}
 */
var containsDuplicate = function(nums) {
	nums.sort((a,b)=>a-b);
	const max = nums.length-1
	for(let i=0;i<max;i++){
		if(nums[i] === nums[i+1] ){
			return true;
		}
	}
	return false;
};

```


## 两个数组的交集

来源：[力扣（LeetCode）](https://leetcode-cn.com/problems/intersection-of-two-arrays/)

给定两个数组，编写一个函数来计算它们的交集。


示例 1：

输入：nums1 = [1,2,2,1], nums2 = [2,2]
输出：[2]
示例 2：

输入：nums1 = [4,9,5], nums2 = [9,4,9,8,4]
输出：[9,4]
 

说明：

输出结果中的每个元素一定是唯一的。
我们可以不考虑输出结果的顺序。

```js

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
// var intersection = function(nums1, nums2) {
// 	return [...new Set(nums1)].filter(x=>new Set(nums2).has(x))
// };

var intersection = function(nums1, nums2) {
	let  min = nums1;
	let  max = nums2;
	if(min.length > max.length){
		min = nums2;
		max = nums1;
	}
	let i=0;
	let ns = [];
	while(i<min.length){
		if(max.indexOf(min[i]) > -1){
			if(ns.indexOf(min[i]) < 0){
				ns.push(min[i])
			}
		}
		i++
	}
	return ns
};

```

## 两个数组的交集 II

来源：[力扣（LeetCode）](https://leetcode-cn.com/problems/intersection-of-two-arrays-ii/)

给定两个数组，编写一个函数来计算它们的交集。

 

示例 1：

输入：nums1 = [1,2,2,1], nums2 = [2,2]
输出：[2,2]
示例 2:

输入：nums1 = [4,9,5], nums2 = [9,4,9,8,4]
输出：[4,9]
 

说明：

输出结果中每个元素出现的次数，应与元素在两个数组中出现次数的最小值一致。
我们可以不考虑输出结果的顺序。


```js

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function(nums1, nums2) {
	const map = {};
	const res = [];
	  for (const val of nums1) { 
	    if (map[val]) {
	      map[val]++;  
	    } else {         
	      map[val] = 1; 
	    }
	  }
	  for (const num2 of nums2) { 
	    const val = map[num2];
	    if (val > 0) {            
	      res.push(num2);         
	      map[num2]--;           
	    }
	  }
	  return res;
}


```


##  缺失数字

来源：[力扣（LeetCode）](https://leetcode-cn.com/problems/missing-number/)

给定一个包含 0, 1, 2, ..., n 中 n 个数的序列，找出 0 .. n 中没有出现在序列中的那个数。

 

示例 1:

输入: [3,0,1]
输出: 2
示例 2:

输入: [9,6,4,2,3,5,7,0,1]
输出: 8


```js

/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function(nums) {
	nums.sort((a,b)=>a-b);
	for(let i=0;i<nums.length-1;i++){
		if(nums[i] + 1 !== nums[i+1]){
			return nums[i] + 1;
		}
	}
	if(nums.indexOf(0)<0){
		return 0
	}else{
		return nums[nums.length-1] + 1
	}
};

```


## 反转字符串

来源：[力扣（LeetCode）](https://leetcode-cn.com/problems/reverse-string/)

编写一个函数，其作用是将输入的字符串反转过来。输入字符串以字符数组 char[] 的形式给出。

不要给另外的数组分配额外的空间，你必须原地修改输入数组、使用 O(1) 的额外空间解决这一问题。

你可以假设数组中的所有字符都是 ASCII 码表中的可打印字符。

 

示例 1：

输入：["h","e","l","l","o"]
输出：["o","l","l","e","h"]
示例 2：

输入：["H","a","n","n","a","h"]
输出：["h","a","n","n","a","H"]
*/

**解法1**

```js

var reverseString = function(s) {
    s.reverse()
    return s;
};

```

**解法2**

```js

/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */

var reverseString = function(s) {
    let start = Math.ceil(s.length/2);
	for(let i=0;i<start;i++){
		[s[i],s[s.length-1-i]] = [s[s.length-1-i],s[i]]
	}
	return  s;
};


```

## 找到所有数组中消失的数字

来源：[力扣（LeetCode）](https://leetcode-cn.com/problems/find-all-numbers-disappeared-in-an-array/)

给定一个范围在  1 ≤ a[i] ≤ n ( n = 数组大小 ) 的 整型数组，数组中的元素一些出现了两次，另一些只出现一次。

找到所有在 [1, n] 范围之间没有出现在数组中的数字。

您能在不使用额外空间且时间复杂度为O(n)的情况下完成这个任务吗? 你可以假定返回的数组不算在额外空间内。

示例:

输入:
[4,3,2,7,8,2,3,1]

输出:
[5,6]

```js

/**
 * @param {number[]} nums
 * @return {number[]}
 */

var findDisappearedNumbers = function(nums) {
    let arr = []
    for (let i=1;i<=nums.length;i++) {
        if(nums.indexOf(i) === -1) arr.push(i)
    }
    return arr
};

```

## 只出现一次的数字 II

难度等级：II

来源：[力扣（LeetCode）](https://leetcode-cn.com/problems/single-number-ii/)

给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现了三次。找出那个只出现了一次的元素。

说明：

你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？

示例 1:

输入: [2,2,3,2]
输出: 3
示例 2:

输入: [0,1,0,1,0,1,99]
输出: 99


```js

/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
        nums.sort((a,b)=>a-b)
		for(let i=0;i<nums.length;i++){
			if(nums[i] !== nums[i+1]){
				return nums[i]
			}else{
				i+=2
			}
		}
};

```