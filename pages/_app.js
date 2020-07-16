import App, { Container } from 'next/app'
import { Provider } from 'react-redux'
import Layout from '../components/Layout'
import withRedux from '../lib/with-redux'
import PageLoading from '../components/PageLoading'
import Router from 'next/router'

class MyApp extends App {

  // App组件的getInitialProps比较特殊
  // 能拿到一些额外的参数
  // Component: 被包裹的组件
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
  state = {
    loading: false,
  }
  //开始loading
  startLoading = () => {
    this.setState({
      loading: true,
    })
  }
  //关闭 loading
  stopLoading = () => {
    this.setState({
      loading: false,
    })
  }
  componentDidMount() {
    Router.events.on('routeChangeStart', this.startLoading)
    Router.events.on('routeChangeComplete', this.stopLoading)
    Router.events.on('routeChangeError', this.stopLoading)
  }

  componentWillUnmount() {
    Router.events.off('routeChangeStart', this.startLoading)
    Router.events.off('routeChangeComplete', this.stopLoading)
    Router.events.off('routeChangeError', this.stopLoading)
  }
  render() {
    const { Component, pageProps, reduxStore } = this.props
    return <div>
      <Provider store={reduxStore}>
        <Layout>
          {this.state.loading ? <PageLoading /> : null}
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </div>
  }
}

export default withRedux(MyApp)