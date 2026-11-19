import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import M_Control from '../controls/M_Control.jsx'
import A_Text from '../../ATOMS/A_Text.jsx'
import M_FileUpload from '../controls/M_FileUpload.jsx'
import A_Button from '../../buttons/A_Button.jsx'

export default class M_UploadImageContent extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sizeLock: this.props.uploadImage.sizeLock || false,
      opacityLock: this.props.uploadImage.opacityLock || false
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

  handleDeleteImage = () => {
    // Clear the image from the store
    this.props.setUploadImageStore('deleteImage', null);
    
    // Re-render the module, whose button, Delete and sliders follow the store
    this.setState({});
    
    // Trigger redraw to clear from canvas
    if (window.triggerRedraw) {
      window.triggerRedraw();
    }
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

    // The store holds the image once it has loaded; the button preview, Delete and the sliders follow it.
    // The upload itself loads the image, and the sketch redraws once it's ready.
    const hasUploadedImage = !!uploadImage.uploadedImage

    return <div className="upload-image-content">
      <div className="content-row">
        <div className="content-column">
          <div className='module-control row'>
            <A_Text
              text="Upload your logo or sticker"
              style='title-text'
            />
            <M_FileUpload
              previewUrl={uploadImage.uploadedImagePreview}
              handleFileChange={handleFileChange}
            />
            {hasUploadedImage && (
              <A_Button
                onClick={this.handleDeleteImage}
                text='Delete'
                type='secondary'
                hasIcon={false}
              />
            )}
          </div>
        </div>
        
        {hasUploadedImage && (
          <div className="content-column">
            <M_Control
              orientation="row"
              controlType='Slider'
              hasTitle={true}
              title='Size'
              hasLock={true}
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
              hasLock={true}
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