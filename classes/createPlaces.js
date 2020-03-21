const Place = require('./places.js');

class createPlaces {

    constructor(takeout) {
        this.places = [];
        this.id = this.makeid(5);

        //check for places visited
        this.checkPlaces(takeout);

    }

    checkPlaces(takeout) {
        takeout.timelineObjects.forEach(element => {
            //Check for places visited
            if (element.placeVisit && 
                element.placeVisit.duration.startTimestampMs  < Date.now() - 1209600 ){

                var newPlaceLat = element.placeVisit.location.latitudeE7;
                var newPlaceLong = element.placeVisit.location.longitudeE7;
                var newPlaceTimeStart = element.placeVisit.duration.startTimestampMs;
                var newPlaceTimeEnd = element.placeVisit.duration.endTimestampMs;
                
                //Default value
                var newPlacePublicTrans = ""

                var newPlace = new Place(newPlaceLat,newPlaceLong,newPlaceTimeStart,newPlaceTimeEnd,"");
                this.places.push(newPlace)
                
            }
            
        });

        console.log(this.places.length);
        console.log(this.id);

    }

    // from Stackoverflow:
    // https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
    makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
     }
 
}

module.exports = createPlaces
