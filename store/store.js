import { createStore, combineReducers, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { allReducers, userinitialState } from "./reducer"

const composeEnhancers = process.env.NODE_ENV === 'development' ? composeWithDevTools(applyMiddleware(reduxThunk)) : applyMiddleware(reduxThunk)

export default function initializeStore(state) {
  const store = createStore(
    allReducers,
    Object.assign({}, { user: userinitialState }, state),
    composeEnhancers
  )

  return store
}