function rgbToHex(r, g, b) {
  return componentToHex(r) + componentToHex(g) + componentToHex(b);
}
function componentToHex(c) {
  let hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

let prevPositionValue;

const TOOLTIP_HEIGHT = 76;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  const { image, isOff } = request;

  if (isOff) {
    const canvas = document.getElementsByClassName("mainCanvas")[0];
    canvas.remove();
    const tooltip = document.getElementsByClassName("tooltip-color-detect")[0];
    tooltip.remove();
    document.body.style.setProperty(
      "position",
      prevPositionValue ? prevPositionValue : "relative"
    );

    return;
  }

  const img = new Image();

  const canvas = document.createElement("canvas");
  let context = canvas.getContext("2d", { willReadFrequently: true });

  img.src = image;
  const { innerWidth: screenWidth, innerHeight: screenHeight } = window;

  img.onload = function () {
    canvas.width = screenWidth;
    canvas.height = screenHeight;
    context.drawImage(img, 0, 0, screenWidth, screenHeight);
  };

  canvas.classList.add("mainCanvas");
  canvas.style.setProperty("z-index", Number.MAX_SAFE_INTEGER - 1);
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

  tooltip.style.setProperty("z-index", Number.MAX_SAFE_INTEGER);
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

    let tooltipTop = yPointer - TOOLTIP_HEIGHT - 20;

    const isContainFlippedClass = tooltip.classList.contains(
      "tooltip-color-detect-flip"
    );

    if (tooltipTop < 0) {
      tooltipTop = yPointer + 50;

      if (!isContainFlippedClass) {
        tooltip.classList.add("tooltip-color-detect-flip");
      }
    } else {
      if (isContainFlippedClass) {
        tooltip.classList.remove("tooltip-color-detect-flip");
      }
    }

    tooltip.style.transform = `translateY(${tooltipTop}px) translateX(${
      xPointer - 30
    }px)`;
  });

  document.body.style.removeProperty("pointer-events");
  prevPositionValue = document.body.style.getPropertyValue("position");
  document.body.style.setProperty("position", "fixed");
});
