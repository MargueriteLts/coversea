import React, { PureComponent } from 'react'

export default class TextArea extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { value, onChange, rows, cols, title } = this.props

    return (
      <div className='textarea'>
        {title}
        <textarea
          className='textarea__entry'
          rows={rows}
          cols={cols}
          value={value}
          onChange={onChange}
        />
      </div>
    )
  }
}