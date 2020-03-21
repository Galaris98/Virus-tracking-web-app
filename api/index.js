const express = require('express')
var multer = require('multer');
var upload = multer();

const router = express.Router();

router.get('/upload_takeout', upload.array(), (req, res) => {
    console.log(Date.now());
})

module.exports = router;