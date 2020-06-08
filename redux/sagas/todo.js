import axios from 'axios'
import { put as dispatch, takeLatest } from 'redux-saga/effects'

// TODO should be moved into an http-proxy-config for axios ...
const PROXY = `http://localhost:8000`

function* getTodos(action) {
  try {
    const { data: responseData } = yield axios.get(`${PROXY}/api/todos`)

    if (action.payload == 'static') {
      yield dispatch({ type: 'SET_STATIC_TODOS', payload: responseData })
    } else {
      yield dispatch({ type: 'SET_SERVER_TODOS', payload: responseData })
    }
  } catch (e) {
    console.log('Error while fetching todos...', e)
  }
}

function* postTodo(action) {
  try {
    const { description } = action.payload

    yield axios.post(`${PROXY}/api/todo`, { description })
    yield dispatch({ type: 'GET_TODOS', payload: 'server' })
  } catch (error) {
    console.log('Error while posting todo...', e)
  }
}

function* deleteTodo(action) {
  try {
    const { id } = action.payload
    yield axios.delete(`${PROXY}/api/todo/${id}`)

    yield dispatch({ type: 'GET_TODOS', payload: 'server' })
  } catch (error) {
    console.log('Error while deleting todo...', e)
  }
}

function* updateTodo(action) {
  try {
    const { id, updatedDescription } = action.payload
    const item = yield axios.put(`${PROXY}/api/todo/${id}`, {
      updatedDescription
    })

    yield dispatch({ type: 'GET_TODOS', payload: 'server' })
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
