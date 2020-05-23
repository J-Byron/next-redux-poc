import { connect } from 'react-redux'
import React, { Component } from 'react'

/*
  Next JS supports 3 types of pages
  1. Static generation (think pages that can be loaded before a user's request, like a blog post )
  2. SSR that fetches data once at request time. 
  3. client side generation (look into SWR)
*/
class TodoPanel extends Component {
  static async getInitialProps({ store, pathname, query, req }) {
    if (req) {
      // All async actions must be await'ed
      await store.dispatch({ type: 'GET_TODOS' })
    }
  }

  render() {
    console.log(this.props)
    return <div>Panel!</div>
  }
}

export default connect(store => store)(TodoPanel)
