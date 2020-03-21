var express = require('express');
var app = express();

const PORT = process.env.PORT || 80;
app.listen(PORT, () => console.log("Server Listening on " + PORT))

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.send('hello world');
});