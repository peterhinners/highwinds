var Library = {};

function initMap() {
  var i, max;
  // Google Maps custom text overlay code to enable writing of distance text on map;
  // An alternative is to use images and call those with an icon property
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

  var styledMap = new google.maps.StyledMapType(Library.styles,
      {name: "Styled Map"});

  Library.geocoder = new google.maps.Geocoder();

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

  Library.map = new google.maps.Map(document.getElementById('map'), mapOptions);
  Library.map.mapTypes.set('map_style', styledMap);
  Library.map.setMapTypeId('map_style');

  // setup LatLng Objects for all eight POPs
  Library.nyc = new google.maps.LatLng(40.740957, -74.002119);
  Library.chicago = new google.maps.LatLng(41.853895, -87.618449);
  Library.seattle = new google.maps.LatLng(47.614358, -122.338864);
  Library.dc = new google.maps.LatLng(39.016363, -77.459023);
  Library.atlanta = new google.maps.LatLng(33.755464, -84.391533);
  Library.dallas = new google.maps.LatLng(32.800340, -96.819499);
  Library.losAngeles = new google.maps.LatLng(34.047908, -118.255536);
  Library.miami = new google.maps.LatLng(25.782360, -80.193053);

  // setup POP markers
  Library.pops = [Library.nyc, Library.chicago, Library.seattle, Library.dc, Library.atlanta, Library.dallas, Library.losAngeles, Library.miami];

  for (i = 0, max = Library.pops.length; i < max; i++){
    new google.maps.Marker({
    position: {
      lat: Library.pops[i].lat(),
      lng: Library.pops[i].lng()
    },
    map: Library.map
    });
  }

  // setup network connection lines, and use icon to create dotted lines
  var networkConnectionArray = [Library.atlanta, Library.dallas, Library.losAngeles, Library.seattle, Library.chicago, Library.nyc, Library.dc, Library.atlanta, Library.miami, Library.dallas];

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
    map: Library.map
  });

  // This section is for calculating and displaying the distance text between POPs...
  // The offsets and class names are for fine-tuning the distance text placement.
  // Another option is to use images for the static distance text.

  var networkPairs = [
    [Library.nyc, Library.dc, 0.4, "distance nycDC"],
    [Library.dc, Library.atlanta, 0.4, "distance"],
    [Library.atlanta, Library.miami, 0.2, "distance atlantaMiami"],
    [Library.atlanta, Library.dallas, 0.5, "distance"],
    [Library.dallas, Library.miami, 0.3, "distance dallasMiami"],
    [Library.dallas, Library.losAngeles, 0.5, "distance"],
    [Library.losAngeles, Library.seattle, 0.6, "distance losAngelesSeattle"],
    [Library.seattle, Library.chicago, 0.5, "distance seattleChicago"],
    [Library.chicago, Library.nyc, 0.35, "distance"]
  ];


  for(i = 0, max = networkPairs.length; i < max; i++){
    var inBetweenPoint = google.maps.geometry.spherical.interpolate(networkPairs[i][0], networkPairs[i][1], networkPairs[i][2]);
    var distanceBetween = google.maps.geometry.spherical.computeDistanceBetween(networkPairs[i][0], networkPairs[i][1]);
    var customTxt = "<div>" + Math.round(distanceBetween * 0.000621371) + " miles</div>";
    var txt = new TxtOverlay(inBetweenPoint, customTxt, networkPairs[i][3], Library.map);
  }
}

function clientInput() {

  function reset(line, marker) {
    line.setMap(null);
    marker.setMap(null);
  }

  if (Library.optimalPolyline){
   reset(Library.optimalPolyline, Library.clientMarker);
  }

  Library.serverLocation = document.getElementById("dropDown").value;
  var clientAddress = document.getElementById("form-field").elements[0].value;

  if (clientAddress === ""){
    alert("Please enter in client address");
  } else if (Library.serverLocation === "") {
    alert("Please choose a server location");
  } else {
    geocodeAddress(clientAddress);
  }
}

function geocodeAddress(address){
  var client;
  Library.geocoder.geocode( {address:address}, function(results, status){
    if (status == google.maps.GeocoderStatus.OK){
      Library.clientMarker = new google.maps.Marker({
          map: Library.map,
          position: results[0].geometry.location
      });
      client = Library.clientMarker.position;
      optimalRoute(client);
    } else {
      alert('Google Maps Geocoder could not find your address, please try again. ' + status);
    }
  });
}

function optimalRoute(client){
  var i, max;
  var closestPOP = [40075161, ""]; // farthest possible distance from client (earth's circumference in meters), and placeholder
  for (i = 0, max = Library.pops.length; i < max; i++){
    var distanceBetween = google.maps.geometry.spherical.computeDistanceBetween(client, Library.pops[i]);
    if (distanceBetween < closestPOP[0]){
      closestPOP[0] = distanceBetween;
      closestPOP[1] = Library.pops[i];
    }
  }

  var hashTable = {
    "nyc": Library.nyc,
    "dc": Library.dc,
    "atlanta": Library.atlanta,
    "dallas": Library.dallas,
    "losAngeles": Library.losAngeles,
    "chicago": Library.chicago,
    "seattle": Library.seattle,
    "miami": Library.miami
  };

  var startingPoint = Object.keys(hashTable).filter(function(key){
    return hashTable[key] === closestPOP[1];
  })[0];

  function dijkstra(startingPoint, serverLocation){
    var dijkstraMap = {nyc:{dc:219,chicago:711},chicago:{seattle:1736,nyc:711},seattle:{chicago:1736,losAngeles:962},dc:{nyc:219,atlanta:530},atlanta:{dc:530,miami:606,dallas:721},dallas:{atlanta:721,miami:1112,losAngeles:1238},losAngeles:{dallas:1238,seattle:962},miami:{atlanta:606,dallas:1112}};
    var graph = new Library.Graph(dijkstraMap);
    var result = (graph.findShortestPath(startingPoint, Library.serverLocation));
    return result;
  }

  var dijkstraResult = dijkstra(startingPoint, Library.serverLocation);

  var objectifyResult = dijkstraResult.map(function(result) {
    return hashTable[result];
  });

  var optimalPath = [{lat: client.lat(), lng: client.lng()}];
  for (i = 0, max = objectifyResult.length; i < max; i++){
    optimalPath.push({lat: objectifyResult[i].lat(), lng: objectifyResult[i].lng()});
  }

  Library.optimalPolyline = new google.maps.Polyline({
    path: optimalPath,
    geodesic: true,
    strokeOpacity: 1,
    strokeColor: '#FF0000',
    map: Library.map
  });
}


