import App from 'next/app'
import Router from 'next/router'
import axios from 'axios'
import { wrapper } from '../redux/index'
import NProgress from 'nprogress' //nprogress module
import 'nprogress/nprogress.css' //styles of nprogress
import NavBar from '../components/NavBar'

/**
 *  * Binding events
 *  If you wanted to track the user and create an audit log, this is where you would start
 */

Router.events.on('routeChangeStart', () => NProgress.start())
Router.events.on('routeChangeComplete', () => NProgress.done())
Router.events.on('routeChangeError', () => NProgress.done())

class MyApp extends App {
  /**
   *  You can always trust the good folks at ZEIT to design simple, but intuitive APIs on every library they build.
   *  ? What's the problem with getIntitialProps?
   *  * It’s hybrid. This means that despite the initial load of a site being pre-rendered, any
   *  * subsequent route changes in your app will run another client-side fetch in order to get the new
   *  * content. For dynamic content this is fine, but for static sites pulling static content through a
   *  * headless CMS API, this can be a bit wasteful on resources.
   */

  render() {
    const { Component, pageProps } = this.props

    return (
      <div>
        <NavBar />
        <Component {...pageProps} />
      </div>
    )
  }
}

export function reportWebVitals(metric) {
  console.table(metric)
}

export default wrapper.withRedux(MyApp)
