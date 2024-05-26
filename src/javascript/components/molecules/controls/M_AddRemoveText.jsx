import React, { PureComponent } from 'react'

import TextArea from '../../TextArea.jsx'

export default class M_AddRemoveText extends PureComponent {
  constructor(props) {
    super(props)

    this.state= {
      textAreas: [{ value: this.props.text }]
    }
  }

  handleTextAreaChange = (event, index) => {

    const { textAreas } = this.state;
    const { value } = event.target;
    const updatedTextAreas = [...textAreas]

    updatedTextAreas[index] = { ...updatedTextAreas[index], value: value }
    
    this.setState({
      textAreas: updatedTextAreas
    });
    
    this.props.setStore('textarea', updatedTextAreas)
  }

  handleRemoveText = (index) => {
    const { textAreas } = this.state
    const updatedTextAreas = [...textAreas]

    updatedTextAreas.splice(index, 1)

    this.setState({
      textAreas: updatedTextAreas
    })

    this.props.setStore('textarea', updatedTextAreas)
  }

  handleAddText = () => {
    const { textAreas } = this.state;

    if (textAreas.length < 6) {
      this.setState({
        textAreas: [...textAreas, { value: 'New text' }]
      });
    }
  }

  render() {
    const { textAreas } = this.state

    return <div className='M_AddRemoveText'>

      <div className='inputStack'>
        {textAreas.map((textArea, index) => (
          <div key={index} className='flexRow'>
            <TextArea
              className='textarea'
              rows={3}
              cols={40}
              value={textArea.value}
              onChange={(event) => this.handleTextAreaChange(event, index)}
            />
            <div className="btn--secondary" onClick={() => this.handleRemoveText(index)}>Remove</div>
          </div>
        ))}
      </div>
      <div className="btn--secondary" onClick={this.handleAddText}>Add text</div>
    </div>
  }
}
