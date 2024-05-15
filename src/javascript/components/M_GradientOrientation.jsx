import React, { PureComponent } from 'react'

export default class M_GradientOrientation extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { handleChangeBackgroundAngleGradient } = this.props

    return (
      <div>
        <div className="btn--secondary" onClick={handleChangeBackgroundAngleGradient}>Rotate</div>
      </div>
    )
  }
}