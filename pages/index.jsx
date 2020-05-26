import TodoPanel from '../components/TodoPanel'
import { wrapper } from '../redux/index'
import { connect } from 'react-redux'
import { END } from 'redux-saga'

/*
  Next JS supports 3 types of pages
  1. Static generation (think pages that can be loaded before a user's request, like a blog post )
  2. SSR that fetches data once at request time. 
  3. client side generation (look into SWR)
*/

// Runs at build time
export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
  await store.dispatch({ type: 'GET_TODOS' })
  store.dispatch(END)
  await store.sagaTask.toPromise()
})

const Index = props => {
  const { todo: todos = [] } = props
  return (
    <div>
      <div>
        <TodoPanel list={todos} />
      </div>
    </div>
  )
}

export default connect(state => state)(Index)
