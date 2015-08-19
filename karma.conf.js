module.exports = function(config) {
  config.set({
    browsers: ['Chrome'],
    frameworks: ['browserify', 'jasmine', 'jasmine-matchers'],
    files: [ 'node_modules/babel-core/browser-polyfill.js', 'spec/**/*.spec.js' ],
    preprocessors: {
      'spec/**/*.js': [ 'browserify' ]
    },
    browserify: {
      debug: true,
      transform: [ 'babelify', 'brfs' ]
    },
    reporters: ['html']
  });
};
