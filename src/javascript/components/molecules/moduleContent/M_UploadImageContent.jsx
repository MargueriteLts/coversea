import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import M_Control from '../controls/M_Control.jsx'

export default class M_UploadImageContent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sizeLock: this.props.uploadImage.sizeLock,
      opacityLock: this.props.uploadImage.opacityLock,
      hasUploadedImage: false
    }
  }

  componentDidMount() {
    // Check if there's already an uploaded image when component mounts
    if (this.props.uploadImage && this.props.uploadImage.uploadedImage) {
      this.setState({ hasUploadedImage: true });
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
  }

  handleWrappedFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      // Set the state to show we have an image
      this.setState({ hasUploadedImage: true });
      
      // Call the original handler
      this.props.handleFileChange(e);
    }
  }

  //////////////////////////////////////////////////////// RENDER
  
  render() {
    const {
      uploadImage,
      handleUploadImageSize,
      handleUploadImageOpacity,
      setUploadImageStore
    } = this.props

    return <div className="M_UploadImageContent">
      <div className="content_row">
        <div className="content_Column">
          <M_Control
            orientation="row"
            controlType='FileUpload'
            hasTitle={true}
            title='Upload Image'
            handleFileChange={this.handleWrappedFileChange}
          />
        </div>
        
        {this.state.hasUploadedImage && (
          <div className="content_Column">
            <M_Control
              orientation="row"
              controlType='Slider'
              hasTitle={true}
              title='Size'
              isLocked={this.state.sizeLock}
              setStore={setUploadImageStore}
              item='lockSize'
              handleToggle={this.handleToggle}
              data={uploadImage.size}
              handleChange={handleUploadImageSize}
              min={5}
              max={50}
            />

            <M_Control
              orientation="row"
              controlType='SliderOpacity'
              hasTitle={true}
              title='Opacity'
              isLocked={this.state.opacityLock}
              setStore={setUploadImageStore}
              item='lockOpacity'
              handleToggle={this.handleToggle}
              data={uploadImage.opacity}
              handleChange={handleUploadImageOpacity}
            />
          </div>
        )}
      </div>
    </div>
  }
}