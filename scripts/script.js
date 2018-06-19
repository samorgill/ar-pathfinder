
let point1;

let point2;// = new google.maps.LatLng(53.40458149, -2.29921); // cupboard room

let p1 = {x:0, y:0};

window.onload = function() {

    console.log('loaded');
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

        // document.body.appendChild(video);

        let wp = new waypoint();

        console.log(waypoint.findShortestPath({xPos:20, yPos:20}, 'c'));
        console.log(waypoint.routeDistanceCalculator({xPos:0, yPos:0}, 'p'));

        //wp.distanceCalculator('a');
        // console.log(wp.findShortestPath('j', 'b'));
        // console.log('dist ', wp.distanceCalculator({xPos:0, yPos:0}, 'c'));

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
};

function createEl() {
    let triangle = document.createElement('a-triangle');
    triangle.setAttribute('position', {x: 0, y: 0, z: -2});
    triangle.setAttribute('src','#platform');
    triangle.setAttribute('rotation', {x: -90, y: 0, z: -3});
    triangle.setAttribute('color', "#EF2D5E");
    triangle.innerHTML = "^";

    document.getElementById("ascene").appendChild(triangle);

}

function run(){
    point2 = new google.maps.LatLng(53.40458149, -2.29921); // cupboard room
    setTimeout( () => {
        setInterval( () => {
            updateLocation();
            let depth = document.getElementById("ascene").childNodes[9].getAttribute('position').z;
            depth++;
            //let point1 = new google.maps.LatLng(53.4045471, -2.299247);
            let neilsDesk = {x: 53.40463411810142, y:-2.299398672391101};
            let p2 = neilsDesk;
            let angle = Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
            let heading = google.maps.geometry.spherical.computeHeading(point1,point2);

            let locY = (p2.y - p1.y) > 1 ? 1 : 0;
            let locX = (p2.x - p1.x) < -1 ? -1: 0;
            document.getElementById("ascene").childNodes[9].setAttribute('position',{x: locX, y: 0, z: locY});
            document.getElementById("ascene").childNodes[9].setAttribute('rotation',{x: -90, y: Math.abs(heading), z: 0});
            //document.getElementById("ascene").childNodes[13].setAttribute('position',{x: 0, y: 0, z: nodeDistance*1000000});
            console.log('polling');
        },1000)
    },1000);
};

function updateLocation() {
    
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            let pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            //nodeDistance = originalLat - pos.lat;
            point1 = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            const origin = new google.maps.LatLng(53.4044831, -2.2987334);
            const heading = google.maps.geometry.spherical.computeHeading(origin, point1);
            const bearing = heading < 0 ? heading + 360 : heading;
            const distance = google.maps.geometry.spherical.computeDistanceBetween(origin, point1);
            const x = getRelativeXCoordinate(bearing, distance);
            const y = getRelativeYCoordinate(bearing, distance);
            console.log('Heading', heading);
            console.log('Bearing', bearing);
            console.log('Distance', distance);
            console.log('Coordinates', x, y);
            document.getElementById("myLocation").innerHTML = pos.lat + ' ' + pos.lng // display location on screen
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

function getRelativeXCoordinate(bearing, distance) {
    let angle = bearing - 225;
    let y = distance * Math.sin(toRadians(angle));
    return y;
}

function getRelativeYCoordinate(bearing, distance) {
    let angle = bearing - 225;
    let x = distance * Math.cos(toRadians(angle));
    return x;
}

function toRadians (angle) {
    return angle * (Math.PI / 180);
  }

 function log(value) {
    document.getElementById("myDeviceInfo").innerHTML = document.getElementById("myDeviceInfo").innerHTML + '<br />' + value;
 }


