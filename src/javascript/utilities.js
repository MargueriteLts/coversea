function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min
}

function sample(array) {
  return array[Math.floor(Math.random() * array.length)]
}

function generateHash() {
  const symbols = ['a', 'b', 'c', 'd', 'e', 'f', 0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  let hash = ''

  for (var i = 0; i < 6; i++) {
    hash += sample(symbols)
  }

  return hash
}

function importAll(r) {
  let images = {}
  r.keys().map((item, index) => {
    images[item.replace('./', '')] = r(item)
  })
  return images
}

function hexToRgbArray(hex) {
  // Remove the '#' character if present
  hex = hex.replace('#', '');

  // Handle 3-character hex color codes by expanding them to 6 characters
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map(char => char + char) // Duplicate each character to expand to 6 characters
      .join('');
  }

  // Convert the hex value to RGB components
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Return an array containing the RGB values
  return [r, g, b];
}

function rgbToHex(rgbString) {
  // Extract the numbers from the string
  const rgbValues = rgbString.match(/\d+/g).map(Number);
  
  // Convert each component to its hexadecimal equivalent
  const componentToHex = (c) => {
    const hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  const [r, g, b] = rgbValues;
  const hexR = componentToHex(r);
  const hexG = componentToHex(g);
  const hexB = componentToHex(b);

  return "#" + hexR + hexG + hexB;
}


export { getRandomArbitrary, sample, generateHash, importAll, hexToRgbArray, rgbToHex }