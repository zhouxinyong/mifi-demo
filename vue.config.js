module.exports = {
  runtimeCompiler: true,
  lintOnSave: true,
  baseUrl: process.env.NODE_ENV === 'production'
    ? '/mifi-demo/'
    : './',
  devServer: {
    port: 8089,
    https: true
  }
}
