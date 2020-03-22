import './L.KML.js'

const apiurl1 = "https://api.opencagedata.com/geocode/v1/json?q="
const apirul2 = "&key=92086730b6e54578a75d9188d26ddc0f&language=de&pretty=1&no_annotations=1"

var startlat = 52.520008;
var startlong = 13.404954;

var mymap

navigator.geolocation.getCurrentPosition(function(position) {
    startlat = position.coords.latitude
    startlong = position.coords.longitude
});

mymap = L.map('mapid').setView([startlat, startlong], 10);


class Place{
    constructor(name, long, lat){
        this.name = name,
        this.long = long,
        this.lat = lat
    }
}

var app = new Vue({
    el: '#app',
    data: {
      vorschlaege: [],
      long: [],
      lat: [],
      suche: '',
      items: new Array()
    },
    methods: {
        searchPlaces: function (event) {
            if (this.suche.length > 2) {
            fetch(apiurl1 + this.suche + apirul2)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    this.vorschlaege = [];
                    this.long = [];
                    this.lat = [];
                    for (var i = 0; i <= 2; i++) {
                        if (data.results[i]) {
                            this.vorschlaege.push(data.results[i].formatted)
                            this.lat.push(data.results[i].geometry.lat)
                            this.long.push(data.results[i].geometry.lng)
                        }
                    }
                    mymap.setView([this.lat[0],this.long[0]], 14 );
                    var newMarker = new L.marker([this.lat[0],this.long[0]],{
                    }).addTo(mymap);

                });
            }
        },
        addPlace: function(index) {
            let place = new Place(this.vorschlaege[index],this.long[index],this.lat[index]);
            this.items.push(place);
            console.log(this.items);
        },
        savePlaces: function() {
            $.ajax({
                url: "/upload_standorte",
                type: "POST",
                dataType: 'json',
                data: {data: JSON.stringify(this.items)},
                success: function(response){console.log('Data send!')}
               });
            console.log(this.items)
            this.items = []
            location.reload();
        }
      }
})

var mouseMarker = {
    lat: 0,
    long:0
}

mymap.on('click', function(e) {
        // go to click
        mouseMarker.lat = e.latlng.lat
        mouseMarker.long = e.latlng.lng
        console.log(e)
        mymap.setView([mouseMarker.lat,mouseMarker.long], 14 );
    })

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2hyYXVzZW4iLCJhIjoiY2s4Mjc4NmcxMGQ2MjNscHR3aXRneWJuYSJ9.3iXyE1IalmBHqLZ8ZibX1w', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
    }).addTo(mymap);

    // Load kml file
    fetch('./KML/placesKML.kml')
    .then(res => res.text())
    .then(kmltext => {
        // Create new kml overlay
        const parser = new DOMParser();
        const kml = parser.parseFromString(kmltext, 'text/xml');
        const track = new L.KML(kml);
        var markers = L.markerClusterGroup();
        markers.addLayer(track)
        mymap.addLayer(markers);
        // Adjust map to show the kml

    });
