// Set up the variables =========================================================
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var port = process.env.PORT || 3000;
var app = express();

// Configuration ================================================================
app.use(express.static('./dist')); // set the static files location /public/img will be /img for users
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // parse application/json

// Routes =======================================================================
require('./routes/youtube-api.js')(app);
require('./routes/youtube-dl.js')(app);

// Listen =======================================================================
app.listen(port, function () {
    console.log('Application listening on port %d', port);
});