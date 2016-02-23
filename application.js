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





}