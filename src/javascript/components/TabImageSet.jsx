import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import TabImage from './TabImage.jsx'

export default class TabButtonSet extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { options, value, handleClick, tabBackgrounds } = this.props

    const buttonElements = []
    
    Object.keys(options).forEach((key, i) => {
      
      const text = options[key].text;

      const matchingKey = Object.keys(tabBackgrounds).find(key => key.startsWith(i));

      const backgroundImage = tabBackgrounds[matchingKey]
      
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