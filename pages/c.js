import { withRouter } from 'next/router'
import Router from 'next/router'

const C = ({ router }) => (
  <div>
    <span>C page; id:{router.query.id}</span>
  </div>
)

export default withRouter(C)