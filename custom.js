
// Dijkstra shortest path algorithm
Library.Graph = (function (undefined) {
  var extractKeys = function (obj) {
    var keys = [], key;
    for (key in obj) {
        Object.prototype.hasOwnProperty.call(obj,key) && keys.push(key);
    }
    return keys;
  }
  var sorter = function (a, b) {
    return parseFloat (a) - parseFloat (b);
  }
  var findPaths = function (map, start, end, infinity) {
    infinity = infinity || Infinity;
    var costs = {},
        open = {'0': [start]},
        predecessors = {},
        keys;
    var addToOpen = function (cost, vertex) {
      var key = "" + cost;
      if (!open[key]) open[key] = [];
      open[key].push(vertex);
    }
    costs[start] = 0;
    while (open) {
      if(!(keys = extractKeys(open)).length) break;
      keys.sort(sorter);
      var key = keys[0],
          bucket = open[key],
          node = bucket.shift(),
          currentCost = parseFloat(key),
          adjacentNodes = map[node] || {};
      if (!bucket.length) delete open[key];
      for (var vertex in adjacentNodes) {
          if (Object.prototype.hasOwnProperty.call(adjacentNodes, vertex)) {
          var cost = adjacentNodes[vertex],
              totalCost = cost + currentCost,
              vertexCost = costs[vertex];
          if ((vertexCost === undefined) || (vertexCost > totalCost)) {
            costs[vertex] = totalCost;
            addToOpen(totalCost, vertex);
            predecessors[vertex] = node;
          }
        }
      }
    }
    if (costs[end] === undefined) {
      return null;
    } else {
      return predecessors;
    }
  }
  var extractShortest = function (predecessors, end) {
    var nodes = [],
        u = end;
    while (u) {
      nodes.push(u);
      u = predecessors[u];
    }
    nodes.reverse();
    return nodes;
  }
  var findShortestPath = function (map, nodes) {
    var start = nodes.shift(),
        end,
        predecessors,
        path = [],
        shortest;
    while (nodes.length) {
      end = nodes.shift();
      predecessors = findPaths(map, start, end);
      if (predecessors) {
        shortest = extractShortest(predecessors, end);
        if (nodes.length) {
          path.push.apply(path, shortest.slice(0, -1));
        } else {
          return path.concat(shortest);
        }
      } else {
        return null;
      }
      start = end;
    }
  }
  var toArray = function (list, offset) {
    try {
      return Array.prototype.slice.call(list, offset);
    } catch (e) {
      var a = [];
      for (var i = offset || 0, l = list.length; i < l; ++i) {
        a.push(list[i]);
      }
      return a;
    }
  }
  var Graph = function (map) {
    this.map = map;
  }
  Graph.prototype.findShortestPath = function (start, end) {
    if (Object.prototype.toString.call(start) === '[object Array]') {
      return findShortestPath(this.map, start);
    } else if (arguments.length === 2) {
      return findShortestPath(this.map, [start, end]);
    } else {
      return findShortestPath(this.map, toArray(arguments));
    }
  }
  Graph.findShortestPath = function (map, start, end) {
    if (Object.prototype.toString.call(start) === '[object Array]') {
      return findShortestPath(map, start);
    } else if (arguments.length === 3) {
      return findShortestPath(map, [start, end]);
    } else {
      return findShortestPath(map, toArray(arguments, 1));
    }
  }
  return Graph;
})();

// Google map style options
Library.styles = [
  {
      "featureType": "landscape",
      "stylers": [
          {
              "saturation": -100
          },
          {
              "lightness": 65
          },
          {
              "visibility": "on"
          }
      ]
  },
  {
      "featureType": "poi",
      "stylers": [
          {
              "saturation": -100
          },
          {
              "lightness": 51
          },
          {
              "visibility": "simplified"
          }
      ]
  },
  {
      "featureType": "road.highway",
      "stylers": [
          {
              "saturation": -100
          },
          {
              "visibility": "simplified"
          }
      ]
  },
  {
      "featureType": "road.arterial",
      "stylers": [
          {
              "saturation": -100
          },
          {
              "lightness": 30
          },
          {
              "visibility": "on"
          }
      ]
  },
  {
      "featureType": "road.local",
      "stylers": [
          {
              "saturation": -100
          },
          {
              "lightness": 40
          },
          {
              "visibility": "on"
          }
      ]
  },
  {
      "featureType": "transit",
      "stylers": [
          {
              "saturation": -100
          },
          {
              "visibility": "simplified"
          }
      ]
  },
  {
      "featureType": "administrative.province",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
  {
      "featureType": "water",
      "elementType": "labels",
      "stylers": [
          {
              "visibility": "on"
          },
          {
              "lightness": -25
          },
          {
              "saturation": -100
          }
      ]
  },
  {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
          {
              "hue": "#ffff00"
          },
          {
              "lightness": -25
          },
          {
              "saturation": -97
          }
      ]
  }
];


