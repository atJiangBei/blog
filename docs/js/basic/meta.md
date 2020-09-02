# meta


* meta 元素可提供有关页面的元信息（meta-information），比如针对搜索引擎和更新频度的描述和关键词。
* meta 标签位于文档的头部，不包含任何内容。meta 标签的属性定义了与文档相关联的名称/值对。


**可选的值(http-equiv/name/scheme)**

* http-equiv 属性为名称/值对提供了名称。并指示服务器在发送实际的文档之前先在要传送给浏览器的 MIME 文档头部包含名称/值对。
* name 属性提供了名称/值对中的名称。HTML 和 XHTML 标签都没有指定任何预先定义的 meta 名称。通常情况下，您可以自由使用对自己和源文档的读者来说富有意义的名称
* scheme 属性用于指定要用来翻译属性值的方案。此方案应该在由 head 标签的 profile 属性指定的概况文件中进行了定义

| 属性		| 值													| 描述									|
| :------	| ------												| ------								|
| http-equiv| content-type/expires/refresh/set-cookie				| 把 content 属性关联到 HTTP 头部		|
| name		| author/description/keywords/generator/revised/others	| 把 content 属性关联到一个名称。		|
| scheme	| some_text												| 定义用于翻译 content 属性值的格式。	|


### 必须的值(content)

* content 属性提供了名称/值对中的值。该值可以是任何有效的字符串。
* content 属性始终要和 name 属性或 http-equiv 属性一起使用。

| 属性| 值 | 描述 |
| :------ | ------ | ------ |
| content | some_text	 | 定义与 http-equiv 或 name 属性相关的元信息 |

### 示例用法与讲解

规定移动端的一些设定
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
```


"keywords" 是一个经常被用到的名称。它为文档定义了一组关键字。某些搜索引擎在遇到这些关键字时，会用这些关键字对文档进行分类。
```html
<meta name="keywords" content="HTML,ASP,PHP,SQL">
```


**这样发送到浏览器的头部就应该包含**
* content-type: text/html
* charset:iso-8859-1
* expires:31 Dec 2008
```html
<meta http-equiv="charset" content="iso-8859-1">
<meta http-equiv="expires" content="31 Dec 2008">
```


声明文档使用的字符编码
```html
<meta charset="utf-8">
```

优先使用 IE 最新版本和 Chrome
```html
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1″/>
```

页面描述
```html
<meta name="description" content="不超过150个字符"/>       
```

网页作者
```html
<meta name="author" content="name, email@gmail.com"/>      
```

搜索引擎抓取
```html
<meta name="robots" content="index,follow"/>      
```


添加到主屏后的标题（iOS 6 新增）
```html
<meta name="apple-mobile-web-app-capable" content="yes"/>     
```

是否启用 WebApp 全屏模式，删除苹果默认的工具栏和菜单栏
```html
<meta name="apple-itunes-app" content="app-id=myAppStoreID, affiliate-data=myAffiliateData, app-argument=myURL">     
```

设置苹果工具栏颜色
```html
<meta name="apple-mobile-web-app-status-bar-style" content="black"/>     
```


数字禁止
```html
<meta name="format-detection" content="telphone=no, email=no"/>     
```


避免IE使用兼容模式
```html
<meta http-equiv="X-UA-Compatible" content="IE=edge">     
```

强制竖屏
```html
//uc强制竖屏 
<meta name="screen-orientation" content="portrait">
//QQ强制竖屏
<meta name="x5-orientation" content="portrait">    
// UC强制全屏
<meta name="full-screen" content="yes">             
//QQ强制全屏
<meta name="x5-fullscreen" content="true">       
```

应用模式
```html
//UC应用模式
<meta name="browsermode" content="application">
// QQ应用模式
<meta name="x5-page-mode" content="app">
```

windows phone 点击无高光
```html
<meta name="msapplication-tap-highlight" content="no">
```

设置页面不缓存
```html
<meta http-equiv="pragma" content="no-cache">

<meta http-equiv="cache-control" content="no-cache">

<meta http-equiv="expires" content="0″>
```
