var map = L.map('map').setView([20.4791, -98.9621,], 8.5);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);




/*var circle = L.circle([20.4791, -98.9621], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 15000
}).addTo(map);
circle.bindPopup("I am a circle.");
var popup = L.popup();

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent("Hiciste click en las siguientes coordenadas: " + e.latlng.toString())
        .openOn(map);
}

map.on('click', onMapClick);*/

