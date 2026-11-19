import React, { Component } from 'react'
import ReactDOM from 'react-dom'

// Upload button. Its background shows `previewUrl`, the preview the store keeps next to the uploaded image
// (null when there is none): it goes away when the image is deleted and is still there when the module is reopened.
export default class M_FileUpload extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isHovering: false
    };
    this.fileInputRef = React.createRef();
  }

  handleClick = () => {
    this.fileInputRef.current.click();
  }

  handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      // Pass the file to the parent component
      this.props.handleFileChange(e);

      // Empty the input once the file is passed on, so that picking the same file again
      // (after Delete, for instance) still counts as a change
      e.target.value = '';
    }
  }

  handleMouseEnter = () => {
    this.setState({ isHovering: true });
  }

  handleMouseLeave = () => {
    this.setState({ isHovering: false });
  }

  render() {
    const { previewUrl } = this.props;
    const { isHovering } = this.state;

    const buttonStyle = previewUrl ? {
      backgroundImage: `url(${previewUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    } : {};

    return (
      <div className="file-upload">
        <input 
          type="file" 
          accept="image/*" 
          style={{ display: 'none' }}
          ref={this.fileInputRef}
          onChange={this.handleFileChange} 
        />
        <div 
          className={`upload-button-container ${previewUrl && isHovering ? 'upload-button-container--dimmed' : ''}`}
          onClick={this.handleClick}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          style={buttonStyle}
        >
          {(!previewUrl || (previewUrl && isHovering)) && (
            <div className="upload-button">
              <div className="upload-button__icon"></div>
              <div className="upload-button__text">jpg/png</div>
            </div>
          )}
        </div>
      </div>
    )
  }
}