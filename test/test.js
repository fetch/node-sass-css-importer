var fs = require('fs')
  , path = require('path')
  , assert = require('assert');

var node = require('node-sass')
  , cssImporter = require('../');

node.render({
  file: path.join(__dirname, 'source.scss'),
  importer: cssImporter({import_paths: [path.join(__dirname, 'precedence')]})
}, function(err, actual) {
  assert.equal(err, null);
  fs.readFile(path.join(__dirname, 'expected.css'), function(err, expected) {
    assert.equal(err, null);
    assert.equal(actual.css.toString(), expected.toString());
  });
});

node.render({
  data: 'html{font-size: 10px}@import "CSS:body";',
  importer: cssImporter({import_paths: [__dirname]})
}, function(err, actual) {
  assert.equal(err, null);
  fs.readFile(path.join(__dirname, 'expected.css'), function(err, expected) {
    assert.equal(err, null);
    assert.equal(actual.css.toString(), expected.toString());
  });
});

node.render({
  file: path.join(__dirname, 'badsource.scss'),
  importer: cssImporter({import_paths: [__dirname]})
}, function(err, actual) {
  assert.notEqual(err, null);
  assert.equal(err.message.slice(0, 29), 'Specified CSS file not found!');
});

node.render({
  data: 'html{font-size: 10px}@import "CSS:doesntexist";',
  importer: cssImporter({import_paths: [__dirname]})
}, function(err, actual) {
  assert.notEqual(err, null);
  assert.equal(err.message.slice(0, 29), 'Specified CSS file not found!');
});
