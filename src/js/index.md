## 柯里化

在计算机科学中，柯里化（Currying）是把接受多个参数的函数变换成接受一个单一参数(最初函数的第一个参数)的函数，并且返回接受余下的参数且返回结果的新函数的技术。
这个技术由 Christopher Strachey 以逻辑学家 Haskell Curry 命名的，尽管它是 Moses Schnfinkel 和 Gottlob Frege 发明的

### 示例 1

```javascript
function add(a, b) {
  return a + b;
}
add(1, 2); //3
//柯里化之后
function add1(a) {
  return function (b) {
    return a + b;
  };
}
```

上面的例子看起来很简单，然而，似乎也没什么意义，请往下看：

### 示例 2

```javascript
function add(a, b) {
  return a + b;
}
function factorial(a, b) {
  return a * b;
}
function currying(fn) {
  const args = [];
  return (...reset) => {
    args.push(...reset);
    return (...reset2) => {
      args.push(...reset2);
      return fn.apply(null, args);
    };
  };
}
const addcurry = currying(add);
console.log(addcurry(1)(2));
//3
const factorialcurry = currying(factorial);
console.log(factorialcurry(1)(2));
//2
```

### 示例 3

```javascript
//原生的bind方法

console.log(Math.max.bind(null)(1, 5));
//5
var a = '123';
var b = {
  a: '456',
  alert() {
    console.log(this.a);
  },
};
/* 
输出123 
 */

b.alert.bind(this)();
//123

//借助柯里化手动实现一个bind函数

function bind(fn, context) {
  return function () {
    return fn.apply(context, arguments);
  };
}

bind(Math.max)(1, 2);
//2
bind(b.alert, this)();
//123
```

### 示例 4

递归式

```javascript
function curry(fn, args) {
  var length = fn.length;
  args = args || [];
  return function () {
    let connected = args.concat([...arguments]);
    if (connected.length < length) {
      return curry.call(this, fn, connected);
    } else {
      return fn.apply(this, connected);
    }
  };
}

function factorial(a, b, c) {
  return a * b * c;
}
var factorialFn = curry(factorial);
factorialFn(2, 3, 4); //24
factorialFn(3)(3)(4); //36
factorialFn(4, 2)(3); //24

function cumulative(a, b, c, d) {
  return a + b + c + d;
}
var cumulativeFn = curry(cumulative);

cumulativeFn(5, 6, 7, 8); //26
cumulativeFn(5)(6)(7)(8); //26
cumulativeFn(5, 6, 7)(8); //26
```

## 事件循环

- 同步和异步任务分别进入不同的执行"场所"，同步的进入主线程，异步的进入 Event Table 并注册函数。
- 当指定的事情完成时，Event Table 会将这个函数移入 Event Queue。
- 主线程内的任务执行完毕为空，会去 Event Queue 读取对应的函数，进入主线程执行。
- 上述过程会不断重复，也就是常说的 Event Loop(事件循环)。

JavaScript 的事件分两种，宏任务(macro-task)和微任务(micro-task)

**宏任务：**包括整体代码 script，setTimeout，setInterval
**微任务：**Promise.then(非 new Promise)，process.nextTick(node 中)
**事件的执行顺序：**是先执行宏任务，然后执行微任务，此为基础，任务可以有同步任务和异步任务，同步的进入主线程，
异步的进入 Event Table 并注册函数，先把宏任务放入 Event Queue，再把微任务放入 Event Queue，（不同的的 Event Queue）
同步任务执行完成后，会从 Event Queue 中读取事件放入主线程执行，先读取微任务，再读取宏任务，

```javascript
console.log(1);
setTimeout(() => {
  console.log(2);
}, 0);
new Promise((res) => {
  console.log(3);
  res();
}).then(() => {
  console.log(4);
});
```

以上：同步的进入主线程，再把宏任务(setTimeout)加入事件队列，微任务(.then)加入事件队列，主线程完成后输出(1，3)，再执行微任务
输出 4，再执行宏任务输出 2

再看一个例子

```javascript
function sleep(num) {
  let start = Date.now();
  while (true) {
    if (Date.now() - start >= num) {
      console.log(1);
      return;
    }
  }
}

setTimeout(() => {
  console.log(2);
});
sleep(6000);
console.log(3);
Promise.resolve().then(() => {
  console.log(4);
});
```

以上：不要被 sleep 函数的阻塞所迷惑，依旧是先把 sleep 函数和 console.log(3)加入主线程,把延时器和.then 假如队列，
主线程输出 1，3。再执行微任务.then 输出 4，最后执行宏任务输出 2。

最后看一个比较复杂的例子

```javascript
console.log('1');

setTimeout(function () {
  console.log('2');
  process.nextTick(function () {
    console.log('3');
  });
  new Promise(function (resolve) {
    console.log('4');
    resolve();
  }).then(function () {
    console.log('5');
  });
});
process.nextTick(function () {
  console.log('6');
});
new Promise(function (resolve) {
  console.log('7');
  resolve();
}).then(function () {
  console.log('8');
});

setTimeout(function () {
  console.log('9');
  process.nextTick(function () {
    console.log('10');
  });
  new Promise(function (resolve) {
    console.log('11');
    resolve();
  }).then(function () {
    console.log('12');
  });
});
```

**第一轮循环：**

- 整体 script 作为第一个宏任务进入主线程，遇到 console.log，输出 1。
- 遇到 setTimeout，其回调函数被分发到宏任务 Event Queue 中。我们暂且记为 setTimeout1。
- 遇到 process.nextTick()，其回调函数被分发到微任务 Event Queue 中。我们记为 process1。
- 遇到 Promise，new Promise 直接执行，输出 7。then 被分发到微任务 Event Queue 中。我们记为 then1。
- 又遇到了 setTimeout，其回调函数被分发到宏任务 Event Queue 中，我们记为 setTimeout2。
- 宏任务执行完输出 1，7，然后执行微任务 process1 和 then1 输出了 6，8
- 所以第一轮输出：1，7，6，8

**第二轮循环：**

- 第二轮循环从宏任务 setTimeout1 开始
- 首先输出 2。接下来遇到了 process.nextTick()，同样将其分发到微任务 Event Queue 中，记为 process2。new Promise 立即执行输出 4，then 也分发到微任务 Event Queue 中，记为 then2
- 第二轮事件循环宏任务结束，我们发现有 process2 和 then2 两个微任务可以执行，输出 3 和 5
- 第二轮输出 2，4，3，5

**第三轮循环**

- 第三轮循环从 setTimeout2 开始
- 直接输出 9。将 process.nextTick()分发到微任务 Event Queue 中。记为 process3。直接执行 new Promise，输出 11。将 then 分发到微任务 Event Queue 中，记为 then3。
- 第三轮事件循环宏任务执行结束，执行两个微任务 process3 和 then3。输出 10 和 12
- 第三轮输出 9，11，10，12。

综上：1，7，6，8，2，4，3，5，9，11，10，12。

## IndexedDB

### 概述

**随着浏览器的发展，功能的不断增强，越来越多的网站开始考虑将数据存在本地（本人的使用也是基于此类，存储数据大概 50m），而现有的存储方案都不适用于大量数据，例如 Cookie 存储的大小在 4kb 之间，LocalStorage 的存储大概在 2.5m-10m 之间，具体看各家浏览器具体支持。因此 IndexedDB 就诞生了**

### 介绍

**IndexedDB 就是浏览器提供的本地数据库，它可以被网页脚本创建和操作。IndexedDB 允许储存大量数据，提供查找接口，还能建立索引。这些都是 LocalStorage 所不具备的。就数据库类型而言，IndexedDB 不属于关系型数据库（不支持 SQL 查询语句），更接近 NoSQL 数据库。**

[更详细的介绍及 API 请查看此链接](https://wangdoc.com/javascript/bom/indexeddb.html)

### 示例

**至此处，我们默认您已阅读过上述链接中 api 的基本用法**

**完成数据的增删改查**

```html
<div>
  <input placeholder="姓名" id="addName" />
  <input placeholder="年龄" type="number" id="addAge" />
  <input placeholder="唯一值id" id="keyId" />
  <button type="button" id="add">新增</button>
  <button type="button" id="update">更新</button>
  <button type="button" id="delete">删除</button>
</div>
<div>
  <input placeholder="姓名" id="find_result_from_name" />
  <span id="find_block"></span>
  <button type="button" id="find">按照姓名查找数据</button>
</div>
```

```js
var addName = document.getElementById('addName');
var addAge = document.getElementById('addAge');
var addbtn = document.getElementById('add');
var updatebtn = document.getElementById('update');
var deletebtn = document.getElementById('delete');
var idVal = document.getElementById('keyId');
var find = document.getElementById('find');
var findResultFromName = document.getElementById('find_result_from_name');
var findBlock = document.getElementById('find_block');
var selectors = [];
function createId(nums) {
  //用来生成唯一键id的方法
  return Math.random().toString(36).substr(nums);
}
```

### 打开数据库

**基本用法**

```js
window.indexedDB.open(databaseName, version);
```

**封装后我们返回 db 对象**

```js
//databaseName 数据库名
//storeName 表名
//indexs 新建的索引列表
function openIndexDb(databaseName, storeName, indexs) {
  return new Promise(function (res, rej) {
    try {
      var request = window.indexedDB.open('map', 2);
    } catch (e) {
      rej(e);
    }
    request.onerror = function (e) {
      rej(e.target.error);
      console.log('打开失败');
    };
    request.onsuccess = function (event) {
      //打开数据库之后返回这个对象仓库
      res(request.result);
      console.log('打开成功');
    };
    request.onupgradeneeded = function (event) {
      var db = event.target.result;
      //如果没有此张表则新建
      if (!db.objectStoreNames.contains(storeName)) {
        //建表并确定id为主键
        var objstore = db.createObjectStore(storeName, { keyPath: 'id' });
        indexs.forEach(function (key) {
          //创建索引，unique: false表示此值可重复
          objstore.createIndex(key, key, { unique: false });
        });
      }
    };
  });
}
```

### 新增数据

```js
function add(db) {
  if (!addName.value || !addAge.value) {
    alert('请输入姓名或者年龄');
    return;
  }
  var request = db
    .transaction(['lenandlat'], 'readwrite')
    .objectStore('lenandlat')
    .add({ id: createId(2), name: addName.value, age: addAge.value });

  request.onsuccess = function (event) {
    alert('数据添加成功');
    addName.value = '';
    addAge.value = '';
  };
  request.onerror = function (event) {
    console.log('数据写入失败', event.target.error);
  };
}
var indexs = ['name', 'age'];
//我们创建了一个名为map，表名为lenandlat，索引为name和age的表
openIndexDb('map', 'lenandlat', indexs).then(function (db) {
  addbtn.onclick = function () {
    add(db);
  };
});
```

### 查询数据

```js
function findObjFromKeyVal(db, storeName, key, value) {
  var store = db.transaction([storeName], 'readonly').objectStore(storeName);
  var index = store.index(key);
  var request = index.get(value);
  return new Promise(function (res, rej) {
    request.onerror = function (e) {
      rej(e.target.error);
    };
    request.onsuccess = function () {
      if (request.result) {
        res(request.result);
      } else {
        rej(request.result);
      }
    };
  });
}
openIndexDb('map', 'lenandlat', indexs).then(function (db) {
  find.onclick = function () {
    //在lenandlat这张表中，找到name为findResultFromName.value的那条数据并返回
    findObjFromKeyVal(db, 'lenandlat', 'name', findResultFromName.value)
      .then(function (data) {
        console.log(data);
        findBlock.innerHTML = JSON.stringify(data);
      })
      .catch(function () {
        findBlock.innerHTML = '没找到';
      });
  };
});
```

### 更新数据

```js
function ubdate(db) {
  if (!idVal.value) {
    alert('更新操作项需要唯一值id作为依托 ,请根据查询输入');
    return;
  }
  if (!addName.value || !addAge.value) {
    alert('请输入姓名或者年龄');
    return;
  }
  var request = db
    .transaction(['lenandlat'], 'readwrite')
    .objectStore('lenandlat')
    .put({
      id: createId(2),
      name: addName.value,
      age: addAge.value,
      id: idVal.value,
    });
  //更新id为idVal.value的这条数据的姓名和年龄
  request.onsuccess = function (event) {
    alert('数据添加成功');
    addName.value = '';
    addAge.value = '';
    idVal.value = '';
  };
  request.onerror = function (event) {
    console.log('数据写入失败', event.target.error);
  };
}
openIndexDb('map', 'lenandlat', indexs).then(function (db) {
  updatebtn.onclick = function () {
    ubdate(db);
  };
});
```

### 删除数据

```js
function deletefn(db) {
  if (!idVal.value) {
    alert('删除项需要唯一值id,请根据查询输入');
    return;
  }
  //如果id是表中一个不存在的值，也不会报错
  var request = db
    .transaction(['lenandlat'], 'readwrite')
    .objectStore('lenandlat')
    .delete(idVal.value);
  request.onsuccess = function (event) {
    alert('数据删除成功');
    idVal.value = '';
  };
  request.onerror = function (event) {
    console.log('数据删除成功', event.target.error);
  };
}
openIndexDb('map', 'lenandlat', indexs).then(function (db) {
  deletebtn.onclick = function () {
    deletefn(db);
  };
});
```

### 查询所有数据

```js
function findAll(db, storeName) {
  const request = db.transaction(storeName).objectStore(storeName).getAll();
  return new Promise(function (res, rej) {
    request.onerror = function () {
      rej(this.error);
    };
    request.onsuccess = function () {
      res(this.result);
    };
  });
}
```

### 完整代码

```js
var indexs = ['name', 'age'];
function openIndexDb(databaseName, storeName, indexs) {
  return new Promise(function (res, rej) {
    try {
      var request = window.indexedDB.open('map', 2);
    } catch (e) {
      rej(e);
    }
    request.onerror = function (e) {
      rej(e.target.error);
      console.log('打开失败');
    };
    request.onsuccess = function (event) {
      res(request.result);
      console.log('打开成功');
    };
    request.onupgradeneeded = function (event) {
      var db = event.target.result;
      if (!db.objectStoreNames.contains(storeName)) {
        var objstore = db.createObjectStore(storeName, { keyPath: 'id' });
        indexs.forEach(function (key) {
          objstore.createIndex(key, key, { unique: false });
        });
      }
    };
  });
}
openIndexDb('map', 'lenandlat', indexs).then(function (db) {
  updatebtn.onclick = function () {
    ubdate(db);
  };
  deletebtn.onclick = function () {
    deletefn(db);
  };
  addbtn.onclick = function () {
    add(db);
  };
  find.onclick = function () {
    findObjFromKeyVal(db, 'lenandlat', 'name', findResultFromName.value)
      .then(function (data) {
        console.log(data);
        findBlock.innerHTML = JSON.stringify(data);
      })
      .catch(function () {
        findBlock.innerHTML = '没找到';
      });
  };
  findAll(db, 'lenandlat').then((data) => {
    console.log(data);
  });
});

function findObjFromKeyVal(db, storeName, key, value) {
  var store = db.transaction([storeName], 'readonly').objectStore(storeName);
  var index = store.index(key);
  var request = index.get(value);
  return new Promise(function (res, rej) {
    request.onerror = function (e) {
      rej(e.target.error);
    };
    request.onsuccess = function () {
      if (request.result) {
        res(request.result);
      } else {
        rej(request.result);
      }
    };
  });
}

function findAll(db, storeName) {
  const request = db.transaction(storeName).objectStore(storeName).getAll();
  return new Promise(function (res, rej) {
    request.onerror = function () {
      rej(this.error);
    };
    request.onsuccess = function () {
      res(this.result);
    };
  });
}

function add(db) {
  if (!addName.value || !addAge.value) {
    alert('请输入姓名或者年龄');
    return;
  }
  var request = db
    .transaction(['lenandlat'], 'readwrite')
    .objectStore('lenandlat')
    .add({ id: createId(2), name: addName.value, age: addAge.value });

  request.onsuccess = function (event) {
    alert('数据添加成功');
    addName.value = '';
    addAge.value = '';
  };
  request.onerror = function (event) {
    console.log('数据写入失败', event.target.error);
  };
}
function ubdate(db) {
  if (!idVal.value) {
    alert('更新操作项需要唯一值id作为依托 ,请根据查询输入');
    return;
  }
  if (!addName.value || !addAge.value) {
    alert('请输入姓名或者年龄');
    return;
  }
  var request = db
    .transaction(['lenandlat'], 'readwrite')
    .objectStore('lenandlat')
    .put({
      id: createId(2),
      name: addName.value,
      age: addAge.value,
      id: idVal.value,
    });

  request.onsuccess = function (event) {
    alert('数据添加成功');
    addName.value = '';
    addAge.value = '';
    idVal.value = '';
  };
  request.onerror = function (event) {
    console.log('数据写入失败', event.target.error);
  };
}
function deletefn(db) {
  if (!idVal.value) {
    alert('删除项需要唯一值id,请根据查询输入');
    return;
  }
  var request = db
    .transaction(['lenandlat'], 'readwrite')
    .objectStore('lenandlat')
    .delete(idVal.value);
  request.onsuccess = function (event) {
    alert('数据删除成功');
    idVal.value = '';
  };
  request.onerror = function (event) {
    console.log('数据删除成功', event.target.error);
  };
}
```

### 具体测试用例

- 1.我们首先打开了数据库 map 中表名为 lenandlat，主键为 id，索引值为 name 和 age 的一张表
- 2.我们首先新增了 2 条数据，哈士奇 2，金毛 1
- 3.我们根据查询，查询到姓名为金毛的数据，并拿到它的 id，去修改
- 4.我们也可以拿到某条数据的 id，去删除它
- 5.刷新页面，我们可以查询到所有的数据

### 本文最后具体实用

**遇到的问题，高德地图中查询全国市级的经纬度并渲染，以我的电脑运行速度大概 20 秒以上才查询完，可以看到浏览器上面一直在转圈。而且由于数据大概有 50M，所以 indexedDB 的方案是最好的。感兴趣的可以复制下面的例子**

```js
export default [
  '北京市',
  '天津市',
  '石家庄市',
  '唐山市',
  '秦皇岛市',
  '邯郸市',
  '邢台市',
  '保定市',
  '张家口市',
  '承德市',
  '沧州市',
  '廊坊市',
  '衡水市',
  '太原市',
  '大同市',
  '阳泉市',
  '长治市',
  '晋城市',
  '朔州市',
  '晋中市',
  '运城市',
  '忻州市',
  '临汾市',
  '吕梁市',
  '呼和浩特市',
  '包头市',
  '乌海市',
  '赤峰市',
  '通辽市',
  '鄂尔多斯市',
  '呼伦贝尔市',
  '巴彦淖尔市',
  '乌兰察布市',
  '兴安盟',
  '锡林郭勒盟',
  '阿拉善盟',
  '沈阳市',
  '大连市',
  '鞍山市',
  '抚顺市',
  '本溪市',
  '丹东市',
  '锦州市',
  '营口市',
  '阜新市',
  '辽阳市',
  '盘锦市',
  '铁岭市',
  '朝阳市',
  '葫芦岛市',
  '长春市',
  '吉林市',
  '四平市',
  '辽源市',
  '通化市',
  '白山市',
  '松原市',
  '白城市',
  '延边朝鲜族自治州',
  '哈尔滨市',
  '齐齐哈尔市',
  '鸡西市',
  '鹤岗市',
  '双鸭山市',
  '大庆市',
  '伊春市',
  '佳木斯市',
  '七台河市',
  '牡丹江市',
  '黑河市',
  '绥化市',
  '大兴安岭地区',
  '上海市',
  '南京市',
  '无锡市',
  '徐州市',
  '常州市',
  '苏州市',
  '南通市',
  '连云港市',
  '淮安市',
  '盐城市',
  '扬州市',
  '镇江市',
  '泰州市',
  '宿迁市',
  '杭州市',
  '宁波市',
  '温州市',
  '嘉兴市',
  '湖州市',
  '绍兴市',
  '金华市',
  '衢州市',
  '舟山市',
  '台州市',
  '丽水市',
  '合肥市',
  '芜湖市',
  '蚌埠市',
  '淮南市',
  '马鞍山市',
  '淮北市',
  '铜陵市',
  '安庆市',
  '黄山市',
  '滁州市',
  '阜阳市',
  '宿州市',
  '六安市',
  '亳州市',
  '池州市',
  '宣城市',
  '福州市',
  '厦门市',
  '莆田市',
  '三明市',
  '泉州市',
  '漳州市',
  '南平市',
  '龙岩市',
  '宁德市',
  '南昌市',
  '景德镇市',
  '萍乡市',
  '九江市',
  '新余市',
  '鹰潭市',
  '赣州市',
  '吉安市',
  '宜春市',
  '抚州市',
  '上饶市',
  '济南市',
  '青岛市',
  '淄博市',
  '枣庄市',
  '东营市',
  '烟台市',
  '潍坊市',
  '济宁市',
  '泰安市',
  '威海市',
  '日照市',
  '临沂市',
  '德州市',
  '聊城市',
  '滨州市',
  '菏泽市',
  '郑州市',
  '开封市',
  '洛阳市',
  '平顶山市',
  '安阳市',
  '鹤壁市',
  '新乡市',
  '焦作市',
  '濮阳市',
  '许昌市',
  '漯河市',
  '三门峡市',
  '南阳市',
  '商丘市',
  '信阳市',
  '周口市',
  '驻马店市',
  '济源市',
  '武汉市',
  '黄石市',
  '十堰市',
  '宜昌市',
  '襄阳市',
  '鄂州市',
  '荆门市',
  '孝感市',
  '荆州市',
  '黄冈市',
  '咸宁市',
  '随州市',
  '恩施土家族苗族自治州',
  '仙桃市',
  '潜江市',
  '天门市',
  '神农架林区',
  '长沙市',
  '株洲市',
  '湘潭市',
  '衡阳市',
  '邵阳市',
  '岳阳市',
  '常德市',
  '张家界市',
  '益阳市',
  '郴州市',
  '永州市',
  '怀化市',
  '娄底市',
  '湘西土家族苗族自治州',
  '广州市',
  '韶关市',
  '深圳市',
  '珠海市',
  '汕头市',
  '佛山市',
  '江门市',
  '湛江市',
  '茂名市',
  '肇庆市',
  '惠州市',
  '梅州市',
  '汕尾市',
  '河源市',
  '阳江市',
  '清远市',
  '东莞市',
  '中山市',
  '潮州市',
  '揭阳市',
  '云浮市',
  '南宁市',
  '柳州市',
  '桂林市',
  '梧州市',
  '北海市',
  '防城港市',
  '钦州市',
  '贵港市',
  '玉林市',
  '百色市',
  '贺州市',
  '河池市',
  '来宾市',
  '崇左市',
  '海口市',
  '三亚市',
  '三沙市',
  '儋州市',
  '五指山市',
  '琼海市',
  '文昌市',
  '万宁市',
  '东方市',
  '重庆市',
  '成都市',
  '自贡市',
  '攀枝花市',
  '泸州市',
  '德阳市',
  '绵阳市',
  '广元市',
  '遂宁市',
  '内江市',
  '乐山市',
  '南充市',
  '眉山市',
  '宜宾市',
  '广安市',
  '达州市',
  '雅安市',
  '巴中市',
  '资阳市',
  '阿坝藏族羌族自治州',
  '甘孜藏族自治州',
  '凉山彝族自治州',
  '贵阳市',
  '六盘水市',
  '遵义市',
  '安顺市',
  '毕节市',
  '铜仁市',
  '黔西南布依族苗族自治州',
  '黔东南苗族侗族自治州',
  '黔南布依族苗族自治州',
  '昆明市',
  '曲靖市',
  '玉溪市',
  '保山市',
  '昭通市',
  '丽江市',
  '普洱市',
  '临沧市',
  '楚雄彝族自治州',
  '红河哈尼族彝族自治州',
  '文山壮族苗族自治州',
  '西双版纳傣族自治州',
  '大理白族自治州',
  '德宏傣族景颇族自治州',
  '怒江傈僳族自治州',
  '迪庆藏族自治州',
  '拉萨市',
  '日喀则市',
  '昌都市',
  '林芝市',
  '山南市',
  '那曲市',
  '阿里地区',
  '西安市',
  '铜川市',
  '宝鸡市',
  '咸阳市',
  '渭南市',
  '延安市',
  '汉中市',
  '榆林市',
  '安康市',
  '商洛市',
  '兰州市',
  '嘉峪关市',
  '金昌市',
  '白银市',
  '天水市',
  '武威市',
  '张掖市',
  '平凉市',
  '酒泉市',
  '庆阳市',
  '定西市',
  '陇南市',
  '临夏回族自治州',
  '甘南藏族自治州',
  '西宁市',
  '海东市',
  '海北藏族自治州',
  '黄南藏族自治州',
  '海南藏族自治州',
  '果洛藏族自治州',
  '玉树藏族自治州',
  '海西蒙古族藏族自治州',
  '格尔木市',
  '银川市',
  '石嘴山市',
  '吴忠市',
  '固原市',
  '中卫市',
  '乌鲁木齐市',
  '克拉玛依市',
  '吐鲁番市',
  '哈密市',
  '昌吉回族自治州',
  '博尔塔拉蒙古自治州',
  '巴音郭楞蒙古自治州',
  '阿克苏地区',
  '克孜勒苏柯尔克孜自治州',
  '喀什地区',
  '和田地区',
  '伊犁哈萨克自治州',
  '塔城地区',
  '阿勒泰地区',
  '石河子市',
  '阿拉尔市',
  '图木舒克市',
  '五家渠市',
  '北屯市',
  '铁门关市',
  '双河市',
  '可克达拉市',
  '昆玉市',
  '香港特别行政区',
  '澳门特别行政区',
  '定安县',
  '峨眉山市',
  '屯昌县',
  '澄迈县',
  '临高县',
  '白沙黎族自治县',
  '昌江黎族自治县',
  '乐东黎族自治县',
  '陵水黎族自治县',
  '保亭黎族苗族自治县',
  '琼中黎族苗族自治县',
];
```

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta
      name="viewport"
      content="initial-scale=1.0, user-scalable=no, width=device-width"
    />
    <link
      rel="stylesheet"
      href="https://a.amap.com/jsapi_demos/static/demo-center/css/demo-center.css"
    />
    <title>高德地图</title>
    <style>
      #map-container {
        width: 100%;
        max-height: 100%;
        height: 920px;
      }
    </style>
  </head>
  <body>
    <div id="map-container"></div>
    <script src="//webapi.amap.com/maps?v=2.0&key=fd63994802cd27736f049501c497c72c&plugin=Map3D,AMap.DistrictSearch,AMap.Autocomplete"></script>
    <script type="module">
      import citys from './citys.js';
      var map = new AMap.Map('map-container', {
        resizeEnable: true,
        viewMode: '3D',
        pitch: 0,
        zoom: 5,
        center: [114.308909, 30.588336],
      });

      console.log(map);

      var data = citys;
      var indexs = ['city', 'info'];
      render(data);

      function render(data) {
        AMap.plugin('AMap.DistrictSearch', function () {
          var district = new AMap.DistrictSearch({
            extensions: 'all',
            level: 'city',
          });
          var start = Date.now();
          data.forEach((item) => {
            /*
						如果解开此处并且把下面的注释，会得到纯查询的速度
						district.search(item, function(status, result) {
							console.log(Date.now()-start)
							renderBounce(result)		
						})
						*/
            openIndexDb('map', 'citys', indexs)
              .then(function (db) {
                findObjFromKeyVal(db, 'citys', 'city', item)
                  .then(function (data) {
                    var result = data.info;
                    console.log(Date.now() - start);
                    //如果查询到就直接渲染
                    renderBounce(result);
                  })
                  .catch(function () {
                    //如果没找到，就直接查询，并且存入本地数据库
                    district.search(item, function (status, result) {
                      addCityInfo(db, 'citys', {
                        id: createId(2),
                        city: item,
                        info: JSON.parse(JSON.stringify(result)),
                      });
                    });
                  });
              })
              .catch(function () {
                //如果打开数据库失败，则直接查询
                district.search(item, function (status, result) {
                  renderBounce(result);
                });
              });
          });
        });
      }
      function renderBounce(result) {
        var bounds = result.districtList[0].boundaries;
        if (bounds) {
          for (var i = 0, l = bounds.length; i < l; i++) {
            var polygon = new AMap.Polygon({
              map: map,
              strokeWeight: 1,
              path: bounds[i],
              fillOpacity: 0.8,
              fillColor: '#0088ff',
              strokeColor: '#CC66CC',
            });
          }
        }
      }
      function createId(nums) {
        return Math.random().toString(36).substr(nums);
      }
      function addCityInfo(db, storeName, obj) {
        var request = db
          .transaction([storeName], 'readwrite')
          .objectStore(storeName)
          .add(obj);

        request.onsuccess = function (event) {
          console.log('数据写入成功');
        };

        request.onerror = function (event) {
          console.log('数据写入失败', event.target.error);
        };
      }
      function findObjFromKeyVal(db, storeName, key, value) {
        var store = db
          .transaction([storeName], 'readonly')
          .objectStore(storeName);
        var index = store.index(key);
        var request = index.get(value);
        return new Promise(function (res, rej) {
          request.onerror = function (e) {
            rej(e.target.error);
          };
          request.onsuccess = function () {
            if (request.result) {
              res(request.result);
            } else {
              rej(request.result);
            }
          };
        });
      }
      function openIndexDb(databaseName, storeName, indexs) {
        return new Promise(function (res, rej) {
          try {
            var request = window.indexedDB.open('map');
          } catch (e) {
            rej(e);
          }
          request.onerror = function (e) {
            rej(e.target.error);
            console.log('打开失败', e.target.error);
          };
          request.onsuccess = function (event) {
            res(request.result);
            console.log('打开成功');
          };
          request.onupgradeneeded = function (event) {
            var db = event.target.result;
            if (!db.objectStoreNames.contains(storeName)) {
              var objstore = db.createObjectStore(storeName, { keyPath: 'id' });
              indexs.forEach(function (key) {
                objstore.createIndex(key, key, { unique: false });
              });
            }
          };
        });
      }
    </script>
  </body>
</html>
```

## WebWorker

详细介绍请看[MDN 文档](https://developer.mozilla.org/en-US/docs/Web/API/SharedWorker)，兼容性实在太差了。

**web worker 是运行在后台的 JavaScript，独立于其他脚本，不会影响页面的性能。您可以继续做任何愿意做的事情：点击、选取内容等等，而此时 web worker 在后台运行。**

### 不会按时触发的延时器

**创建一个延时器，输出时间差**

```js
var start = Date.now();
setTimeout(() => {
  console.log(Date.now() - start);
}, 500);
var a = 0;
for (var i = 0; i < 1000000000; i++) {
  a++;
}
console.log('结束', a, Date.now() - start);
//第一次输出 结束 1000000000 1656
//第二次输出 1658
```

**分析：**由于 setTimeout 是一个异步的，所以以上代码，当浏览器遇到延时器时，先把其放入宏任务队列，然后计时。接下来走当前任务队列里的其它代码（下面的 for 循环），for 循环走完后，时间已经超过了延时器设定的时间，所以直接执行延时器内部的函数。所以此时延时器内部函数输出的毫秒数为 for 循环执行的时长。

**或者按下面这样**

```js
var start = Date.now();

var a = 0;
for (var i = 0; i < 1000000000; i++) {
  a++;
}
console.log('结束', a, Date.now() - start);
setTimeout(() => {
  console.log(Date.now() - start);
}, 500);
//第一次输出 结束 1000000000 1788
//第二次输出 2289
```

**分析：**以上代码，浏览器先遇到 for 循环，然后直接执行，执行完之后遇到延时器，直接压入宏任务队列，然后当前主线程执行完，500 毫秒后直接执行函数。所以此时延时器内部函数输出的毫秒数为上面 for 循环执行的时长 加上 延时器延时

### 引入 webworker

**以上两种方式，都无法让我们在 500 毫秒执行延时器内部的函数，因此我们可以考虑把 for 循环放在主线程之外的地方执行**

```js
//worker.js
var startWork = Date.now();
var a = 0;
for (var i = 0; i < 1000000000; i++) {
  a++;
}
console.log('结束', a, Date.now() - startWork);
postMessage(i);
```

```js
//主程序
var w = new Worker('worker.js');

var start = Date.now();

setTimeout(() => {
  console.log(Date.now() - start);
}, 500);

//第一次输出 502
//第二次输出 结束 1000000000 1624
```

## 浅拷贝和深拷贝

### 基本类型和引用类型

Javascript 有六种数据类型
基本数据类型（原始类型）：Undefined，Null，Boolean，Number，String
引用数据类型：Object

### 基本数据类型

- 基本类型的值是不能添加属性的
- 它们的值在内存中占据着固定大小的空间，并被保存在栈内存中。
- 当一个变量向另一个变量复制基本类型的值，则会创建相同的值赋给它

### 引用数据类型

- 引用数据类型的值为对象，保存在堆内存中
- 包含引用类型的变量值并不是对象本身，而是一个指向该对象的指针
- 当一个变量从另一个变量复制引用类型的值得时候，其实只是复制了一个指向该对象的指针，两个变量同时指向该对象

### 浅拷贝

```javascript
const obj1 = { name: '小明', details: { count: 1 } };

const obj2 = Object.assign({}, obj1);

obj2.details.count++;

console.log(obj1.details.count); //2
```

**以上：**由于对象是引用类型，obj1 和 obj2 指向的是同一个 引用地址

### 深拷贝

```javascript
const deepCopy = (obj) => {
  if (!obj || typeof obj !== 'object') {
    return obj;
  }

  const newObj = Array.isArray(obj) ? [] : {};
  Object.keys(obj).forEach((k) => {
    newObj[k] = deepCopy(obj[k]);
  });
  return newObj;
};

const obj1 = {
  name: '老明',
  next: {
    name: '小明',
  },
};

const obj2 = copyDeep(obj1);

obj2.name = '大明';
console.log(obj2.name); //小明
console.log(obj1.next === obj2.next); //false
console.log(obj1.next === obj2.next); //false
```

### 循环引用的深拷贝

```javascript
const deepCopy = (obj, map = new WeakMap()) => {
  if (!obj || typeof obj !== 'object') {
    return obj;
  }
  if (map.has(obj)) {
    return map.get(obj);
  }
  const newObj = Array.isArray(obj) ? [] : {};
  map.set(obj, newObj);
  Object.keys(obj).forEach((k) => {
    newObj[k] = deepCopy(obj[k], map);
  });
  return newObj;
};
const obj2 = {
  a: {
    name: 'a',
  },
  b: {
    name: 'b',
  },
  c: {
    e: [],
  },
};
obj2.c.e.push(obj2);

console.log(deepCopy(obj2));
```

## 原型和原型链

### 原型

- 原型分为显式原型(prototype)和隐式原型(**proto**)
- **原型对象：**当我们创建了一个函数，就会根据某种特定的规则为该函数创建一个 prototype 属性，这个属性指向函数的原型对象。
- Object.getPrototypeOf()方法用来返回一个对象的原型

### 构造函数

- 每个函数都有 prototype(原型)属性，这个属性是一个指针，指向一个对象，这个对象会自动获得一个 constructor（**构造函数**）属性，这个属性包含了一个指向 prototype 属性所在函数的指针
- 当该函数作为构造函数生成实例时，实例对象直接继承其 prototype 上面得方法及属性

### prototype 和 **proto**

- 每个实例内部都有一个指向原型对象的指针，即**proto**属性
- **proto**是每个对象都有的属性，目前所有浏览器（包括 ie11）都部署了这个属性。
- **proto**用来读取或设置当前对象的 prototype 对象（该属性并没有写入 es6 正文，而是附录，前后双下划线，说明本质是一个内部属性）
  （因此从语义和兼容性考虑，不要使用这个属性，而是用 Object.setPrototypeOf(),Object.getPrototypeOf(),Object.create()代替）

```javascript
function B() {}

//即
B.prototype.constructor === B;
//即
B.prototype.__proto__ === Object.prototype;

var b = new B();

b.__proto__ === B.prototype;

var a1 = {};

a1.__proto__ === Object.prototype;

var a2 = [];

a2.__proto__ === Array.prototype;
```

### 原型链

在 js 里，**proto**是每个对象都有的属性，当 js 引擎查找该对象某一个属性时，会先查找该对象本身有没有该属性，如果不存在，
就会在其**proto**属性上面寻找，如果仍然没有，**proto**属性仍是一个对象，仍然有其**proto**属性，以此类推，
这一条用**proto**连起来的线就叫做原型链

```javascript
var c = { name: 'proto' };

var d = Object.create(c);

//d.name->proto

var e = Object.create(d);

//e.name->proto

//即
d.__proto__ === c;
e.__proto__ === d;

e.__proto__.__proto__ === d.__proto__;

Array.prototype.__proto__ === Object.prototype;
Date.prototype.__proto__ === Object.prototype;
RegExp.prototype.__proto__ === Object.prototype;
```

## typeof 和 instanceof

### typeof

- 在 MDN 中译为：[typeof 操作符返回一个字符串，表示未经计算的操作数的类型](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/typeof)
- typeof 一般返回如下几个结果：

```js
'number', 'string', 'boolean', 'object', 'function', 'undefined';
```

假设有一个场景，我们直接判断变量 a 是否存在，直接的 if(a),如果 a 不存在，此时会抛出错误 a is not defined，因此我们可以使用 typeof 判断

```javascript
//console.log(a)
//err:a is not defined
typeof a; //undefined
typeof undefined; //undefined
typeof Function; //function
typeof Object; //function
typeof Array; //function

typeof null; //object
typeof {}; //object

typeof false; //boolean
typeof '123'; //string
typeof 123; //number

typeof [1, 2, 3]; //object
```

**可怕的事情(忘记吧)**
在 IE 6,7 和 8 上，很多宿主对象是对象而不是函数。例如：

```javascript
typeof alert === 'object';
```

但是这也有许多不便，例如我们直接判断一个数组是数组还是对象，用 typeof 判断出来的都是对象，此时我们可以使用**instanceof**

### instanceof

- 在 MDN 中译为：[The instanceof operator tests whether the prototype property of a constructor appears anywhere in the prototype chain of an object.](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof)
- 中文：instanceof 运算符用来测试一个对象在其原型链中是否存在一个构造函数的 prototype 属性。
- 用法 object instanceof constructor,返回 false 或者 true
  小小的用法

```javascript
console.log([] instanceof Array);
//true
console.log({} instanceof Array);
//false
```

**具体示例**

描述：用来检测某个要检测的对象的构造函数（constructor）是否存在与 某对象 原型链上面
请看一下示例：

```javascript
const a = {};
a instanceof Object; //true

function Parent() {}
function Child() {}

console.log(Parent instanceof Function);
//true

Child.prototype = new Parent();
const child = new Child();
console.log(child instanceof Child);
//true
console.log(child instanceof Parent);
//true
class A {}
class B extends A {}
const b = new B();
console.log(b instanceof A); //true
console.log(b instanceof B); //true
```

## meta

- meta 元素可提供有关页面的元信息（meta-information），比如针对搜索引擎和更新频度的描述和关键词。
- meta 标签位于文档的头部，不包含任何内容。meta 标签的属性定义了与文档相关联的名称/值对。

**可选的值(http-equiv/name/scheme)**

- http-equiv 属性为名称/值对提供了名称。并指示服务器在发送实际的文档之前先在要传送给浏览器的 MIME 文档头部包含名称/值对。
- name 属性提供了名称/值对中的名称。HTML 和 XHTML 标签都没有指定任何预先定义的 meta 名称。通常情况下，您可以自由使用对自己和源文档的读者来说富有意义的名称
- scheme 属性用于指定要用来翻译属性值的方案。此方案应该在由 head 标签的 profile 属性指定的概况文件中进行了定义

| 属性       | 值                                                   | 描述                                |
| :--------- | ---------------------------------------------------- | ----------------------------------- |
| http-equiv | content-type/expires/refresh/set-cookie              | 把 content 属性关联到 HTTP 头部     |
| name       | author/description/keywords/generator/revised/others | 把 content 属性关联到一个名称。     |
| scheme     | some_text                                            | 定义用于翻译 content 属性值的格式。 |

### 必须的值(content)

- content 属性提供了名称/值对中的值。该值可以是任何有效的字符串。
- content 属性始终要和 name 属性或 http-equiv 属性一起使用。

| 属性    | 值        | 描述                                       |
| :------ | --------- | ------------------------------------------ |
| content | some_text | 定义与 http-equiv 或 name 属性相关的元信息 |

### 示例用法与讲解

规定移动端的一些设定

```html
<meta
  name="viewport"
  content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
/>
```

"keywords" 是一个经常被用到的名称。它为文档定义了一组关键字。某些搜索引擎在遇到这些关键字时，会用这些关键字对文档进行分类。

```html
<meta name="keywords" content="HTML,ASP,PHP,SQL" />
```

**这样发送到浏览器的头部就应该包含**

- content-type: text/html
- charset:iso-8859-1
- expires:31 Dec 2008

```html
<meta http-equiv="charset" content="iso-8859-1" />
<meta http-equiv="expires" content="31 Dec 2008" />
```

声明文档使用的字符编码

```html
<meta charset="utf-8" />
```

优先使用 IE 最新版本和 Chrome

```html
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1″/>
```

页面描述

```html
<meta name="description" content="不超过150个字符" />
```

网页作者

```html
<meta name="author" content="name, email@gmail.com" />
```

搜索引擎抓取

```html
<meta name="robots" content="index,follow" />
```

添加到主屏后的标题（iOS 6 新增）

```html
<meta name="apple-mobile-web-app-capable" content="yes" />
```

是否启用 WebApp 全屏模式，删除苹果默认的工具栏和菜单栏

```html
<meta
  name="apple-itunes-app"
  content="app-id=myAppStoreID, affiliate-data=myAffiliateData, app-argument=myURL"
/>
```

设置苹果工具栏颜色

```html
<meta name="apple-mobile-web-app-status-bar-style" content="black" />
```

数字禁止

```html
<meta name="format-detection" content="telphone=no, email=no" />
```

避免 IE 使用兼容模式

```html
<meta http-equiv="X-UA-Compatible" content="IE=edge" />
```

强制竖屏

```html
//uc强制竖屏
<meta name="screen-orientation" content="portrait" />
//QQ强制竖屏
<meta name="x5-orientation" content="portrait" />
// UC强制全屏
<meta name="full-screen" content="yes" />
//QQ强制全屏
<meta name="x5-fullscreen" content="true" />
```

应用模式

```html
//UC应用模式
<meta name="browsermode" content="application" />
// QQ应用模式
<meta name="x5-page-mode" content="app" />
```

windows phone 点击无高光

```html
<meta name="msapplication-tap-highlight" content="no" />
```

设置页面不缓存

```html
<meta http-equiv="pragma" content="no-cache">

<meta http-equiv="cache-control" content="no-cache">

<meta http-equiv="expires" content="0″>
```
