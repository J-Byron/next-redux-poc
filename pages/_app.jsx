import App from 'next/app'
// import withRedux from 'next-redux-wrapper'
import { wrapper } from '../redux/index'
import { END } from 'redux-saga'

class MyApp extends App {
  /**
   *  You can always trust the good folks at ZEIT to design simple, but intuitive APIs on every library they build.
   *  ? What's the problem with getIntitialProps?
   *  * It’s hybrid. This means that despite the initial load of a site being pre-rendered, any
   *  * subsequent route changes in your app will run another client-side fetch in order to get the new
   *  * content. For dynamic content this is fine, but for static sites pulling static content through a
   *  * headless CMS API, this can be a bit wasteful on resources.
   */

  // static getInitialProps = async ({ Component, ctx }) => {
  //   // 1. Wait for all page actions to dispatch
  //   const pageProps = {
  //     ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {})
  //   }

  //   // 2. Stop the saga if on server
  //   if (ctx.req) {
  //     console.log('Saga is executing on server, we will wait')
  //     ctx.store.dispatch(END)
  //     await ctx.store.sagaTask.toPromise()
  //   }

  //   // 3. Return props
  //   return {
  //     pageProps
  //   }
  // }

  render() {
    const { Component, pageProps } = this.props

    return <Component {...pageProps} />
  }
}

export default wrapper.withRedux(MyApp)
