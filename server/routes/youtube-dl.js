// Set up the variables =========================================================
var ytdl = require('youtube-dl');
var validUrl = require('valid-url');
var utf8 = require('utf8');

// Register the API routes
module.exports = function (app) {

  // Get info from a YouTube video --------------------------------------------
  app.get('/api/info', function (req, res, next) {
    if (!req.query.url) return next('ERROR: \'url\' query string param is required');

    var url = decodeURIComponent(req.query.url);
    // Respond with the video info as JSON
    ytdl.getInfo(url, function (err, info) {
      if (err) {
        console.error('ERROR: /api/info ' + err);
        return next(err);
      }
      res.send(info);
    });
  });

  // Download a YouTube video -------------------------------------------------
  app.get('/api/download', function (req, res, next) {
    if (!req.query.url) return next('ERROR: \'url\' query string param is required');

    var url = decodeURIComponent(req.query.url);
    var watch = decodeURIComponent(req.query.watch);
    var format = decodeURIComponent(req.query.format);

    var title;
    var ext;
    if (!req.query.title || !req.query.ext) {
      ytdl.getInfo(url, function (err, info) {
        if (err) {
          console.error('ERROR: /api/info ' + err);
          return next(err);
        }
        title = (req.query.title && req.query.title.length > 0 ? decodeURIComponent(req.query.title) : info.title);
        ext = (req.query.ext && req.query.ext.length > 0 ? decodeURIComponent(req.query.ext) : info.ext);
      });
    } else {
      title = decodeURIComponent(req.query.title);
      ext = decodeURIComponent(req.query.ext);
    }

    var options = format && format !== 'undefined' && format.length > 0 ? ['-f', format] : [];

    console.log('INFO: Downloading using url \'%s\' and options %s', url, options);

    var video = ytdl(url, options);

    // Will be called on video load error
    video.on('error', function error(err) {
      console.error('ERROR: /api/download ' + err);
      return next(err);
    });

    var pos = 0;
    var size = 0;
    video.on('data', function data(chunk) {
      pos += chunk.length;
      if (size) {
        var percent = (pos / size * 100).toFixed(2);
        // console.log(percent + '%');
      }
    });

    // Will be called when the download starts.
    video.on('info', function (info) {
      size = info.size;
      res.header('Content-Disposition', (watch === 'true' ? 'inline' : 'attachment') + '; filename="' + utf8.encode(title + '.' + ext) + '"');
      res.header('Content-Type', 'video/' + ext);
      res.header('Content-Length', info.size);
      video.pipe(res);
    });
  });
};
