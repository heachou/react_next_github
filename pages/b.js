import { withRouter } from 'next/router'
import { useState, useEffect, useReducer, useLayoutEffect, useContext, memo, useCallback, useMemo, useRef } from 'react'
import MyContext from '../lib/my-context'

function countReducer(state, action) {
  switch (action.type) {
    case 'add':
      return state + 1
    case 'minus':
      return state - 1
    default:
      return state
  }
}

function Counter() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('name')
  const [count2, dispatchCount] = useReducer(countReducer, 10)

  const countRef = useRef()

  countRef.current = count

  const context = useContext(MyContext)

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count => count + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  // const dispatch = useCallback(
  //   (type) => {
  //     dispatchCount({ type })
  //   },
  //   [dispatchCount]
  // )

  const dispatch = useMemo(() => (type) => dispatchCount({ type }), [dispatchCount])

  useEffect(() => {
    console.log('componentDidMount')
    return () => console.log('componentWillUnmount')
  }, [])

  useLayoutEffect(() => {
    console.log('useLayoutEffect componentDidMount')
    return () => console.log('useLayoutEffect componentWillUnmount')
  }, [])

  const config = useMemo(() => ({
    count2
  }), [count2])

  const alertCount = () => {
    setTimeout(() => {
      // alert(count)
      alert(countRef.current)
    }, 3000)
  }

  return <div>
    <p>count:{count}</p>
    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
    <br />
    <br />
    <button onClick={() => dispatch('add')}>add {count2}</button>
    <button onClick={() => dispatch('minus')}>minus {count2}</button>
    <button onClick={alertCount}>alertCount 延迟问题</button>
    <p>{context}</p>
    <br />
    <Child
      config={config}
      click={dispatch}
    />
  </div>
}

const Child = memo(({ config, click }) => {
  console.log('render child')
  return <div>
    <span>count2 is {config.count2}</span>
    <button onClick={() => click('add')}>click add</button>
  </div>
})

export default withRouter(Counter)