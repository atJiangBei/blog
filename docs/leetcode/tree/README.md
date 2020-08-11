---
sidebar: auto
---

# 树

## 相同的树

给定两个二叉树，编写一个函数来检验它们是否相同。

如果两个树在结构上相同，并且节点具有相同的值，则认为它们是相同的。

示例 1:

输入:

```js
   1         1
  / \       / \
 2   3     2   3

[1,2,3],   [1,2,3]

```
输出: true
示例 2:

输入:      

```js
   1         1
  /           \
 2             2

[1,2],     [1,null,2]

```
输出: false
示例 3:

输入:      

```js
	 1         1
	/ \       / \
   2   1     1   2

  [1,2,1],   [1,1,2]

```
输出: false

```js

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */

var isSameTree = function(p, q) {
	if(!p&&!q){
		return true
	}else if(!p || !q){
		return false
	}else if(p.val === q.val){
		if(isSameTree(p.left,q.left)&&isSameTree(p.right,q.right)){
			return true
		}else{
			return false
		}
	}else{
		return false;
	}
};



```

## 对称二叉树

给定一个二叉树，检查它是否是镜像对称的。

 

例如，二叉树 [1,2,2,3,4,4,3] 是对称的。

```js
    1
   / \
  2   2
 / \ / \
3  4 4  3

```
 

但是下面这个 [1,2,2,null,3,null,3] 则不是镜像对称的:

```js
    1
   / \
  2   2
   \   \
   3    3

```

**递归**
```js

var isSymmetric = (root)=>{
	return  isMirror(root,root)
};
var isMirror = (t1,t2)=>{
    if(!t1 && !t2){
		return true;
	}
	if(!t1 || !t2 || t1.val !== t2.val){
		return false;
	}
	return isMirror(t1.left,t2.right) && isMirror(t1.right , t2.left)
}

```

**迭代**

```js

const isSymmetric = (root) => {
  if (!root) return true
  let queue = [root.left, root.right]
  while (queue.length > 0) {
    let t1 = queue.shift(), t2 = queue.shift()
    if (t1 === null && t2 === null) continue
    if (t1 === null || t2 === null || t1.val != t2.val) return false
    queue.push(t1.left, t2.right, t1.right, t2.left)
  }
  return true
}

```


## 二叉树的最大深度

给定一个二叉树，找出其最大深度。

二叉树的深度为根节点到最远叶子节点的最长路径上的节点数。

说明: 叶子节点是指没有子节点的节点。

示例：
给定二叉树 [3,9,20,null,null,15,7]，

```js
    3
   / \
  9  20
    /  \
   15   7

```
返回它的最大深度 3 。

```js

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root) {
	if(!root)return 0;
	let leftMax = maxDepth(root.left);
	let rightMax = maxDepth(root.right);
	return 1 + Math.max(leftMax,rightMax)
};

```

## 翻转二叉树

翻转一棵二叉树。

示例：

```js

输入：

     4
   /   \
  2     7
 / \   / \
1   3 6   9
输出：

     4
   /   \
  7     2
 / \   / \
9   6 3   1

```

```js


/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {TreeNode}
 */
var invertTree = function(root) {
    if(!root)return root;
    let current = root.left;
    root.left = root.right;
    root.right = current;
    invertTree(root.left);
    invertTree(root.right);
    return root;
};



```





## 二叉树的最小深度




