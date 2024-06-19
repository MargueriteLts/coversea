import React, { PureComponent } from 'react'

import ColorPicker from './M_ColorPicker.jsx'

export default class M_GradientColors extends PureComponent {
  constructor(props) {
    super(props)
  }

  render() {
    const { handleChangeBackgroundGradientColor, color1, color2 } = this.props

    return (
      <div className='gradientColors'>
        <ColorPicker
          title=''
          object='GradientColor1'
          color={color1}
          handleChange={handleChangeBackgroundGradientColor}
          key='Gradient1ColorPicker'
        />
        <ColorPicker
          title=''
          object='GradientColor2'
          color={color2}
          handleChange={handleChangeBackgroundGradientColor}
          key='Gradient2ColorPicker'
        />
      </div>
    )
  }
}