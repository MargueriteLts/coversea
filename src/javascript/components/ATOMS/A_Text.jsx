import classNames from 'classnames'
import React, { PureComponent } from 'react'

import classnames from 'classnames'

export default class A_Text extends PureComponent {
  constructor(props) {
    super(props)
  }
  render() {
    const { text, style, isUpperCase } = this.props

    const classNames = classnames({
      [`${style}`]: true,
      "text--uppercase": isUpperCase
    })


    return <div className={classNames}>{text}</div>
  }
}