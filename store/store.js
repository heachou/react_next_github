import { createStore, combineReducers, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'


const initialUser = {}

function userReducer(state = initialUser, action) {
  switch (action.type) {
    default:
      return state
  }
}

const rootReducer = combineReducers({
  user: userReducer
})

const composeEnhancers = process.env.NODE_ENV === 'development' ? composeWithDevTools(applyMiddleware(reduxThunk)) : applyMiddleware(reduxThunk)


export default function initializeStore(state) {
  const store = createStore(
    rootReducer,
    Object.assign({}, { user: initialUser }, state),
    composeEnhancers
  )

  return store
}