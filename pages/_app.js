import App, { Container } from 'next/app'
import { Provider } from 'react-redux'
import Layout from '../components/Layout'
import withRedux from '../lib/with-redux'

class MyApp extends App {
  static async getInitialProps(ctx) {
    const { Component } = ctx
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    return {
      pageProps
    }
  }
  render() {
    const { Component, pageProps, reduxStore } = this.props
    return <div>
      <Provider store={reduxStore}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </div>
  }
}

export default withRedux(MyApp)