// Requiring express to handle routing
const express = require('express');

// The fileUpload npm package for handling
// file upload functionality
const fileUpload = require('express-fileupload');

// Creating app
const app = express();

// Passing fileUpload as a middleware
app.use(fileUpload());

app.get('/', (req, res) => {
    res.send('Welcome to your server');
});

// For handling the upload request
app.post('/upload', function (req, res) {
    // When a file has been uploaded
    if (req.files && Object.keys(req.files).length !== 0) {
        // Uploaded path
        const uploadedFile = req.files.profileImg;

        // Logging uploading file
        console.log(profileImg);

        // Upload path
        const uploadPath = __dirname + '/uploads/' + uploadedFile.name;

        // To save the file using mv() function
        uploadedFile.mv(uploadPath, function (err) {
            if (err) {
                console.log(err);
                res.send('Failed !!');
            } else res.send('Successfully Uploaded !!');
        });
    } else res.send('No file uploaded !!');
});

// Makes app listen to port 8080
app.listen(3000, function (req, res) {
    console.log('Started listening to port 3000');
});
