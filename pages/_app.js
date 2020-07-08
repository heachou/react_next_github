import App, { Container } from 'next/app'

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
      hello
      <Component {...pageProps} />
    </div>
  }
}

export default MyApp