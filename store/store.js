import { createStore, combineReducers, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'

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

const store = createStore(rootReducer, {
  counter: initialState,
  user: initialUser
}, applyMiddleware(reduxThunk))

store.subscribe(() => {
  console.log(store.getState())
})

store.dispatch(add(10))

store.dispatch(addAsync(20))

export { add, addAsync }

export default store