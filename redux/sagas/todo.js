import axios from 'axios'
import { put as dispatch, takeLatest } from 'redux-saga/effects'

// TODO should be moved into an http-proxy-config for axios ...
const PROXY = `http://localhost:8000`

function* getTodos() {
  try {
    const { data: responseData } = yield axios.get(`${PROXY}/api/todos`)
    yield dispatch({ type: 'SET_TODOS', payload: responseData })
  } catch (e) {
    console.log('Error while fetching todos...', e)
  }
}

function* postTodo(action) {
  try {
    const { description } = action.payload

    yield axios.post(`${PROXY}/api/todo`, { description })
    yield dispatch({ type: 'GET_TODOS' })
  } catch (error) {
    console.log('Error while posting todo...', e)
  }
}
function* deleteTodo(action) {
  try {
    const { id } = action.payload
    yield axios.delete(`${PROXY}/api/todo/${id}`)
    yield dispatch({ type: 'GET_TODOS' })
  } catch (error) {
    console.log('Error while deleting todo...', e)
  }
}

function* updateTodo(action) {
  try {
    console.log('HIT UPDATE TODO SAGA')

    const { id, updatedDescription } = action.payload
    const item = yield axios.put(`${PROXY}/api/todo/${id}`, {
      updatedDescription
    })
    console.log('UpdatedItem -->', item)

    yield dispatch({ type: 'GET_TODOS' })
  } catch (error) {
    console.log('Error while updating todo...', e)
  }
}

function* todoSaga() {
  yield takeLatest('GET_TODOS', getTodos)
  yield takeLatest('POST_TODO', postTodo)
  yield takeLatest('DELETE_TODO', deleteTodo)
  yield takeLatest('UPDATE_TODO', updateTodo)
}

export default todoSaga
