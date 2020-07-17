const withCss = require('@zeit/next-css')
const withLess = require('@zeit/next-less')
const withPlugins = require("next-compose-plugins/lib") //结合less css
const withBundleAnalyzer = require('@zeit/next-bundle-analyzer')
const config = require('./config')

const { GITHUB_OAUTH_URL } = config

module.exports = withPlugins([withLess, withCss, withBundleAnalyzer], {
  webpack: (config, { webpack, isServer, dev }) => {
    if (isServer) {
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
    if (!isServer && !dev) {
      config.optimization.splitChunks.cacheGroups.commons.minChunks = 2;
    }
    config.plugins.push(new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/))
    return config
  },
  publicRuntimeConfig: {
    GITHUB_OAUTH_URL,
    OAUTH_URL: config.OAUTH_URL,
  },
  analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
  analyzeServer: ["server", "both"].includes(process.env.BUNDLE_ANALYZE),
  bundleAnalyzerConfig: {
    server: {
      analyzerMode: 'static',
      reportFilename: '../bundles/server.html',
    },
    browser: {
      analyzerMode: 'static',
      reportFilename: '../bundles/client.html',
    },
  },
})
