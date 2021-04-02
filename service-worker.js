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
    "revision": "e5d73fe3ba9d5a62f6cd38af043cbe3c"
  },
  {
    "url": "assets/css/0.styles.5ba3a1e5.css",
    "revision": "6f9dd35c44ec74ec97e7e4b9855c0fad"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.8368c750.js",
    "revision": "2506b6383c11bfa5caa76b0c51638c1a"
  },
  {
    "url": "assets/js/11.b23b9b4a.js",
    "revision": "f805e789e2c38bcdfa28d28d03d7fe36"
  },
  {
    "url": "assets/js/12.c89a1f00.js",
    "revision": "b6448c15b79de480a266e7bb1cd65de5"
  },
  {
    "url": "assets/js/13.fcdf784a.js",
    "revision": "ff1156d7cda2e9c1de86391e12df4608"
  },
  {
    "url": "assets/js/14.878b37a6.js",
    "revision": "e5cecd2ec67e94c5550e9df69950b59d"
  },
  {
    "url": "assets/js/15.bd5ea87d.js",
    "revision": "90da9e2803ec972f3723210cc65225e3"
  },
  {
    "url": "assets/js/16.f65dff89.js",
    "revision": "eb517a9b7d0ec954f322d6ec8fb5d549"
  },
  {
    "url": "assets/js/17.4a8af233.js",
    "revision": "526f2f04d3b86fc3bbfaa2c2183a9edf"
  },
  {
    "url": "assets/js/18.c6103ab7.js",
    "revision": "8144f76be178345fb2e113c3a2207586"
  },
  {
    "url": "assets/js/19.f07effd0.js",
    "revision": "a3f8f7800727801ca4606628e045060c"
  },
  {
    "url": "assets/js/2.490b2c4a.js",
    "revision": "af25ff10ae3609a2c46bf4e01d53be73"
  },
  {
    "url": "assets/js/20.4317d0d9.js",
    "revision": "a8e2a4e62400dc3dfba92f6a77f0ce10"
  },
  {
    "url": "assets/js/21.01e0c148.js",
    "revision": "fa15d77b55bbfe646055d329c6c68e03"
  },
  {
    "url": "assets/js/22.03d14ae8.js",
    "revision": "29079e0363229c17914bde849f4533c5"
  },
  {
    "url": "assets/js/23.11a1afb0.js",
    "revision": "1156d19af96db55107dd431fac91893d"
  },
  {
    "url": "assets/js/24.671a4055.js",
    "revision": "2a376ae3dbb538dd1cb978e5af6267ff"
  },
  {
    "url": "assets/js/25.60ffd2d5.js",
    "revision": "45189ed41e0242f807ba92407af2f7fa"
  },
  {
    "url": "assets/js/26.14e7d251.js",
    "revision": "0d461ba05d493d67780deaf4080fd6ee"
  },
  {
    "url": "assets/js/27.3ac77223.js",
    "revision": "61b8474a21d58df4f53359d681b8c611"
  },
  {
    "url": "assets/js/28.01a7bfee.js",
    "revision": "dc1146c3b17f4ffe51f6945ec2f708c4"
  },
  {
    "url": "assets/js/29.8138a45a.js",
    "revision": "11cf19775b8f48b26ca79904324d8c48"
  },
  {
    "url": "assets/js/3.29e920a6.js",
    "revision": "50d2aee7be4f8957715e553e446eaa3a"
  },
  {
    "url": "assets/js/30.f955de88.js",
    "revision": "4e5663fb081e818680d28856609addc8"
  },
  {
    "url": "assets/js/31.b851d928.js",
    "revision": "538b3c6500e57d722f3ece2b07425bbf"
  },
  {
    "url": "assets/js/32.b0b1923e.js",
    "revision": "d94c96d3f6b32e3d64659ca018c5b347"
  },
  {
    "url": "assets/js/33.d3a141dc.js",
    "revision": "8500e9625f42d79fa5f69912667c3eef"
  },
  {
    "url": "assets/js/34.e4cff7a9.js",
    "revision": "9901769f59d8f43e3f7365165e9d1af3"
  },
  {
    "url": "assets/js/4.6e6ab042.js",
    "revision": "7444ff559dbe91d932e30da97f11b089"
  },
  {
    "url": "assets/js/5.b6669fe2.js",
    "revision": "1e29b328955555619eef364612737dda"
  },
  {
    "url": "assets/js/6.ebc2151e.js",
    "revision": "7bfaee9d1e18b94d59343c9cb716b9b4"
  },
  {
    "url": "assets/js/7.456495d1.js",
    "revision": "addf372c70b30999dc13e17d35d82ac8"
  },
  {
    "url": "assets/js/8.c81f3a6d.js",
    "revision": "54e111bac8ada6073d9061d2bcd1dc41"
  },
  {
    "url": "assets/js/9.18fc3b7b.js",
    "revision": "b9f0054c1a5f6fe4aab85a6ffeb7f0f1"
  },
  {
    "url": "assets/js/app.25b2c6ee.js",
    "revision": "9f681218d9c2a6c05c105c6f4e1c655b"
  },
  {
    "url": "en/index.html",
    "revision": "b913ddce6646f0a518ee536f75bc9583"
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
    "revision": "ead0b5d4ab0911e8dfb154ec08e91c7b"
  },
  {
    "url": "js/advanced/currying.html",
    "revision": "d53e7e21548238390b0e7142c11298b0"
  },
  {
    "url": "js/advanced/eventloop.html",
    "revision": "8ad42506be3af588e21ec2d0dd7bc296"
  },
  {
    "url": "js/advanced/indexeddb.html",
    "revision": "ff01dc7cc6bdbf40d1167a4f319542be"
  },
  {
    "url": "js/advanced/webworkers.html",
    "revision": "b7b945f5b710e44d80d413088da1dd39"
  },
  {
    "url": "js/basic/copy.html",
    "revision": "bbc88cb92c8bcf9a86b0278b0a9c1d74"
  },
  {
    "url": "js/basic/index.html",
    "revision": "5cbc4ff9a29f21e3bbe6884ee7e8d187"
  },
  {
    "url": "js/basic/jicheng.html",
    "revision": "e7893e39586174d22666af0ae22f48a7"
  },
  {
    "url": "js/basic/meta.html",
    "revision": "5b67750de7be0c716f539975395d4342"
  },
  {
    "url": "js/basic/prototypeandproto.html",
    "revision": "8a0d91935120409047de73360e26704a"
  },
  {
    "url": "js/other/tools.html",
    "revision": "8a1d1cda063045967c9b9e42b89a93b8"
  },
  {
    "url": "js/write/array.html",
    "revision": "88a07a75f09d86bf3c9849db9f762b93"
  },
  {
    "url": "js/write/eventEmitter.html",
    "revision": "f78c8ce75bfba97276062c7ee15e7f35"
  },
  {
    "url": "js/write/function.html",
    "revision": "bee812d7f3df2d45bfb9419b2718c448"
  },
  {
    "url": "js/write/object.html",
    "revision": "dd6f82f0320329d46adc31f36fa12b87"
  },
  {
    "url": "js/write/promise.html",
    "revision": "ef869eb6011b0a0bedf1c37bc8a24bf4"
  },
  {
    "url": "leetcode/array/index.html",
    "revision": "380749755d85472393c0e4ffdfb2e9a6"
  },
  {
    "url": "leetcode/index.html",
    "revision": "9c2da8807d679ff4c6b14401c98b89da"
  },
  {
    "url": "leetcode/list/index.html",
    "revision": "c722852f18cc366f14d1369e039212cd"
  },
  {
    "url": "leetcode/other/index.html",
    "revision": "a51af1ff5f292455b33aaacb2e307e1d"
  },
  {
    "url": "leetcode/string/index.html",
    "revision": "a856c5445a05f458df20e5ca75450640"
  },
  {
    "url": "leetcode/tree/index.html",
    "revision": "842aa88da374306ecf4519e121becd83"
  },
  {
    "url": "message.html",
    "revision": "06ee81cc42aa0ebc9dd2fb7633807e22"
  },
  {
    "url": "questions/js/index.html",
    "revision": "82be3d35449b94355c23e26aeb8a9201"
  },
  {
    "url": "react/index.html",
    "revision": "e5f0acaff2f98d9f1c3a8675b56ba9e7"
  },
  {
    "url": "vue/vue2/index.html",
    "revision": "4aa683959782274eefeeb899400618bb"
  },
  {
    "url": "vue/vue3/index.html",
    "revision": "51aa92099aa77c74fb8579bb4c2e62a7"
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
