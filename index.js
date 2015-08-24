var fs = require('fs')
  , path = require('path');

var sass = require('node-sass');

module.exports = function(options) {
  options = options || {};

  var import_paths = options.import_paths || []
    , import_paths_len = import_paths.length;
  
  return function(url, prev, done) {
    if (url.slice(0, 4) !== 'CSS:') {
      return done();
    }

    var css_path = url.slice(4) + '.css'
      , css_filepath, i, import_path;

    for (i = 0; i < import_paths_len; i++) {
      import_path = import_paths[i];
      css_filepath = path.join(import_path, css_path);
      if (fs.existsSync(css_filepath)) {
        fs.readFile(css_filepath, function(err, data) {
          if (err) return console.error(err);
          done({contents: data.toString()});
        });
      }
    }
  };
};
