import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import M_Control from '../controls/M_Control.jsx'
//import IconToggle from '../../buttons/IconToggle.jsx'

export default class M_UploadImageContent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sizeLock: this.props.uploadImage.sizeLock,
      opacityLock: this.props.uploadImage.opacityLock
      //positionLock: this.props.uploadImage.positionLock
    }
  }

  handleToggle = (item, setStore) => {
    if (item == 'lockSize') {
      setStore(item, !this.state.sizeLock)
      this.setState({
        sizeLock: !this.state.sizeLock
      })
    }
    if (item == 'lockOpacity') {
      setStore(item, !this.state.opacityLock)
      this.setState({
        opacityLock: !this.state.opacityLock
      })
    }
    //if (item == 'lockPosition') {
    //  setStore(item, !this.state.positionLock)
    //  this.setState({
    //    positionLock: !this.state.positionLock
    //  })
    //}
  }

  //////////////////////////////////////////////////////// RENDER
  
  render() {
    const {
      uploadImage,
      handleUploadImageSize,
      handleUploadImageOpacity,
      setUploadImageStore,
      handleFileChange
    } = this.props

    return <div className="M_UploadImageContent">
      <div className="content_row">
        <div className="content_Column">
          <M_Control
            orientation="row"
            controlType='FileUpload'
            hasTitle={true}
            title='Upload Image'
            handleFileChange={handleFileChange}
          />
          
          <M_Control
            orientation="row"
            controlType='SliderOpacity'
            hasTitle={true}
            title='Image opacity'
            isLocked={this.state.opacityLock}
            setStore={setUploadImageStore}
            item='lockOpacity'
            handleToggle={this.handleToggle}
            data={uploadImage.opacity}
            handleChange={handleUploadImageOpacity}
          />
        </div>
        
        <div className="content_Column">
          <M_Control
            orientation="row"
            controlType='Slider'
            hasTitle={true}
            title='Image size'
            isLocked={this.state.sizeLock}
            setStore={setUploadImageStore}
            item='lockSize'
            handleToggle={this.handleToggle}
            data={uploadImage.size}
            handleChange={handleUploadImageSize}
            min={5}
            max={50}
          />
          
          {/*<IconToggle
            isLocked={this.state.positionLock}
            setStore={setUploadImageStore}
            item='lockPosition'
            handleToggle={this.handleToggle}
          />
          <span className="titleText">Lock position</span>*/}
        </div>
      </div>
    </div>
  }
}