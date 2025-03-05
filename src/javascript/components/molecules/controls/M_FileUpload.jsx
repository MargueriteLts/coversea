import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export default class M_FileUpload extends Component {
  constructor(props) {
    super(props)
    this.state = {
      previewUrl: null,
      isHovering: false
    };
    this.fileInputRef = React.createRef();
  }

  handleClick = () => {
    this.fileInputRef.current.click();
  }

  handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Create a preview URL for the image
      const reader = new FileReader();
      reader.onload = (event) => {
        this.setState({ previewUrl: event.target.result });
      };
      reader.readAsDataURL(file);
      
      // Pass the file to the parent component
      this.props.handleFileChange(e);
    }
  }

  handleMouseEnter = () => {
    this.setState({ isHovering: true });
  }

  handleMouseLeave = () => {
    this.setState({ isHovering: false });
  }

  render() {
    const { previewUrl, isHovering } = this.state;
    
    const buttonStyle = previewUrl ? {
      backgroundImage: `url(${previewUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    } : {};
    
    return (
      <div className="M_FileUpload">
        <input 
          type="file" 
          accept="image/*" 
          style={{ display: 'none' }}
          ref={this.fileInputRef}
          onChange={this.handleFileChange} 
        />
        <div 
          className={`upload-button-container ${previewUrl && isHovering ? 'dimmed' : ''}`}
          onClick={this.handleClick}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
          style={buttonStyle}
        >
          {(!previewUrl || (previewUrl && isHovering)) && (
            <div className="upload-button">
              <div className="upload-icon"></div>
              <div className="upload-text">jpg/png</div>
            </div>
          )}
        </div>
      </div>
    )
  }
}