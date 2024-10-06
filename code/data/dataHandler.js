const express = require('express');
const router = express.Router();
const config = require('../config.json');
const multer = require('multer');
const path = require('path');
const pdf2html = require('pdf2html');
const fs = require('fs');

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();
today = `${mm}-${dd}-${yyyy}`;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../uploads/plan'); 
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const filename = `${today}_${file.originalname}`; 
        cb(null, filename);
    }
});


const upload = multer({
    storage: storage,
    limits: { fileSize: 1000 * 1024 * 1024 }
});

const storage2 = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, '../uploads/news'); 
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const filename = `${today}_${file.originalname}`; 
        cb(null, filename);
    }
});


const upload2 = multer({
    storage: storage2,
    limits: { fileSize: 1000 * 1024 * 1024 }
});


router.get('/test/', (req, res) => {
    console.log('=======================================================');
    console.log(`Request from IP: ${req.ip}`);
    console.log('=======================================================');
    res.json({
        planData: "<p>Test Data</p>"
    });
});


router.post('/setPlan/', upload.single('file'), (req, res) => {

    const password = req.body.password;
    if (password !== config.ADMINPASS) {
        return res.status(403).json({ message: 'Invalid password' });
    }


    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    if(req.file.filename.includes('.pdf')) {

        console.log(`File uploaded: ${req.file.filename}`);
        res.status(200).json({ message: 'File uploaded successfully', filename: req.file.filename });
    } else {
        return res.status(405).json({ message: 'Not A Pdf file' });
    }

    convert('./uploads/plan/' + req.file.filename, './public/data/plan/', req.file.filename);
});

router.post('/setNews/', upload2.single('file'), (req, res) => {

    const password = req.body.password;
    if (password !== config.SETNEWSPASS) {
        return res.status(403).json({ message: 'Invalid password' });
    }


    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    if(req.file.filename.includes('.pdf')) {

        console.log(`File uploaded: ${req.file.filename}`);
        res.status(200).json({ message: 'File uploaded successfully', filename: req.file.filename });
    } else {
        return res.status(405).json({ message: 'Not A Pdf file' });
    }

    convert('./uploads/news/' + req.file.filename, './public/data/news/', req.file.filename);
});


router.use((req, res) => {
    res.status(404).json({ message: 'Endpoint not found' });
});


async function convert(file, newPath, filename) {
    fs.copyFile(file, newPath + `latest.pdf`, (err, data) => {
        if(err) {
            console.log(data);
        } else {
            console.log(filename + " is now the most recent object in " + newPath);
        }
    })
}


module.exports = router;