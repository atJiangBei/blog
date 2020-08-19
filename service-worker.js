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
    "revision": "05740e1985922ab01deba14aa001f172"
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
    "url": "assets/js/12.5a8b8841.js",
    "revision": "77cca71967d26ab90fc4e05fb1d5683c"
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
    "url": "assets/js/15.a4d61237.js",
    "revision": "368b44202ca68b936683e9d9d56e3e12"
  },
  {
    "url": "assets/js/16.18703bc9.js",
    "revision": "67bf69ac84760cf8008d7ce2bd44fe4a"
  },
  {
    "url": "assets/js/17.e428fc28.js",
    "revision": "baeec33994545c6e93abaa03d23455d0"
  },
  {
    "url": "assets/js/18.1cace705.js",
    "revision": "f5f9344fdc92eaa6fc7176bf5fd0f53d"
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
    "url": "assets/js/20.d92f7e45.js",
    "revision": "93c30f0db1cddce4195890f36e316e25"
  },
  {
    "url": "assets/js/21.fac71e03.js",
    "revision": "e8455a4972a23801dc8aeb9e37526372"
  },
  {
    "url": "assets/js/22.d30231c7.js",
    "revision": "7e805f602c3f4859b718bd6e71c06e18"
  },
  {
    "url": "assets/js/23.8b6f1e38.js",
    "revision": "aaa7511c2e9865047651f3d63fe18ad5"
  },
  {
    "url": "assets/js/24.1e71798b.js",
    "revision": "9246d6a2465d3f29609e8bbbb0d7e598"
  },
  {
    "url": "assets/js/25.96dee6cb.js",
    "revision": "1aed3286b16b14823664df72ece95024"
  },
  {
    "url": "assets/js/26.ecc77dcd.js",
    "revision": "7274e61da6f146e509e6e4b48532a55f"
  },
  {
    "url": "assets/js/27.c3db3796.js",
    "revision": "42c253001255d6607dcf966f577d0441"
  },
  {
    "url": "assets/js/28.15b588c7.js",
    "revision": "fec8e25dc6f3eaf01b6461570f7d51fb"
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
    "url": "assets/js/6.d18ae164.js",
    "revision": "1254fc9282c780f9405a66ad8f7741d2"
  },
  {
    "url": "assets/js/7.bc05f562.js",
    "revision": "0916ea25f3277d4222329145e0a67068"
  },
  {
    "url": "assets/js/8.5b4c0a54.js",
    "revision": "138ff21600143a472d53694fba3edb05"
  },
  {
    "url": "assets/js/9.417565ee.js",
    "revision": "22485274690af0eb253902f862d598c5"
  },
  {
    "url": "assets/js/app.513f66ac.js",
    "revision": "5315ffe56fd605463033563ffdc2c6ee"
  },
  {
    "url": "en/index.html",
    "revision": "35519e9e5c852d5535e416dd1f253b4e"
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
    "revision": "ec315995b8883bbd22ecbd3025e1940c"
  },
  {
    "url": "js/advanced/currying.html",
    "revision": "5ff29ce6536f5f02f6fdcc087c5bf287"
  },
  {
    "url": "js/advanced/eventloop.html",
    "revision": "4eef01a7a0e8a3f800616ee36fab9f42"
  },
  {
    "url": "js/advanced/ReflowheRepaint.html",
    "revision": "2de713be867cbfc12fa39f848a80fbf9"
  },
  {
    "url": "js/advanced/throttledebonce.html",
    "revision": "08322a28f6faf357dd56ad1e1bd69fb5"
  },
  {
    "url": "js/basic/index.html",
    "revision": "6152aadad3a1790d2ee956ee7227a12e"
  },
  {
    "url": "js/basic/jicheng.html",
    "revision": "ac1d34880e56061c3c8a55b1309b6659"
  },
  {
    "url": "js/basic/prototypeandproto.html",
    "revision": "47f8e2af5b728e2b3cc1fdfefc25952a"
  },
  {
    "url": "js/write/array.html",
    "revision": "ea7a168e71e0042a86978291564150cd"
  },
  {
    "url": "js/write/function.html",
    "revision": "736dc31bf280d3e3c0a672c3ee715ed9"
  },
  {
    "url": "js/write/object.html",
    "revision": "95f4e515619443f12c4cd3f5efc80582"
  },
  {
    "url": "leetcode/array/index.html",
    "revision": "d431c6266aff8635b8ecbc2d34144636"
  },
  {
    "url": "leetcode/index.html",
    "revision": "2006ba1d7c869485421985e091c83e70"
  },
  {
    "url": "leetcode/list/index.html",
    "revision": "efc4845dbe60c3b517b69bb7266b1969"
  },
  {
    "url": "leetcode/other/index.html",
    "revision": "1c1ba7105763f12a1b3e3a7f898d24ca"
  },
  {
    "url": "leetcode/string/index.html",
    "revision": "83fcc5c53eceaf2baa262933847513fd"
  },
  {
    "url": "leetcode/tree/index.html",
    "revision": "445373a526128ed5f2d56d27677f9287"
  },
  {
    "url": "message.html",
    "revision": "c01e76caac84b2525206bfaf4de0ff14"
  },
  {
    "url": "questions/js/index.html",
    "revision": "e407078948b7fda6530ed824e3c08329"
  },
  {
    "url": "react/index.html",
    "revision": "bc154391ac386449436b0717e8877df8"
  },
  {
    "url": "vue/vue2/index.html",
    "revision": "198d88c079139f7cecbe09cd105eefad"
  },
  {
    "url": "vue/vue3/index.html",
    "revision": "d0a4bc2492b395a8fa45ea235e40aa4c"
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
