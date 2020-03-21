class Place {
    constructor(lat, long, timestStart,timestEnd , transport) {
        this.publicPlaces = ["IN_TRAM", "IN_TRAIN" , "IN_BUS" , "IN_FERRY" , "IN_SUBWAY"];
        //location
        this.lat = lat;
        this.long = long;
        //duration
        this.timestStart = timestStart;
        this.timestEnd = timestEnd;

        this.publicTransport = false;

        if (transport && isPublic(transport)) this.publicTransport = true;
    }

    isPublic(transport) {
        publicPlaces.forEach(element => {
            if (transport === element) return true;
        });
        return false;
    }

    toJSON = function() {
        return {
            lat: this.lat,
            long: this.long,
            timestStart: this.timestStart,
            timestEnd: this.timestEnd

        };
    };

}

module.exports = Place