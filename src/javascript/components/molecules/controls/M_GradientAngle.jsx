import React, { PureComponent } from 'react'

import A_IconButton from '../../buttons/A_IconButton.jsx'

export default class M_GradientAngle extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { handleChangeGradientAngle } = this.props

    return (
      // <div>
      //   <div className="btn--secondary" onClick={handleChangeGradientAngle}>Rotate</div>
      // </div>
      <A_IconButton
        onClick={handleChangeGradientAngle}
        size='normal'
        style='transparent'
        icon='Rotate'
      />
    )
  }
}