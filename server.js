const express = require('express');
const multer = require('multer');
const upload = multer({ dest: __dirname + '/uploads' });

const app = express();
const PORT = 3000;

app.use(express.static('uploads'));

app.post('/upload', upload.single('profileImg'), (req, res) => {
    if (req.file) {
        res.json(req.file);
    } else throw 'error';
});

app.listen(PORT, () => {
    console.log('Listening at ' + PORT);
});
