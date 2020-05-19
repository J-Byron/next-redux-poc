import axios from 'axios'
import { put as dispatch, takeLatest } from 'redux-saga/effects'

const stubTodos = [
  { _id: 0, desciption: 'This is stub data 1' },
  { _id: 1, desciption: 'This is stub data 2' },
  { _id: 2, desciption: 'This is stub data 3' }
]

function* getTodos() {
  try {
    yield dispatch({ type: 'RESET_TODOS' })
    // const data = yield axios.get('/api/todos')
    const data = stubTodos
    yield dispatch({ type: 'SET_TODOS', payload: data })
  } catch (e) {
    console.log('Error while fetching todos...', e)
  }
}

function* postTodo(action) {}
function* updatTodo(action) {}
function* deleteTodo(action) {}

function* todoSaga() {
  yield takeLatest('GET_TODOS', getTodos)
  //   yield takeLatest('POST_TODO', postTodo)
  //   yield takeLatest('UPDATE_TODO', updatTodo)
  //   yield takeLatest('DELETE_TODO', deleteTodo)
}

export default todoSaga
