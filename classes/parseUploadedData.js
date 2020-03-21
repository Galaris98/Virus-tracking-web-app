const fs = require ('fs')
const createPlaces = require('./createPlaces');
const ConvertPlacesToKML = require('./convertPlacesToKML.js');


class ParseUploadedData {

    constructor(filename) {
        
            fs.readFile('./uploads/' + filename,'utf8', (err, data) => {
            if (err) {
                console.log(err)
                return
            } 
            var tempPlaces = [new createPlaces(JSON.parse(data))];
            var converter = new ConvertPlacesToKML(tempPlaces)
            
            //After creating places Delete file
            fs.unlink('./uploads/' + filename, err => {
                if (err) {
                    console.log(err)
                }
            })
        })

    }

}

module.exports = ParseUploadedData