function rgbToHex(r, g, b) {
  return componentToHex(r) + componentToHex(g) + componentToHex(b);
}
function componentToHex(c) {
  let hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const { image } = request;
  const img = new Image();

  const canvas = document.createElement("canvas");
  let context = canvas.getContext("2d", { willReadFrequently: true });

  img.src = image;
  const { width, availHeight: height } = screen;

  img.onload = function () {
    canvas.width = width;
    canvas.height = height;
    context.drawImage(img, 0, 0, width, height);
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
    let pos = {
      x: canvas.offsetLeft,
      y: canvas.offsetTop,
    };
    let x = e.pageX - pos.x;
    let y = e.pageY - pos.y;
    let p = context.getImageData(x, y, 1, 1).data;
    actualColor = "#" + ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);

    colorPreview.style.backgroundColor = actualColor;
    colorHexCode.textContent = actualColor;
    let xPointer = e.clientX,
      yPointer = e.clientY;
    tooltip.style.top = yPointer - 90 + "px";
    tooltip.style.left = xPointer + "px";
  });

  document.body.style.removeProperty("pointer-events");
  document.body.style.setProperty("position", "fixed");
});
