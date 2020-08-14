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
    "revision": "7212ed8e089311ad25dcc6bccd7914cb"
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
    "url": "assets/js/10.61502802.js",
    "revision": "6a2b149acb24d97118c377ef2c0291e7"
  },
  {
    "url": "assets/js/11.51f562c5.js",
    "revision": "9df8c41791145f071e60bba1180e0ab9"
  },
  {
    "url": "assets/js/12.eb433c9f.js",
    "revision": "f760e6586d8572cd69a6a7e97cb81e11"
  },
  {
    "url": "assets/js/13.eb6792fd.js",
    "revision": "b966ea1d4bd119c2c19daa9b064cb80b"
  },
  {
    "url": "assets/js/14.acef9f20.js",
    "revision": "d4bff26b18e879c16a87609c00778f34"
  },
  {
    "url": "assets/js/15.1077dabb.js",
    "revision": "f99c07ba64a51988321825beff439247"
  },
  {
    "url": "assets/js/16.9c1817ff.js",
    "revision": "d3ff63bb3998af3ca297d66d15db345a"
  },
  {
    "url": "assets/js/17.75cbecae.js",
    "revision": "ce091d924b09bc84222fa682c58de963"
  },
  {
    "url": "assets/js/18.30bfaaa4.js",
    "revision": "2ef202f10b94f6e6bcee4d1f06401ad6"
  },
  {
    "url": "assets/js/19.a6d75463.js",
    "revision": "d1e619701428a95aa628366a2f0db6d4"
  },
  {
    "url": "assets/js/2.c0191e23.js",
    "revision": "54aae44b9a70ae15db4fa77a4055bd91"
  },
  {
    "url": "assets/js/20.aec6c9b0.js",
    "revision": "78a53b2da37bcba84fe03d446e501a21"
  },
  {
    "url": "assets/js/21.60376fe7.js",
    "revision": "ce7935a659f1ea6216495e14a460bc89"
  },
  {
    "url": "assets/js/22.323954d7.js",
    "revision": "e5537ef89c5cddd1e685215c3127a4c6"
  },
  {
    "url": "assets/js/23.3b4a62c1.js",
    "revision": "9cdab550f2f8dff44bb5e4146cd494a8"
  },
  {
    "url": "assets/js/24.a8b68dbd.js",
    "revision": "93cdba7f2c0a0b4eaf444e2f58ec6dcd"
  },
  {
    "url": "assets/js/25.eff85bed.js",
    "revision": "d22f74e36153a168ec0884e3f0dd10cf"
  },
  {
    "url": "assets/js/26.06a9c104.js",
    "revision": "70e9df97bd9bc2bcb25a88cc65a8263d"
  },
  {
    "url": "assets/js/27.55249c64.js",
    "revision": "5f2a51d90aae5d630d2bcb6224ba4404"
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
    "url": "assets/js/8.88b80aa7.js",
    "revision": "4bf01d6398452b63886e8ec8035f1f59"
  },
  {
    "url": "assets/js/9.03b9dc7a.js",
    "revision": "057c200bc751a5f0d150033103f8c44f"
  },
  {
    "url": "assets/js/app.153bfe55.js",
    "revision": "0fcb459286f24ef375aa358a0cc9ec93"
  },
  {
    "url": "en/index.html",
    "revision": "4a9785eec1479c69622c0cf84d682144"
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
    "revision": "42160f955c9ed518df262fae9be92c5b"
  },
  {
    "url": "js/advanced/currying.html",
    "revision": "a2ad471a0f09b1d378837bfd693e4299"
  },
  {
    "url": "js/advanced/eventloop.html",
    "revision": "0bac56195c262109604f36abbed5ec4c"
  },
  {
    "url": "js/advanced/throttledebonce.html",
    "revision": "1d473fee8800e7fa60924f54a69a91e1"
  },
  {
    "url": "js/basic/index.html",
    "revision": "0a7fc48f61a70953ac3fa3b8fe652539"
  },
  {
    "url": "js/basic/jicheng.html",
    "revision": "7934b87e9d7cf8c46b67afa8e51e59ea"
  },
  {
    "url": "js/basic/prototypeandproto.html",
    "revision": "c954a48aa07cf4c70b0b14bf973f0fa0"
  },
  {
    "url": "js/write/array.html",
    "revision": "66e0e4c85c18c237d084dee3e01c18e9"
  },
  {
    "url": "js/write/function.html",
    "revision": "cf5dd0315f7e451bc19ffdca486f87c1"
  },
  {
    "url": "js/write/object.html",
    "revision": "3fc78ea0b0b5983c5b0529a9f7a5f45f"
  },
  {
    "url": "leetcode/array/index.html",
    "revision": "99409d2839ccc437f36e3eb1e5b92402"
  },
  {
    "url": "leetcode/index.html",
    "revision": "59ae06813292d252ed01a3b4fc7871db"
  },
  {
    "url": "leetcode/list/index.html",
    "revision": "d4fdcd1c97e65086bbef092fcf26c19b"
  },
  {
    "url": "leetcode/other/index.html",
    "revision": "5fca08850c2676c1c2a1d5687f8909d7"
  },
  {
    "url": "leetcode/string/index.html",
    "revision": "5be750fd8a6196838d239d775fccd529"
  },
  {
    "url": "leetcode/tree/index.html",
    "revision": "dcedf903aa10619d74246dc32ad875ca"
  },
  {
    "url": "message.html",
    "revision": "1b8f5a10fb0c140a70d2467941e52973"
  },
  {
    "url": "questions/js/index.html",
    "revision": "a09ccf6d864589a18174b7cc1277cd84"
  },
  {
    "url": "react/index.html",
    "revision": "760aecca263b810633f16afbcbf32923"
  },
  {
    "url": "vue/vue2/index.html",
    "revision": "1f13b731ce9a92a249db08f7d5a826c3"
  },
  {
    "url": "vue/vue3/index.html",
    "revision": "1f2cddc0dbb441bd543df5595778e6c5"
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
