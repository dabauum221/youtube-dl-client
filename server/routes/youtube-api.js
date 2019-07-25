// Set up the variables =========================================================
var YouTube = require('youtube-node');
var youTube = new YouTube();

youTube.setKey(process.env.GOOGLE_API_KEY);


// Register the API routes
module.exports = function (app) {

    // Search YouTube videos ----------------------------------------------------
    app.get('/api/search', function(req, res, next) {
        if(!req.query.value) return next('ERROR: \'value\' query string param is required');

        var pageToken = req.query.pageToken

        // Use the youtube search library to search the value and respond with the results
        youTube.search(req.query.value, 10, {pageToken: pageToken, type: 'video'}, function(error, result) {
            if (error) {
                return next(error);
            } else {
                console.info('Searching for "%s" found %d results', req.query.value, result.items.length);
                res.send(result);
            }
        });
    });
};
