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
    "revision": "f009f33fe2c596feff38320f5e8de5c5"
  },
  {
    "url": "assets/css/0.styles.d0858680.css",
    "revision": "64060ee6831ff75aab739fd6d10194fb"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.f10f567a.js",
    "revision": "91b34600f4c9c00c302b9d626524e986"
  },
  {
    "url": "assets/js/11.26fd6914.js",
    "revision": "63143199411ae7d6baecc6a774efc665"
  },
  {
    "url": "assets/js/12.b196d8c1.js",
    "revision": "c7803dffade06fc93fbb844230bed72b"
  },
  {
    "url": "assets/js/13.56d35fa6.js",
    "revision": "a992059a2a7729ca1a3aaeb4d2b0c6f8"
  },
  {
    "url": "assets/js/14.eca49bb3.js",
    "revision": "e67bfabf8b9bf7f76117276f1744fb1b"
  },
  {
    "url": "assets/js/15.81f7d85c.js",
    "revision": "bec780f23b93661f319f5cad7598c4a1"
  },
  {
    "url": "assets/js/16.50913214.js",
    "revision": "c291a4d3bccf4e16bb992aad30f202d1"
  },
  {
    "url": "assets/js/17.e428fc28.js",
    "revision": "baeec33994545c6e93abaa03d23455d0"
  },
  {
    "url": "assets/js/18.da2d9701.js",
    "revision": "a1129ef54d41e73572f20d598a19bac8"
  },
  {
    "url": "assets/js/19.d4b73782.js",
    "revision": "84fadc4d43095b8efbf225a635b1cc12"
  },
  {
    "url": "assets/js/2.c0191e23.js",
    "revision": "54aae44b9a70ae15db4fa77a4055bd91"
  },
  {
    "url": "assets/js/20.7c576795.js",
    "revision": "71a2701891ebbc2b37818273a5f6c3a7"
  },
  {
    "url": "assets/js/21.058d6ea5.js",
    "revision": "0c780e2627686f8654f9f272cedd324e"
  },
  {
    "url": "assets/js/22.b8cbad52.js",
    "revision": "a223d5f87c86c6e1da54f0f7c75689bb"
  },
  {
    "url": "assets/js/23.11180990.js",
    "revision": "6b18411eeed883aaf3e4e86d6790d2fb"
  },
  {
    "url": "assets/js/24.686b772a.js",
    "revision": "81c0466439e2115c17838f373b4f35ee"
  },
  {
    "url": "assets/js/25.54563e2c.js",
    "revision": "75205d028cebcdcfff606df35041c3a8"
  },
  {
    "url": "assets/js/26.c7ac19ef.js",
    "revision": "0a08c16303fbe7179e0b9629225e9b2f"
  },
  {
    "url": "assets/js/27.be0d3edf.js",
    "revision": "50c79682b93917d1e16ef59ec1d4e0ca"
  },
  {
    "url": "assets/js/28.3bb473cc.js",
    "revision": "68634e6484f09162f405a85ea6005b82"
  },
  {
    "url": "assets/js/3.d82c7ee0.js",
    "revision": "90bcec42debfdc912254279c145e38f1"
  },
  {
    "url": "assets/js/4.a7654779.js",
    "revision": "4e201bd4c50e08451d5cacf004cd53d9"
  },
  {
    "url": "assets/js/5.23f973fb.js",
    "revision": "26f76642c8566174830cc77f7d395c58"
  },
  {
    "url": "assets/js/6.e6157b9a.js",
    "revision": "1d8c00063195d33954581e4036487d4d"
  },
  {
    "url": "assets/js/7.bc05f562.js",
    "revision": "0916ea25f3277d4222329145e0a67068"
  },
  {
    "url": "assets/js/8.4c2a440c.js",
    "revision": "c17a367b6bdc5b465b027e1a0f9fdfdb"
  },
  {
    "url": "assets/js/9.ab771339.js",
    "revision": "194c03afe911a953e53331b8c685b1f3"
  },
  {
    "url": "assets/js/app.9396dc2c.js",
    "revision": "6871af72820725f7a81a10bf78c87c0f"
  },
  {
    "url": "en/index.html",
    "revision": "868864f5efa304637e4729e7496f712e"
  },
  {
    "url": "es6/index.html",
    "revision": "8f36c8aceacfdbfe6e21e021236d03bc"
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
    "revision": "1a908f10f706f4c58e8d80e799e928d3"
  },
  {
    "url": "js/advanced/currying.html",
    "revision": "996640e81e104a152368ee711d4d44e6"
  },
  {
    "url": "js/advanced/eventloop.html",
    "revision": "e3980aac2ecf0eb8da5a0c137ed1a0ee"
  },
  {
    "url": "js/advanced/throttledebonce.html",
    "revision": "8e6dba37a2dc17cb421bace6c85972a6"
  },
  {
    "url": "js/basic/index.html",
    "revision": "d766a3ef3c9f75a5b66291a9bc07276e"
  },
  {
    "url": "js/basic/jicheng.html",
    "revision": "e7a74ad1a6a35ae01ecd41f23ce39ce6"
  },
  {
    "url": "js/basic/prototypeandproto.html",
    "revision": "ed6108754ff7580a0fb0c6fe121e03f0"
  },
  {
    "url": "js/write/array.html",
    "revision": "20bcc3d457d26113e686288575bf9441"
  },
  {
    "url": "js/write/function.html",
    "revision": "c4d4a9589835e234c57b47b88d13f767"
  },
  {
    "url": "js/write/object.html",
    "revision": "cf7557ae0793d95fbda9bae0c79bbcc5"
  },
  {
    "url": "leetcode/array/index.html",
    "revision": "11ded6958a871e11aada14120b4db8cf"
  },
  {
    "url": "leetcode/index.html",
    "revision": "0ce2b67c3e6106897d325169978b6df7"
  },
  {
    "url": "leetcode/list/index.html",
    "revision": "62faf6085644dbe3fc0f13fade56807b"
  },
  {
    "url": "leetcode/other/index.html",
    "revision": "745d5257ff5f5116c8d700d39ad51325"
  },
  {
    "url": "leetcode/string/index.html",
    "revision": "dd2b1d35aa178e9ba547cbb6b75bc9b2"
  },
  {
    "url": "leetcode/tree/index.html",
    "revision": "e3abd7c1efa9b6420f1210db9c16058e"
  },
  {
    "url": "message.html",
    "revision": "2052634c5745c4d903211a668b4c0925"
  },
  {
    "url": "react/index.html",
    "revision": "1440d261062fe26645a6fcc56de73231"
  },
  {
    "url": "vue/vue2/index.html",
    "revision": "3d41bfc05eeaebc056b2a5469d918202"
  },
  {
    "url": "vue/vue3/index.html",
    "revision": "f76edd113333dd807b6d0b867a90cd0d"
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
