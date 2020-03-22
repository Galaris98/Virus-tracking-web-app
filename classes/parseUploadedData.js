const fs = require ('fs')
const createPlaces = require('./createPlaces');
const ConvertPlacesToKML = require('./convertPlacesToKML.js');


class ParseUploadedData {

    constructor(filename,manuelleDaten) {
        
            fs.readFile('./uploads/' + filename,'utf8', (err, data) => {
            if (err) {
                console.log('Nehme manuelle Daten...')
                data = manuelleDaten
            }
            if(manuelleDaten){
                var tempPlaces = new createPlaces(data,1);
            }else{
                var tempPlaces = new createPlaces(JSON.parse(data),0);

            }

            //_----------------------------------------------------------


            fs.readFile('./data/placesJSON.json' , (err, data) => {
                //Wenn Fehler dann erstelle neue Datei mit aktuellen daten:
                if (err) {
                    console.log('Verzeichnis nicht gefunden, erstelle neue Datei für places');
                    
                    fs.writeFile('./data/placesJSON.json', JSON.stringify([tempPlaces]), (err) => {
                        if (err) throw err;
                        console.log("The file was succesfully saved!");
                        var converter = new ConvertPlacesToKML()

                    });
                    return;
                }


                //MUSS DATA NEUES ELEMENT PUSHEN
                //console.log(JSON.parse(data)[0].places)
                var oldData = JSON.parse(data)

                oldData.push(tempPlaces);

                fs.writeFile('./data/placesJSON.json', JSON.stringify(oldData), (err) => {
                    if (err) throw err;
                    console.log("The file was succesfully updated");
                    var converter = new ConvertPlacesToKML()
                });

            });


            //_----------------------------------------------------------

            //After creating places Delete file
            fs.unlink('./uploads/' + filename, err => {
                if (err) {
                    //console.log(err)
                }
            })
        })

    }

}

module.exports = ParseUploadedData