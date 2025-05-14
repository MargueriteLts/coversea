import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import A_Button from '../buttons/A_Button.jsx'
import A_ToggleOpenClose from '../buttons/A_ToggleOpenClose.jsx'

export default class M_ModuleHeader extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { title, moduleType, handleOpenModule, isOpen } = this.props

    return <div className="module__header">
      <div className='module__header-controls-left'>
        <A_ToggleOpenClose
          title={title}
          handleClick={handleOpenModule}
          isOpen={isOpen}
          style='module-title'
          hasIconLeft={true}
        />
      </div>

      <A_Button
        onClick={() => this.props.handleRandomizeModule(moduleType)}
        icon='icon--dice'
        text='Randomize'
        type='primary'
        hasIcon={true}
      />
    </div>
  }
}
