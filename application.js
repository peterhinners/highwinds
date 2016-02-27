var map;
var nyc;
var chicago;
var seattle;
var dc;
var atlanta;
var dallas;
var losAngeles;
var miami;

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

geocoder = new google.maps.Geocoder();

var mapOptions = {
    center: {lat: 38.55547456, lng: -95.664999},
    zoom: 5,
    mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'map_style']
    },
    disableDefaultUI: true,
    scrollwheel: false,
    draggable: false,
    panControl: false,
    disableDoubleClickZoom: true
  };

  map = new google.maps.Map(document.getElementById('map'), mapOptions);


  map.mapTypes.set('map_style', styledMap);
  map.setMapTypeId('map_style');



  // setup LatLng Objects for all eight POPs
  nyc = new google.maps.LatLng(40.740957, -74.002119);
  chicago = new google.maps.LatLng(41.853895, -87.618449);
  seattle = new google.maps.LatLng(47.614358, -122.338864);
  dc = new google.maps.LatLng(39.016363, -77.459023);
  atlanta = new google.maps.LatLng(33.755464, -84.391533);
  dallas = new google.maps.LatLng(32.800340, -96.819499);
  losAngeles = new google.maps.LatLng(34.047908, -118.255536);
  miami = new google.maps.LatLng(25.782360, -80.193053);

  // setup POP markers
  var latLngArray = [nyc, chicago, seattle, dc, atlanta, dallas, losAngeles, miami];

  for (var i = 0; i < latLngArray.length; i++){
    new google.maps.Marker({
    position: {
      lat: latLngArray[i].lat(),
      lng: latLngArray[i].lng()
    },
    map: map
    });
  }

  // setup network connection lines, and use icon to create dotted lines
  var networkConnectionArray = [atlanta, dallas, losAngeles, seattle, chicago, nyc, dc, atlanta, miami, dallas];

  var lineSymbol = {
    path: 'M 0,-1 0,1',
    strokeOpacity: 1,
    scale: 2.5
  };

  var networkPolyline = new google.maps.Polyline({
    path: networkConnectionArray,
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





// The nine pairs of networked POPs in an array, to facilitate iterating through them,
// plus offset & unique class name
var networkPairs = [
  [nyc, dc, 0.4, "distance nycDC"],
  [dc, atlanta, 0.4, "distance chicagoNY"],
  [atlanta, miami, 0.2, "distance atlantaMiami"],
  [atlanta, dallas, 0.5, "distance chicagoNY"],
  [dallas, miami, 0.3, "distance dallasMiami"],
  [dallas, losAngeles, 0.5, "distance chicagoNY"],
  [losAngeles, seattle, 0.6, "distance losAngelesSeattle"],
  [seattle, chicago, 0.5, "distance seattleChicago"],
  [chicago, nyc, 0.35, "distance chicagoNY"]
];

// iterate through POP pairs to find the midpoint distance between them, and print out their
// distance apart from each other at that midpoint with google maps custom OverLay. Was
// tempted to have just hard coded the distances since they should not really ever change.

  for(var i = 0; i < networkPairs.length; i++){
    var inBetweenPoint = google.maps.geometry.spherical.interpolate(networkPairs[i][0], networkPairs[i][1], networkPairs[i][2]);
    var distanceBetween = google.maps.geometry.spherical.computeDistanceBetween(networkPairs[i][0], networkPairs[i][1]);
    var customTxt = "<div>" + Math.round(distanceBetween * 0.000621371) + " miles</div>";
    var txt = new TxtOverlay(inBetweenPoint, customTxt, networkPairs[i][3], map);
  }





}

// google.maps.event.addDomListener(window, 'load', initMap);