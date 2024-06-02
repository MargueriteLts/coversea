import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import classnames from 'classnames'

import IconToggle from '../../buttons/IconToggle.jsx'
import A_Text from '../../ATOMS/A_Text.jsx'
//import ColorPicker from '../../ColorPicker.jsx'
//import Slider from '../../Slider.jsx'
import TabImageSet from '../../TabImageSet.jsx'
//import M_GradientColors from './M_GradientColors.jsx'
//import M_GradientAngle from './M_GradientAngle.jsx'
//import M_NumberInput from './M_NumberInput.jsx'
//import M_ToggleIconSet from './M_ToggleIconSet.jsx'
import M_Control from './M_Control.jsx'

export default class M_ControlWithSubControl extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const {
      isLocked,
      setStore,
      item,
      handleToggle,
      mainTitle,
      orientation,
      hasTitle,
      isFullWidth,
      subControlType,
      subControlTitle,
      isSubControlLocked,
      itemSubControl,
      data,
      object,
      handleChangeControl,
      type,
      options,
      value,
      handleTabChange,
      images
    } = this.props

    const classNames = classnames({
      'M_TabsWithSubControl': true,
      [`${orientation}`]: true,
      fullWidth: isFullWidth
    })

    return <div className={classNames}>
      <div className='topControls'>
        <div className='M_Control'>
          <div className="control_Title">
            <IconToggle
              isLocked={isLocked}
              setStore={setStore}
              item={item}
              handleToggle={handleToggle}
            />
              <A_Text
                text={mainTitle}
                style='titleText'
              />
          </div>
        </div>
        <M_Control
          orientation="row"
          controlType={subControlType}
          hasTitle={hasTitle}
          title={subControlTitle}

          isLocked={isSubControlLocked}
          setStore={setStore}
          item={itemSubControl}
          handleToggle={handleToggle}

          data={data}
          object={object}
          handleChange={handleChangeControl}
          type={type}
        />
      </div>
      <TabImageSet
          options={options}
          value={value}
          handleClick={handleTabChange}
          tabBackgrounds={images}
        />
    </div>
  }
}
