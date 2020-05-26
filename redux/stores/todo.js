import { HYDRATE } from 'next-redux-wrapper'
import { createStore } from 'redux'

const todoReducer = (state = [], action) => {
  switch (action.type) {
    case HYDRATE:
      if (action.payload == []) delete action.payload // Ensure proper merging of stores between init/static props
      return action.payload.todo
    case 'SET_TODOS':
      return action.payload
    case 'RESET_TODOS':
      return []
    default:
      return state
    // ...
  }
}

export default todoReducer
