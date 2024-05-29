import React, { PureComponent } from 'react'

export default class M_GradientAngle extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { handleChangeGradientAngle } = this.props

    return (
      <div>
        <div className="btn--secondary" onClick={handleChangeGradientAngle}>Rotate</div>
      </div>
    )
  }
}