const suffleBtn = document.querySelector("#suffle-btn");
const display = document.querySelector("#display-field");
const copyBtn = document.querySelector("#copy-btn");
const hexMode = document.querySelector("#hex-mode");
const rgbMode = document.querySelector("#rgb-mode");
const hexInputBox = document.querySelector("#hex-input");
const rgbInputBox = document.querySelector("#rgb-input");
const redColorCode = document.querySelector("#red-color-code");
const greenColorCode = document.querySelector("#green-color-code");
const blueColorCode = document.querySelector("#blue-color-code");
const redRange = document.querySelector("#red-range");
const greenRange = document.querySelector("#green-range");
const blueRange = document.querySelector("#blue-range");

// window onload handler

window.onload = () => {
  main();
};

function main() {
  suffleBtn.addEventListener("click", shuffleColor);/*Random Color Button  */

  
}

// Event Handler Related Function
function shuffleColor() {
  const decimalValue = getDecimalValue();

  const rgbColor = getRGBColor(decimalValue);

  display.style.backgroundColor = rgbColor;
}

// DOM Related

// >>>>>>> Utils related function <<<<<<<<<<

/**This function returns an object of genereated decimal color code
 *
 * @returns{}
 */
function getDecimalValue() {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);
  return {
    red,
    green,
    blue,
  };
}

/**This function take object as parameter and returns rgb color code which is a  string
 *
 * @param {object} { red, green, blue }
 * @returns {String}
 */
function getRGBColor({ red, green, blue }) {
  return `rgb(${red},${green},${blue})`;
}

function getHexColor({red,green,blue}) {
  
}
