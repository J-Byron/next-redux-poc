import { connect } from 'react-redux'
import { wrapper } from '../../redux/index'
import axios from 'axios'

// TODO should be moved into an http-proxy-config for axios ...
const PROXY = `http://localhost:8000`

// * Dynamic routing directories run before _APP and therefor operates in a seperate context to redux
export async function getStaticPaths() {
  // Make direct requests for all todo resources that will need a path upon first paint
  // ? This does not affect routes after first paint ...

  const { data: todos } = await axios.get(`${PROXY}/api/todos`)

  const paths = todos.map(todo => ({
    params: { id: todo._id }
  }))

  // To pre-render only these paths at build time use
  // { fallback: false } which eans other routes should 404.
  return { paths, fallback: true }
}

// Runs at build time
export const getStaticProps = wrapper.getStaticProps(async context => {
  const { data: todo } = await axios.get(
    `${PROXY}/api/todo/${context.params.id}`
  )
  return { props: { itemDesc: todo.description } }
})

const todoItem = ({ itemDesc }) => {
  return (
    <div>
      <div>{itemDesc}</div>
    </div>
  )
}

export default connect(state => state)(todoItem)
