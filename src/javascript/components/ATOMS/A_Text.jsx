import React, { PureComponent } from 'react'

export default class A_Text extends PureComponent {
  constructor(props) {
    super(props)
  }
  render() {
    const { text, style } = this.props
    return <div className={style}>{text}</div>
  }
}