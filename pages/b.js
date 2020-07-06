import { withRouter } from 'next/router'

const B = ({ router }) => <span>B page; id:{router.query.id}</span>

export default withRouter(B)