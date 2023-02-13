const url = chrome.runtime.getURL("media/Arrow.cur");
// const url = "http://wiki-devel.sugarlabs.org/images/e/e2/Arrow.cur";
// const url = "media/Arrow.cur";
console.log("🚀 ~ file: content.js:2 ~ url", `${url}, auto`);
document.getElementsByTagName("body")[0].style.cursor = `url('${url}'), auto`;
console.log("abc", document.getElementsByTagName("body")[0].style.cursor);

const tooltip = document.createElement("div");
tooltip.classList.add("tooltip-color-detect");

const colorPreview = document.createElement("div");
colorPreview.classList.add("colorPreview-color-detect");

tooltip.appendChild(colorPreview);

const colorHexCode = document.createElement("span");
colorHexCode.classList.add("colorHexCode-color-detect");
colorHexCode.textContent = "#b3e879";

tooltip.appendChild(colorHexCode);

document.body.appendChild(tooltip);

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
}

// function rgbToHex(rgb) {
//     const rgb
//     return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
//   }

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(rgb) {
  console.log(
    "🚀 ~ file: content.js:40 ~ rgbToHex ~ rgb",
    rgb,
    rgb.substr(rgb.indexOf("(") + 1, rgb.indexOf(")") - 1)
  );

  const [r, g, b, a] = rgb
    .substr(rgb.indexOf("("), rgb.indexOf(")"))
    .split(",");
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

// window.onmousemove = function (e) {
//   const activeTextarea = document.activeElement;

//   const backgroundColorHovered = getComputedStyle(e.target).backgroundColor;
//   const fontColorHovered = getComputedStyle(e.target).color;

//   const hexCode = rgba2hex(backgroundColorHovered);

//   colorPreview.style.backgroundColor = hexCode;
//   colorHexCode.textContent = hexCode;

//   if (isWhite(hexCode)) {
//     colorPreview.classList.add("colorPreview-white-border");
//   } else {
//     colorPreview.classList.remove("colorPreview-white-border");
//   }

//   var x = e.clientX,
//     y = e.clientY;
//   tooltip.style.top = y - 90 + "px";
//   tooltip.style.left = x + "px";
// };

window.onmousedown = function (e) {
  e.preventDefault();
};
