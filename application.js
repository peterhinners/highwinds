var map;
var nyc;
var chicago;
var seattle;
var dc;
var atlanta;
var dallas;
var losAngeles;
var miami;
var pops;
var optimalPolyline;
var clientMarker;
var serverLocation;

function initMap() {

  function TxtOverlay(pos, txt, cls, map) {
    this.pos = pos;
    this.txt_ = txt;
    this.cls_ = cls;
    this.map_ = map;
    this.div_ = null;
    this.setMap(map);
  }

  TxtOverlay.prototype = new google.maps.OverlayView();

  TxtOverlay.prototype.onAdd = function() {
    var div = document.createElement('DIV');
    div.className = this.cls_;
    div.innerHTML = this.txt_;
    this.div_ = div;
    var overlayProjection = this.getProjection();
    var position = overlayProjection.fromLatLngToDivPixel(this.pos);
    div.style.left = position.x + 'px';
    div.style.top = position.y + 'px';
    var panes = this.getPanes();
    panes.floatPane.appendChild(div);
  }

  TxtOverlay.prototype.draw = function() {
      var overlayProjection = this.getProjection();
      var position = overlayProjection.fromLatLngToDivPixel(this.pos);
      var div = this.div_;
      div.style.left = position.x + 'px';
      div.style.top = position.y + 'px';
  }

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
  pops = [nyc, chicago, seattle, dc, atlanta, dallas, losAngeles, miami];

  for (var i = 0; i < pops.length; i++){
    new google.maps.Marker({
    position: {
      lat: pops[i].lat(),
      lng: pops[i].lng()
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

  // This section is for calculating and displaying the distance text between POPs...
  // The offsets and class names are for fine-tuning the distance text.
  // Another option is to use images for the static distance text.

  var networkPairs = [
    [nyc, dc, 0.4, "distance nycDC"],
    [dc, atlanta, 0.4, "distance"],
    [atlanta, miami, 0.2, "distance atlantaMiami"],
    [atlanta, dallas, 0.5, "distance"],
    [dallas, miami, 0.3, "distance dallasMiami"],
    [dallas, losAngeles, 0.5, "distance"],
    [losAngeles, seattle, 0.6, "distance losAngelesSeattle"],
    [seattle, chicago, 0.5, "distance seattleChicago"],
    [chicago, nyc, 0.35, "distance"]
  ];

  for(var i = 0; i < networkPairs.length; i++){
    var inBetweenPoint = google.maps.geometry.spherical.interpolate(networkPairs[i][0], networkPairs[i][1], networkPairs[i][2]);
    var distanceBetween = google.maps.geometry.spherical.computeDistanceBetween(networkPairs[i][0], networkPairs[i][1]);
    var customTxt = "<div>" + Math.round(distanceBetween * 0.000621371) + " miles</div>";
    var txt = new TxtOverlay(inBetweenPoint, customTxt, networkPairs[i][3], map);
  }
}

function clientInput() {

  function reset(line, marker) {
    line.setMap(null);
    marker.setMap(null);
  }

  if (optimalPolyline){
   reset(optimalPolyline, clientMarker);
  }

  serverLocation = document.getElementById("dropDown").value;
  var clientAddress = document.getElementById("form-field").elements[0].value;

  if (clientAddress === ""){
    alert("Please enter in client address");
  } else if (serverLocation === "") {
    alert("Please choose a server location.");
  } else {
    geocodeAddress(clientAddress);
  }
}

function geocodeAddress(address){
  var client;
  geocoder.geocode( {address:address}, function(results, status){
    if (status == google.maps.GeocoderStatus.OK){
      clientMarker = new google.maps.Marker({
          map: map,
          position: results[0].geometry.location
      });
      client = clientMarker.position;
      optimalRoute(client);
    } else {
      alert('Google Maps Geocoder could not find your address, please try again. ' + status);
    }
  });
}

function optimalRoute(client){
  var closest = [40075161, ""]; // farthest possible distance from client (earth's circumference in meters), and placeholder
  for (var i = 0; i < pops.length; i++){
    var distanceBetween = google.maps.geometry.spherical.computeDistanceBetween(client, pops[i]);
    if (distanceBetween < closest[0]){
      closest[0] = distanceBetween;
      closest[1] = pops[i];
    }
  }

  switch (closest[1]) {
    case nyc:
        var startingPoint = "nyc";
        break;
    case dc:
        var startingPoint = "dc";
        break;
    case atlanta:
        var startingPoint = "atlanta";
        break;
    case dallas:
        var startingPoint = "dallas";
        break;
    case losAngeles:
        var startingPoint = "losAngeles";
        break;
    case chicago:
        var startingPoint = "chicago";
        break;
    case seattle:
        var startingPoint = "seattle";
        break;
    case miami:
        var startingPoint = "miami";
        break;
  }

  var dijkstraMap = {nyc:{dc:219,chicago:711},chicago:{seattle:1736,nyc:711},seattle:{chicago:1736,losAngeles:962},dc:{nyc:219,atlanta:530},atlanta:{dc:530,miami:606,dallas:721},dallas:{atlanta:721,miami:1112,losAngeles:1238},losAngeles:{dallas:1238,seattle:962},miami:{atlanta:606,dallas:1112}};
  var graph = new Graph(dijkstraMap);
  var result = (graph.findShortestPath(startingPoint, serverLocation));
  var objectifiedResult = result.map(function(str){
    return eval("("+str+")");
  })

  var optimalPath = [{lat: client.lat(), lng: client.lng()}];
  for (var i = 0; i < objectifiedResult.length; i++){
    optimalPath.push({lat: objectifiedResult[i].lat(), lng: objectifiedResult[i].lng()});
  }

  optimalPolyline = new google.maps.Polyline({
    path: optimalPath,
    geodesic: true,
    strokeOpacity: 1,
    strokeColor: '#FF0000',
    map: map
  });
}


// google.maps.event.addDomListener(window, 'load', initMap);