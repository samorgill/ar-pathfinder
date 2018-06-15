
let point1;

let point2 = new google.maps.LatLng(53.40458149, -2.29921); // cupboard room
window.onload = function() {

        let video = document.createElement('video');
        video.style.width = document.width + 'px';
        video.style.height = document.height + 'px';
        video.setAttribute('autoplay', '');
        video.setAttribute('muted', '');
        video.setAttribute('playsinline', '');

        // Back camera
        let facingMode = "environment";

        // Front camera
        // let facingMode = "user";

        let constraints = {
            audio: false,
            video: {
                facingMode: facingMode
            }
        };

        navigator.mediaDevices.getUserMedia(constraints).then(function success(stream) {
            video.srcObject = stream;
        });

        document.body.appendChild(video);


        document.getElementById('startTracking').addEventListener("click", getBluetoothDevice);
        document.getElementById('startTracking').style.zIndex = "1000000000";
        
        

    // Note: This example requires that you consent to location sharing when
    // prompted by your browser. If you see the error "The Geolocation service
    // failed.", it means you probably did not give permission for the browser to
    // locate you.
    let map, infoWindow;
    let originalLat = 0;
    //let nodeDistance = 0;
    let node ={
        lat:0,
        lng:0
    };

    run();
    // button.addEventListener('pointerup', (event) => {
    //     navigator.bluetooth.requestDevice
    // });


    // createEl();
};

function createEl() {
    // let ascene = document.querySelector('a-scene');

    let triangle = document.createElement('a-triangle');
    //
    // // triangle.setAttribute('text', 'Hello');
    // // triangle.setAttribute('position', '0 0 -13');
    // triangle.setAttribute('position', {x: 1, y: 2, z: -3});
    //
    // // triangle.object3D.position.set(1, 2, -3);
    //
    // document.getElementById('ascene').appendChild(triangle);

    // let triangle = document.createElement("<a-triangle position=\"0 0 -5\" src=\"#platform\" rotation=\"-90 0 0\" color=\"#EF2D5E\">^</a-triangle>");
    triangle.setAttribute('position', {x: 0, y: 0, z: -2});
    triangle.setAttribute('src','#platform');
    triangle.setAttribute('rotation', {x: -90, y: 0, z: -3});
    triangle.setAttribute('color', "#EF2D5E");
    triangle.innerHTML = "^";

    document.getElementById("ascene").appendChild(triangle);

    // $( ".ascene" ).append( "<a-trian>Test</a-trian>" );
}

function run(){
    setTimeout(function() {
        setInterval(function() {
            updateLocation();
            let depth = document.getElementById("ascene").childNodes[9].getAttribute('position').z;
            depth++;
            //let point1 = new google.maps.LatLng(53.4045471, -2.299247);
            var heading = google.maps.geometry.spherical.computeHeading(point1,point2);
            console.log("Heading: " + heading);
            document.getElementById("ascene").childNodes[9].setAttribute('position',{x: 0, y: 0, z: depth});
            document.getElementById("ascene").childNodes[9].setAttribute('rotation',{x: heading, y: 0, z: 0});
            //document.getElementById("ascene").childNodes[13].setAttribute('position',{x: 0, y: 0, z: nodeDistance*1000000});
        },1000)
    },1000);
};

function updateLocation(){

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            let pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            //nodeDistance = originalLat - pos.lat;
            point1 = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            document.getElementById("myLocation").innerHTML = pos.lat + ' ' + pos.lng   // display location on screen


        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
    }

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: -34.397, lng: 150.644},
        zoom: 18
    });
    infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            let pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            originalLat = pos.lat;
//            node.lat = pos.lat;
//            node.lng = pos.lng;
            infoWindow.setPosition(pos);
            infoWindow.setContent('You');
            infoWindow.open(map);
            map.setCenter(pos);
        }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
        });
    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}


///////////////////////////
function getBluetoothDevice() {

    log("Initalising bluetooth stuff");
    
    navigator.bluetooth.requestDevice({
       filters: [{ namePrefix: 'Mini'}],
       optionalServices: ['device_information']})
   .then(device => {
     log('Connecting to GATT Server....');
     return device.gatt.connect();
    })
    .then(device => {
         log('Getting RSSI data');
         log(device.adData.rssi);
         //device.addEventListener('advertisementreceived', interpretIBeacon);
    })
   .catch(error => {
     log('Argh! ' + error);
   });
 }

function interpretIBeacon(event) {
  var rssi = event.rssi;
  var appleData = event.manufacturerData.get(0x004C);
  if (appleData.byteLength != 23 ||
    appleData.getUint16(0, false) !== 0x0215) {
  }
  var uuidArray = new Uint8Array(appleData.buffer, 2, 16);
  var major = appleData.getUint16(18, false);
  var minor = appleData.getUint16(20, false);
  var txPowerAt1m = -appleData.getInt8(22);
  log(txPowerAt1m - rssi);
};
 
 /* Utils */
 
 function padHex(value) {
   return ('00' + value.toString(16).toUpperCase()).slice(-2);
 }
 
 function getUsbVendorName(value) {
   // Check out page source to see what valueToUsbVendorName object is.
   return value +
       (value in valueToUsbVendorName ? ' (' + valueToUsbVendorName[value] + ')' : '');
 }

 function log(value) {
    document.getElementById("myDeviceInfo").innerHTML = document.getElementById("myDeviceInfo").innerHTML + '<br />' + value;
 }