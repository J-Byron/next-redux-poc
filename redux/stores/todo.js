import { HYDRATE } from 'next-redux-wrapper'
import { createStore } from 'redux'

const todoReducer = (state = [], action) => {
  switch (action.type) {
    case HYDRATE:
      if (action.payload == []) delete action.payload // Ensure proper merging of stores between init/static props
      return { ...state, ...action.payload }
    case 'SET_TODOS':
      console.log(action.payload)
      return action.payload
    case 'RESET_TODOS':
      return { ...state, state: [] }
    default:
      return state
    // ...
  }
}

export default todoReducer
