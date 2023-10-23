import p5 from 'p5'
import { sample, getRandomArbitrary } from './utilities'
import { getStoreReset, setStoreReset, getStoreResetColor, setStoreResetColor, getStoreResetShapes, setStoreResetShapes, getStoreResetCircle, setStoreResetCircle, setStorePhrase, getStoreResetShoes, setStoreResetShoes } from './store'

import ballerines from '../assets/images/ballerines.png'
import bequille from '../assets/images/bequille.png'
import chaussette from '../assets/images/chaussette.png'
import claquettes from '../assets/images/claquettes.png'
import costume from '../assets/images/costume.png'
import drmartens from '../assets/images/drmartens.png'
import escarpin from '../assets/images/escarpin.png'
import jordans from '../assets/images/jordans.png'
import mocassins from '../assets/images/mocassins.png'
import newbalance from '../assets/images/newbalance.png'
import pied from '../assets/images/pied.png'
import salon from '../assets/images/salon.png'
import stansmith from '../assets/images/stansmith.png'
import tn from '../assets/images/tn.png'
import vans from '../assets/images/vans.png'
import disc from '../assets/images/disc.png'

let canvasContainerId = ''
let canvasContainerId2 = ''

let canvasSize

function canvasSizeVariant(csize) {
  // let canvasSize
  switch (csize) {
    case 'big':
      canvasSize = 2000
      break;
    case 'small':
      canvasSize = 500
      break;

    default:
      break;
  }
}

let img1
let img2
let img3
let img4
let img5
let img6
let img7
let img8
let img9
let img10
let img11
let img12
let img13
let img14
let img15

let imgDisc

let r = 0
let g = 0
let b = 0

let shoes
let bgTypes


/////////////////////////////////////////////////////

function drawShapes(p) {
  const xCenter = canvasSize / 2
  const yCenter = canvasSize / 2
  //w = width of center circle
  const w = getRandomArbitrary(10, 60) * canvasSize / 100
  
  //Need optimisation here
  const paddingW = 3 * canvasSize / 100
  const paddingH = 5 * canvasSize / 100
  
  const wCircle = w - paddingW
  
  const xCenterER1 = xCenter + (w / 2) + (6,5 * canvasSize / 100)
  const xCenterEL1 = xCenter - (w / 2) - (6,5 * canvasSize / 100)
  const wEV1 = (13 * canvasSize / 100) - paddingW
  const hEV1 = w + (26 * canvasSize / 100) - paddingH
  
  const xCenterER2 = xCenterER1 + ((canvasSize - w) / 4)
  const xCenterEL2 = canvasSize - xCenterER2
  const wEV2 = ((canvasSize - w) / 2) - (13 * canvasSize / 100) - paddingW
  const hEV2 = canvasSize - paddingH
  
  p.ellipse(xCenter, yCenter, wCircle)
  
  p.ellipse(xCenterER1, yCenter, wEV1, hEV1)
  p.ellipse(xCenterEL1, yCenter, wEV1, hEV1)
  p.ellipse(xCenterER2, yCenter, wEV2, hEV2)
  p.ellipse(xCenterEL2, yCenter, wEV2, hEV2)
  
  p.ellipse(yCenter, xCenterER1, wCircle, wEV1)
  p.ellipse(yCenter, xCenterEL1, wCircle, wEV1)
  p.ellipse(yCenter, xCenterER2, hEV1, wEV2)
  p.ellipse(yCenter, xCenterEL2, hEV1, wEV2)
}

////////////////////////////////////////////////////////////////

function drawBG(p) {
  p.background(0)

  r = getRandomArbitrary(0, 255)
  g = getRandomArbitrary(0, 255)
  b = getRandomArbitrary(0, 255)

  const xCenter = canvasSize / 2
  const yCenter = canvasSize / 2

  const bgCircleWidth = getRandomArbitrary((canvasSize - 250), (canvasSize - 30))
  
  p.fill(r, g, b)
  
  bgTypes = ['color', 'shapes', 'circle', 'disc']
  const bg = sample(bgTypes)
  switch (bg) {
    case 'color':
      p.background(r, g, b)
      break;
    case 'shapes':
      drawShapes(p)
      break;
    case 'circle':
      p.ellipse(xCenter, yCenter, bgCircleWidth)
      break;
    case 'disc':
      p.background(0)
      p.image(imgDisc, 0, 0, canvasSize, canvasSize)
      break;

    default:
      break;
  }
}

function drawAll(p) {
  drawBG(p)

  // shoes = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15]
  // const shoeImg = sample(shoes)
  // p.image(shoeImg, 0, 0, canvasSize, canvasSize)
}

/////////////////////////////////

function bgColor(p) {
  r = getRandomArbitrary(0, 255)
  g = getRandomArbitrary(0, 255)
  b = getRandomArbitrary(0, 255)

  p.background(r, g, b)
}

/////
function bgShapes(p) {
  // canvasSizeVariant('big')
  r = getRandomArbitrary(0, 255)
  g = getRandomArbitrary(0, 255)
  b = getRandomArbitrary(0, 255)
  
  p.background(0)
  p.fill(r, g, b)

  drawShapes(p)
}

/////
function bgCircle(p) {
  // canvasSizeVariant('big')
  const xCenter = canvasSize / 2
  const yCenter = canvasSize / 2
  const bgCircleWidth = getRandomArbitrary(100, (canvasSize - (30 * canvasSize / 100)))

  r = getRandomArbitrary(0, 255)
  g = getRandomArbitrary(0, 255)
  b = getRandomArbitrary(0, 255)
  
  p.background(0)
  p.fill(r, g, b)
  p.ellipse(xCenter, yCenter, bgCircleWidth)
}

/////
// function bgDisc(p) {
//   p.background(0)
//   p.image(imgDisc, 0, 0)
// }

/////
function shoeImg(p) {
  shoes = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11, img12, img13, img14, img15]
  const shoeImg = sample(shoes)
  p.image(shoeImg, 0, 0, canvasSize, canvasSize)
}

//////////////////////////////////////////////////

function sketch(p) {
  canvasSizeVariant('big')
  // let shoeImgConst
  // let bg

  p.preload = () => {
    img1 = p.loadImage(ballerines);
    img2 = p.loadImage(bequille);
    img3 = p.loadImage(chaussette);
    img4 = p.loadImage(claquettes);
    img5 = p.loadImage(costume);
    img6 = p.loadImage(drmartens);
    img7 = p.loadImage(escarpin);
    img8 = p.loadImage(jordans);
    img9 = p.loadImage(mocassins);
    img10 = p.loadImage(newbalance);
    img11= p.loadImage(pied);
    img12 = p.loadImage(salon);
    img13 = p.loadImage(stansmith);
    img14 = p.loadImage(tn);
    img15 = p.loadImage(vans);
    imgDisc = p.loadImage(disc);
  }
  
  p.setup = () => {
    canvasSizeVariant('big')
    const canvas = p.createCanvas(canvasSize, canvasSize)
    canvas.parent(canvasContainerId)

    drawAll(p)
    // shoeImg(p)
    // getStoreResetShoes()
    // shoeImgConst = shoeImg(p)
    // bg = drawAll(p)
    // setStoreResetShoes()
  }
  
  p.draw = () => {
    canvasSizeVariant('big')
    if (getStoreReset()) {
      drawAll(p)
      setStoreReset()
      // bg = drawAll(p)
    } else if (getStoreResetColor()) {
      // shoeImgConst
      bgColor(p)
      // shoeImg(p)
      // bg = bgColor(p)
      setStoreResetColor()
    } else if (getStoreResetShapes()) {
      // shoeImgConst
      bgShapes(p)
      // shoeImg(p)
      // bg = bgShapes(p)
      setStoreResetShapes()
    } else if (getStoreResetCircle()) {
      // shoeImgConst
      bgCircle(p)
      // shoeImg(p)
      // bg = bgShapes(p)
      setStoreResetCircle()
    } else if (getStoreResetShoes()) {
      shoeImg(p)
      drawAll(p)
      setStoreResetShoes()
      // shoeImgConst = shoeImg(p)
      // bg
    }
    shoeImg(p)
  }
}

///////////////////////////////////////////////////

function main(p) {
  canvasSizeVariant('small')

  p.preload = () => {
    img1 = p.loadImage(ballerines);
    img2 = p.loadImage(bequille);
    img3 = p.loadImage(chaussette);
    img4 = p.loadImage(claquettes);
    img5 = p.loadImage(costume);
    img6 = p.loadImage(drmartens);
    img7 = p.loadImage(escarpin);
    img8 = p.loadImage(jordans);
    img9 = p.loadImage(mocassins);
    img10 = p.loadImage(newbalance);
    img11= p.loadImage(pied);
    img12 = p.loadImage(salon);
    img13 = p.loadImage(stansmith);
    img14 = p.loadImage(tn);
    img15 = p.loadImage(vans);
    imgDisc = p.loadImage(disc);
  }
  
  p.setup = () => {
    canvasSizeVariant('small')
    const canvas = p.createCanvas(canvasSize, canvasSize)
    canvas.parent(canvasContainerId2)
    p.frameRate(getRandomArbitrary(1, 10))
  }

  p.draw = () => {
    canvasSizeVariant('small')
    drawAll(p)

    const strings = ['Dance all Night', 'Never Stop Dancing', 'Music is  life']
    const string = sample(strings)
    setStorePhrase(string)
  }
}

function initSketch(id, id2) {
  canvasContainerId = id
  canvasContainerId2 = id2

  new p5(sketch)
  new p5(main)
  new p5(main)
  new p5(main)
  new p5(main)
  new p5(main)
  new p5(main)
  new p5(main)
  // p5instance = new p5(sketch)
}

export { initSketch }