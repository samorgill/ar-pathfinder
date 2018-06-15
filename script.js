
let point1;
let point2;

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
    point2 = new google.maps.LatLng(53.40458149, -2.29921); // cupboard room
    setTimeout(function() {
        setInterval(function() {
            updateLocation();
            let depth = document.getElementById("ascene").childNodes[9].getAttribute('position').z;
            depth++;
            //let point1 = new google.maps.LatLng(53.4045471, -2.299247);
            var heading = google.maps.geometry.spherical.computeHeading(point1,point2);
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
    log('Connecting to GATT Server...');
     return device.gatt.connect();
    log('Connected');
})
   .then(server => {
     log('Getting Device Information Service...');
     return server.getPrimaryService('device_information');
   })
   .then(service => {
     log('Getting Device Information Characteristics...');
     return service.getCharacteristics();
   })
   .then(characteristics => {
     let queue = Promise.resolve();
     let decoder = new TextDecoder('utf-8');
     characteristics.forEach(characteristic => {
       switch (characteristic.uuid) {
 
         case BluetoothUUID.getCharacteristic('manufacturer_name_string'):
           queue = queue.then(_ => characteristic.readValue()).then(value => {
             log('> Manufacturer Name String: ' + decoder.decode(value));
           });
           break;
 
         case BluetoothUUID.getCharacteristic('model_number_string'):
           queue = queue.then(_ => characteristic.readValue()).then(value => {
             log('> Model Number String: ' + decoder.decode(value));
           });
           break;
 
         case BluetoothUUID.getCharacteristic('hardware_revision_string'):
           queue = queue.then(_ => characteristic.readValue()).then(value => {
             log('> Hardware Revision String: ' + decoder.decode(value));
           });
           break;
 
         case BluetoothUUID.getCharacteristic('firmware_revision_string'):
           queue = queue.then(_ => characteristic.readValue()).then(value => {
             log('> Firmware Revision String: ' + decoder.decode(value));
           });
           break;
 
         case BluetoothUUID.getCharacteristic('software_revision_string'):
           queue = queue.then(_ => characteristic.readValue()).then(value => {
             log('> Software Revision String: ' + decoder.decode(value));
           });
           break;
 
         case BluetoothUUID.getCharacteristic('system_id'):
           queue = queue.then(_ => characteristic.readValue()).then(value => {
             log('> System ID: ');
             log('  > Manufacturer Identifier: ' +
                 padHex(value.getUint8(4)) + padHex(value.getUint8(3)) +
                 padHex(value.getUint8(2)) + padHex(value.getUint8(1)) +
                 padHex(value.getUint8(0)));
             log('  > Organizationally Unique Identifier: ' +
                 padHex(value.getUint8(7)) + padHex(value.getUint8(6)) +
                 padHex(value.getUint8(5)));
           });
           break;
 
         case BluetoothUUID.getCharacteristic('ieee_11073-20601_regulatory_certification_data_list'):
           queue = queue.then(_ => characteristic.readValue()).then(value => {
             log('> IEEE 11073-20601 Regulatory Certification Data List: ' +
                 decoder.decode(value));
           });
           break;
 
         case BluetoothUUID.getCharacteristic('pnp_id'):
           queue = queue.then(_ => characteristic.readValue()).then(value => {
             log('> PnP ID:');
             log('  > Vendor ID Source: ' +
                 (value.getUint8(0) === 1 ? 'Bluetooth' : 'USB'));
             if (value.getUint8(0) === 1) {
               log('  > Vendor ID: ' +
                   (value.getUint8(1) | value.getUint8(2) << 8));
             } else {
               log('  > Vendor ID: ' +
                   getUsbVendorName(value.getUint8(1) | value.getUint8(2) << 8));
             }
             log('  > Product ID: ' +
                 (value.getUint8(3) | value.getUint8(4) << 8));
             log('  > Product Version: ' +
                 (value.getUint8(5) | value.getUint8(6) << 8));
           });
           break;
 
         default: log('> Unknown Characteristic: ' + characteristic.uuid);
       }
     });
     return queue;
   })
   .catch(error => {
     log('Argh! ' + error);
   });
 }
 
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