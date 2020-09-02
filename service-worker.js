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
    "revision": "dae69c4684660c341649fd5bf8d7e172"
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
    "url": "assets/js/10.769c860c.js",
    "revision": "322b38b4d3ca7daa440c566473b89451"
  },
  {
    "url": "assets/js/11.cd7e6c2a.js",
    "revision": "83f0a88472511ddb79713529103d5684"
  },
  {
    "url": "assets/js/12.f749abcc.js",
    "revision": "56af50b7ebe94bc646e951ec8fad8455"
  },
  {
    "url": "assets/js/13.c253f91b.js",
    "revision": "403907e1ff57fdd331fe9e824a6552d6"
  },
  {
    "url": "assets/js/14.79b103e2.js",
    "revision": "b0ae9fb3703cc754130255247a5fa28b"
  },
  {
    "url": "assets/js/15.ee52efe2.js",
    "revision": "69b085338e2f8b1a61454bed7b606198"
  },
  {
    "url": "assets/js/16.072b1975.js",
    "revision": "b6c1cc594cb298f2008c72c0a28f61e2"
  },
  {
    "url": "assets/js/17.3abdce12.js",
    "revision": "dcb16990bcb9d39f4a302bc5df065438"
  },
  {
    "url": "assets/js/18.fa0a5edd.js",
    "revision": "4f5b1c78d5a6c7102105cf78034acedf"
  },
  {
    "url": "assets/js/19.aa388fcf.js",
    "revision": "bb487660acd3be90a668feb29bc9e6d1"
  },
  {
    "url": "assets/js/2.c0191e23.js",
    "revision": "54aae44b9a70ae15db4fa77a4055bd91"
  },
  {
    "url": "assets/js/20.8f02659c.js",
    "revision": "4f5bc8603c642c27189982588e42d859"
  },
  {
    "url": "assets/js/21.04293f5c.js",
    "revision": "8df824f5fa1fdcdd57ae6f748df44678"
  },
  {
    "url": "assets/js/22.bfa07d9c.js",
    "revision": "3afab48e3ed394e56270dd684b2a787b"
  },
  {
    "url": "assets/js/23.f1dbad04.js",
    "revision": "3647e0b86b9575638e865fcfd29d6b35"
  },
  {
    "url": "assets/js/24.73dc77c1.js",
    "revision": "49cd6ebe2b7648bbf938d35cfb884200"
  },
  {
    "url": "assets/js/25.fcbe3b22.js",
    "revision": "27af11dd406436ff9dc89c642f599fea"
  },
  {
    "url": "assets/js/26.7ab6cc65.js",
    "revision": "4f6cc9c1391d982aad9eb4403b7d79e9"
  },
  {
    "url": "assets/js/27.10aeb5e9.js",
    "revision": "b5d1d525d5fdbdb4b2316854999e5901"
  },
  {
    "url": "assets/js/28.51925612.js",
    "revision": "652b13d2be2103cd86564299ffbbeb17"
  },
  {
    "url": "assets/js/29.d20fc77f.js",
    "revision": "0f3a937a434a4ff514df2c104fdd0b08"
  },
  {
    "url": "assets/js/3.d0de4903.js",
    "revision": "ca2c47f03084849776496078e974842d"
  },
  {
    "url": "assets/js/30.b754a29e.js",
    "revision": "8b1028e5dfb3135f42be0c05f95c205e"
  },
  {
    "url": "assets/js/31.a00248a5.js",
    "revision": "ec96d84c159deac786e64a3d916e722f"
  },
  {
    "url": "assets/js/32.154f3b00.js",
    "revision": "03c92b58f84d5a5780ad85b8d5aa7d45"
  },
  {
    "url": "assets/js/33.243d641d.js",
    "revision": "50efd5a25f1406efec21f4ca72448866"
  },
  {
    "url": "assets/js/4.858f4870.js",
    "revision": "00f3e86f7cfdef506f9812a871828af9"
  },
  {
    "url": "assets/js/5.23f973fb.js",
    "revision": "26f76642c8566174830cc77f7d395c58"
  },
  {
    "url": "assets/js/6.a37f274f.js",
    "revision": "2057a5bd9963b16d69d94d08b5559b9c"
  },
  {
    "url": "assets/js/7.f00de9bb.js",
    "revision": "77b131e41819c3632b5ab4ad737f6771"
  },
  {
    "url": "assets/js/8.88b80aa7.js",
    "revision": "4bf01d6398452b63886e8ec8035f1f59"
  },
  {
    "url": "assets/js/9.a18ffa96.js",
    "revision": "5f734967cf8ea6596d905b730e1896d0"
  },
  {
    "url": "assets/js/app.71c01b6c.js",
    "revision": "6f3bfa3b4a8ffb4d25c3369700c32a44"
  },
  {
    "url": "en/index.html",
    "revision": "dad6c389262004c8b10bfcd785e57100"
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
    "revision": "810574e466d75d841fc25f16c032d4bc"
  },
  {
    "url": "js/advanced/currying.html",
    "revision": "806b2297d35c39bfc614886f15fc0e70"
  },
  {
    "url": "js/advanced/eventloop.html",
    "revision": "d03a757c0a248fcb5cbc66529c1fea98"
  },
  {
    "url": "js/advanced/indexeddb.html",
    "revision": "8b60744f5f0188d407ebf108bd2b4f1a"
  },
  {
    "url": "js/advanced/webworkers.html",
    "revision": "984a32bc3870a6e55d9927a32647a428"
  },
  {
    "url": "js/basic/index.html",
    "revision": "2179f4696a4ae7f20e804546c6b86931"
  },
  {
    "url": "js/basic/jicheng.html",
    "revision": "67581c184d2f511ed64205c94f2b0d06"
  },
  {
    "url": "js/basic/meta.html",
    "revision": "347f0f2f44e88e4d4854dc0117438e80"
  },
  {
    "url": "js/basic/prototypeandproto.html",
    "revision": "b5c992f8be1996d643630bae57658a26"
  },
  {
    "url": "js/other/tools.html",
    "revision": "79c5c5325f03d799ce980342a188261d"
  },
  {
    "url": "js/write/array.html",
    "revision": "92d4cfd494ac2a49e12b92f5a3da5d1d"
  },
  {
    "url": "js/write/eventEmitter.html",
    "revision": "452c37651d2b7f1322ac836b6ecc14fd"
  },
  {
    "url": "js/write/function.html",
    "revision": "7ee81097008004ada8a0f15f0827c744"
  },
  {
    "url": "js/write/object.html",
    "revision": "0f1ca655172790534dcc471834df4ade"
  },
  {
    "url": "js/write/promise.html",
    "revision": "0871fc38af7c5ff39863e359a59f5867"
  },
  {
    "url": "leetcode/array/index.html",
    "revision": "5704480a903f56d12f9d2f83b40d59cf"
  },
  {
    "url": "leetcode/index.html",
    "revision": "7488cca501efb655325d1c4bf95068e1"
  },
  {
    "url": "leetcode/list/index.html",
    "revision": "47634389802476508af9c78e7572ff25"
  },
  {
    "url": "leetcode/other/index.html",
    "revision": "8a9f5ff961c537a3a537681c52b357d2"
  },
  {
    "url": "leetcode/string/index.html",
    "revision": "23807b61953ccf183733d45e50dc3095"
  },
  {
    "url": "leetcode/tree/index.html",
    "revision": "9a4c4278784413cbed33d06c581b3791"
  },
  {
    "url": "message.html",
    "revision": "09de358a3a243832da15135dfc6d0b21"
  },
  {
    "url": "questions/js/index.html",
    "revision": "ebc601130c5d6343b2af32f1768a7702"
  },
  {
    "url": "react/index.html",
    "revision": "b9615f7c5426c87c7a1582ae30647310"
  },
  {
    "url": "vue/vue2/index.html",
    "revision": "d2c4a4ebca4fb437ddf73bac83e25521"
  },
  {
    "url": "vue/vue3/index.html",
    "revision": "dde097e59abcf9768525722ad75b1284"
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
