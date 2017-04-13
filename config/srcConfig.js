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
    },
    {
      name: 'desk',
      name_cn: '桌面应用',
      HtmlWebpackPlugin: {
        filename: 'desk.html',
        template: 'src/router/template/desk.html',
        inject: true,
        chunks: ['desk']
      },
      entry: ['desk']
    },
    {
      name: 'userorder',
      name_cn: '移动应用-用户中心',
      HtmlWebpackPlugin: {
        filename: 'userorder.html',
        template: 'src/router/template/userorder.html',
        inject: true,
        chunks: ['userorder']
      },
      entry: ['userorder']
    },
    {
      name: 'sellerorder',
      name_cn: '移动应用-商家买单',
      HtmlWebpackPlugin: {
        filename: 'sellerorder.html',
        template: 'src/router/template/sellerorder.html',
        inject: true,
        chunks: ['sellerorder']
      },
      entry: ['sellerorder']
    }
  ]
}
