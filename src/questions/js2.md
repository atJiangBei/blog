## Object.create()

Object.create() 静态方法以一个现有对象作为原型，创建一个新对象。

```javascript
function create(proto, propertiesObject) {
  const obj = {};
  if (!proto) {
    Object.setPrototypeOf(obj, null);
    return obj;
  }
  if (!propertiesObject) {
    Object.setPrototypeOf(obj, proto);
    return obj;
  }
  Object.setPrototypeOf(obj, proto);
  Object.defineProperties(obj, propertiesObject);
  return obj;
}
```

## es6 和 es5 的继承

### 实现继承的方式不同

- es5 通过原型和原型链继承，子类通过原型对象继承父类的方法和属性。子类需要调用父类的构造函数来完成继承过程。
- es5 的静态函数需要手动设置

```js

```

## js 如何处理中文输入法的问题

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title></title>
  </head>
  <body>
    <input id="currentInput" />
  </body>
  <script>
    const currentInput = document.getElementById('currentInput');
    currentInput.addEventListener('compositionstart', function () {
      console.log('start');
    });
    currentInput.addEventListener('compositionend', function () {
      console.log('end');
    });
    currentInput.addEventListener('input', function () {
      console.log('input');
    });
  </script>
</html>
```
