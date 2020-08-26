# IndexedDB

## 概述

**随着浏览器的发展，功能的不断增强，越来越多的网站开始考虑将数据存在本地（本人的使用也是基于此类，存储数据大概50m），而现有的存储方案都不适用于大量数据，例如Cookie存储的大小在4kb之间，LocalStorage的存储大概在2.5m-10m之间，具体看各家浏览器具体支持。因此IndexedDB就诞生了**

## 介绍

**IndexedDB就是浏览器提供的本地数据库，它可以被网页脚本创建和操作。IndexedDB 允许储存大量数据，提供查找接口，还能建立索引。这些都是 LocalStorage 所不具备的。就数据库类型而言，IndexedDB 不属于关系型数据库（不支持 SQL 查询语句），更接近 NoSQL 数据库。**

[更详细的介绍及API请查看此链接](https://wangdoc.com/javascript/bom/indexeddb.html)

## 示例

**至此处，我们默认您已阅读过上述链接中api的基本用法**

**完成数据的增删改查**

```html
<div>
	<input placeholder="姓名" id="addName"/>
	<input placeholder="年龄" type="number"  id="addAge"/>
	<input placeholder="唯一值id"  id="keyId"/>
	<button type="button" id="add">新增</button>
	<button type="button" id="update">更新</button>
	<button type="button" id="delete">删除</button>
</div>
<div>
	<input placeholder="姓名" id="find_result_from_name"/>
	<span id="find_block"></span>
	<button type="button" id="find">按照姓名查找数据</button>
</div>
```

```js
var addName = document.getElementById("addName");
var addAge = document.getElementById("addAge");
var addbtn = document.getElementById("add");
var updatebtn = document.getElementById("update");
var deletebtn = document.getElementById("delete");
var  idVal = document.getElementById("keyId");
var find = document.getElementById("find");
var findResultFromName = document.getElementById("find_result_from_name");
var findBlock = document.getElementById("find_block");
var selectors = [];
function createId(nums){
	//用来生成唯一键id的方法
	return  Math.random().toString(36).substr(nums)
}
```

### 打开数据库

**基本用法**
```js
window.indexedDB.open(databaseName, version);
```

**封装后我们返回db对象**

```js
//databaseName 数据库名
//storeName 表名
//indexs 新建的索引列表
	function openIndexDb(databaseName,storeName,indexs){
		return new Promise(function(res,rej){
			try{
				var request = window.indexedDB.open("map",2);
			}catch(e){
				rej(e)
			}
			request.onerror = function(e){
				rej(e.target.error);
				console.log("打开失败")
			}
			request.onsuccess = function(event){
				//打开数据库之后返回这个对象仓库
				res(request.result)
				console.log("打开成功")
			}
			request.onupgradeneeded = function (event) {
			  var db = event.target.result;
			  //如果没有此张表则新建
			  if (!db.objectStoreNames.contains(storeName)) {
				  //建表并确定id为主键
			      var objstore = db.createObjectStore(storeName, { keyPath: "id" });
				  indexs.forEach(function(key){
					//创建索引，unique: false表示此值可重复
					objstore.createIndex(key,key,{unique: false});
				  })
			    }
			}
		})
	}
```


### 新增数据

```js
	function add(db) {
		if(!addName.value || !addAge.value){
			alert("请输入姓名或者年龄");
			return;
		}
	  var request = db.transaction(['lenandlat'], 'readwrite')
	    .objectStore('lenandlat')
	    .add({id:createId(2),name: addName.value, age: addAge.value });
	
	  request.onsuccess = function (event) {
	    alert('数据添加成功');
		addName.value = '';
		addAge.value = '';
	  };
	  request.onerror = function (event) {
	    console.log('数据写入失败',event.target.error);
	  }
	}
	var indexs = ["name","age"];
	//我们创建了一个名为map，表名为lenandlat，索引为name和age的表
	openIndexDb("map","lenandlat",indexs).then(function(db){
		addbtn.onclick = function(){
			add(db)
		}
	})
```

### 查询数据

```js
	function findObjFromKeyVal(db,storeName,key,value){
		var store = db.transaction([storeName], 'readonly').objectStore(storeName);
		var index = store.index(key);
		var request = index.get(value);
		return new Promise(function(res,rej){
			request.onerror = function(e){
				rej(e.target.error)
			}
			request.onsuccess = function(){
				if(request.result){
					res(request.result)
				}else{
					rej(request.result)
				}
			}
		})
	}
	openIndexDb("map","lenandlat",indexs).then(function(db){
		find.onclick = function(){
			//在lenandlat这张表中，找到name为findResultFromName.value的那条数据并返回
			findObjFromKeyVal(db,"lenandlat","name",findResultFromName.value).then(function(data){
				console.log(data)
				findBlock.innerHTML = JSON.stringify(data);
			}).catch(function(){
				findBlock.innerHTML = "没找到";
			})
		}
	})
```

### 更新数据

```js
	function ubdate(db) {
		if(!idVal.value){
			alert("更新操作项需要唯一值id作为依托 ,请根据查询输入");
			return;
		}
		if(!addName.value || !addAge.value){
			alert("请输入姓名或者年龄");
			return;
		}
	  var request = db.transaction(['lenandlat'], 'readwrite')
	    .objectStore('lenandlat')
	    .put({id:createId(2),name: addName.value, age: addAge.value,id:idVal.value });
	//更新id为idVal.value的这条数据的姓名和年龄
	  request.onsuccess = function (event) {
	    alert('数据添加成功');
		addName.value = '';
		addAge.value = '';
		idVal.value = '';
	  };
	  request.onerror = function (event) {
	    console.log('数据写入失败',event.target.error);
	  }
	}
	openIndexDb("map","lenandlat",indexs).then(function(db){
		updatebtn.onclick = function(){
			ubdate(db)
		}
	})
```

### 删除数据

```js
	function deletefn(db){
		if(!idVal.value){
			alert("删除项需要唯一值id,请根据查询输入");
			return;
		}
		//如果id是表中一个不存在的值，也不会报错
		var request = db.transaction(['lenandlat'], 'readwrite').objectStore('lenandlat').delete(idVal.value);
		request.onsuccess = function (event) {
			alert('数据删除成功');
			idVal.value = '';
		};
		request.onerror = function (event) {
		  console.log('数据删除成功',event.target.error);
		}
	}
	openIndexDb("map","lenandlat",indexs).then(function(db){
		deletebtn.onclick = function(){
			deletefn(db)
		}
	})
```

### 查询所有数据

```js
	function findAll(db,storeName){
		const request = db.transaction(storeName).objectStore(storeName).getAll();
		return new Promise(function(res,rej){
			request.onerror = function(){
				rej(this.error)
			}
			request.onsuccess = function(){
				res(this.result)
			}
		})
	}
```

### 完整代码

```js
	var indexs = ["name","age"];
	function openIndexDb(databaseName,storeName,indexs){
		return new Promise(function(res,rej){
			try{
				var request = window.indexedDB.open("map",2);
			}catch(e){
				rej(e)
			}
			request.onerror = function(e){
				rej(e.target.error);
				console.log("打开失败")
			}
			request.onsuccess = function(event){
				res(request.result)
				console.log("打开成功")
			}
			request.onupgradeneeded = function (event) {
			  var db = event.target.result;
			  if (!db.objectStoreNames.contains(storeName)) {
			      var objstore = db.createObjectStore(storeName, { keyPath: "id" });
				  indexs.forEach(function(key){
					objstore.createIndex(key,key,{unique: false});
				  })
			    }
			}
		})
	}
	openIndexDb("map","lenandlat",indexs).then(function(db){
		updatebtn.onclick = function(){
			ubdate(db)
		}
		deletebtn.onclick = function(){
			deletefn(db)
		}
		addbtn.onclick = function(){
			add(db)
		}
		find.onclick = function(){
			findObjFromKeyVal(db,"lenandlat","name",findResultFromName.value).then(function(data){
				console.log(data)
				findBlock.innerHTML = JSON.stringify(data);
			}).catch(function(){
				findBlock.innerHTML = "没找到";
			})
		}
		findAll(db,"lenandlat").then(data=>{
			console.log(data)
		})
	})
	
	function findObjFromKeyVal(db,storeName,key,value){
		var store = db.transaction([storeName], 'readonly').objectStore(storeName);
		var index = store.index(key);
		var request = index.get(value);
		return new Promise(function(res,rej){
			request.onerror = function(e){
				rej(e.target.error)
			}
			request.onsuccess = function(){
				if(request.result){
					res(request.result)
				}else{
					rej(request.result)
				}
			}
		})
	}
	
	
	function findAll(db,storeName){
		const request = db.transaction(storeName).objectStore(storeName).getAll();
		return new Promise(function(res,rej){
			request.onerror = function(){
				rej(this.error)
			}
			request.onsuccess = function(){
				res(this.result)
			}
		})
	}
	
	function add(db) {
		if(!addName.value || !addAge.value){
			alert("请输入姓名或者年龄");
			return;
		}
	  var request = db.transaction(['lenandlat'], 'readwrite')
	    .objectStore('lenandlat')
	    .add({id:createId(2),name: addName.value, age: addAge.value });
	
	  request.onsuccess = function (event) {
	    alert('数据添加成功');
		addName.value = '';
		addAge.value = '';
	  };
	  request.onerror = function (event) {
	    console.log('数据写入失败',event.target.error);
	  }
	}
	function ubdate(db) {
		if(!idVal.value){
			alert("更新操作项需要唯一值id作为依托 ,请根据查询输入");
			return;
		}
		if(!addName.value || !addAge.value){
			alert("请输入姓名或者年龄");
			return;
		}
	  var request = db.transaction(['lenandlat'], 'readwrite')
	    .objectStore('lenandlat')
	    .put({id:createId(2),name: addName.value, age: addAge.value,id:idVal.value });
	
	  request.onsuccess = function (event) {
	    alert('数据添加成功');
		addName.value = '';
		addAge.value = '';
		idVal.value = '';
	  };
	  request.onerror = function (event) {
	    console.log('数据写入失败',event.target.error);
	  }
	}
	function deletefn(db){
		if(!idVal.value){
			alert("删除项需要唯一值id,请根据查询输入");
			return;
		}
		var request = db.transaction(['lenandlat'], 'readwrite').objectStore('lenandlat').delete(idVal.value);
		request.onsuccess = function (event) {
			alert('数据删除成功');
			idVal.value = '';
		};
		request.onerror = function (event) {
		  console.log('数据删除成功',event.target.error);
		}
	}
```

### 具体测试用例

* 1.我们首先打开了数据库map中表名为lenandlat，主键为id，索引值为name和age的一张表
* 2.我们首先新增了2条数据，哈士奇 2，金毛 1
* 3.我们根据查询，查询到姓名为金毛的数据，并拿到它的id，去修改
* 4.我们也可以拿到某条数据的id，去删除它
* 5.刷新页面，我们可以查询到所有的数据

**千般解说不如你试一试，感兴趣的可以复制上面的例子试一试**

## 本文具体实用的价值

**遇到的问题，高德地图中查询全国市级的经纬度并渲染，以我的电脑运行速度大概20秒以上才查询完，可以看到浏览器上面一直在转圈。而且由于数据大概有50M，所以indexedDB的方案是最好的。感兴趣的可以复制下面的例子**

```js
export default(["北京市", "天津市", "石家庄市", "唐山市", "秦皇岛市", "邯郸市", "邢台市", "保定市", "张家口市", "承德市", "沧州市", "廊坊市", "衡水市", "太原市", "大同市", "阳泉市",
	"长治市", "晋城市", "朔州市", "晋中市", "运城市", "忻州市", "临汾市", "吕梁市", "呼和浩特市", "包头市", "乌海市", "赤峰市", "通辽市", "鄂尔多斯市", "呼伦贝尔市", "巴彦淖尔市",
	"乌兰察布市", "兴安盟", "锡林郭勒盟", "阿拉善盟", "沈阳市", "大连市", "鞍山市", "抚顺市", "本溪市", "丹东市", "锦州市", "营口市", "阜新市", "辽阳市", "盘锦市", "铁岭市",
	"朝阳市", "葫芦岛市", "长春市", "吉林市", "四平市", "辽源市", "通化市", "白山市", "松原市", "白城市", "延边朝鲜族自治州", "哈尔滨市", "齐齐哈尔市", "鸡西市", "鹤岗市",
	"双鸭山市", "大庆市", "伊春市", "佳木斯市", "七台河市", "牡丹江市", "黑河市", "绥化市", "大兴安岭地区", "上海市", "南京市", "无锡市", "徐州市", "常州市", "苏州市", "南通市",
	"连云港市", "淮安市", "盐城市", "扬州市", "镇江市", "泰州市", "宿迁市", "杭州市", "宁波市", "温州市", "嘉兴市", "湖州市", "绍兴市", "金华市", "衢州市", "舟山市", "台州市",
	"丽水市", "合肥市", "芜湖市", "蚌埠市", "淮南市", "马鞍山市", "淮北市", "铜陵市", "安庆市", "黄山市", "滁州市", "阜阳市", "宿州市", "六安市", "亳州市", "池州市", "宣城市",
	"福州市", "厦门市", "莆田市", "三明市", "泉州市", "漳州市", "南平市", "龙岩市", "宁德市", "南昌市", "景德镇市", "萍乡市", "九江市", "新余市", "鹰潭市", "赣州市", "吉安市",
	"宜春市", "抚州市", "上饶市", "济南市", "青岛市", "淄博市", "枣庄市", "东营市", "烟台市", "潍坊市", "济宁市", "泰安市", "威海市", "日照市", "临沂市", "德州市", "聊城市",
	"滨州市", "菏泽市", "郑州市", "开封市", "洛阳市", "平顶山市", "安阳市", "鹤壁市", "新乡市", "焦作市", "濮阳市", "许昌市", "漯河市", "三门峡市", "南阳市", "商丘市",
	"信阳市", "周口市", "驻马店市", "济源市", "武汉市", "黄石市", "十堰市", "宜昌市", "襄阳市", "鄂州市", "荆门市", "孝感市", "荆州市", "黄冈市", "咸宁市", "随州市",
	"恩施土家族苗族自治州", "仙桃市", "潜江市", "天门市", "神农架林区", "长沙市", "株洲市", "湘潭市", "衡阳市", "邵阳市", "岳阳市", "常德市", "张家界市", "益阳市", "郴州市",
	"永州市", "怀化市", "娄底市", "湘西土家族苗族自治州", "广州市", "韶关市", "深圳市", "珠海市", "汕头市", "佛山市", "江门市", "湛江市", "茂名市", "肇庆市", "惠州市", "梅州市",
	"汕尾市", "河源市", "阳江市", "清远市", "东莞市", "中山市", "潮州市", "揭阳市", "云浮市", "南宁市", "柳州市", "桂林市", "梧州市", "北海市", "防城港市", "钦州市", "贵港市",
	"玉林市", "百色市", "贺州市", "河池市", "来宾市", "崇左市", "海口市", "三亚市", "三沙市", "儋州市", "五指山市", "琼海市", "文昌市", "万宁市", "东方市", "重庆市", "成都市",
	"自贡市", "攀枝花市", "泸州市", "德阳市", "绵阳市", "广元市", "遂宁市", "内江市", "乐山市", "南充市", "眉山市", "宜宾市", "广安市", "达州市", "雅安市", "巴中市", "资阳市",
	"阿坝藏族羌族自治州", "甘孜藏族自治州", "凉山彝族自治州", "贵阳市", "六盘水市", "遵义市", "安顺市", "毕节市", "铜仁市", "黔西南布依族苗族自治州", "黔东南苗族侗族自治州",
	"黔南布依族苗族自治州", "昆明市", "曲靖市", "玉溪市", "保山市", "昭通市", "丽江市", "普洱市", "临沧市", "楚雄彝族自治州", "红河哈尼族彝族自治州", "文山壮族苗族自治州",
	"西双版纳傣族自治州", "大理白族自治州", "德宏傣族景颇族自治州", "怒江傈僳族自治州", "迪庆藏族自治州", "拉萨市", "日喀则市", "昌都市", "林芝市", "山南市", "那曲市", "阿里地区", "西安市",
	"铜川市", "宝鸡市", "咸阳市", "渭南市", "延安市", "汉中市", "榆林市", "安康市", "商洛市", "兰州市", "嘉峪关市", "金昌市", "白银市", "天水市", "武威市", "张掖市", "平凉市",
	"酒泉市", "庆阳市", "定西市", "陇南市", "临夏回族自治州", "甘南藏族自治州", "西宁市", "海东市", "海北藏族自治州", "黄南藏族自治州", "海南藏族自治州", "果洛藏族自治州", "玉树藏族自治州",
	"海西蒙古族藏族自治州", "格尔木市", "银川市", "石嘴山市", "吴忠市", "固原市", "中卫市", "乌鲁木齐市", "克拉玛依市", "吐鲁番市", "哈密市", "昌吉回族自治州", "博尔塔拉蒙古自治州",
	"巴音郭楞蒙古自治州", "阿克苏地区", "克孜勒苏柯尔克孜自治州", "喀什地区", "和田地区", "伊犁哈萨克自治州", "塔城地区", "阿勒泰地区", "石河子市", "阿拉尔市", "图木舒克市", "五家渠市",
	"北屯市", "铁门关市", "双河市", "可克达拉市", "昆玉市", "香港特别行政区", "澳门特别行政区", "定安县", "峨眉山市", "屯昌县", "澄迈县", "临高县", "白沙黎族自治县", "昌江黎族自治县",
	"乐东黎族自治县", "陵水黎族自治县", "保亭黎族苗族自治县", "琼中黎族苗族自治县"
])
```

```html
<!doctype html>
<html>
	<head>
		<meta charset="utf-8">
		<meta http-equiv="X-UA-Compatible" content="IE=edge">
		<meta name="viewport" content="initial-scale=1.0, user-scalable=no, width=device-width">
		<link rel="stylesheet" href="https://a.amap.com/jsapi_demos/static/demo-center/css/demo-center.css" />
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
			import citys from "./citys.js";
			var map = new AMap.Map('map-container', {
				resizeEnable: true,
				viewMode: '3D',
				pitch: 0,
				zoom: 5,
				center: [114.308909, 30.588336]
			});

			console.log(map)

			var data = citys;
			var indexs = ["city","info"];
			render(data)
			
			function render(data){
				AMap.plugin('AMap.DistrictSearch', function() {
					var district = new AMap.DistrictSearch({
						extensions: 'all',
						level: 'city'
					})
					var  start = Date.now();
					data.forEach(item => {
						/*
						如果解开此处并且把下面的注释，会得到纯查询的速度
						district.search(item, function(status, result) {
							console.log(Date.now()-start)
							renderBounce(result)		
						})
						*/
						openIndexDb("map","citys",indexs).then(function(db){
							findObjFromKeyVal(db,"citys","city",item).then(function(data){
								var  result = data.info;
								console.log(Date.now()-start)
								//如果查询到就直接渲染
								renderBounce(result)	
							}).catch(function(){
								//如果没找到，就直接查询，并且存入本地数据库
								district.search(item, function(status, result) {
									addCityInfo(db,"citys",{id:createId(2),city:item,info:JSON.parse(JSON.stringify(result))})		
								})
							})
						}).catch(function(){
							//如果打开数据库失败，则直接查询
							district.search(item, function(status, result) {
								renderBounce(result)		
							})
						})
					})
				})
			}
			function renderBounce(result){
				var bounds = result.districtList[0].boundaries;
				if (bounds) {
					for (var i = 0, l = bounds.length; i < l; i++) {
						var polygon = new AMap.Polygon({
							map: map,
							strokeWeight: 1,
							path: bounds[i],
							fillOpacity: 0.8,
							fillColor: '#0088ff',
							strokeColor: '#CC66CC'
						})
					}
				}	
			}
			function createId(nums){
				return  Math.random().toString(36).substr(nums)
			}
			function addCityInfo(db,storeName,obj){
				var request = db.transaction([storeName], 'readwrite')
				  .objectStore(storeName)
				  .add(obj);
					
				request.onsuccess = function (event) {
				  console.log('数据写入成功');
				};
					
				request.onerror = function (event) {
				  console.log('数据写入失败',event.target.error);
				}
			}
			function findObjFromKeyVal(db,storeName,key,value){
				var store = db.transaction([storeName], 'readonly').objectStore(storeName);
				var index = store.index(key);
				var request = index.get(value);
				return new Promise(function(res,rej){
					request.onerror = function(e){
						rej(e.target.error)
					}
					request.onsuccess = function(){
						if(request.result){
							res(request.result)
						}else{
							rej(request.result)
						}
					}
				})
			}
			function openIndexDb(databaseName,storeName,indexs){
				return new Promise(function(res,rej){
					try{
						var request = window.indexedDB.open("map");
					}catch(e){
						rej(e)
					}
					request.onerror = function(e){
						rej(e.target.error);
						console.log("打开失败",e.target.error)
					}
					request.onsuccess = function(event){
						res(request.result)
						console.log("打开成功")
					}
					request.onupgradeneeded = function (event) {
					  var db = event.target.result;
					  if (!db.objectStoreNames.contains(storeName)) {
					      var objstore = db.createObjectStore(storeName, { keyPath: "id" });
						  indexs.forEach(function(key){
							objstore.createIndex(key,key,{unique: false});
						  })
					    }
					}
				})
			}

		</script>
	</body>
</html>
```


### 未完待续···