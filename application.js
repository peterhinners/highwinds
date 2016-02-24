var map;
function initMap() {


  function TxtOverlay(pos, txt, cls, map) {

      // Now initialize all properties.
      this.pos = pos;
      this.txt_ = txt;
      this.cls_ = cls;
      this.map_ = map;

      // We define a property to hold the image's
      // div. We'll actually create this div
      // upon receipt of the add() method so we'll
      // leave it null for now.
      this.div_ = null;

      // Explicitly call setMap() on this overlay
      this.setMap(map);
    }

    TxtOverlay.prototype = new google.maps.OverlayView();



    TxtOverlay.prototype.onAdd = function() {

      // Note: an overlay's receipt of onAdd() indicates that
      // the map's panes are now available for attaching
      // the overlay to the map via the DOM.

      // Create the DIV and set some basic attributes.
      var div = document.createElement('DIV');
      div.className = this.cls_;

      div.innerHTML = this.txt_;

      // Set the overlay's div_ property to this DIV
      this.div_ = div;
      var overlayProjection = this.getProjection();
      var position = overlayProjection.fromLatLngToDivPixel(this.pos);
      div.style.left = position.x + 'px';
      div.style.top = position.y + 'px';
      // We add an overlay to a map via one of the map's panes.

      var panes = this.getPanes();
      panes.floatPane.appendChild(div);
    }
    TxtOverlay.prototype.draw = function() {


        var overlayProjection = this.getProjection();

        // Retrieve the southwest and northeast coordinates of this overlay
        // in latlngs and convert them to pixels coordinates.
        // We'll use these coordinates to resize the DIV.
        var position = overlayProjection.fromLatLngToDivPixel(this.pos);


        var div = this.div_;
        div.style.left = position.x + 'px';
        div.style.top = position.y + 'px';



      }





  var styles = [
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

var styledMap = new google.maps.StyledMapType(styles,
    {name: "Styled Map"});



  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 36.55547456, lng: -95.664999},
    zoom: 5,
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
    },
    disableDefaultUI: true,
    scrollwheel: false
  });

  map.mapTypes.set('map_style', styledMap);
  map.setMapTypeId('map_style');

  var newYorkMarker = new google.maps.Marker({
    position: {
      lat: 40.740957,
      lng: -74.002119
    },
    map: map
  });

  var washingtonDCMarker = new google.maps.Marker({
    position: {
      lat: 39.016363,
      lng: -77.459023
    },
    map: map
  });

  var atlantaMarker = new google.maps.Marker({
    position: {
      lat: 33.755464,
      lng: -84.391533
    },
    map: map
  });

  var dallasMarker = new google.maps.Marker({
    position: {
      lat: 32.800340,
      lng: -96.819499
    },
    map: map
  });

  var losAngelesMarker = new google.maps.Marker({
    position: {
      lat: 34.047908,
      lng: -118.255536
    },
    map: map
  });

  var chicagoMarker = new google.maps.Marker({
    position: {
      lat: 41.853895,
      lng: -87.618449
    },
    map: map
  });

  var seattleMarker = new google.maps.Marker({
    position: {
      lat: 47.614358,
      lng: -122.338864
    },
    map: map
  });

  var miamiMarker = new google.maps.Marker({
    position: {
      lat: 25.782360,
      lng: -80.193053
    },
    map: map
  });

  var firstLineCoordinates = [
    {lat: 40.740957, lng: -74.002119},
    {lat: 39.016363, lng: -77.459023},
    {lat: 33.755464, lng: -84.391533},
    {lat: 32.800340, lng: -96.819499},
    {lat: 34.047908, lng: -118.255536},
    {lat: 47.614358, lng: -122.338864},
    {lat: 41.853895, lng: -87.618449},
    {lat: 40.740957, lng: -74.002119}
  ];

  var secondLineCoordinates = [
    {lat: 33.755464, lng: -84.391533},
    {lat: 25.782360, lng: -80.193053}
  ];

  var thirdLineCoordinates = [
    {lat: 32.800340, lng: -96.819499},
    {lat: 25.782360, lng: -80.193053}
  ];

  var lineSymbol = {
    path: 'M 0,-1 0,1',
    strokeOpacity: 1,
    scale: 2.5
  };

  var firstLine = new google.maps.Polyline({
    path: firstLineCoordinates,
    geodesic: true,
    strokeOpacity: 0,
    strokeColor: '#FF0000',
    icons: [{
      icon: lineSymbol,
      offset: '0',
      repeat: '20px'
    }],
    map: map
  });



   var secondLine = new google.maps.Polyline({
    path: secondLineCoordinates,
    geodesic: true,
    strokeOpacity: 0,
    strokeColor: '#FF0000',
    icons: [{
      icon: lineSymbol,
      offset: '0',
      repeat: '20px'
    }],
    map: map
  });

  var thirdLine = new google.maps.Polyline({
    path: thirdLineCoordinates,
    geodesic: true,
    strokeOpacity: 0,
    strokeColor: '#FF0000',
    icons: [{
      icon: lineSymbol,
      offset: '0',
      repeat: '20px'
    }],
    map: map
  });

var nyc = new google.maps.LatLng(40.740957, -74.002119);
var chicago = new google.maps.LatLng(41.853895, -87.618449);
var seattle = new google.maps.LatLng(47.614358, -122.338864);
var dc = new google.maps.LatLng(39.016363, -77.459023);
var atlanta = new google.maps.LatLng(33.755464, -84.391533);
var dallas = new google.maps.LatLng(32.800340, -96.819499);
var losAngeles = new google.maps.LatLng(34.047908, -118.255536);
var miami = new google.maps.LatLng(25.782360, -80.193053);


// The nine paired POPs, plus offset & unique class name
var labelPairs = [
  [nyc, dc, 0.4, "nycDC"],
  [dc, atlanta, 0.4, "chicagoNY"],
  [atlanta, miami, 0.2, "atlantaMiami"],
  [atlanta, dallas, 0.5, "chicagoNY"],
  [dallas, miami, 0.3, "dallasMiami"],
  [dallas, losAngeles, 0.5, "chicagoNY"],
  [losAngeles, seattle, 0.6, "losAngelesSeattle"],
  [seattle, chicago, 0.5, "seattleChicago"],
  [chicago, nyc, 0.35, "chicagoNY"]
];

for(var i = 0; i < labelPairs.length; i++){
  var inBetween = google.maps.geometry.spherical.interpolate(labelPairs[i][0], labelPairs[i][1], labelPairs[i][2]);
  var distanceBetween = google.maps.geometry.spherical.computeDistanceBetween(labelPairs[i][0], labelPairs[i][1]);
  var customTxt = "<div>" + Math.round(distanceBetween * 0.000621371) + " miles</div>";
  var txt = new TxtOverlay(inBetween, customTxt, labelPairs[i][3], map);
}




// Chicago / New York label
// var inBetween = google.maps.geometry.spherical.interpolate(chicago, nyc, 0.5);
// var distanceBetween = google.maps.geometry.spherical.computeDistanceBetween(chicago, nyc);
// customTxt = "<div>" + Math.round(distanceBetween * 0.000621371) + "miles</div>";
// txt = new TxtOverlay(inBetween, customTxt, "chicagoNY", map);



// var markerTest = new google.maps.Marker({
//   position: inBetween,
//   map: map,
//   visible: true,
//   icon: {},
//   label: {
//     text: 'Yo',
//     color: 'purple'
//   }
// });

// labelMarker = new google.maps.Marker({
//         position: inBetween,
//         map: map,
//         visible: false
//     });

// var myLabel = new Label();

//   myLabel.bindTo('position', labelMarker, 'position');
//         myLabel.set("hey mom");
//           myLabel.setMap(map);





 // var mapLabel = new Label({
 //        text: 'Test',
 //        position: inBetween,
 //        map: map,
 //        fontSize: 35,
 //        align: 'right'
 //    });










 function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2-lat1);  // deg2rad below
    var dLon = deg2rad(lon2-lon1);
    var a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
      Math.sin(dLon/2) * Math.sin(dLon/2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c; // Distance in km
    return d * 0.621371;
 }

  function deg2rad(deg) {
    return deg * (Math.PI/180)
  }



}

// google.maps.event.addDomListener(window, 'load', initMap);