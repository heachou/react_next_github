import { createStore, combineReducers, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const initialState = {
  count: 0
}

const ADD = 'ADD'

function countReducer(state = initialState, action) {
  switch (action.type) {
    case ADD:
      return { count: state.count + (action.num || 1) }
    default:
      return initialState
  }
}

function add(num) {
  return {
    type: ADD,
    num
  }
}

function addAsync(num) {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(add(num))
    }, 3000)
  }
}

const initialUser = {
  name: 'zhou'
}

function userReducer(state = initialUser, action) {
  switch (action.type) {
    case 'name':
      return { name: action.name }
    default:
      return initialUser
  }
}

const rootReducer = combineReducers({
  counter: countReducer,
  user: userReducer
})

const composeEnhancers = process.env.NODE_ENV === 'development' ? composeWithDevTools(applyMiddleware(reduxThunk)) : applyMiddleware(reduxThunk)



export { add, addAsync }

export default function initializeStore(state) {
  const store = createStore(rootReducer, Object.assign({}, { ...state }), composeEnhancers)

  // store.subscribe(() => {
  //   console.log(store.getState())
  // })

  store.dispatch(add(10))

  store.dispatch(addAsync(20))

  return store
}