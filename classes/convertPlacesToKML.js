
const Placemark = require('./Placemark.js');
const fs = require('fs');

class ConvertPlacesToKML {
    
    constructor() {
        fs.readFile('./data/placesJSON.json' , (err, data) => {
            //Wenn Fehler dann erstelle neue Datei mit aktuellen daten:
            if (err) {
                console.log (' loged ' + err)
                return;
            }
            var placesArray = JSON.parse(data);
            this.createKMLFile(placesArray)
        });

    }

    createKMLFile(places){
        this.kmlString = '<?xml version="1.0" encoding="UTF-8"?><kml xmlns="http://www.opengis.net/kml/2.2">';
        places.forEach(placesArr => {
            placesArr.places.forEach(placeElement => {
                var name = placesArr.id;
                var lat = placeElement.lat;
                var long = placeElement.long;
                               
                var temp = new Placemark(name, long, lat);

                this.kmlString += temp.getPlacemark();
            })

        });

        this.kmlString += '</kml>';

        fs.writeFile('./public/KML/placesKML.kml', this.kmlString, 'UTF-8', (err) => {
            if (err) throw err;
        
            console.log("The file was succesfully saved!");
        });


    }

}

module.exports = ConvertPlacesToKML;