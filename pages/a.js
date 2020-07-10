import { Component } from 'react'
import dynamic from 'next/dynamic'
import { Button } from 'antd'
import Router from 'next/router'
import TestHocComp from '../lib/test-hoc'

const DynamicComponentWithCustomLoading = dynamic(
  import('../components/comp'),
  {
    loading: () => <p>...</p>
  }
)

class A extends Component {
  static async getInitialProps(ctx) {
    const moment = await import('moment')
    return {
      time: Date.now(),
      moment: moment.default
    }
  }
  toIndex = () => {
    Router.push({
      pathname: '/',
      query: {
        from: 'a page'
      }
    })
  }
  render() {
    const { moment, time } = this.props
    return <div>
      {
        time
      }
      <DynamicComponentWithCustomLoading />
      时间：{moment().format('L')}
      <div>
        <Button onClick={this.toIndex} type="primary">回到首页</Button>
      </div>
    </div>
  }
}

export default TestHocComp(A)