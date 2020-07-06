import { Button } from 'antd'
import Link from 'next/link'
import Router from 'next/router'

export default () => {
  function click() {
    Router.push({
      pathname: '/b',
      query: {
        id: 12
      }
    })
  }
  function toB(){
    Router.push({
      pathname: '/b',
      query: {
        id: 2
      }
    },'/b/2')
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
  </>
}