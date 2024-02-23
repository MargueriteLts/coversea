import React, { Component } from 'react'
// import SC_ToggleButton from './SC_ToggleButton.jsx'
import SC_Button from './SC_Button.jsx'
import MyInput from './MyInput.jsx'
// import html2canvas from "html2canvas";
import { generateHash } from './utilities.js'

export default class Container extends Component {
  constructor(props) {
    super(props)

    const { resetDraw, fullRandom, resetColor, resetShapes, resetCircle, resetShoes, phrase } = props

    this.state = {
      resetDraw,
      fullRandom,
      resetColor,
      resetShapes,
      resetCircle,
      resetShoes,
      phrase,
      myArray : phrase,
      isMainOpen : true
    }
  }

  componentDidMount() {
    this.props.initSketch('sketch', 'sketch2')
  }

  ////////Render bouton reset
  // renderResetButton = () => {
  //   const { resetDraw } = this.state
  //   return (
  //     <div className="interface">
  //       <SC_ToggleButton
  //         text="Reset design"
  //         isOn={resetDraw}
  //         handleClick={this.handleResetAction}
  //       />
  //     </div>
  //   )
  // }

  /////Action bouton reset
  handleResetAction = () => {
    const { setStoreReset } = this.props
    const { resetDraw } = this.state
    setStoreReset(!resetDraw)
    this.coverLetters()


    this.setState({
      resetDraw: resetDraw
    })
  }

  /////Action toggle full random
  handleToggleRandom = () => {
    const { setStoreFullRandom } = this.props
    const { fullRandom } = this.state
    setStoreFullRandom(!fullRandom)

    this.setState({
      fullRandom: !fullRandom
    })
  }

  /////Render choices buttons
  // renderUIResetChoices = () => {
  //   const { resetColor, resetShapes, resetCircle, resetShoes } = this.state

  //   return (
  //     <div className="interface">
  //       <SC_ToggleButton
  //         text="Reset Color"
  //         isOn={resetColor}
  //         handleClick={this.handleResetColor}
  //       />
  //       <SC_ToggleButton
  //         text="Reset Shapes"
  //         isOn={resetShapes}
  //         handleClick={this.handleResetShapes}
  //       />
  //       <SC_ToggleButton
  //         text="Reset Circle"
  //         isOn={resetCircle}
  //         handleClick={this.handleResetCircle}
  //       />
  //       {/* <SC_ToggleButton
  //         text="Reset Shoes"
  //         isOn={resetShoes}
  //         handleClick={this.handleResetShoes}
  //       /> */}
  //     </div>
  //   )
  // }

  handleResetColor = () => {
    const { setStoreResetColor } = this.props
    const { resetColor } = this.state
    setStoreResetColor(!resetColor)

    this.setState({
      resetColor: resetColor
    })
  }

  handleResetShapes = () => {
    const { setStoreResetShapes } = this.props
    const { resetShapes } = this.state
    setStoreResetShapes(!resetShapes)

    this.setState({
      resetShapes: resetShapes
    })
  }

  handleResetCircle = () => {
    const { setStoreResetCircle } = this.props
    const { resetCircle } = this.state
    setStoreResetCircle(!resetCircle)

    this.setState({
      resetCircle: resetCircle
    })
  }

  // handleResetShoes = () => {
  //   const { setStoreResetShoes } = this.props
  //   const { resetShoes } = this.state
  //   setStoreResetShoes(!resetShoes)

  //   this.setState({
  //     resetShoes: resetShoes
  //   })
  // }

  // handleResetTypefaces = () => {
  //   const { setStoreResetTypefaces } = this.props
  //   const { resetTypefaces } = this.state
  //   setStoreResetTypefaces(!resetTypefaces)

  //   this.setState({
  //     resetTypefaces: resetTypefaces
  //   })
  // }

  ///////////////////////////////////

  handleChange = (event) => {
    // this.coverLetters(event.target.value)
    this.coverLetters(event.target.value)
    this.setState({
      phrase : event.target.value
    })
  }

  //////////////////////////////////////////////////

  coverLetters = () => {
    const { setStoreMyArray } = this.props
    const { phrase } = this.state
    let { myArray } = this.state
    const typefaces = ["poppins", "fasthand", "NHU", "IMVCR", "STATION", "ESENIN"]

    myArray = phrase.split(" ").map((word, index) => <span className="word" key={index}> {word.split("").map((letter, index) => <span className={typefaces[Math.floor(Math.random() * typefaces.length)]} key={index}> {letter} </span>)} </span>)

    setStoreMyArray(myArray)

    this.setState({
      myArray : myArray
    })
  }

  ////////////////////

  
//  DownloadImage = () => {
//     html2canvas(document.getElementById("cover")).then(function (canvas) {
//       let a = document.createElement("a");
//       a.href = canvas.toDataURL("image/jpeg");
//       a.download = `Cover-41-${generateHash()}.jpeg`;
//       document.body.appendChild(a);
//       a.click();
//       document.body.removeChild(a);
//     });
//   };



  ////////////////////////////////////////////////////////////////

  closeMain = () => {
    this.setState({
      isMainOpen : false
    })
  }

  renderMain = () => {
    return (
      <div className='Main'>
        <div className='Title'>ГЕНЕРАТОР МУЗЫКАЛЬНЫХ ОБЛОЖЕК</div>
        {/* <div className='Array'>{myArray}</div> */}
        <SC_Button
          text="Start editing"
          className="StartButton"
          handleClick={this.closeMain}
        />
        <div className="sketch" id="sketch2"></div>
      </div>
    )
  }

  render() {
    const { fullRandom, phrase, myArray, isMainOpen } = this.state

    return (
      <div className="Container">
        { isMainOpen ? this.renderMain() : ''}
        <div className="Editor">
          <div className="CoverFrame" id="cover">
            <div className="sketch" id="sketch"></div>
            <div className='wrapper'>{myArray}</div>
          </div>
          <div className="UIframe">
            <MyInput
              handleChange={this.handleChange}
              value={phrase}
            />
            {/* <div className="interface">
              <SC_ToggleButton
                text="Toggle Full Random"
                isOn={fullRandom}
                handleClick={this.handleToggleRandom}
              />
              <SC_Button
                text="Download Cover"
                className="SaveButton"
                handleClick={this.DownloadImage}
              />
            </div> */}
            {/* {fullRandom ? this.renderResetButton() : this.renderUIResetChoices() } */}
            { this.renderUIResetChoices() }
          </div>
        </div>
      </div>
    )
  }
}