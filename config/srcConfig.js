module.exports = {
	mainTemp: 'desk',
	eachTemp: [
		{
			name: 'menu',
			name_cn: '目录',
			HtmlWebpackPlugin: {
				filename: 'index.html',
                template: 'src/router/template/index.html',
                inject: true,
                chunks: ['menu']
			},
			entry: ['menu']
		},{
			name: 'desk',
			name_cn: '桌面应用',
			HtmlWebpackPlugin: {
				filename: 'desk.html',
                template: 'src/router/template/desk.html',
                inject: true,
                chunks: ['desk']
			},
			entry: ['desk']
		},{
			name: 'mobiles',
			name_cn: '移动应用',
			HtmlWebpackPlugin: {
				filename: 'mobiles.html',
                template: 'src/router/template/mobiles.html',
                inject: true,
                chunks: ['mobiles']
			},
			entry: ['mobiles']
		}
	]
}