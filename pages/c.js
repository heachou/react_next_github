import { withRouter } from 'next/router'

const C = ({ router }) => <span>C page; id:{router.query.id}</span>

export default withRouter(C)