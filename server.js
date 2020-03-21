var express = require('express');
var app = express();
const fs = require('fs')

const createPlaces = require('./classes/createPlaces');
var timeLineData;

const PORT = process.env.PORT || 80;
app.listen(PORT, () => console.log("Server Listening on " + PORT))

app.use(express.static('public'));

(async =>
fs.readFile('./myTakeout/2020_M_C.json', (err, data) => {
    if (err) {
        console.log(err)
        return
    } 
    timeLineData = JSON.parse(data);
    console.log(JSON.parse(data))
})).then(() => {
    new createPlaces(timeLineData);
})

