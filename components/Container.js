import { cloneElement } from 'react'

const style = {
  width: '100%',
  maxWidth: 1200,
  marginLeft: 'auto',
  marginRight: 'auto',
  paddingLeft: 16,
  paddingRight: 16
}

export default ({ children, renderer = <div /> }) => {
  const newElement = cloneElement(
    renderer,
    {
      style: Object.assign({}, renderer.props.style, style),
      children
    })
  return newElement
}