import React, { PureComponent } from 'react'

import TextArea from '../../TextArea.jsx'
import A_IconButton from '../../buttons/A_IconButton.jsx'

export default class M_AddRemoveText extends PureComponent {
  constructor(props) {
    super(props)

    this.state= {
      textAreas: this.props.text
    }

  }

  handleTextAreaChange = (event, index) => {

    const { textAreas } = this.state;

    const { value } = event.target;

    const updatedTextAreas = [...textAreas]
    updatedTextAreas[index] = value;
    
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
     const updatedTextAreas = [...textAreas, 'Your text' ]
    
    this.setState({
      textAreas: updatedTextAreas
    });

    this.props.setStore('textarea', updatedTextAreas)
  }

  render() {
    return <div className='text-manager'>

      <div className='text-manager__input-stack'>

        {this.state.textAreas.map((textArea, index) => (
          <div key={index} className='text-manager__input-stack-input'>
            <TextArea
              className='textarea'
              rows={3}
              cols={40}
              value={textArea}
              onChange={(event) => this.handleTextAreaChange(event, index)}
            />

            <A_IconButton
              onClick={() => this.handleRemoveText(index)}
              size='normal'
              style='filled'
              icon='icon--minus'
            />
          </div>
        ))}
      </div>
      
      {this.state.textAreas.length < 6 ?
        <A_IconButton
          onClick={this.handleAddText}
          size='normal'
          style='filled'
          icon='icon--plus'
        />
      : null}
    </div>
  }
}
