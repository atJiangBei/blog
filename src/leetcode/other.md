---
sidebar: auto
---

# 其它

## 爬楼梯

假如有一段楼梯，可以一下上两阶，也可以一下上一阶，给定楼梯总阶数，问一共有多少种方法上去

**例子：**
1，一共一阶楼梯，所以结果为 1
2，一共两阶楼梯，可以一次一个台阶，也可以一次两个台阶（1+1，2），结果为 2
3，一共有三阶楼梯，方法依次为（1+1+1，1+2，2+1），结果为 3
4，一共有四阶楼梯，方法依次为 1+1+1+1，1+1+2，2+1+1，1+2+1，2+2，结果为 5

**解：**
我们可以看到，当总数为 1 或者 2 时，答案就是很明显的，之后，
假如：
当台阶总量为 n-2 时 有 x 种方法
当台阶总量为 n-1 时 有 y 种方法
那么当台阶总量为 n 时 有 x+y 种方法

解法一：

```js
const getClimbStairs = (nums) => {
  if (nums === 1) {
    return 1;
  }
  if (nums === 2) {
    return 2;
  }
  return getClimbStairs(nums - 1) + getCount(nums - 2);
};
```

解法二：我们可以把每一次的结果存起来

```js
const getClimbStairs = (nums) => {
  const arr = [];
  arr[0] = 0;
  arr[1] = 1;
  arr[2] = 2;
  for (let i = 3; i <= nums; i++) {
    arr[i] = arr[i - 1] + arr[i - 2];
  }
  return arr[nums];
};
```
