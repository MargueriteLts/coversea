import { sample, getRandomArbitrary } from './utilities'
let backgroundValue = 0
let particlesValue = {
  sliderValue: 0,
  particles: []
}
let shapesValue = 0
let config = {}

function getBackgroundValue() {
  return backgroundValue
}

function setBackgroundValue(nextValue) {
  backgroundValue = nextValue
}

function getShapesValue() {
  return shapesValue
}

function setShapesValue(nextValue) {
  shapesValue = nextValue
}

function getParticlesValue() {
  return particlesValue
}

function setParticlesValue(nextValue) {
  const particles = []

  for (let index = 0; index < nextValue; index++) {
    particles.push([
      getRandomArbitrary(0, 255),
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