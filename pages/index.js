import { Button } from 'antd'
import Link from 'next/link'
import Router from 'next/router'

export default () => {
  function click() {
    Router.push('/b')
  }
  return <>
    <Button type="primary" onClick={click}>to b</Button>
    <Link href="/a">
      <Button>  go page a</Button>
    </Link>
  </>
}