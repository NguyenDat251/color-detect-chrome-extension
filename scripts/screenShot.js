function rgbToHex(r, g, b) {
  return componentToHex(r) + componentToHex(g) + componentToHex(b);
}
function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const { image } = request;
  const img = new Image();

  const canvas = document.createElement("canvas");
  let context = canvas.getContext("2d");

  img.src = image;
  img.onload = function () {
    canvas.width = img.width;
    canvas.height = img.height;
    context.drawImage(img, 0, 0); // Or at whatever offset you like
  };

  canvas.classList.add("mainCanvas");

  document.body.appendChild(canvas);

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

  canvas.addEventListener("mousemove", function (e) {
    var pos = {
      x: canvas.offsetLeft,
      y: canvas.offsetTop,
    };
    var x = e.pageX - pos.x;
    var y = e.pageY - pos.y;
    var c = canvas.getContext("2d");
    var p = c.getImageData(x, y, 1, 1).data;
    actualColor = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);

    colorPreview.style.backgroundColor = actualColor;
    colorHexCode.textContent = actualColor;
    let xPointer = e.clientX,
      yPointer = e.clientY;
    tooltip.style.top = yPointer - 90 + "px";
    tooltip.style.left = xPointer + "px";
  });

  document.body.style.removeProperty("pointer-events");
});
