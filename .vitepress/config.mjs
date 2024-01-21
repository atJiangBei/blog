import { defineConfig } from 'vitepress';

const sidebar = [
  {
    text: '基础',
    collapsed: false,
    items: [
      { text: 'JavaScript', link: '/js/index' },
      { text: 'JavaScript-1', link: '/questions/js1' },
      { text: 'JavaScript-2', link: '/questions/js2' },
      { text: 'Css', link: '/questions/css' },
    ],
  },
  {
    text: '框架',
    collapsed: false,
    items: [
      { text: 'vue2', link: '/vue/vue2.x' },
      { text: 'vue3', link: '/vue/vue3.x' },
      { text: 'react', link: '/react/index' },
    ],
  },
  {
    text: 'Leet Code',
    collapsed: false,
    items: [
      { text: '数组', link: '/leetcode/array' },
      { text: '字符串', link: '/leetcode/string' },
      { text: '树', link: '/leetcode/tree' },
      { text: '链表', link: '/leetcode/list' },
      { text: '其它', link: '/leetcode/other' },
    ],
  },
  {
    text: 'Other',
    collapsed: false,
    items: [{ text: 'git', link: '/other/git' }],
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
      { text: 'Site Guide', link: '/site-guide/index' },
      {
        text: 'TypeScript',
        items: [{ text: 'typescript的内置工具类型', link: '/ts/utility' }],
      },
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
