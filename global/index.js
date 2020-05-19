import createSagaMiddleware from 'redux-saga'
import { createStore, applyMiddleware } from 'redux'
import { createWrapper } from 'next-redux-wrapper'
import rootSaga from './sagas/index'
import rootReducer from './stores/index'

export const makeStore = context => {
  const saga = createSagaMiddleware()
  const store = createStore(rootReducer, applyMiddleware(saga))
  store.sagaTask = saga.run(rootSaga)
  console.log('store ->', store)
  return store
}

export const wrapper = createWrapper(makeStore)
