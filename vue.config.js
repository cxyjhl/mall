// 配置路径的别名
// cli3将配置隐藏起来了，所以我们要自己创建一个配置文件进行修改
// 这个配置文件会和那些公共的配置文件进行合并

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'components': '@/components',
        'network': '@/network',
        'views': '@/views',
      }
    }
  }
}