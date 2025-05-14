import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import M_Control from '../controls/M_Control.jsx'
import A_Text from '../../ATOMS/A_Text.jsx'
import M_FileUpload from '../controls/M_FileUpload.jsx'

export default class M_UploadImageContent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sizeLock: this.props.uploadImage.sizeLock,
      opacityLock: this.props.uploadImage.opacityLock,
      positionLock: this.props.uploadImage.positionLock,
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
    if (item == 'lockPosition') {
      setStore(item, !this.state.positionLock)
      this.setState({
        positionLock: !this.state.positionLock
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
      handleRandomPosition,
      setUploadImageStore
    } = this.props

    return <div className="upload-image-content">
      <div className="content-row">
        <div className="content-column">
          {/*<M_Control
            orientation="row"
            controlType='FileUpload'
            hasTitle={true}
            title='Upload your logo or sticker'
            handleFileChange={this.handleWrappedFileChange}
            />*/}
          <div className='module-control row'>
            <A_Text
              text="Upload your logo or sticker"
              style='title-text'
              />
            <M_FileUpload
              handleFileChange={this.handleWrappedFileChange}
              //handleFileChange={this.props.handleFileChange}
            />
          </div>

        </div>
        
        {this.state.hasUploadedImage && (
          <div className="content-column">
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

            <M_Control
              orientation="row"
              hasTitle={true}
              title='Position'
              isLocked={this.state.positionLock}
              setStore={setUploadImageStore}
              item='lockPosition'
              handleToggle={this.handleToggle}
            />
          </div>
        )}
      </div>
    </div>
  }
}