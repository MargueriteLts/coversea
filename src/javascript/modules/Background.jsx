import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export default class Background extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return <div className="Background">
    </div>
  }

  /////////////////////////////////////////////////////////

  renderBackgroundTypes() {
    const {
      backgroundTypeList,
      setColorBackgroundStore,
      setGradientStore,
      setTextureStore
    } = this.props

    const types = []

    backgroundTypeList.forEach((backgroundTypeName) => {
      
    });
  }
}
