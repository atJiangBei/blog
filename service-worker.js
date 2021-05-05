/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "572189cd5db12284a8c110264d89e01e"
  },
  {
    "url": "assets/css/0.styles.3e0bacda.css",
    "revision": "0696112fb9f8d767fb7d3bf9012a50ec"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.69c7549c.js",
    "revision": "3eb4de9a05f16e4ebb6c45ab545d2533"
  },
  {
    "url": "assets/js/11.806b8e0b.js",
    "revision": "46294277a24014d77ca6ede04560c981"
  },
  {
    "url": "assets/js/12.8030dfdc.js",
    "revision": "d5e85bd2f5746547e0c25d71dcc29a4d"
  },
  {
    "url": "assets/js/13.fcf5f720.js",
    "revision": "482d6c0a527acc8f7e577e6955cac5e7"
  },
  {
    "url": "assets/js/14.0b0f9231.js",
    "revision": "1729c6f260720aa09abf0434efdcbb26"
  },
  {
    "url": "assets/js/15.a65b700f.js",
    "revision": "14a78c49d5249fc5b8caa2be2c2c0fcc"
  },
  {
    "url": "assets/js/16.52e4d94e.js",
    "revision": "b893bf77bf5ca36703ff450a3e58267a"
  },
  {
    "url": "assets/js/17.cbbe9705.js",
    "revision": "c8e8cd9a7066265324a9559db3c2a4ab"
  },
  {
    "url": "assets/js/18.089e7f4a.js",
    "revision": "486035e5e1324fa0d5db1e9db7e3874e"
  },
  {
    "url": "assets/js/19.2c998797.js",
    "revision": "7c54b7e4393845d7df71c5f3296544b2"
  },
  {
    "url": "assets/js/2.8980963f.js",
    "revision": "fbf036b63f4431f03d864166dac9cef6"
  },
  {
    "url": "assets/js/20.d53e2500.js",
    "revision": "730cc98defcd7d60de2c8424907a3935"
  },
  {
    "url": "assets/js/21.7ce0ea84.js",
    "revision": "1f21409e9a15767cc736a065ad00e070"
  },
  {
    "url": "assets/js/22.cef31b06.js",
    "revision": "8f7f141b9fd97ba6467c2cfd1c1cbbce"
  },
  {
    "url": "assets/js/23.5d7dd231.js",
    "revision": "8752745549fef784b3f9c25682c2826a"
  },
  {
    "url": "assets/js/24.df20dc92.js",
    "revision": "71f24d5faac7313ee6af05540b12c4d9"
  },
  {
    "url": "assets/js/25.b2aa289a.js",
    "revision": "c606fd405dd1ac8c493244267b31e029"
  },
  {
    "url": "assets/js/26.63129b5d.js",
    "revision": "4e17aaad0b754a4b545620abd857cd78"
  },
  {
    "url": "assets/js/27.391c0705.js",
    "revision": "ddfc379ce2bece14f8c22727cc17d0a6"
  },
  {
    "url": "assets/js/28.948833a6.js",
    "revision": "829e74a72a5b7ea617b1c7fd31fafea6"
  },
  {
    "url": "assets/js/29.f5764b4a.js",
    "revision": "62ee77f6d26661f28a7b9df740be9a7f"
  },
  {
    "url": "assets/js/3.88f6f61a.js",
    "revision": "369bff5c5544cac97314dc7170bbf9cb"
  },
  {
    "url": "assets/js/30.7f53bf1a.js",
    "revision": "383505b311a42482125ad494f184d0b3"
  },
  {
    "url": "assets/js/31.05e9a0ed.js",
    "revision": "cddfd9658a213fb630707522e4451938"
  },
  {
    "url": "assets/js/32.0c805763.js",
    "revision": "40472ce03e132495ab5cc8f5ff0a5235"
  },
  {
    "url": "assets/js/33.3fb2757e.js",
    "revision": "6926f126452f458ea302d070a9345764"
  },
  {
    "url": "assets/js/34.c87c3e2c.js",
    "revision": "6f95619c07b61464d134614b3bf78297"
  },
  {
    "url": "assets/js/35.175375db.js",
    "revision": "49a53201b43c4baba9d28628798d37bc"
  },
  {
    "url": "assets/js/36.7fb41a27.js",
    "revision": "c0abcb6f4e5ccc2b02534ee22967aacc"
  },
  {
    "url": "assets/js/4.fba162e0.js",
    "revision": "bc813d56dd01609760603a36ae0c61c9"
  },
  {
    "url": "assets/js/5.1a2588b8.js",
    "revision": "0bb3ce5fb196475f5e57354916ff0944"
  },
  {
    "url": "assets/js/6.f9eddd38.js",
    "revision": "378ae5ca2ffb84dea6226163a0311a9a"
  },
  {
    "url": "assets/js/7.900c5bc2.js",
    "revision": "2e15f5023a8a83d5f35b55246cc937d8"
  },
  {
    "url": "assets/js/8.3117f5d0.js",
    "revision": "4c8fdbb8d589f5451004d1f62a24a031"
  },
  {
    "url": "assets/js/9.63f84d15.js",
    "revision": "e39f877cc97ba0bceb8935bbd9b103fd"
  },
  {
    "url": "assets/js/app.8caefc32.js",
    "revision": "98ad018389643b0df0d12158e0a75bff"
  },
  {
    "url": "en/index.html",
    "revision": "5c27a7323da89e890ab72bbe93611a62"
  },
  {
    "url": "icons/android-chrome-192x192.png",
    "revision": "f130a0b70e386170cf6f011c0ca8c4f4"
  },
  {
    "url": "icons/android-chrome-512x512.png",
    "revision": "0ff1bc4d14e5c9abcacba7c600d97814"
  },
  {
    "url": "icons/apple-touch-icon-120x120.png",
    "revision": "936d6e411cabd71f0e627011c3f18fe2"
  },
  {
    "url": "icons/apple-touch-icon-152x152.png",
    "revision": "1a034e64d80905128113e5272a5ab95e"
  },
  {
    "url": "icons/apple-touch-icon-180x180.png",
    "revision": "c43cd371a49ee4ca17ab3a60e72bdd51"
  },
  {
    "url": "icons/apple-touch-icon-60x60.png",
    "revision": "9a2b5c0f19de617685b7b5b42464e7db"
  },
  {
    "url": "icons/apple-touch-icon-76x76.png",
    "revision": "af28d69d59284dd202aa55e57227b11b"
  },
  {
    "url": "icons/apple-touch-icon.png",
    "revision": "66830ea6be8e7e94fb55df9f7b778f2e"
  },
  {
    "url": "icons/favicon-16x16.png",
    "revision": "4bb1a55479d61843b89a2fdafa7849b3"
  },
  {
    "url": "icons/favicon-32x32.png",
    "revision": "98b614336d9a12cb3f7bedb001da6fca"
  },
  {
    "url": "icons/msapplication-icon-144x144.png",
    "revision": "b89032a4a5a1879f30ba05a13947f26f"
  },
  {
    "url": "icons/mstile-150x150.png",
    "revision": "058a3335d15a3eb84e7ae3707ba09620"
  },
  {
    "url": "icons/safari-pinned-tab.svg",
    "revision": "f78c0251d6ddd56ee219a1830ded71b4"
  },
  {
    "url": "imgs/logo.png",
    "revision": "443dbedbc55203214f2f1b1935a8c898"
  },
  {
    "url": "index.html",
    "revision": "08307316b37461f5499e2e1f33bb35f2"
  },
  {
    "url": "js/advanced/currying.html",
    "revision": "13a0d19c582a9db069d0a026c0faf1c0"
  },
  {
    "url": "js/advanced/eventloop.html",
    "revision": "9a49676247819c3af500395164ca1ab8"
  },
  {
    "url": "js/advanced/indexeddb.html",
    "revision": "1cc4c1dff7890a0cf7f650c61af1bd44"
  },
  {
    "url": "js/advanced/webworkers.html",
    "revision": "acf0938f6601bc188c56fb9ffc4d0571"
  },
  {
    "url": "js/basic/copy.html",
    "revision": "d61943a4cd4bc802da8bcf227f408be4"
  },
  {
    "url": "js/basic/index.html",
    "revision": "9fda280840adfe1ee78380b9f0e75e1f"
  },
  {
    "url": "js/basic/jicheng.html",
    "revision": "a58ffb0ec9034f67d4d9dad821350931"
  },
  {
    "url": "js/basic/meta.html",
    "revision": "a8e3ecbc2d3960d17c9940d4d9e07bb6"
  },
  {
    "url": "js/basic/prototypeandproto.html",
    "revision": "e6343429248c4a38a2323598fb04684a"
  },
  {
    "url": "js/other/tools.html",
    "revision": "fe42160fcf3da7dbe92b61f763c8cdc4"
  },
  {
    "url": "js/write/array.html",
    "revision": "68de9989283c795718e17491ca6e5ed3"
  },
  {
    "url": "js/write/eventEmitter.html",
    "revision": "1311b0a9cfafc14a8415e144a9cc3827"
  },
  {
    "url": "js/write/function.html",
    "revision": "b1ba6a31cfc7dbbd34223ad149e322f9"
  },
  {
    "url": "js/write/object.html",
    "revision": "34305417c00d319161ee56087fd8a1ce"
  },
  {
    "url": "js/write/promise.html",
    "revision": "8e28679e55214f77f12959da3d3e8f68"
  },
  {
    "url": "leetcode/array/index.html",
    "revision": "3aa335f1070a2bb33a39ded6d922159d"
  },
  {
    "url": "leetcode/index.html",
    "revision": "314364b5991406a8e38609dfd3360ebd"
  },
  {
    "url": "leetcode/list/index.html",
    "revision": "1301a98e960c2f038e7901c98ced4b31"
  },
  {
    "url": "leetcode/other/index.html",
    "revision": "27dae8bc888664b231cb331540a4c9cf"
  },
  {
    "url": "leetcode/string/index.html",
    "revision": "ae4751f3e6fdc0c459c67b2185d0eeb3"
  },
  {
    "url": "leetcode/tree/index.html",
    "revision": "d97c0ea64472397aeff734a93c1208cc"
  },
  {
    "url": "message.html",
    "revision": "551a86ce69be06ac7e901af36514ed30"
  },
  {
    "url": "questions/js/index.html",
    "revision": "955bbf0a86a542cd0a180b5999791de8"
  },
  {
    "url": "react/index.html",
    "revision": "324795dc9812574335fe9d690c3c6a69"
  },
  {
    "url": "vue/vue2/index.html",
    "revision": "49ac1e6f3e9d71e990a25950b204b94d"
  },
  {
    "url": "vue/vue3/index.html",
    "revision": "21b38317a986b074aaf4a7220dfe3572"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
