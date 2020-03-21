class Place {

    publicPlaces = ["IN_TRAM", "IN_TRAIN" , "IN_BUS" , "IN_FERRY" , "IN_SUBWAY"]; 

    constructor(lat, long, timest, transport) {
        this.lat = lat;
        this.long = long;
        this.timest = timest;

        if (transport && isPublic(transport)) this.publicTransport = true;
    }

    isPublic = transport => {
        publicPlaces.forEach(element => {
            if (transport === element) return true;
        });
        return false;
    }

}

module.exports = Place