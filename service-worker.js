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
    "revision": "d66cd18a1a97655ba2e6ba0fab789b20"
  },
  {
    "url": "assets/css/0.styles.b5f9c1ef.css",
    "revision": "c1c399c2d0b95dcebdc8b2ee134a7c46"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.5ced8b1c.js",
    "revision": "3fd965d6b12c2c8cfe0cacfe5f7c0a0a"
  },
  {
    "url": "assets/js/11.9d6b3e33.js",
    "revision": "da3b935d26d462ab23aea5e323eb621e"
  },
  {
    "url": "assets/js/12.26cc6a54.js",
    "revision": "dd543f43a8906aaad6a43473c5d695ac"
  },
  {
    "url": "assets/js/13.691403c9.js",
    "revision": "107f4c6871b4d9fc611c564e5848f463"
  },
  {
    "url": "assets/js/14.09d62951.js",
    "revision": "d1779be2cbd6702b707c1d3e1096f519"
  },
  {
    "url": "assets/js/15.5f937981.js",
    "revision": "720ae086124d019bd956afa87adb3295"
  },
  {
    "url": "assets/js/16.91dd2480.js",
    "revision": "dcc4bd08adc1c8c6308e719be70a2cca"
  },
  {
    "url": "assets/js/17.5b444edf.js",
    "revision": "544ec5514bee2e522608a51816a6eb34"
  },
  {
    "url": "assets/js/18.f12441de.js",
    "revision": "e2118da34a4d242ee00d727f635f55f2"
  },
  {
    "url": "assets/js/19.eb30785a.js",
    "revision": "7754f9208964617e8c52da237622903f"
  },
  {
    "url": "assets/js/2.e0bb01de.js",
    "revision": "4ed1e423125feca12b76efc2dd164212"
  },
  {
    "url": "assets/js/20.75d54866.js",
    "revision": "ddd74ced4b83b46d4290e6e169992a9c"
  },
  {
    "url": "assets/js/21.4084f7b2.js",
    "revision": "c3136afd0d2030fafb3e80954a1d4d2c"
  },
  {
    "url": "assets/js/22.564275d5.js",
    "revision": "30242383fd1be94d1278221b575841bf"
  },
  {
    "url": "assets/js/23.ce29dc68.js",
    "revision": "b116ff276849050de875eae1b0ccdd2d"
  },
  {
    "url": "assets/js/24.475b1931.js",
    "revision": "85686b7d4637d513fc2b2e8d4615a13f"
  },
  {
    "url": "assets/js/25.a7202821.js",
    "revision": "2d5cbee7ddf616139bc4149783bc85d0"
  },
  {
    "url": "assets/js/26.fd2812d8.js",
    "revision": "d724b5cbea15f9462ef182a50b59f028"
  },
  {
    "url": "assets/js/27.966b12d8.js",
    "revision": "0acfeadf10c1d5010b8e753783b23efd"
  },
  {
    "url": "assets/js/28.aea63430.js",
    "revision": "7f15a6c2d2206db71fce1808403cf76d"
  },
  {
    "url": "assets/js/29.b4425c2d.js",
    "revision": "9a23f84aca3195afe2fe05a2adfb8f27"
  },
  {
    "url": "assets/js/3.a95099b2.js",
    "revision": "8f79b9ae30fdae4120f15ad1015324f1"
  },
  {
    "url": "assets/js/30.b29a4bf2.js",
    "revision": "945ca9e84ef7e7a43a84db862f5b8fe1"
  },
  {
    "url": "assets/js/31.068abe55.js",
    "revision": "c285a3f04a29891d03928cd400d049f4"
  },
  {
    "url": "assets/js/32.430d147e.js",
    "revision": "32818174dc700d7b8181f4d2595621a2"
  },
  {
    "url": "assets/js/33.235aec94.js",
    "revision": "610a0015abd353af471c06e53519319b"
  },
  {
    "url": "assets/js/34.8bb1536e.js",
    "revision": "bb934fa25101533892b2bdbdb8c5f9cf"
  },
  {
    "url": "assets/js/35.945508aa.js",
    "revision": "f8a9b192e420bf4c61f631ee5468e8f8"
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
    "url": "assets/js/5.520fe20c.js",
    "revision": "6f12eecbad41f9b6ef46b559817afc3c"
  },
  {
    "url": "assets/js/6.568d0d65.js",
    "revision": "1063ae9e0fb0a7b50b019577b2a60202"
  },
  {
    "url": "assets/js/7.0e1dd7d4.js",
    "revision": "89e63520a1906ec0cdb8062189a3d835"
  },
  {
    "url": "assets/js/8.ec2036e5.js",
    "revision": "b3f04c5c37787c1e66baf36d98e36da3"
  },
  {
    "url": "assets/js/9.637ac254.js",
    "revision": "2459c4f5d091ba5b0436507f59748902"
  },
  {
    "url": "assets/js/app.bb116dc8.js",
    "revision": "5dda68c568581bcc5451cca48c103114"
  },
  {
    "url": "en/index.html",
    "revision": "27cfe86f8649142f1e48d6900951ba5d"
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
    "revision": "d600a68a1c1fa2debe895be7acd526a6"
  },
  {
    "url": "js/advanced/currying.html",
    "revision": "aede50297f3753b8c349b6df6889b972"
  },
  {
    "url": "js/advanced/eventloop.html",
    "revision": "a1328728b8add14501a77aff8c28a250"
  },
  {
    "url": "js/advanced/indexeddb.html",
    "revision": "49be422b1e79bfb752244151c8caf2fd"
  },
  {
    "url": "js/advanced/webworkers.html",
    "revision": "cf6ccf05207748a71cbf14d1c9434ea4"
  },
  {
    "url": "js/basic/copy.html",
    "revision": "887c7703750ac6c835fd395cdb33e628"
  },
  {
    "url": "js/basic/index.html",
    "revision": "7eb6ea9edb8a7733315284c3ed08d40b"
  },
  {
    "url": "js/basic/jicheng.html",
    "revision": "8ea78a365fa642b6f30bc683f06b2986"
  },
  {
    "url": "js/basic/meta.html",
    "revision": "b4a289182b8819701738280c8778dfe9"
  },
  {
    "url": "js/basic/prototypeandproto.html",
    "revision": "f3bfcff3f08155e7a862b4dd285dc37a"
  },
  {
    "url": "js/other/tools.html",
    "revision": "508bb78cc95c0dcf003d6a13197ee0e0"
  },
  {
    "url": "js/write/array.html",
    "revision": "813b11e555696f50e76df7ff22e345e1"
  },
  {
    "url": "js/write/eventEmitter.html",
    "revision": "32ed2f584cad0474a49ef2e2ddd66319"
  },
  {
    "url": "js/write/function.html",
    "revision": "cdc35d3e8528a16bb776897e0ecbc996"
  },
  {
    "url": "js/write/object.html",
    "revision": "4bcc2bc550372f7bae27236f90f659d6"
  },
  {
    "url": "js/write/promise.html",
    "revision": "300506c6324d3b574ec1a1543edc78d1"
  },
  {
    "url": "leetcode/array/index.html",
    "revision": "6a989008fc8a96433b1fab6d95666c3a"
  },
  {
    "url": "leetcode/index.html",
    "revision": "ac19749a6867afb31aa792a18ab7310c"
  },
  {
    "url": "leetcode/list/index.html",
    "revision": "1867b54adc77511092935c1b069854fc"
  },
  {
    "url": "leetcode/other/index.html",
    "revision": "128590d0d157d51ff9ac0db7bffa8cfa"
  },
  {
    "url": "leetcode/string/index.html",
    "revision": "0531db5a0201f0d2b68201f9919a7e2e"
  },
  {
    "url": "leetcode/tree/index.html",
    "revision": "6ba0b5a2bbfb8101bf0f416938b1784f"
  },
  {
    "url": "message.html",
    "revision": "511dcfe4b8c340267a8d3929845a5f13"
  },
  {
    "url": "questions/js/index.html",
    "revision": "0fadd789418e4b5243b0f5011f8daa7f"
  },
  {
    "url": "react/index.html",
    "revision": "dfe949596cae6d5ae11daacb4fe6112d"
  },
  {
    "url": "vue/vue2/index.html",
    "revision": "6734ce10f112b75539bc64b4dda8f6ee"
  },
  {
    "url": "vue/vue3/index.html",
    "revision": "7356e8deb1c7f35fb4d33276a1b6005e"
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
