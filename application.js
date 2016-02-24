var map;
function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 36.55547456, lng: -95.664999},
    zoom: 5
  });

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
    {lat: 41.853895, lng: -87.618449},
    {lat: 40.740957, lng: -74.002119}
  ];

  var firstLine = new google.maps.Polyline({
    path: firstLineCoordinates,
    geodesic: true,
    strokeColor: '#FF0000',
    strokeOpacity: 1.0,
    strokeWeight: 2
  });

  firstLine.setMap(map);

var nyc = new google.maps.LatLng(40.740957, -74.002119);
var chicago = new google.maps.LatLng(41.853895, -87.618449);
var inBetween = google.maps.geometry.spherical.interpolate(nyc, chicago, 0.5);


var markerTest = new google.maps.Marker({
  position: inBetween,
  map: map,
  visible: false,
});

var myLabel = new Label();



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