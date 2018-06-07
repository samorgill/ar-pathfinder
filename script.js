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

$(function () {
    video = document.getElementById('camera-stream');
    video.style.width = document.width + 'px';
    video.style.height = document.height + 'px';
    video.setAttribute('autoplay', '');
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');

    var constraints = {
        audio: false,
        video: {
            facingMode: 'user'
        }
    }

    navigator.mediaDevices.getUserMedia(constraints).then(function success(stream) {
        video.srcObject = stream;
    });
});