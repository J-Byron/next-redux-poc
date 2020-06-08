import todoReducer from './todo'
import { combineReducers } from 'redux'

// Responsible for combining all reducers into a single store
const rootReducer = combineReducers({ todoReducer: todoReducer })
export default rootReducer
