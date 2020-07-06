// const withCSS = require('@zeit/next-css')
// const withLess = require('@zeit/next-less')

// if (typeof require !== 'undefined') {
//   require.extensions['.css'] = file => { }
// }

// module.exports = withLess(withCSS({}))

const withCss = require('@zeit/next-css')
const withLess = require('@zeit/next-less')
const withPlugins = require("next-compose-plugins/lib") //结合less css

module.exports = withPlugins([withLess, withCss], {
  webpack: (config, { isServer }) => {
    if(isServer){
      const antStyles = /antd\/.*?\/style\/css.*?/
      const origExternals = [...config.externals]
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback()
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback)
          } else {
            callback()
          }
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals),
      ]
      config.module.rules.unshift({
        test: antStyles,
        use: 'null-loader',
      });
    }
    return config
  },
})
