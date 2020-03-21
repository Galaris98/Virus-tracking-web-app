const fs = require ('fs')
const createPlaces = require('./createPlaces');

class ParseUploadedData {

    constructor(filename) {
        
            fs.readFile('./uploads/' + filename,'utf8', (err, data) => {
            if (err) {
                console.log(err)
                return
            } 
            new createPlaces(JSON.parse(data));
        })

    }
    
}

module.exports = ParseUploadedData