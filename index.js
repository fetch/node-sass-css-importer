var fs = require('fs')
  , path = require('path');

module.exports = function(options) {
  options = options || {import_paths: []};

  var import_paths
    , import_paths_len;

  return function(url, prev, done) {
    if (url.slice(0, 4) !== 'CSS:') {
      return done();
    }

    import_paths = options.import_paths.slice();
    if (fs.existsSync(prev)) {
      import_paths.unshift(path.dirname(prev));
    }
    import_paths_len = import_paths.length;

    if (import_paths_len === 0) {
      return done();
    }

    var css_path = url.slice(4) + '.css'
      , css_filepath, i = 0, import_path;

    for (; i < import_paths_len; ++i) {
      import_path = import_paths[i];
      css_filepath = path.join(import_path, css_path);
      if (fs.existsSync(css_filepath)) {
        fs.readFile(css_filepath, function(err, data) {
          if (err) {
            return done(err);
          }
          done({contents: data.toString()});
        });
        return;
      }
    }
    return done(new Error('Specified CSS file not found! ("' + css_path + '" referenced from "' + prev + '")'));
  };
};
