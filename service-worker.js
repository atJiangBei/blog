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
    "revision": "4b9667d59cc04ae0bf502cd4e24723cd"
  },
  {
    "url": "assets/css/0.styles.51952a11.css",
    "revision": "46dd485d77f5cb35099e3105a67c5d9c"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/10.9a0da0a0.js",
    "revision": "24bb546288dd71776dcd55f213b8ed65"
  },
  {
    "url": "assets/js/11.1774c735.js",
    "revision": "740a02c54633e38fe7342369a7c1fe0c"
  },
  {
    "url": "assets/js/12.498c2708.js",
    "revision": "e1f66498ae6f54c7f6c7d7fefcebbcb2"
  },
  {
    "url": "assets/js/13.2652503a.js",
    "revision": "9cac698508b762468e3b4675ee3f78a1"
  },
  {
    "url": "assets/js/14.78278cc7.js",
    "revision": "bf4a1f18def7db1192a971c42d91f33e"
  },
  {
    "url": "assets/js/15.7928c4e0.js",
    "revision": "bd524ef703e3da6351ba693d33b031ef"
  },
  {
    "url": "assets/js/16.9a6859e1.js",
    "revision": "e0f36cc7541c16fc27d3d0957bb06821"
  },
  {
    "url": "assets/js/17.8c9ddd2d.js",
    "revision": "9772744aa10f7cde1a717568d33f83c8"
  },
  {
    "url": "assets/js/18.f12441de.js",
    "revision": "e2118da34a4d242ee00d727f635f55f2"
  },
  {
    "url": "assets/js/19.a7277c8b.js",
    "revision": "e5ea03e58b417d7ce5a512e412f3d4e4"
  },
  {
    "url": "assets/js/2.e0bb01de.js",
    "revision": "4ed1e423125feca12b76efc2dd164212"
  },
  {
    "url": "assets/js/20.78cadf65.js",
    "revision": "2ef6e2be31b54c3f680fefeba5ea3707"
  },
  {
    "url": "assets/js/21.acaace4f.js",
    "revision": "23014c2c1a0b5033f3e7df87366efac8"
  },
  {
    "url": "assets/js/22.f51971f3.js",
    "revision": "617959d39d65ce0a11ab1121b2df16ed"
  },
  {
    "url": "assets/js/23.61258c87.js",
    "revision": "a4305cdf24be700efad66f75c88cdc52"
  },
  {
    "url": "assets/js/24.3587609c.js",
    "revision": "fc101921a78b425aab29b9d7b4039b0a"
  },
  {
    "url": "assets/js/25.ea4c56b6.js",
    "revision": "7cd9059e24bf6e2e380ee32800a243eb"
  },
  {
    "url": "assets/js/26.fd2812d8.js",
    "revision": "d724b5cbea15f9462ef182a50b59f028"
  },
  {
    "url": "assets/js/27.b2b3b71c.js",
    "revision": "d0794a5612937ea1c824f3b420c420af"
  },
  {
    "url": "assets/js/28.b6d06517.js",
    "revision": "1c322c0605ad0b4eb83b2af1fb3c54e1"
  },
  {
    "url": "assets/js/29.d6188bf7.js",
    "revision": "bf4cdbfcc8e665334287b0f60d021e0a"
  },
  {
    "url": "assets/js/3.a95099b2.js",
    "revision": "8f79b9ae30fdae4120f15ad1015324f1"
  },
  {
    "url": "assets/js/30.12076a5f.js",
    "revision": "e651e1e82c820fbef818c8f71dbe6fe9"
  },
  {
    "url": "assets/js/31.625d47ac.js",
    "revision": "5159d27904244beef6fdef59d55e949b"
  },
  {
    "url": "assets/js/32.fe11c292.js",
    "revision": "ec1bc0d53548d5c87d88d323901416e1"
  },
  {
    "url": "assets/js/33.fb2e6166.js",
    "revision": "efe690edf6303613fa83eea8bb2706c9"
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
    "url": "assets/js/4.1f3fe88f.js",
    "revision": "b1d342ba8df3413ca8c25de5b69956da"
  },
  {
    "url": "assets/js/5.520fe20c.js",
    "revision": "6f12eecbad41f9b6ef46b559817afc3c"
  },
  {
    "url": "assets/js/6.1661e1e9.js",
    "revision": "7b810474a878e32041e7fdde8d6ffaf7"
  },
  {
    "url": "assets/js/7.0e1dd7d4.js",
    "revision": "89e63520a1906ec0cdb8062189a3d835"
  },
  {
    "url": "assets/js/8.837b94b3.js",
    "revision": "78d3d377883ce895c19e7a44c7baa04d"
  },
  {
    "url": "assets/js/9.c1b24a8f.js",
    "revision": "fd1217871ad6a0a84822b38365f72d0c"
  },
  {
    "url": "assets/js/app.807028bc.js",
    "revision": "731ab87d7a5f0b6312c885445477440d"
  },
  {
    "url": "en/index.html",
    "revision": "9f2f7573365fa2458dde457287b83b67"
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
    "revision": "41d0e35a69fc362ee444d41cecf54f0c"
  },
  {
    "url": "js/advanced/currying.html",
    "revision": "8b94fab397aea4d1cc85a27cf451ff5f"
  },
  {
    "url": "js/advanced/eventloop.html",
    "revision": "b3c8cc27d9891b2d7fa5b9ba50ac561f"
  },
  {
    "url": "js/advanced/indexeddb.html",
    "revision": "b6ae620ffeb79e5ce891a0f5a93f6260"
  },
  {
    "url": "js/advanced/webworkers.html",
    "revision": "7b1f5561f6535ed6f964fec8b804af2d"
  },
  {
    "url": "js/basic/copy.html",
    "revision": "83a418ca0788ee5d3ea7d88a5dc03da5"
  },
  {
    "url": "js/basic/index.html",
    "revision": "dbfd8209e0d3007906b986f4b353ffc4"
  },
  {
    "url": "js/basic/jicheng.html",
    "revision": "2aee9e009d1dd2c2cd49f317afdce214"
  },
  {
    "url": "js/basic/meta.html",
    "revision": "41a5881cf9c9edf3d36df1064597bc9f"
  },
  {
    "url": "js/basic/prototypeandproto.html",
    "revision": "894f9351307d198f8c2a01246f1d9625"
  },
  {
    "url": "js/other/tools.html",
    "revision": "94bf5ffac82c5a1022d2c5071c87ae94"
  },
  {
    "url": "js/write/array.html",
    "revision": "f44b27f8428a76bdaca2edb3f3ef068b"
  },
  {
    "url": "js/write/eventEmitter.html",
    "revision": "5622ac7664be02c8faabc63885659de9"
  },
  {
    "url": "js/write/function.html",
    "revision": "3a35154b123b65d0610f80c945459043"
  },
  {
    "url": "js/write/object.html",
    "revision": "c17eee259173e173e3317f63c53d48fc"
  },
  {
    "url": "js/write/promise.html",
    "revision": "1d0d59b8849fbf52df6005caee97399c"
  },
  {
    "url": "leetcode/array/index.html",
    "revision": "8680ab3d2ae1463e6e4ee3e6d26ab3e6"
  },
  {
    "url": "leetcode/index.html",
    "revision": "32c1526ee473f3a3f085f037da0e30f0"
  },
  {
    "url": "leetcode/list/index.html",
    "revision": "dc9d821fbfb5ae383aa0d9fa50bcd83c"
  },
  {
    "url": "leetcode/other/index.html",
    "revision": "a4bcbf032012217e2e96b9070037425b"
  },
  {
    "url": "leetcode/string/index.html",
    "revision": "d988110b6cd24d5c0bf79d7e2d696aba"
  },
  {
    "url": "leetcode/tree/index.html",
    "revision": "cf598d12468635704298a5cb3448a106"
  },
  {
    "url": "message.html",
    "revision": "4c75be6d430742e5b76e1816b1b5a520"
  },
  {
    "url": "questions/js/index.html",
    "revision": "e1fc3269c08cd318a0d15fc071d3d0b0"
  },
  {
    "url": "react/index.html",
    "revision": "33a9625b1bcd8e8cf15ee440b72e4ba9"
  },
  {
    "url": "vue/vue2/index.html",
    "revision": "3e487c015e04c5f9aae683bcd93845ad"
  },
  {
    "url": "vue/vue3/index.html",
    "revision": "3d949cc8ee0e190a92c038b6e5653f6c"
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
