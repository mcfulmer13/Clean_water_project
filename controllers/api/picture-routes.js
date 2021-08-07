const router = require("express").Router();
const path = require('path');
// id and key go here


const aws = require('aws-sdk')
const multer = require('multer')
const multerS3 = require('multer-s3')
const app = express()
const s3 = new aws.S3({
  accessKeyId: access_id,
  secretAccessKey: access_key,
  region: 'us-east-1'
})

const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: "clean-water-app",
        metadata: function (req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function (req, file, cb) {
            cb(null, Date.now().toString())
        }
    })
 })

// uploading one picture
router.post('/upload', upload.single('photos'), function (req, res, next) {
    res.send({
        data: req.files,
        msg: 'Successfully uploaded ' + req.files + ' files!'
    })
 })
// multiple pcitures
 router.post('/upload', upload.array('photos', 3), function (req, res, next) {
    res.send({
        data: req.files,
        msg: 'Successfully uploaded ' + req.files.length + ' files!'
    })
 })
 router.listen(3001, function () {
    console.log('express is online');
 })

 module.exports = router;
