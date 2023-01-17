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

function rgba2hex(orig) {
  var a,
    isPercent,
    rgb = orig
      .replace(/\s/g, "")
      .match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i),
    alpha = ((rgb && rgb[4]) || "").trim(),
    hex = rgb
      ? (rgb[1] | (1 << 8)).toString(16).slice(1) +
        (rgb[2] | (1 << 8)).toString(16).slice(1) +
        (rgb[3] | (1 << 8)).toString(16).slice(1)
      : orig;

  if (alpha !== "") {
    a = "";
  } else {
    a = 01;
  }
  // multiply before convert to HEX
  a = ((a * 255) | (1 << 8)).toString(16).slice(1);
  hex = hex + a;

  return "#" + hex;
}

const isWhite = (hex) => hex === "#00000000" || hex === "#ffffffff";

document.body.style.pointerEvents = "none";

window.onmousemove = function (e) {
  const activeTextarea = document.activeElement;

  const backgroundColorHovered = getComputedStyle(e.target).backgroundColor;
  const fontColorHovered = getComputedStyle(e.target).color;

  const hexCode = rgba2hex(backgroundColorHovered);

  colorPreview.style.backgroundColor = hexCode;
  colorHexCode.textContent = hexCode;

  if (isWhite(hexCode)) {
    console.log("isWhite");
    colorPreview.classList.add("colorPreview-white-border");
  } else {
    colorPreview.classList.remove("colorPreview-white-border");
  }

  var x = e.clientX,
    y = e.clientY;
  tooltip.style.top = y - 90 + "px";
  tooltip.style.left = x + "px";
};

window.onmousedown = function (e) {
  e.preventDefault();
};
