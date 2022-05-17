const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('uploads'));

// Check if server is working
app.get('/', (req, res) => {
    res.send('Server is up and working');
});

const imageStorage = multer.diskStorage({
    destination: 'uploads', // Destination to store image
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now() + path.extname(file.originalname));
        // file.profileImg is name of the field (image), path.extname get the uploaded file extension
    },
});

const imageUpload = multer({
    storage: imageStorage,
    limits: {
        fileSize: 1000000, // 1000000 Bytes = 1 MB
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg)$/)) {
            // upload only png and jpg format
            return cb(new Error('Please upload an image'));
        }
        cb(undefined, true);
    },
});

// For Single image upload
app.post(
    '/upload',
    imageUpload.single('profileImg'),
    (req, res) => {
        res.send(req.file);
    },
    (error, req, res, next) => {
        res.status(400).send({ error: error.message });
    }
);

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});
