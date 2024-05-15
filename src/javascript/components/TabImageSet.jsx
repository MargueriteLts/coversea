import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import TabImage from './TabImage.jsx'

export default class TabButtonSet extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { options, value, handleClick, collection } = this.props

    const buttonElements = []

    
    Object.keys(options).forEach((key, i) => {
      
      const text = options[key].text;
      const matchingKey = Object.keys(collection).find(key => key.startsWith(text));
      const backgroundImage = collection[matchingKey]
      
      buttonElements.push(
        <TabImage
          text={text}
          isOn={key === value}
          handleClick={() => handleClick(key)}
          key={i}
          imageLink={backgroundImage}
        />
      )
    })

    return (
      <div className="TabImageSet">
        {buttonElements}
      </div>
    )
  }
}