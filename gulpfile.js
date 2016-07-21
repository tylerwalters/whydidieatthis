var gulp = require('gulp');

gulp.task('lint', function () {
  var jshint = require('gulp-jshint');

  return gulp.src(['src/scripts/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('sass', function () {
  var sass = require('gulp-sass'),
      sourcemaps = require('gulp-sourcemaps');

  return gulp.src('src/styles/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/styles'));
});

gulp.task('css-min', function () {
  var minifycss = require('gulp-minify-css'),
      concat    = require('gulp-concat');

  return gulp.src('dist/styles/style.css')
    .pipe(minifycss())
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('dist/styles'));
});

gulp.task('js', function () {
  var concat = require('gulp-concat'),
      sourcemaps = require('gulp-sourcemaps');

  return gulp.src('src/scripts/app.js')
    .pipe(sourcemaps.init())
    .pipe(concat('app.js'))
    .pipe(gulp.dest('dist/scripts'));
});

gulp.task('js-min', function () {
  var uglify = require('gulp-uglify'),
      concat = require('gulp-concat');

  return gulp.src('dist/scripts/app.js')
    .pipe(uglify())
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('dist/scripts'));
});

gulp.task('watch', function () {
  gulp.watch('src/styles/**/*.scss', ['sass']);
  gulp.watch('src/scripts/**/*.js', ['js']);
});

gulp.task('minify', ['css-min', 'js-min']);
gulp.task('build', ['lint', 'sass', 'js', 'css-min', 'js-min']);