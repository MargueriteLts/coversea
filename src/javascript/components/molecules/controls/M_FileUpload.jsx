import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export default class M_FileUpload extends Component {
  constructor(props) {
    super(props)
    this.fileInputRef = React.createRef();
  }

  handleClick = () => {
    this.fileInputRef.current.click();
  }

  render() {
    const { handleFileChange } = this.props;

    return (
      <div className="M_FileUpload">
        <input 
          type="file" 
          accept="image/*" 
          style={{ display: 'none' }}
          ref={this.fileInputRef}
          onChange={handleFileChange} 
        />
        <div 
          className="upload-button-container"
          onClick={this.handleClick}
        >
          <div className="upload-button">
            <div className="upload-icon"></div>
            <div className="upload-text">jpg/png</div>
          </div>
        </div>
      </div>
    )
  }
}