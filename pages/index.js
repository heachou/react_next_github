import { Button } from 'antd'
import Link from 'next/link'
import Router from 'next/router'
import { connect } from 'react-redux'
import { add,addAsync } from '../store/store'

const events = [
  "routeChangeStart",
  "routeChangeComplete",
  "routeChangeError",
  "beforeHistoryChange",
  "hashChangeStart",
  "hashChangeComplete"
]

function makeEvent(type) {
  return (...args) => {
    console.log(type, ...args)
  }
}

events.forEach(event => {
  Router.events.on(event, makeEvent(event))
})

const Index = (props) => {
  function click() {
    Router.push({
      pathname: '/b',
      query: {
        id: 12
      }
    })
  }
  function toB() {
    Router.push({
      pathname: '/b',
      query: {
        id: 2
      }
    }, '/b/2')
  }
  return <>
    <Button type="primary" onClick={click}>to b</Button>
    <Link href="/a">
      <Button>  go page a</Button>
    </Link>
    <Link href="/c?id=2">
      <Button> go page c ,id=2 </Button>
    </Link>
    <Button onClick={toB}> go page B ,id=2 </Button>
    <Button onClick={() => props.add(2)}> store add {props.counter.count}</Button>
    <Button onClick={() => props.addAsync(3)}> 异步添加 add {props.counter.count}</Button>
  </>
}

export default connect((state) => ({ counter: state.counter }), { add, addAsync })(Index)