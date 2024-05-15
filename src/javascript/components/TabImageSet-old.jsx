import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import TabImage from './TabImage.jsx'
// let imageLink

export default class TabButtonSet extends Component {
  constructor(props) {
    super(props)
  }


  // loadImage(text) {
  //   console.log('YO');
  //   const { collectionName } = this.props;

  //   // const text = options[key].text;
  //   const imageName = text.replace(/\s+/g, '') + '.jpg';

  //   import(`../../images/${collectionName}/${imageName}`)
  //     .then((image) => {
  //       console.log(image);
  //       imageLink = `../../images/${collectionName}/${imageName}`
  //     })

  //   // imageLink = `../../images/${collectionName}/${imageName}`

  //   //  Object.keys(options).forEach((key, i) => {
  //   //   const text = options[key].text;
  //   //   const imageName = text.replace(/\s+/g, '') + '.jpg';

  //   //   import(`../../images/${collectionName}/${imageName}`)
  //   //     .then((image) => {
  //   //       console.log(image);
  //   //       imageLink = image
  //   //     })

  //   //  })

  //   // import(`../../images/noise/${imageName}.jpg`)
  //   //   .then((image) => {
  //   //     this.setState({ imageSrc: image.default });
  //   //   })
  //   //   .catch((error) => {
  //   //     console.error('Error loading image:', error);
  //   //   });
  // }

  render() {
    const { options, value, handleClick } = this.props

    // console.log('TABIMAGE VALUE', value);

    const buttonElements = []

    Object.keys(options).forEach((key, i) => {

      const text = options[key].text;
      const imageName = text.replace(/\s+/g, '') + '.jpg';

      let imageLink = `'../../images/${collectionName}/${imageName}'`;

      
      buttonElements.push(
        <TabImage
          text={text}
          isOn={key === value}
          handleClick={() => handleClick(key)}
          key={i}
          imageLink={imageLink}
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