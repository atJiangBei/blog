import { defineConfig } from 'vitepress';

const sidebar = [
  {
    text: '原生',
    items: [{ text: 'javascript', link: '/js/index' }],
  },
  {
    text: '框架',
    items: [
      { text: 'vue2', link: '/vue/vue2.x' },
      { text: 'vue3', link: '/vue/vue3.x' },
      { text: 'react', link: '/react/index' },
    ],
  },
  {
    text: 'Leet Code',
    items: [
      { text: '数组', link: '/leetcode/array' },
      { text: '字符串', link: '/leetcode/string' },
      { text: '树', link: '/leetcode/tree' },
      { text: '链表', link: '/leetcode/list' },
      { text: '其它', link: '/leetcode/other' },
    ],
  },
  {
    text: '其它',
    items: [{ text: '问题', link: '/questions/index' }],
  },
];

// const sidebar = {
//   '/frame/': [
//     {
//       text: 'vue2.x',
//       items: [{ text: '/Index/', link: '/vue/vue2.x' }],
//     },
//   ],
// };
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'My Awesome Project',
  description: 'A VitePress Site',
  srcDir: 'src',
  base: '/blog/',
  lastUpdated: true,
  search: {
    provider: 'local',
  },
  themeConfig: {
    logo: '/logo.svg',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'javascript', link: '/js/index' },
    ],

    sidebar: sidebar,

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
    ],
  },
  head: [
    ['link', { rel: 'icon', href: '/blog/logo.svg', type: 'image/svg+xml' }],
  ],
});
