import { Component } from 'react'
// import moment from 'moment'
import dynamic from 'next/dynamic'

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
  render() {
    const { moment, time } = this.props
    return <div>
      {
        time
      }
      <DynamicComponentWithCustomLoading />
      时间：{moment().format('L')}
    </div>
  }
}

export default A