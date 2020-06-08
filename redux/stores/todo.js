import { HYDRATE } from 'next-redux-wrapper'

const todoReducer = (state = { static: 'init', server: 'init' }, action) => {
  console.log(action.type)

  switch (action.type) {
    case HYDRATE:
      if (action.payload.todoReducer.static === 'init') {
        delete action.payload.todoReducer.static
      }
      if (action.payload.todoReducer.server === 'init') {
        delete action.payload.todoReducer.server
      }

      return {
        ...state,
        ...action.payload.todoReducer
      }

    case 'SET_STATIC_TODOS':
      return {
        ...state,
        static: action.payload
      }

    case 'SET_SERVER_TODOS':
      return {
        ...state,
        server: action.payload
      }

    default:
      return state
  }
}

export default todoReducer
