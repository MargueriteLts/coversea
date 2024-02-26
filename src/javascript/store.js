import { sample, getRandomArbitrary } from './utilities'

let backgroundValue = {
  sliderValue: 0,
  color: []
  // color: {}
  // color: [0, 0, 0]
}

let particlesValue = {
  sliderValue: 0,
  particles: []
}

let shapesValue = 2
// let shapesValue = {
//   sliderValue: 0
// }

let config = {}

///////////////////////////////////////////////////////////////////// BACKGROUND

function getBackgroundValue() {
  return backgroundValue
}

function setBackgroundValue(nextValue) {
  const color = []

  for (let index = 0; index < nextValue; index++) {
    color.push([
      getRandomArbitrary(0, 255),
      getRandomArbitrary(0, 255),
      getRandomArbitrary(0, 255)
    ])
  }

  backgroundValue.color = color
  backgroundValue.sliderValue = nextValue

  // let r = 0
  // let g = 0
  // let b = 0
  // const color = {r, g ,b}
  // const color = [0, 0, 0]
  // for (let index = 0; index < nextValue; index++) {
  // }
}

///////////////////////////////////////////////////////////////////// SHAPES

function getShapesValue() {
  return shapesValue
}

function setShapesValue(nextValue) {
  shapesValue = nextValue
  // shapesValue.sliderValue = nextValue
}

///////////////////////////////////////////////////////////////////// PARTICLES

function getParticlesValue() {
  return particlesValue
}

function setParticlesValue(nextValue) {
  const particles = []

  for (let index = 0; index < nextValue; index++) {
    particles.push([
      getRandomArbitrary(0, 600),
      getRandomArbitrary(0, 600),
      getRandomArbitrary(2, 20)
    ])
  }

  particlesValue.sliderValue = nextValue
  particlesValue.particles = particles
}

function getConfig() {
  return config
}

function setConfig(nextConfig) {
  config = nextConfig
}

export { getBackgroundValue, setBackgroundValue, getShapesValue, setShapesValue, getParticlesValue, setParticlesValue, getConfig, setConfig }