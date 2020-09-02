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
    "revision": "76b5934ef2960532b002be947b2a25e5"
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
    "url": "assets/js/10.0a0b9a24.js",
    "revision": "0644c0c8de1d4b02824a0b53782aab57"
  },
  {
    "url": "assets/js/11.1a65d3cc.js",
    "revision": "91fa613a39e8c76a9ca7d1ad577f8e12"
  },
  {
    "url": "assets/js/12.d8cb3cfd.js",
    "revision": "a099b6f30c6b4d768f568dfac6bb41de"
  },
  {
    "url": "assets/js/13.f2ff462e.js",
    "revision": "a24597675dafcfcd58ddf1d8f1c2d2c2"
  },
  {
    "url": "assets/js/14.111ddddc.js",
    "revision": "9ec34e4c867730e19911f82faa3dd49f"
  },
  {
    "url": "assets/js/15.d9670c98.js",
    "revision": "77294840b6caf03967a1ce51c4064552"
  },
  {
    "url": "assets/js/16.23b4c162.js",
    "revision": "48a80bad5967377655dd3226c4ebf3de"
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
    "url": "assets/js/19.72f1de20.js",
    "revision": "77c6bc69d05a7cff9bf10ce669751f7e"
  },
  {
    "url": "assets/js/2.c0191e23.js",
    "revision": "54aae44b9a70ae15db4fa77a4055bd91"
  },
  {
    "url": "assets/js/20.039b3f09.js",
    "revision": "5368a923e905ac17cd16da8ae2a17c2f"
  },
  {
    "url": "assets/js/21.f15bd9d4.js",
    "revision": "f6be16866f19efdfd434a500fd63316e"
  },
  {
    "url": "assets/js/22.3446648f.js",
    "revision": "05ffa26845591656fcb9944a399beded"
  },
  {
    "url": "assets/js/23.8b6f1e38.js",
    "revision": "aaa7511c2e9865047651f3d63fe18ad5"
  },
  {
    "url": "assets/js/24.548bde69.js",
    "revision": "ab5d107e4011b8d875c395983a0b2365"
  },
  {
    "url": "assets/js/25.4febe98b.js",
    "revision": "822e6f616734f0ac3d3187c0d20ed4c0"
  },
  {
    "url": "assets/js/26.3e1e17f7.js",
    "revision": "c4f63176af75646970eb311e3930a5ac"
  },
  {
    "url": "assets/js/27.7b59d07b.js",
    "revision": "f9cd03f2a72cfe63aab9fd4063bef38c"
  },
  {
    "url": "assets/js/28.f6788b37.js",
    "revision": "02cf6c187f5fff47b37037bb0809ef01"
  },
  {
    "url": "assets/js/29.c9c74651.js",
    "revision": "698297e823eaa044fcb768e6037d9574"
  },
  {
    "url": "assets/js/3.d0de4903.js",
    "revision": "ca2c47f03084849776496078e974842d"
  },
  {
    "url": "assets/js/4.1e3cce21.js",
    "revision": "99ee0af0cfa09d1f8bd7f25a94a78b2f"
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
    "url": "assets/js/8.2b90bd67.js",
    "revision": "c0aa9ad0ba2c8d60eb843793092ab958"
  },
  {
    "url": "assets/js/9.979cf0ca.js",
    "revision": "6cfe221ed24a3784edfa4c441b9dd8a9"
  },
  {
    "url": "assets/js/app.c4715760.js",
    "revision": "0163f08379eeab30a0cf7ee26a98433b"
  },
  {
    "url": "en/index.html",
    "revision": "cd0eb0f47c572a2d880c205c1e3d272a"
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
    "revision": "6f8cba3ad325460720125fa147c8e622"
  },
  {
    "url": "js/advanced/currying.html",
    "revision": "646d5f022c798356c48f0776b5f6caa7"
  },
  {
    "url": "js/advanced/eventloop.html",
    "revision": "a67bd8d6fedea6d51c618a7893ca0127"
  },
  {
    "url": "js/advanced/indexeddb.html",
    "revision": "cbdab7c37825255af8d1acf330248ba1"
  },
  {
    "url": "js/advanced/webworkers.html",
    "revision": "9b06beca7e87107ed5816ea630bc0c8b"
  },
  {
    "url": "js/basic/index.html",
    "revision": "292bcad6b450bf4d70326fbb04d9d34f"
  },
  {
    "url": "js/basic/jicheng.html",
    "revision": "a60e1a2f3631d64aa75920d87145f954"
  },
  {
    "url": "js/basic/prototypeandproto.html",
    "revision": "7adf71cab169895ef1a029234af22ffc"
  },
  {
    "url": "js/write/array.html",
    "revision": "c7af6409220e021503af4f8f3531c49f"
  },
  {
    "url": "js/write/function.html",
    "revision": "259f18b699fcb9856393ccca1e96f85b"
  },
  {
    "url": "js/write/object.html",
    "revision": "1b4fb4a79f4d17eb7dc10e398d63e952"
  },
  {
    "url": "leetcode/array/index.html",
    "revision": "62b91318d86eccdad66ed28212e8ed3d"
  },
  {
    "url": "leetcode/index.html",
    "revision": "371e26c41128f9fed643375badf6baa4"
  },
  {
    "url": "leetcode/list/index.html",
    "revision": "60a5c94e5b2afd767d7296bb9594658f"
  },
  {
    "url": "leetcode/other/index.html",
    "revision": "23e50cfe81f1fe8c01c68ea211ca64be"
  },
  {
    "url": "leetcode/string/index.html",
    "revision": "5b4cddb462ab2966b7046e092c453899"
  },
  {
    "url": "leetcode/tree/index.html",
    "revision": "539d0533a64358b6589e918b3142ef4a"
  },
  {
    "url": "message.html",
    "revision": "8e7ae78abd15e17c670c818c91064b02"
  },
  {
    "url": "questions/js/index.html",
    "revision": "b2419a4a8cb8e1072b43738433e0ce7e"
  },
  {
    "url": "react/index.html",
    "revision": "5267885014534b276d8fba3afddc89a7"
  },
  {
    "url": "vue/vue2/index.html",
    "revision": "22463f46988c69b222240eac9e607dff"
  },
  {
    "url": "vue/vue3/index.html",
    "revision": "a0aad6dc89f270f5485ded7f002ef09e"
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
