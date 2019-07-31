// Set up the variables =========================================================
const https = require('https');

// Register the API routes
module.exports = function (app) {

    // Search YouTube videos ----------------------------------------------------
    app.get('/api/search', function(req, res, next) {
        if(!req.query.value) return next('ERROR: \'value\' query string param is required');

        var pageToken = req.query.pageToken

        var params = '?part=snippet';
        params += '&order=relevance';
        params += '&maxResults=10';
        if (pageToken && pageToken.length > 0) params += '&pageToken=' + pageToken;
        params += '&q=' + req.query.value;
        params += '&type=video';
        params += '&key=' + process.env.GOOGLE_API_KEY;

        https.get('https://www.googleapis.com/youtube/v3/search' + params, (resp) => {
        let data = '';

          // A chunk of data has been recieved.
          resp.on('data', (chunk) => {
            data += chunk;
          });

          // The whole response has been received. Print out the result.
          resp.on('end', () => {
            res.send(JSON.parse(data));
          });

        }).on("error", (err) => {
          console.log("Error: " + err.message);
          return next(err);
        });
    });
};
