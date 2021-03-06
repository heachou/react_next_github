import React, { Component } from 'react'
import initializeStore from '../store/store'

const isServer = typeof window === 'undefined'
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE_'

function getOrCreateStore(intialState) {
  if (isServer) {
    return initializeStore(intialState)
  }
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = initializeStore(intialState)
  }
  return window[__NEXT_REDUX_STORE__]
}

export default Comp => {
  class withReduxApp extends React.Component {

    constructor(props) {
      super(props)
      this.reduxStore = getOrCreateStore(props.initialReduxState)
    }

    static async getInitialProps(ctx) {
      let reduxStore
      if (isServer) {
        const { req } = ctx.ctx
        const { session } = req
        if (session && session.user) {
          reduxStore = getOrCreateStore({
            user: session.user
          })
        } else {
          reduxStore = getOrCreateStore()
        }
      } else {
        reduxStore = getOrCreateStore()
      }

      ctx.reduxStore = reduxStore

      let appProps = {}
      if (typeof Comp.getInitialProps === 'function') {
        appProps = await Comp.getInitialProps(ctx)
      }
      return {
        ...appProps,
        initialReduxState: reduxStore.getState()
      }
    }
    render() {
      const { Component, pageProps, ...rest } = this.props
      return (
        <Comp
          {...rest}
          Component={Component}
          pageProps={pageProps}
          reduxStore={this.reduxStore}
        ></Comp>
      )
    }
  }
  return withReduxApp
}