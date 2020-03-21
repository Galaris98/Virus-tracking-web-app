const express = require('express')
const ParseUploadedData = require('../classes/parseUploadedData.js');
var multer = require('multer');
var upload = multer({ dest: 'uploads/'});

const router = express.Router();

router.post('/upload_takeout', upload.single('takeout'), (req, res) => {
    new ParseUploadedData(req.file.filename)
    res.redirect('/');
})

module.exports = router;