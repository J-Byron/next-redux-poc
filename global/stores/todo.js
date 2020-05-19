import { HYDRATE } from 'next-redux-wrapper'
import { createStore } from 'redux'

const todoReducer = (state = [], action) => {
  switch (action.type) {
    case HYDRATE:
      return { ...state, ...action.payload }
    case 'SET_TODOS':
      return action.payload
    case 'RESET_TODOS':
      return { ...state, todos: [] }
    default:
      return state
    // ...
  }
}

export default todoReducer
