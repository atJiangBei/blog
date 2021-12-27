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
    "revision": "4e97c81afd9ead1dcc3bd04e0383b385"
  },
  {
    "url": "assets/css/0.styles.74e9b7ef.css",
    "revision": "1d60d06bb90451442dd705fc8fea71b9"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.d969bc03.js",
    "revision": "edb346f66956334e9f01cea00f4fd5f4"
  },
  {
    "url": "assets/js/11.d0d94d48.js",
    "revision": "988bd3d9dfcdcc8b14c3eb281d5ff4b3"
  },
  {
    "url": "assets/js/12.bd0de515.js",
    "revision": "9557401dcc99276799092b5b8da40e62"
  },
  {
    "url": "assets/js/13.839fa9aa.js",
    "revision": "87cdb93cb352c316921e292d6bd8051d"
  },
  {
    "url": "assets/js/14.393e6f86.js",
    "revision": "03da4c06dd881fcd21723a9609eaf457"
  },
  {
    "url": "assets/js/15.7928c4e0.js",
    "revision": "bd524ef703e3da6351ba693d33b031ef"
  },
  {
    "url": "assets/js/16.3a5db23f.js",
    "revision": "4652f953c8e109b7b9f6e3a8823f530e"
  },
  {
    "url": "assets/js/17.e23db90b.js",
    "revision": "d56e2c09bbfaa85e537ad644782b7b69"
  },
  {
    "url": "assets/js/18.42092761.js",
    "revision": "831e2cc99e37c53b9d267755a3b00945"
  },
  {
    "url": "assets/js/19.bbe406ef.js",
    "revision": "bbf6fb612ba6769078df2c6af9916c5c"
  },
  {
    "url": "assets/js/2.e0bb01de.js",
    "revision": "4ed1e423125feca12b76efc2dd164212"
  },
  {
    "url": "assets/js/20.793dc80a.js",
    "revision": "c6142667036a72a425aa024d8d22f848"
  },
  {
    "url": "assets/js/21.4084f7b2.js",
    "revision": "c3136afd0d2030fafb3e80954a1d4d2c"
  },
  {
    "url": "assets/js/22.3960d273.js",
    "revision": "032e2c1ca92d9240eeef7a10b6a9f243"
  },
  {
    "url": "assets/js/23.d32665fb.js",
    "revision": "291fa8267bc1a1b5230913388bb8fdf2"
  },
  {
    "url": "assets/js/24.35e9112f.js",
    "revision": "585e5ca770291edbc738174e8adf2bb7"
  },
  {
    "url": "assets/js/25.2aa026d0.js",
    "revision": "405f0839594132d16062a8cd73691192"
  },
  {
    "url": "assets/js/26.bd142092.js",
    "revision": "c17824655785503e9346dadab3b665b8"
  },
  {
    "url": "assets/js/27.04c1179a.js",
    "revision": "c4cab66169131fdafee9db40a3be1fbf"
  },
  {
    "url": "assets/js/28.f28546d7.js",
    "revision": "a87af631b52f7019061051399c2f94fd"
  },
  {
    "url": "assets/js/29.33b113e9.js",
    "revision": "37d14fff7c517ac124e9d45b9c710b67"
  },
  {
    "url": "assets/js/3.a95099b2.js",
    "revision": "8f79b9ae30fdae4120f15ad1015324f1"
  },
  {
    "url": "assets/js/30.4f02dd84.js",
    "revision": "ce2b02747f98006bed65afd5711390b1"
  },
  {
    "url": "assets/js/31.42a6dbf4.js",
    "revision": "3142ef81cfaea10d99906da9c850213b"
  },
  {
    "url": "assets/js/32.80faa3ea.js",
    "revision": "5a02836242487e1190282cc085d3cb19"
  },
  {
    "url": "assets/js/33.c9e293a2.js",
    "revision": "430c51eecfea1bf8cf2834d4d36d1243"
  },
  {
    "url": "assets/js/34.9887c511.js",
    "revision": "43ffb56b8d251fa578b87b0f953bf0e5"
  },
  {
    "url": "assets/js/35.098fb961.js",
    "revision": "01083f4954d9f060c35b2c509bc90d72"
  },
  {
    "url": "assets/js/36.85d3e31f.js",
    "revision": "f6c1c57dab32829e606e39302b23931c"
  },
  {
    "url": "assets/js/4.2edfc945.js",
    "revision": "fb8434136ea7d728f9df663b7e711997"
  },
  {
    "url": "assets/js/5.07b2285d.js",
    "revision": "0abe2947fc6d6d40af992ea6c4da5ee5"
  },
  {
    "url": "assets/js/6.a973b773.js",
    "revision": "990e94340d9f8a14fc38ebc561e72d53"
  },
  {
    "url": "assets/js/7.0e1dd7d4.js",
    "revision": "89e63520a1906ec0cdb8062189a3d835"
  },
  {
    "url": "assets/js/8.2b5163de.js",
    "revision": "ce5c361a016a11f6f0d8ea85a4071aa5"
  },
  {
    "url": "assets/js/9.637ac254.js",
    "revision": "2459c4f5d091ba5b0436507f59748902"
  },
  {
    "url": "assets/js/app.ae263b47.js",
    "revision": "b5a1df28eca13b5efc60a055bfaf91d8"
  },
  {
    "url": "en/index.html",
    "revision": "dacccac47ad5ea90218e66c73ed13f3c"
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
    "revision": "cf4386ec0b0c47a67801ead13de94208"
  },
  {
    "url": "js/advanced/currying.html",
    "revision": "9d485fe6ecb14abde427b8ac8edc04e2"
  },
  {
    "url": "js/advanced/eventloop.html",
    "revision": "56ce12d2c9eb7ffd7ff370092578ae7d"
  },
  {
    "url": "js/advanced/indexeddb.html",
    "revision": "a836f40268df60ae37bfdcf4df2991bc"
  },
  {
    "url": "js/advanced/webworkers.html",
    "revision": "e2256c72323a7e1eb68b0eb3240280ed"
  },
  {
    "url": "js/basic/copy.html",
    "revision": "a6f72d77215a6ec12169baa7b40c91e7"
  },
  {
    "url": "js/basic/index.html",
    "revision": "06f3555c89a732d29effd1b24dba1ad1"
  },
  {
    "url": "js/basic/jicheng.html",
    "revision": "cfd7469ffc4e081c0c8eadfed4e740b4"
  },
  {
    "url": "js/basic/meta.html",
    "revision": "02192288cd5ad6cda6ad212f4f9f94eb"
  },
  {
    "url": "js/basic/prototypeandproto.html",
    "revision": "4e8cab1d28585a3c8c65a748a7cc4e84"
  },
  {
    "url": "js/other/tools.html",
    "revision": "bbeac30818b713a226fb0d58bf8f3cb1"
  },
  {
    "url": "js/write/array.html",
    "revision": "ff82f47912c8460ad4460c9cd29275bf"
  },
  {
    "url": "js/write/eventEmitter.html",
    "revision": "93da4406db644e2586a32c81f0aefcd4"
  },
  {
    "url": "js/write/function.html",
    "revision": "6db225fc599774cf7fbd57c99afd5672"
  },
  {
    "url": "js/write/object.html",
    "revision": "028d1bc2fb9ccf5abaa7a0ff18bc7771"
  },
  {
    "url": "js/write/promise.html",
    "revision": "e508503eac0d8cb873078b82bb942c6d"
  },
  {
    "url": "leetcode/array/index.html",
    "revision": "6316c619ceda766996adbedc1c82d002"
  },
  {
    "url": "leetcode/index.html",
    "revision": "643b15bec4b396d2bc8a7e9207ced145"
  },
  {
    "url": "leetcode/list/index.html",
    "revision": "f8cba86dcc38d14a6ffdceab34dbab54"
  },
  {
    "url": "leetcode/other/index.html",
    "revision": "e45e1fb3a8aec85bd4bf40055e1c8576"
  },
  {
    "url": "leetcode/string/index.html",
    "revision": "f71bcc78ff8cc78ef3b7d2a1994ba9ac"
  },
  {
    "url": "leetcode/tree/index.html",
    "revision": "0bbe5ed8f039196f641a4673d68415b8"
  },
  {
    "url": "message.html",
    "revision": "c0c0803bc916894fd2d8d6310069ad77"
  },
  {
    "url": "questions/js/index.html",
    "revision": "e03910bce123fb0a8cf990e20151d1de"
  },
  {
    "url": "react/index.html",
    "revision": "92b5034d1448092b64dd2df09569721e"
  },
  {
    "url": "vue/vue2/index.html",
    "revision": "76cc66695a9e8ecb0f0f8487aed70187"
  },
  {
    "url": "vue/vue3/index.html",
    "revision": "521d4722ff5f71487ddddc5c8cc0ec9b"
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
