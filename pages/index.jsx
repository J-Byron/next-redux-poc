import TodoPanel from '../components/TodoPanel'
import { wrapper } from '../redux/index'
import { connect } from 'react-redux'
import { END } from 'redux-saga'

// Runs at build time
export const getStaticProps = wrapper.getStaticProps(async context => {
  // Conditionally generate static/dynamic props based on preview cookie
  if (context.preview) {
    await context.store.dispatch({ type: 'GET_TODOS', payload: 'server' })
  } else {
    await context.store.dispatch({ type: 'GET_TODOS', payload: 'static' })
  }

  context.store.dispatch(END)
  await context.store.sagaTask.toPromise()
})

const Index = props => {
  console.log(props)
  const todos =
    props.todoReducer.server != 'init'
      ? props.todoReducer.server
      : props.todoReducer.static

  return (
    <div>
      <div>
        <TodoPanel list={todos} />
      </div>
    </div>
  )
}

export default connect(state => state)(Index)
