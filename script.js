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

    // Note: This example requires that you consent to location sharing when
    // prompted by your browser. If you see the error "The Geolocation service
    // failed.", it means you probably did not give permission for the browser to
    // locate you.
    let map, infoWindow;

    run();
    // button.addEventListener('pointerup', (event) => {
    //     navigator.bluetooth.requestDevice
    // });


    createEl();
};

function createEl() {
    // let ascene = document.querySelector('a-scene');

    // let triangle = document.createElement('a-triangle');
    //
    // // triangle.setAttribute('text', 'Hello');
    // // triangle.setAttribute('position', '0 0 -13');
    // triangle.setAttribute('position', {x: 1, y: 2, z: -3});
    //
    // // triangle.object3D.position.set(1, 2, -3);
    //
    // document.getElementById('ascene').appendChild(triangle);

    let triangle = document.createElement("a-triangle");
    triangle.setAttribute('position', {x: 0, y: 0, z: -2});
    triangle.setAttribute('src','#platform');
    triangle.setAttribute('rotation', {x: -90, y: 0, z: -3});
    triangle.setAttribute('color', "#EF2D5E");
    triangle.innerHTML = "^";

    document.getElementById("a-scene").appendChild(triangle);

    $( ".ascene" ).append( "<p>Test</p>" );
}

function run(){
    setInterval(function() {
        let depth = document.getElementById("a-scene").childNodes[9].getAttribute('position').z;
        depth++;
        document.getElementById("a-scene").childNodes[9].setAttribute('position',{x: 0, y: 0, z: depth});
    },1000)
};

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