import App, { Container } from 'next/app'
import MyContext from '../lib/my-context'

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
      <MyContext.Provider value={'test'}>
        <Component {...pageProps} />
      </MyContext.Provider>
    </div>
  }
}

export default MyApp