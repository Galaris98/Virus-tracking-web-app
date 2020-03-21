class Placemark {
    constructor(id, long, lat) {
    this.name = '<name>' + id + '</name>'
    this.description = '<description>Someone with COVID-19 infection was here</description>'
    this.point = '<Point><coordinates>'+ long +','+ lat + '</coordinates></Point>'
    }

    getPlacemark() {
        return '<Placemark> ' + this.name + this.description + this.point + '</Placemark>';
    }
       
    /*
    <?xml version="1.0" encoding="UTF-8"?>
    <kml xmlns="http://www.opengis.net/kml/2.2">
      <Placemark>
        <name>Simple placemark</name>
        <description>Attached to the ground. Intelligently places itself 
           at the height of the underlying terrain.</description>
        <Point>
          <coordinates>-122.0822035425683,37.42228990140251,0</coordinates>
        </Point>
      </Placemark>
    </kml>
    */
}

module.exports = Placemark;