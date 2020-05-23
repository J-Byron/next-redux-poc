import TodoPanel from '../components/TodoPanel'
import { wrapper } from '../redux/index'
import { useSelector } from 'react-redux'
import { END } from 'redux-saga'

/*
  Next JS supports 3 types of pages
  1. Static generation (think pages that can be loaded before a user's request, like a blog post )
  2. SSR that fetches data once at request time. 
  3. client side generation (look into SWR)
*/

export const getStaticProps = wrapper.getStaticProps(async ({ store }) => {
  console.log('Fetching static props...')
  await store.dispatch({ type: 'GET_TODOS' })
  store.dispatch(END)
  await store.sagaTask.toPromise()
})

const Index = () => {
  const selector = useSelector(state => state)
  console.log(selector)
  return (
    <div>
      {/* <ul>
        {todo.map((el, index) => (
          <li key={index}>{el.description}</li>
        ))}
      </ul> */}
      {/* {todo.length >= 1 && todo[0].description} */}
      Heya
    </div>
  )
}

export default Index
