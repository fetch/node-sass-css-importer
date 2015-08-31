# Node Sass CSS importer [![Build Status](https://travis-ci.org/fetch/node-sass-css-importer.svg?branch=master)](https://travis-ci.org/fetch/node-sass-css-importer) [![npmjs](https://badge.fury.io/js/node-sass-css-importer.svg)](https://www.npmjs.com/package/node-sass-css-importer)

The Node Sass CSS Importer allows you to import a CSS file into Sass. Just like the [Sass CSS importer](https://github.com/chriseppstein/sass-css-importer).

## Stylesheet Syntax

The `.css` extension triggers special behavior in Sass so you cannot
import a file with a CSS extension. To work around this, you must use a
special prefix on the import string and omit the extension.

```scss
@import "CSS:some_folder/some_css_file"
```

## Installation

```
npm install node-sass-css-importer --save[-dev]
```

## Usage

```js
var sass = require('node-sass')
  , CssImporter = require('node-sass-css-importer')({
      import_paths: ['app/assets/stylesheets', 'app/assets/components']
    });

sass.renderSync({
  file: 'source.scss',
  importer: [CssImporter]
});

```
