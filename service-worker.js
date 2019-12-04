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
    "revision": "4ff79b10f1869bd14c4ed53dd410ffbc"
  },
  {
    "url": "assets/css/0.styles.01a74feb.css",
    "revision": "c34ed002247410cd69ea6bdec3f1f652"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.ac3fdde0.js",
    "revision": "b5231a840d94a56e94d600486db3705c"
  },
  {
    "url": "assets/js/3.e2818424.js",
    "revision": "ccaf095ef9d1fff58efa74c0ec386521"
  },
  {
    "url": "assets/js/4.98850059.js",
    "revision": "7ad15bea4f191a3d998137801a9dfd22"
  },
  {
    "url": "assets/js/5.f956454f.js",
    "revision": "489e82d39dc1f8fc83627582a1f7ba4e"
  },
  {
    "url": "assets/js/6.e0698e8d.js",
    "revision": "149f2597606a72ac0595e55462653a75"
  },
  {
    "url": "assets/js/7.0e8d9e1d.js",
    "revision": "f81ce6f5da9180d231d5956ad6183a9d"
  },
  {
    "url": "assets/js/8.d8eb4b9c.js",
    "revision": "bb3ead60d51b3e93279520f6785ccdc6"
  },
  {
    "url": "assets/js/9.18b8d89d.js",
    "revision": "75797347c4276775117b3e880269f944"
  },
  {
    "url": "assets/js/app.0d49be00.js",
    "revision": "b09f2637d0ecf05ef33fbd89125fea3c"
  },
  {
    "url": "assets/js/vendors~docsearch.ffa5a33f.js",
    "revision": "9d34f5460b904441c9a89309ae7416d8"
  },
  {
    "url": "en/index.html",
    "revision": "dd545e22ff0fddc1df2f5efeea7a8f30"
  },
  {
    "url": "guide/index.html",
    "revision": "b499e99311b3793a445dbc5e06571aac"
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
    "revision": "f22d501a35a87d9f21701cb031f6ea17"
  },
  {
    "url": "imgs/logo.png",
    "revision": "443dbedbc55203214f2f1b1935a8c898"
  },
  {
    "url": "index.html",
    "revision": "72fc3de2059b980a793552c5bdfa0d44"
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
