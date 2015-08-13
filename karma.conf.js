module.exports = function(config) {
  config.set({
    browsers: ['Chrome'],
    frameworks: ['browserify', 'jasmine'],
    files: [ 'spec/**/*.spec.js' ],
    preprocessors: {
      'spec/**/*.js': [ 'browserify' ]
    },
    browserify: {
      debug: true,
      transform: [ 'brfs' ]
    }
  });
};
