function rgbToHex(r, g, b) {
  return componentToHex(r) + componentToHex(g) + componentToHex(b);
}
function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

chrome.runtime.onMessage.addListener((message, sender, senderResponse) => {
  if (message.name === "stream" && message.streamId) {
    let track, canvas;
    navigator.mediaDevices
      .getUserMedia({
        video: {
          mandatory: {
            chromeMediaSource: "desktop",
            chromeMediaSourceId: message.streamId,
          },
        },
      })
      .then((stream) => {
        track = stream.getVideoTracks()[0];
        const imageCapture = new ImageCapture(track);
        return imageCapture.grabFrame();
      })
      .then((bitmap) => {
        track.stop();
        canvas = document.createElement("canvas");
        canvas.width = bitmap.width;
        canvas.height = bitmap.height;
        let context = canvas.getContext("2d");
        context.drawImage(bitmap, 0, 0, bitmap.width, bitmap.height);

        document.body.appendChild(canvas);

        let actualColor = "ffffff";

        // canvas.addEventListener("mousemove", function (e) {
        //   var pos = {
        //     x: canvas.offsetLeft,
        //     y: canvas.offsetTop,
        //   };
        //   var x = e.pageX - pos.x;
        //   var y = e.pageY - pos.y;
        //   var c = canvas.getContext("2d");
        //   var p = c.getImageData(x, y, 1, 1).data;
        //   actualColor = ("000000" + rgbToHex(p[0], p[1], p[2])).slice(-6);
        //   console.log("🚀 ~ file: screenShot.js:46 ~ actualColor", actualColor);
        // });

        // return canvas.toDataURL();
      })
      //   //TODO download the image from the URL
      //   .then((url) => {
      //     chrome.runtime.sendMessage({ name: "download", url }, (response) => {
      //       if (response.success) {
      //         alert("Screenshot saved");
      //       } else {
      //         alert("Could not save screenshot");
      //       }
      //       canvas.remove();
      //       senderResponse({ success: true });
      //     });
      //   })
      .catch((err) => {
        alert("Could not take screenshot");
        senderResponse({ success: false, message: err });
      });

    return true;
  }
});
