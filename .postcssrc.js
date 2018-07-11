module.exports = {
  plugins: {
    autoprefixer: {},
    "postcss-nested": {},
    "cssnano": {
      autoprefixer: false,
      discardComments: {
        removeAll: true
      },
      discardUnused : false,
      mergeIdents   : false,
      reduceIdents  : false,
      safe          : true,
      sourcemap     : true
    },
  }
}