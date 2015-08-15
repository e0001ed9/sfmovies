var gulp = require('gulp');
var Server = require('karma').Server;
var babel = require('gulp-babel');
var source = require('vinyl-source-stream');
var babelify = require('babelify');
var browserify = require('browserify');
var eslint = require('gulp-eslint');

gulp.task('default', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('tdd', function (done) {
  new Server({
    configFile: __dirname + '/karma.conf.js'
  }, done).start();
});

gulp.task('lint', function (done) {
  return gulp.src(['src/**/*.js', 'spec/**/*.js', 'app.js'])
             .pipe(eslint())
             .pipe(eslint.format())
             .pipe(eslint.failOnError());
});

gulp.task('bundle', function() {
    browserify({
      entries: './app.js',
      debug: true
    })
    .transform(babelify)
    .bundle()
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('.'));
});
