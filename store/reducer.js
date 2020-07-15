import { LOGOUT } from './actionTypes'
import { combineReducers } from 'redux'

export const userinitialState = {}

export const userReducers = (state = userinitialState, action) => {
  switch (action.type) {
    case LOGOUT:
      return {}
    default:
      return state
  }
}

export const allReducers = combineReducers({
  user: userReducers,
})