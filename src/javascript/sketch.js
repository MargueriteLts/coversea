import p5 from 'p5'

import {
  getModuleList,
  getShapesStore,
  getParticlesStore,
  getImageStore,
  getBackgroundStore,
  getBackgroundImageStore,
  getBlendStore,
  getVinylStore,
  getText1Store,
  getLinesStore,
  get3DStore
} from './store'

let moduleList = {}

let canvasContainerId = ''

let canvasSize
let parentDiv
let parentDivInfo
let parentDivWidth
let parentDivHeight

let imagesObj = {}

let imagesBgNC = {}
let imagesBgCars = {}
let imageBg

let imagesWholeVinyl = {}
let imagesLabelVinyl = {}
let imageVinyl

let fontEsenin

let graphics

let prevModule3DX;
let prevModule3DY;


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function drawModules(p) {

  /////////////////////////////////////////// MODULE BACKGROUND

  if (moduleList.includes('Background')) {
    const background = getBackgroundStore()

    if (background.bgTypes.includes('SolidColor') && background.currentBgType === 'SolidColor') {
      const plainColorBackground = background.preset.SolidColor.color

      p.background(
        plainColorBackground
      )
    } else if (background.bgTypes.includes('Gradient') && background.currentBgType === 'Gradient') {
      const color1 = background.preset.Gradient.color1
      const color2 = background.preset.Gradient.color2
      const angle = background.preset.Gradient.angle
      p.background(0)

      let c1 = p.color(color1)
      let c2 = p.color(color2)

      for (let i = 0; i <= canvasSize; i++) {
        let amt = p.map(i, 0, canvasSize, 0, 1)
        let c3 = p.lerpColor(c1, c2, amt)
        
        p.stroke(c3)
        if (angle == 'vertical') {
          p.line(0, i, canvasSize, i)
        }
        if (angle == 'horizontal') {
          p.line(i, 0, i, canvasSize)
        }
      }
    } else {
      p.background(0)
    }
  }

  /////////////////////////////////////////// MODULE BACKGROUNDIMAGE

  if (moduleList.includes('BackgroundImage')) {

    const backgroundImage = getBackgroundImageStore()

    let currentBgImg

    if (backgroundImage.collections.includes('NightClub') && backgroundImage.currentCollection === 'NightClub') {
      currentBgImg = backgroundImage.preset.NightClub.current
      imageBg = imagesBgNC[currentBgImg]
    } else if (backgroundImage.collections.includes('Cars') && backgroundImage.currentCollection === 'Cars') {
      currentBgImg = backgroundImage.preset.Cars.current
      imageBg = imagesBgCars[currentBgImg]
    }

    const opacity = backgroundImage.preset.sliderValue
    p.background(imageBg, opacity)
  }

  /////////////////////////////////////////// MODULE SHAPES

  if (moduleList.includes('Shapes')) {
    p.noStroke()

    const color = getShapesStore().settings.color
    p.fill(color)

    const Value = getShapesStore().settings.sliderValue
    const wValue = parseInt(Value)

    const xCenter = canvasSize / 2
    const yCenter = canvasSize / 2
    const w = wValue * canvasSize / 100
    
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

  /////////////////////////////////////////// MODULE PARTICLES

  if (moduleList.includes('Particles')) {
    const particles = getParticlesStore()

    for (let index = 0; index < particles.sliderValue; index++) {
      p.fill(255)
      p.ellipse (
        particles.particles[index][0],
        particles.particles[index][1],
        particles.particles[index][2],
      )
    }
  }

  /////////////////////////////////////////// MODULE BACKGROUNDIMAGE

  if (moduleList.includes('Vinyl')) {

    const vinyl = getVinylStore()

    let currentVinylImg

    if (vinyl.vinylTypes.includes('Whole') && vinyl.currentVinylType === 'Whole') {
      currentVinylImg = vinyl.preset.Whole.current
      imageVinyl = imagesWholeVinyl[currentVinylImg]
    } else if (vinyl.vinylTypes.includes('Label') && vinyl.currentVinylType === 'Label') {
      currentVinylImg = vinyl.preset.Label.current
      imageVinyl = imagesLabelVinyl[currentVinylImg]
    }

    let imageSize = vinyl.preset.sliderValue

    p.image(
      imageVinyl,
      (canvasSize - imageSize) / 2,
      (canvasSize - imageSize) / 2,
      imageSize,
      imageSize,
      0,
      0,
      imageVinyl.width,
      imageVinyl.height,
      p.CONTAIN
    );
  }

  /////////////////////////////////////////// MODULE IMAGE

  if (moduleList.includes('Image')) {
    const { current } = getImageStore()
    const image = imagesObj[current]

    p.image(
      image,
      (canvasSize - image.width / 2) / 2,
      (canvasSize - image.height / 2) / 2,
      image.width / 2,
      image.height / 2,
      0,
      0,
      image.width,
      image.height,
      p.CONTAIN
    )
  }

  /////////////////////////////////////////// MODULE lINES

  if (moduleList.includes('Lines')) {
    const lines = getLinesStore()

    p.stroke(lines.color)
    p.strokeWeight(lines.strokeWeight);
    for (let index = 0; index < lines.lines.length; index++) {
      p.line(lines.lines[index][0], lines.lines[index][1], lines.lines[index][2], lines.lines[index][3]);
    }
  }

  /////////////////////////////////////////// MODULE TEXT1

  if (moduleList.includes('Text1')) {
    const text1 = getText1Store()
    p.noStroke()
    p.fill(text1.color)
    p.textFont(fontEsenin, 100)
    p.textLeading(50)
    p.textAlign(p.CENTER, p.CENTER);
    p.text(text1.text, 0, 0, 600, 600)
    // let bbox = p.fontEsenin.textBounds(text1.text, 100, 100, 300, 300);
    // p.fill('white')
    // p.rect(bbox.x, bbox.y, bbox.w, bbox.h);
  }

  /////////////////////////////////////////// MODULE 3D

  if (moduleList.includes('Module3D')) {
    p.image(graphics, 0, 0)
    graphics.clear()
    const module3D = get3DStore()

    if (module3D.x !== prevModule3DX || module3D.y !== prevModule3DY) {
      graphics.rotateX(module3D.x);
      graphics.rotateY(module3D.y);
      
      prevModule3DX = module3D.x;
      prevModule3DY = module3D.y;
    }

    graphics.noStroke()
    graphics.directionalLight(189, 98, 189, 100, 0, 0)
    graphics.directionalLight(54, 98, 189, -100, 0, 0)
    graphics.fill(255)

    if (module3D.options.includes('Torus') && module3D.current3DType === 'Torus') {
      graphics.torus(30, 15, 50, 50);
    } else if (module3D.options.includes('Square') && module3D.current3DType === 'Square') {
      graphics.box(30, 15, 50, 50);
    }

  }

}

////////////////////////////////////////////////////////////////////////////         SKETCH


function sketch(p) {

  p.preload = () => {

    //////////////////////////////////////////////////// IMAGE OBJ

    if (moduleList.includes('Image')) {
      const imageFiles = getImageStore().images

      Object.keys(imageFiles).forEach((key) => {
        imagesObj = Object.assign({}, imagesObj, {
          [`${key}`]: p.loadImage(imageFiles[key])
        })
      })
    }

    //////////////////////////////////////////////////// IMAGE BG

    if (moduleList.includes('BackgroundImage')) {
      const backgroundImage = getBackgroundImageStore()

      if (backgroundImage.collections.includes('NightClub')) {
        const imageFiles1 = backgroundImage.preset.NightClub.images

        Object.keys(imageFiles1).forEach((key) => {
          imagesBgNC = Object.assign({}, imagesBgNC, {
            [`${key}`]: p.loadImage(imageFiles1[key])
          })
        })
      }
      if (backgroundImage.collections.includes('Cars')) {
        const imageFiles2 = backgroundImage.preset.Cars.images

        Object.keys(imageFiles2).forEach((key) => {
          imagesBgCars = Object.assign({}, imagesBgCars, {
            [`${key}`]: p.loadImage(imageFiles2[key])
          })
        })
      }
    }

    //////////////////////////////////////////////////// IMAGE VINYL

    if (moduleList.includes('Vinyl')) {
      const vinyl = getVinylStore()

      if (vinyl.vinylTypes.includes('Whole')) {
        const imageFiles = vinyl.preset.Whole.images

        Object.keys(imageFiles).forEach((key) => {
          imagesWholeVinyl = Object.assign({}, imagesWholeVinyl, {
            [`${key}`]: p.loadImage(imageFiles[key])
          })
        })
      }
      if (vinyl.vinylTypes.includes('Label')) {
        const imageFiles = vinyl.preset.Label.images

        Object.keys(imageFiles).forEach((key) => {
          imagesLabelVinyl = Object.assign({}, imagesLabelVinyl, {
            [`${key}`]: p.loadImage(imageFiles[key])
          })
        })
      }
    }

    //////////////////////////////////////////////////// FONTS

    fontEsenin = p.loadFont('../fonts/esenin-script-one.ttf');

  }

  p.setup = () => {
    
    parentDivWidth = parentDivInfo.width;
    parentDivHeight = parentDivInfo.height;

    canvasSize = parseInt(Math.min(parentDivWidth, parentDivHeight))
    console.log(canvasSize);

    let canvas = p.createCanvas(canvasSize, canvasSize)
    canvas.parent(canvasContainerId)

    if (moduleList.includes('Module3D')) {
      graphics = p.createGraphics(canvasSize, canvasSize, p.WEBGL)
      graphics.camera(0, 0, 50*p.sqrt(3), 0, 0, 0, 0, 1, 0);
      graphics.perspective(p.PI/3, 1, 5*p.sqrt(3), 500*p.sqrt(3));
    }
  }
  
  p.draw = () => {
    const blend = getBlendStore()
    
    if (blend) {
      p.clear()
      p.blendMode(p.DIFFERENCE)
      drawModules(p)
    } else {
      drawModules(p)
    }
  }

  p.windowResized = () => {

    parentDiv = document.getElementById(canvasContainerId);
    parentDivInfo = parentDiv.getBoundingClientRect();
    parentDivWidth = parentDivInfo.width;
    parentDivHeight = parentDivInfo.height;

    canvasSize = Math.min(parentDivWidth, parentDivHeight)

    p.resizeCanvas(canvasSize, canvasSize)
  }
}

///////////////////////////////////////////////////

function initSketch(id) {
  canvasContainerId = id

  parentDiv = document.getElementById(canvasContainerId);
  parentDivInfo = parentDiv.getBoundingClientRect();

  moduleList = getModuleList()

  new p5(sketch)
}

export { initSketch }