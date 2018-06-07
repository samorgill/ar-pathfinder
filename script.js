// window.onload = function() {
//     navigator.getUserMedia = (
//         navigator.getUserMedia ||
//         navigator.webkitGetUserMedia ||
//         navigator.mozGetUserMedia ||
//         navigator.msGetUserMedia
//     );
//
//     if (navigator.getUserMedia) {
//
//
//         let video = document.getElementById('camera-stream');
//
//
//         //----------------------------------------------------------------------
//         //  Here we list all media devices, in order to choose between
//         //  the front and the back camera.
//         //      videoDevices[0] : Front Camera
//         //      videoDevices[1] : Back Camera
//         //  I used an array to save the devices ID
//         //  which i get using devices.forEach()
//         //  Then set the video resolution.
//         //----------------------------------------------------------------------
//         navigator.mediaDevices.enumerateDevices()
//             .then(devices => {
//                 let videoDevices = [0,0];
//                 let videoDeviceIndex = 0;
//                 devices.forEach(function(device) {
//                     console.log(device.kind + ": " + device.label +
//                         " id = " + device.deviceId);
//                     if (device.kind == "videoinput") {
//                         videoDevices[videoDeviceIndex++] =  device.deviceId;
//                     }
//                 });
//
//
//                 let constraints =  {width: { min: 1024, ideal: 1280, max: 1920 },
//                     height: { min: 776, ideal: 720, max: 1080 },
//                     deviceId: { exact: videoDevices[1]  }
//                 };
//                 return navigator.mediaDevices.getUserMedia({ video: constraints });
//
//             })
//             .then(stream => {
//                 if (window.webkitURL) {
//                     video.src = window.webkitURL.createObjectURL(stream);
//                     localMediaStream = stream;
//                 } else if (video.mozSrcObject !== undefined) {
//                     video.mozSrcObject = stream;
//                 } else if (video.srcObject !== undefined) {
//                     video.srcObject = stream;
//                 } else {
//                     video.src = stream;
//                 }})
//             .catch(e => console.error(e));
//
//
//
//
//
//
//
//     } else {
//         alert('Sorry, your browser does not support getUserMedia');
//     }
// }


// 2nd App
$(function () {
    video = document.getElementById('camera-stream');
    video.style.width = document.width + 'px';
    video.style.height = document.height + 'px';
    video.setAttribute('autoplay', '');
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');

    let constraints = {
        audio: false,
        video: {
            facingMode: 'environment'
        }
    }

    navigator.mediaDevices.getUserMedia(constraints).then(function success(stream) {
        video.srcObject = stream;
    });
});

// var videoSelect = document.querySelector("select#videoSource");
// var selectors = [videoSelect];
//
// function gotDevices(deviceInfos) {
//     // Handles being called several times to update labels. Preserve values.
//     var values = selectors.map(function(select) {
//         return select.value;
//     });
//     selectors.forEach(function(select) {
//         while (select.firstChild) {
//             select.removeChild(select.firstChild);
//         }
//     });
//
//     for (var i = 0; i !== deviceInfos.length; ++i) {
//         var deviceInfo = deviceInfos[i];
//         var option = document.createElement("option");
//         option.value = deviceInfo.deviceId;
//
//         if (deviceInfo.kind === "videoinput") {
//             option.text = deviceInfo.label || "camera " + (videoSelect.length + 1);
//             videoSelect.appendChild(option);
//         } else {
//             console.log("Some other kind of source/device: ", deviceInfo);
//         }
//
//         selectors.forEach(function(select, selectorIndex) {
//             if (
//                 Array.prototype.slice.call(select.childNodes).some(function(n) {
//                     return n.value === values[selectorIndex];
//                 })
//             ) {
//                 select.value = values[selectorIndex];
//             }
//         });
//     }
// }
//
// navigator.mediaDevices
//     .enumerateDevices()
//     .then(gotDevices)
//     .catch(handleError);
//
// function gotStream(stream) {
//     arToolkitSource.domElement.srcObject = stream; // make stream available to console
//     // video.srcObject = stream;
//     // Refresh button list in case labels have become available
//     return navigator.mediaDevices.enumerateDevices();
// }
//
// function start() {
//     if (window.stream) {
//         window.stream.getTracks().forEach(function(track) {
//             track.stop();
//         });
//     }
//     var videoSource = videoSelect.value;
//     var constraints = {
//         video: {
//             deviceId: videoSource ? { exact: videoSource } : undefined,
//             facingMode: 'environment'
//         }
//     };
//     navigator.mediaDevices
//         .getUserMedia(constraints)
//         .then(gotStream)
//         .then(gotDevices)
//         .catch(handleError);
// }
//
// videoSelect.onchange = start;
//
// function handleError(error) {
//     console.log("navigator.getUserMedia error: ", error);
// }
//
//start();