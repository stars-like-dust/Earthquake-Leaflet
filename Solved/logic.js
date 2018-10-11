// Creating our initial map object
// We set the longitude, latitude, and the starting zoom level
// This gets inserted into the div with an id of 'map'
var myMap = L.map("map", {
  center: [17.5739, -3.9861],
  zoom: 2
});

// Adding a tile layer (the background map image) to our map
// We use the addTo method to add objects to our map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Earth Quaks | Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 28,
  // type of map
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

// var marker = L.marker([38.90287, -77.02742], {
//   draggable: true,
//   title: "Where We Learn!"
// }).addTo(myMap);


var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.geojson";


// Grabbing our GeoJSON data..
d3.json(link, function(data) {

  function styleInfo (feature) {
    return {
      color: "white",
      fillColor: chooseColor(feature.geometry.coordinates),
      fillOpacity: 0.5,
      weight: 1.5,
      radius: getRadius(fature.properties.mag)
    };
  }
  // Creating a GeoJSON layer with the retrieved data
  //L.geoJson(data).addTo(map);
  L.geoJson(data, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng);
  },
  onEachFeature: function(feature, layer) {
    layer.bindPopup("magnitude; " + feature.properties.mag)
  }

  // style: function(feature) {
  //   return {
  //     color: "white",
  //     fillColor: chooseColor(feature.geometry.coordinates),
  //     fillOpacity: 0.5,
  //     weight: 1.5,
  //     radius: getRadius(fature.properties.mag)
  //   };

}).addTo(myMap);
  
});



// L.geoJSON(someGeojsonFeature, {
//   pointToLayer: function (feature, latlng) {
//       return L.circleMarker(latlng, geojsonMarkerOptions);
//   }
// }).addTo(map);


// Earthquake = d3.json(queryUrl, function(data) {
//   // Once we get a response, send the data.features object to the createFeatures function
//   createFeatures(data.features);
// });

// console.log(Earthquake);


