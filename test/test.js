var fs = require('fs')
  , path = require('path')
  , tape = require('tape');

var node = require('node-sass')
  , cssImporter = require('../');

tape('imports CSS files correctly from file', function(t) {
  t.plan(3);

  node.render({
    file: path.join(__dirname, 'source.scss'),
    importer: cssImporter({import_paths: [path.join(__dirname, 'precedence')]})
  }, function(err, actual) {
    t.equal(err, null);
    fs.readFile(path.join(__dirname, 'expected.css'), function(err, expected) {
      t.equal(err, null);
      t.equal(actual.css.toString(), expected.toString());
    });
  });
});

tape('can import CSS files correctly from data', function(t) {
  t.plan(3);

  node.render({
    data: 'html{font-size: 10px}@import "CSS:body";',
    importer: cssImporter({import_paths: [__dirname]})
  }, function(err, actual) {
    t.equal(err, null);
    fs.readFile(path.join(__dirname, 'expected.css'), function(err, expected) {
      t.equal(err, null);
      t.equal(actual.css.toString(), expected.toString());
    });
  });
});

tape('handles non existent files', function(t) {
  t.plan(2);

  node.render({
    file: path.join(__dirname, 'badsource.scss'),
    importer: cssImporter({import_paths: [__dirname]})
  }, function(err, actual) {
    t.notEqual(err, null);
    t.equal(err.message.slice(0, 29), 'Specified CSS file not found!');
  });
});

node.render({
  data: 'html{font-size: 10px}@import "CSS:doesntexist";',
  importer: cssImporter({import_paths: [__dirname]})
}, function(err, actual) {
  assert.notEqual(err, null);
  assert.equal(err.message.slice(0, 29), 'Specified CSS file not found!');
});
