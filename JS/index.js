/*
 Requirements::
 1) Click random button suffle the color which is display in the display field 
 2)Also generate hex and rgb color in each input box 
 3)Also user can enter hex color code in hex input box which can alternatively generate rgb color code 
 4)Copy the color code based on selective color mode 
 5)
*/

// << Global variable >>
let toastDiv = null;

// Window onload
window.onload = () => {
  main();
};

function main() {
  const changeBtn = document.querySelector("#suffle-btn");
  const hexInput = document.querySelector("#hex-input");
  const displayField = document.querySelector("#display-field");
  const hexMode = document.querySelector("#hex-mode");
  const rgbMode = document.querySelector("#rgb-mode");
  const redSlider = document.querySelector("#red-range");
  const greenSlider = document.querySelector("#green-range");
  const blueSlider = document.querySelector("#blue-range");
  const nodes = document.getElementsByName("color-mode");
  const copyBtn = document.querySelector("#copy-btn");

  // console.log("node==>>", nodes);

  copyBtn.addEventListener("click", function () {
    let colorMode = getModeValueFromRadios(nodes);

    if (colorMode === null) {
      throw new Error("Invalid Radio Input");
    }

    if (toastDiv != null) {
      toastDiv.remove();
      toastDiv = null;
    }
    // Mode hex copy valided
    if (colorMode === "hex") {
      const hexColor = document.querySelector("#hex-input").value;
      if (hexColor && isValidHex(hexColor)) {
        navigator.clipboard.writeText(`#${hexColor}`);
        showToastMessage(hexColor);
      } else alert("Invalid Hex Code");
    }
    // Mode rgb copy valided
    if (colorMode === "rgb") {
      const rgbColor = document.querySelector("#rgb-input").value;
      if (rgbColor) {
        navigator.clipboard.writeText(`${rgbColor}`);
        showToastMessage(rgbColor);
      } else alert("Invalid RGB Code");
    }
  });

  // hexMode.addEventListener("click", function (e) {
  //   if (e.target.checked) {
  //     copyBtn.addEventListener("click", function () {
  //       navigator.clipboard.writeText(`#${hexInput.value}`);
  //       if (toastDiv != null) {
  //         toastDiv.remove();
  //         toastDiv = null;
  //       }
  //       showToastMessage(`#${hexInput.value}`);
  //     });
  //   }
  // });
  // rgbMode.addEventListener("click", function (e) {
  //   if (e.target.checked) {
  //     copyBtn.addEventListener("click", function () {
  //       const hexValueDecimal = hextoDecimalColor(hexInput.value);
  //       const rgbcode = generateRgb(hexValueDecimal);
  //       navigator.clipboard.writeText(`${rgbcode}`);
  //       if (toastDiv != null) {
  //         toastDiv.remove();
  //         toastDiv = null;
  //       }
  //       showToastMessage(rgbcode);
  //     });
  //   }
  // });

  changeBtn.addEventListener("click", handleChangeButton);

  hexInput.addEventListener("keyup", handleHexInput(displayField));

  redSlider.addEventListener(
    "change",
    collectSliderValue(redSlider, greenSlider, blueSlider)
  );
  greenSlider.addEventListener(
    "change",
    collectSliderValue(redSlider, greenSlider, blueSlider)
  );
  blueSlider.addEventListener(
    "change",
    collectSliderValue(redSlider, greenSlider, blueSlider)
  );
}

// ----------******-----DOM related Function-------***********---------

/**
 * take Message which is hex or rgb color and make a toast message
 * @param {String} msg
 */

function showToastMessage(msg) {
  toastDiv = document.createElement("div");
  toastDiv.className = "toast-message toast-message-slide-in";
  toastDiv.innerText = `${msg} Copied`;
  toastDiv.style.backgroundColor = msg;

  toastDiv.addEventListener("click", function () {
    toastDiv.classList.remove("toast-message-slide-in");
    toastDiv.classList.add("toast-message-slide-out");

    toastDiv.addEventListener("animationend", function () {
      toastDiv.remove();
      div = null;
    });
  });

  document.body.appendChild(toastDiv);
}
/**
 * @param {Array} nodes
 * @returns {String | null}
 */
function getModeValueFromRadios(nodes) {
  let checkedValue = null;
  console.log("nodes==>", nodes);
  for (let i = 0; i < nodes.length; i++) {
    if (nodes[i].checked) {
      checkedValue = nodes[i].value;
    }
  }
  return checkedValue;
}

/**
 * update dom elements with calculated color values
 * @param {object} color
 *
 */
function updateColorCodeToDom(color) {
  const hex = generateHex(color);
  const decimalObjectOfHex = hextoDecimalColor(hex);
  const rgb = generateRgb(decimalObjectOfHex);
  // const changeBtn =
  document.querySelector("#suffle-btn");
  // const displayField =
  document.querySelector("#display-field").style.backgroundColor = `#${hex}`;
  // const copyBtn =
  document.querySelector("#copy-btn");
  // const hexMode =
  document.querySelector("#hex-mode");
  // const rgbMode =
  document.querySelector("#rgb-mode");
  // const hexInput =
  document.querySelector("#hex-input").value = hex;
  // const rgbInput =
  document.querySelector("#rgb-input").value = rgb;
  // const redRGBColorCode =
  document.querySelector("#red-color-code").innerText = color.red;
  // const greenRGBColorCode =
  document.querySelector("#green-color-code").innerText = color.green;
  // const blueRGBColorCode =
  document.querySelector("#blue-color-code").innerText = color.blue;
  // const redSlider =
  document.querySelector("#red-range").value = color.red;
  // const greenSlider =
  document.querySelector("#green-range").value = color.green;
  // const blueSlider =
  document.querySelector("#blue-range").value = color.blue;
}

/**
 --------Event Related Function------------
 */

// Slider Value collect Function
function collectSliderValue(redSlider, greenSlider, blueSlider) {
  return function () {
    const color = {
      red: parseInt(redSlider.value),
      green: parseInt(greenSlider.value),
      blue: parseInt(blueSlider.value),
    };
    updateColorCodeToDom(color);
  };
}

/**
 * event for random color button
 */
function handleChangeButton() {
  const color = generateDecimal();
  updateColorCodeToDom(color);
}

/**
 *
 * @param {event} e
 */

function handleHexInput(displayField) {
  return function (e) {
    const hexColor = e.target.value;
    if (hexColor) {
      // this.value = hexColor.toUpperCase();
      if (isValidHex(hexColor)) {
        const colorObj = hextoDecimalColor(hexColor);
        updateColorCodeToDom(colorObj);
      } else displayField.style.backgroundColor = "#ffffff";
    }
  };
}

// Utils Related Function
function generateDecimal() {
  const red = Math.floor(Math.random() * 255);
  const green = Math.floor(Math.random() * 255);
  const blue = Math.floor(Math.random() * 255);
  return {
    red,
    green,
    blue,
  };
}

/**
 *
 * @param {object} param0
 * @returns {string}
 */
function generateHex({ red, green, blue }) {
  function getTwoCode(value) {
    const hex = value.toString(16);
    return hex.length == 1 ? `0${hex}` : hex;
  }
  return `${getTwoCode(red)}${getTwoCode(green)}${getTwoCode(
    blue
  )}`.toUpperCase();
}

/**
 * Generate RGB take object as a parameter and Retuern a string
 * @param {object} param0
 * @returns {string}
 */
function generateRgb({ red, green, blue }) {
  return `rgb(${red},${green},${blue})`;
}

/**
 *take hex color code without # and returns converted decimal as a object
 * @param {string} hexColor
 * @returns {object}
 */
function hextoDecimalColor(hexColor) {
  if (isValidHex(hexColor)) {
    const red = parseInt(hexColor.slice(0, 2), 16);
    const green = parseInt(hexColor.slice(2, 4), 16);
    const blue = parseInt(hexColor.slice(4, 6), 16);
    return {
      red,
      green,
      blue,
    };
  }
}

function isValidHex(color) {
  if (color.length != 6) return false;

  return /[0-9A-Fa-f]{6}$/i.test(color);
}
