import { LOGOUT } from './actionTypes'
import { message } from 'antd'
import axios from 'axios'

export function logout() {
  return (dispatch) => {
    axios.post('/logout')
      .then((resp) => {
        if (resp.status === 200) {
          dispatch({
            type: LOGOUT
          })
          message.success('注销成功')
        } else {
          console.log('logout failed', resp)
        }
      })
      .catch((e) => {
        console.log('logout failed', e)
      })
  }
}