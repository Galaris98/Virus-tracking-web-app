var express = require('express');
var app = express();
const fs = require('fs')

const createPlaces = require('./classes/createPlaces');
var timeLineData;

const PORT = process.env.PORT || 80;
app.listen(PORT, () => console.log("Server Listening on " + PORT))

app.use(express.static('public'));

app.use(require('./api'))


//Testing Filereading and json parsing: ----------------------------------------------------------------------------------------------------
if (true) {
    fs.readFile('./myTakeout/2020_M_C.json', (err, data) => {
        if (err) {
            console.log(err)
            return
        } 
        
        new createPlaces(JSON.parse(data));
    })
}

