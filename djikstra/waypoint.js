var waypoint = function() {
  var waypoints = {
    a: {
      xPos: 3,
      yPos: 4,
      links: {b: 3.6}
    },
    b: {
      xPos: 6,
      yPos: 4,
      links: {a: 3.6, c: 3, d: 3}
    },
    c: {
      xPos: 10,
      yPos: 7,
      links: {b: 3, d: 3, g: 5.1}
    },
    d: {
      xPos: 6,
      yPos: 8.5,
      links: {b: 3, c: 3, g: 2.9, e: 3.6}
    },
    e: {
      xPos: 3,
      yPos: 8.5,
      links: {d: 3.6}
    },
    f: {
      xPos: 3,
      yPos: 12.5,
      links: {g: 3}
    },
    g: {
      xPos: 6,
      yPos: 12.5,
      links: {f: 3, d: 2.9, c: 5.1, i: 2.7, k: 4.5}
    },
    h: {
      xPos: 3,
      yPos: 16.5,
      links: {i: 3}
    },
    i: {
      xPos: 6,
      yPos: 16.5,
      links: {h: 3, g: 2.7, j: 0.8}
    },
    j: {
      xPos: 6.5,
      yPos: 18,
      links: {i: 0.8, k: 1.6, m: 2}
    },
    k: {
      xPos: 9,
      yPos: 18,
      links: {j: 1.6, g: 4.5, n: 8.7}
    },
    l: {
      xPos: 3,
      yPos: 20.5,
      links: {m: 1.9}
    },
    m: {
      xPos: 5,
      yPos: 20.5,
      links: {l: 1.9, j: 2}
    },
    n: {
      xPos: 22.5,
      yPos: 18,
      links: {k: 8.7, o: 3.5}
    },
    o: {
      xPos: 22.5,
      yPos: 24,
      links: {p: 0.9, n: 3.5}
    },
    p: {
      xPos: 24.5,
      yPos: 24,
      links: {o: 0.9}
    }
  };



  var map = {};

  Object.keys(waypoints).forEach(function(k, v){
    map[k] = waypoints[k].links;
  });

  waypoint.getCoords = function(nodeName){
    return {
      x: waypoints[nodeName].xPos,
      y: waypoints[nodeName].yPos
    }
  };

  waypoint.findShortestPath = function (currentPos, end) {
    var pathfinder = new Graph(map);
    return pathfinder.findShortestPath(this.findClosestNode(currentPos), end);
  };

  waypoint.findClosestNode = function(currentPos){
    var nodes = Object.keys(waypoints);
    var closestNode;
    var closestDistance;
    for(var i=0; i<nodes.length; i++) {

      var newDistance = this.directDistanceCalculator(currentPos, nodes[i])
      if(closestDistance==undefined || closestDistance>newDistance) {
        closestDistance=newDistance;
        closestNode=nodes[i];
      }
    }
    return closestNode;
  };

  waypoint.routeDistanceCalculator = function(currentPos, target){
    var closestNodeName = this.findClosestNode(currentPos);
    var route = this.findShortestPath(closestNodeName, target);
    var distance =this.directDistanceCalculator(currentPos, route[0]);

    for(var j=0; j<route.length-1; j++){

      var nodeName = route[j];
      distance+=this.directDistanceCalculator({xPos: waypoints[nodeName].xPos, yPos: waypoints[route[j]].yPos}, route[j+1])
      console.log(distance)
    }

  };

  waypoint.directDistanceCalculator = function (currentPos, target) {
    var relativeX = waypoints[target].xPos - currentPos.xPos;
    var relativeY = waypoints[target].yPos - currentPos.yPos;
    return Math.sqrt(relativeX*relativeX + relativeY*relativeY);
  };

  return waypoint;
};

