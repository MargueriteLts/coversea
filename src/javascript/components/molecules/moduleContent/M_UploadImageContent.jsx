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
      opacityLock: this.props.uploadImage.opacityLock || false,
      hasUploadedImage: false
    }
  }

  componentDidMount() {
    // Check if there's already an uploaded image when component mounts
    if (this.props.uploadImage && this.props.uploadImage.uploadedImage) {
      this.setState({ hasUploadedImage: true });
    }
  }

  componentDidUpdate(prevProps) {
    // Update hasUploadedImage if the uploadedImage prop changes
    if (prevProps.uploadImage.uploadedImage !== this.props.uploadImage.uploadedImage) {
      this.setState({ 
        hasUploadedImage: !!this.props.uploadImage.uploadedImage 
      });
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

  handleImageFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      // Set the state to show we have an image
      this.setState({ hasUploadedImage: true });
      
      // Call the original handler
      this.props.handleFileChange(e);
      
      // Trigger redraw to clear from canvas
      if (window.triggerRedraw) {
        window.triggerRedraw();
      }
    }
  }

  handleDeleteImage = () => {
    // Clear the image from the store
    this.props.setUploadImageStore('deleteImage', null);
    
    // Update local state
    this.setState({ hasUploadedImage: false });
    
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
      setUploadImageStore
    } = this.props

    return <div className="upload-image-content">
      <div className="content-row">
        <div className="content-column">
          <div className='module-control row'>
            <A_Text
              text="Upload your logo or sticker"
              style='title-text'
            />
            <M_FileUpload
              handleFileChange={this.handleImageFileChange}
            />
            {this.state.hasUploadedImage && (
              <A_Button
                onClick={this.handleDeleteImage}
                text='Delete'
                type='secondary'
                hasIcon={false}
              />
            )}
          </div>
        </div>
        
        {this.state.hasUploadedImage && (
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