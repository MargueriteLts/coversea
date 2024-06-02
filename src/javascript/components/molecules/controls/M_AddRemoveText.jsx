import React, { PureComponent } from 'react'

import TextArea from '../../TextArea.jsx'
import A_IconButton from '../../buttons/A_IconButton.jsx'

export default class M_AddRemoveText extends PureComponent {
  constructor(props) {
    super(props)

    this.state= {
      textAreas: this.props.text
    }

    console.log('this props', this.props.text);
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
    return <div className='M_AddRemoveText'>

      <div className='inputStack'>

        {this.state.textAreas.map((textArea, index) => (
          <div key={index} className='removableInput'>
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
              icon='minus'
            />
          </div>
        ))}
      </div>
      
      {this.state.textAreas.length < 6 ?
        <A_IconButton
          onClick={this.handleAddText}
          size='normal'
          style='filled'
          icon='plus'
        />
      : null}
    </div>
  }
}
