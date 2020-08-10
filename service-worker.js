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
    "revision": "4c9c1812bf3178085aba2ead9d60a59d"
  },
  {
    "url": "assets/css/0.styles.89375860.css",
    "revision": "8fa5534874be2035b2a689a1855077f4"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.b3257d65.js",
    "revision": "51a2da0bed1915e47250e19254a9bb75"
  },
  {
    "url": "assets/js/11.b3dad844.js",
    "revision": "40103b9feee46f9c9e0c07927a8da8c7"
  },
  {
    "url": "assets/js/12.080274e5.js",
    "revision": "4e09ec2ec6a4b48885320cf28367b484"
  },
  {
    "url": "assets/js/13.560d65a1.js",
    "revision": "c7c7e7a0f0781008b88fc67582eae29c"
  },
  {
    "url": "assets/js/14.4b271d51.js",
    "revision": "1fadb56193eba35116a5771c1624aec1"
  },
  {
    "url": "assets/js/15.006dafd2.js",
    "revision": "e13e83cfa210839e0673f6b583cb708e"
  },
  {
    "url": "assets/js/16.76cb2fe8.js",
    "revision": "1b3a5f824433deed59a2979b3099a151"
  },
  {
    "url": "assets/js/3.989a8e4b.js",
    "revision": "77310c274c6ce5256365e9771694c6f9"
  },
  {
    "url": "assets/js/4.b565bd8e.js",
    "revision": "7a9c3d0027feb1191c55cd6d9ebf2c9c"
  },
  {
    "url": "assets/js/5.7e539d1b.js",
    "revision": "801d8ba0efbcd88d7ee73cd87086e201"
  },
  {
    "url": "assets/js/6.8fb07315.js",
    "revision": "b562ea19bb68208f6b365c2c444d3289"
  },
  {
    "url": "assets/js/7.96b87a17.js",
    "revision": "c91b28fe73e9cd0ed71e4c9cd5809779"
  },
  {
    "url": "assets/js/8.f4692926.js",
    "revision": "c4f3192bd39177c16c26c7d95f9d53fd"
  },
  {
    "url": "assets/js/9.c18da371.js",
    "revision": "5d28d914f7fe1a4521605cf24ee80b22"
  },
  {
    "url": "assets/js/app.4949a458.js",
    "revision": "df4970c08da2296fbc7b4589d36754df"
  },
  {
    "url": "assets/js/vendors~docsearch.6f0f340d.js",
    "revision": "73936cbc1b195ce504b27ad9e7a127fc"
  },
  {
    "url": "en/index.html",
    "revision": "5a69ca4d7d91649188769a5ef954cee7"
  },
  {
    "url": "es6/index.html",
    "revision": "47289f356433720222cd7037bd07ede4"
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
    "revision": "902b2d16e33881ba4c207debaa1c7d24"
  },
  {
    "url": "js/basic/index.html",
    "revision": "49d480c30c6cabaa80609d9aa0771516"
  },
  {
    "url": "js/basic/jicheng.html",
    "revision": "7e9a3b87392d699bc1aea2bd41b81015"
  },
  {
    "url": "leetcode/index.html",
    "revision": "0b11902a184b9c25ffee1b7d1b5c5bb9"
  },
  {
    "url": "message.html",
    "revision": "58f36fcf25fe9361bb199b7c0566e907"
  },
  {
    "url": "react/index.html",
    "revision": "d8f6496c7917d5d1a8c034707ec2e814"
  },
  {
    "url": "vue/index.html",
    "revision": "81c2e7b85c363504ba740470a0ca95eb"
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
