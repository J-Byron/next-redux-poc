import App from 'next/app'
// import withRedux from 'next-redux-wrapper'
import { wrapper } from '../global/index'
import { END } from 'redux-saga'

class MyApp extends App {
  static getInitialProps = async ({ Component, ctx }) => {

    // 1. Wait for all page actions to dispatch
    const pageProps = {
      ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {})
    }

    // 2. Stop the saga if on server
    if (ctx.req) {
      console.log('Saga is executing on server, we will wait')
      ctx.store.dispatch(END)
      await ctx.store.sagaTask.toPromise()
    }

    // 3. Return props
    return {
      pageProps
    }
  }

  render() {
    const { Component, pageProps } = this.props

    return <Component {...pageProps} />
  }
}

export default wrapper.withRedux(MyApp)
