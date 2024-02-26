import { sample, getRandomArbitrary } from './utilities'

let backgroundValue = {
  sliderValue: 0,
  color: []
}

let particlesValue = {
  sliderValue: 0,
  particles: []
}

let shapesValue = 36

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

function getConfig() {
  return config
}

function setConfig(nextConfig) {
  config = nextConfig
}

export { getBackgroundValue, setBackgroundValue, getShapesValue, setShapesValue, getParticlesValue, setParticlesValue, getConfig, setConfig }