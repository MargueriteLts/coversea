import { sample, getRandomArbitrary, importAll } from './utilities'

let backgroundValue = {
  sliderValue: 0,
  color: []
}

let shapesValue = 36

let particlesValue = {
  sliderValue: 0,
  particles: []
}

const images = importAll(
  require.context('../images', false, /\.(png|jpe?g|svg)$/)
)

let imageValue = {
  images: images,
  current: sample(Object.keys(images))
}

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
      getRandomArbitrary(1, 30)
    ])
  }

  particlesValue.sliderValue = nextValue
  particlesValue.particles = particles
}

///////////////////////////////////////////////////////////////////// PARTICLES

function getImageValue() {
  return imageValue
}

function setImageValue() {
  imageValue.current = sample(Object.keys(images))
}

///////////////////////////////////////////////////////////////////// CONFIG

function getConfig() {
  return config
}

function setConfig(nextConfig) {
  config = nextConfig
}

///////////////////////////////////////////////////////////////////// EXPORT

export {
  getBackgroundValue,
  setBackgroundValue,
  getShapesValue,
  setShapesValue,
  getParticlesValue,
  setParticlesValue,
  getImageValue,
  setImageValue,
  getConfig,
  setConfig
}