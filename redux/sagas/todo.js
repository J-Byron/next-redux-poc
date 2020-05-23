import axios from 'axios'
import { put as dispatch, takeLatest } from 'redux-saga/effects'

// TODO should be moved into an http-proxy-config for axios ...
const PROXY = 'http://localhost:6000'

function* getTodos() {
  try {
    yield dispatch({ type: 'RESET_TODOS' })
    const { data: responseData } = yield axios.get(`${PROXY}/api/todos`)
    console.log(responseData)

    yield dispatch({ type: 'SET_TODOS', payload: responseData })
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
