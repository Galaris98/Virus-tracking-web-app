var express = require('express');
var app = express();
const fs = require('fs')

const PORT = process.env.PORT || 80;
app.listen(PORT, () => console.log("Server Listening on " + PORT))

app.use(express.static('public'));

app.use(require('./api'))
