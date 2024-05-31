import React, { PureComponent } from 'react'

// import ColorPicker from '../../ColorPicker.jsx'

export default class M_GradientDirection extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { gradientAngleLock, setBackgroundStore, handleToggle, handleChangeBackgroundAngleGradient } = this.props

    return (
      <div className='gradientDirection'>
        <M_Control
          orientation="row"
          controlType='GradientAngle'

          isLocked={gradientAngleLock}
          setStore={setBackgroundStore}
          item='lockGradientAngle'
          handleToggle={handleToggle}

          handleChange={handleChangeBackgroundAngleGradient}
        />
      </div>
    )
  }
}