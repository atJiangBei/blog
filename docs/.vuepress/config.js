module.exports = {
	base: '/blog/',
	locales: {
		'/': {
			lang: 'zh-CN',
			title: '江北',
			description: '为中华民族之崛起而努力'
		},
		'/en': {
			lang: 'en-US',
			title: 'JiangBei',
			description: '****************'
		}
	},
	head: [
	  ['link', { rel: 'icon', href: `/imgs/logo.png` }],
	  ['link', { rel: 'manifest', href: '/manifest.json' }],
	  ['meta', { name: 'theme-color', content: '#3eaf7c' }],
	  ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
	  ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }],
	  ['link', { rel: 'apple-touch-icon', href: `/icons/apple-touch-icon-152x152.png` }],
	  ['link', { rel: 'mask-icon', href: '/icons/safari-pinned-tab.svg', color: '#3eaf7c' }],
	  ['meta', { name: 'msapplication-TileImage', content: '/icons/msapplication-icon-144x144.png' }],
	  ['meta', { name: 'msapplication-TileColor', content: '#000000' }]
	],
	serviceWorker: true,
	themeConfig: {
		//logo: 'imgs/logo.png',
		activeHeaderLinks: false,
		editLinks: true,
		smoothScroll: true,
		algolia: {
			apiKey: 'f854bb46d3de7eeb921a3b9173bd0d4c',
			indexName: 'vue-router',
		},
		repo: 'vuejs/vuepress',
		//repoLabel: '查看源码',
		repo: 'atJiangBei/blog',
		docsBranch: 'master',
		docsDir: 'docs',
		locales: {
			'/': {
				label: '简体中文',
				selectText: '选择语言',
				editLinkText: '在 GitHub 上编辑此页',
				lastUpdated: '上次更新',
				nav: [
					{
						text: 'js',
						link: '/js/basic/'
					},
					{
						text: 'es6',
						link: '/es6/'
					},
					{
						text: 'vue',
						link: '/vue/'
					},
					{
						text: 'react',
						link: '/react/'
					},
					{
						text: '算法篇',
						link: '/leetcode/'
					},
					// {
					// 	text: '指南',
					// 	ariaLabel: 'Language Menu',
					// 	items: [{
					// 			text: 'Chinese',
					// 			link: '/guide/'
					// 		}
					// 	]
					// },
					{
						text: '更新记录',
						link: 'https://github.com/atjiangbei/blog/releases'
					},
					
				],
				sidebar: [
					'/',
					'/message.md',
					{
						title: '基础篇',
						collapsable: false,
						children: [
							'/js/basic/',
							'/js/basic/jicheng.md',
						]
					},
				]
			}
		}
	},
	plugins:[
		['@vuepress/back-to-top', true],
		['@vuepress/pwa', {
		  serviceWorker: true,
		  updatePopup: true
		}]
	]
}
