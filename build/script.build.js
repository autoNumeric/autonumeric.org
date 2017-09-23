process.env.NODE_ENV = 'production';

require('colors');

const path          = require('path');
const shell         = require('shelljs');
const env           = require('./env-utils');
const css           = require('./css-utils');
const config        = require('../config');
const webpack       = require('webpack');
const webpackConfig = require('./webpack.prod.conf');
const targetPath    = path.join(__dirname, '../dist');

console.log(' WARNING!'.bold);
console.log(' Do NOT use VueRouter\'s "history" mode if');
console.log(' building for Cordova or Electron.\n');

require('./script.clean.js');
console.log((' Building Quasar App with "' + env.platform.theme + '" theme...\n').bold);

function finalize() {
    console.log((
        '\n Build complete with "' + env.platform.theme.bold + '" theme in ' +
        '"/dist"'.bold + ' folder.\n').cyan);

    console.log(' Built files are meant to be served over an HTTP server.'.bold);
    console.log(' Opening index.html over file:// won\'t work.'.bold);
}

webpack(webpackConfig, function(err, stats) {
    if (err) throw err;

    process.stdout.write(stats.toString({
        colors      : true,
        modules     : false,
        children    : false,
        chunks      : false,
        chunkModules: false,
    }) + '\n');

    if (stats.hasErrors()) {
        process.exit(1);
    }

    // Copy the `CNAME` file to the `/dist` folder
    shell.cp('CNAME', targetPath);

    if (config.build.purifyCSS) {
        css.purify(finalize);
    } else {
        finalize();
    }
});
