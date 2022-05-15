// Requiring express to handle routing
const express = require('express');
const { stat } = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

// Setting path for public directory
const staticPath = path.join(__dirname, 'uploads');
app.use(express.static(staticPath));
app.use(express.urlencoded({ extended: true }));

// Check if server is working
app.get('/', (req, res) => {
    res.send('Welcome to your server');
});

// Handling request
app.post('/upload', (req, res) => {
    res.json([
        {
            nameReceived: req.body.name,
            designationReceived: req.body.designation,
        },
    ]);
});

// Server setup
app.listen(port, () => {
    console.log(`server is running at ${port}`);
});
