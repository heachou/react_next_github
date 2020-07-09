import App, { Container } from 'next/app'
import MyContext from '../lib/my-context'
import { Provider } from 'react-redux'
import store from '../store/store'

class MyApp extends App {

  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    return {
      pageProps
    }
  }

  render() {
    const { Component, pageProps } = this.props
    return <div>
      <Provider store={store}>
        <MyContext.Provider value={'test'}>
          <Component {...pageProps} />
        </MyContext.Provider>
      </Provider>
    </div>
  }
}

export default MyApp