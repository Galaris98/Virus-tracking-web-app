import './L.KML.js'

const apiurl1 = "https://api.opencagedata.com/geocode/v1/json?q="
const apirul2 = "&key=92086730b6e54578a75d9188d26ddc0f&language=de&pretty=1&no_annotations=1"
var mymap = L.map('mapid').setView([54.323292, 10.122765], 13);


var app = new Vue({
    el: '#app',
    data: {
      vorschlaege: [],
      long: [],
      lat: [],
      suche: '',
      items: []
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
                });
            }
        },
        addPlace: function(index) {
            let place = {
                name: this.vorschlaege[index],
                long: this.long[index],
                lat: this.lat[index]
            }
            this.items.push(place);
        },
        savePlaces: function() {
            $.post("/upload_standorte", JSON.stringify(this.items), function(result){
            });
            this.items = []
        }
      }
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

        mymap.addLayer(track);
        // Adjust map to show the kml

    });


