const gulp = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const imagemin = require('gulp-imagemin');
const jshint = require('gulp-jshint');
const minifycss = require('gulp-minify-css');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const webpack = require('gulp-webpack');

gulp.task('lint', () => {
  return gulp.src(['src/scripts/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('sass', () => {
  return gulp.src('src/styles/style.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/styles'));
});

gulp.task('css-min', () => {
  return gulp.src('dist/styles/style.css')
    .pipe(minifycss())
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('dist/styles'));
});

gulp.task('babel', () => {
  return gulp.src('src/scripts/app.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('dist/scripts'));
});

gulp.task('js-min', () => {
  return gulp.src('dist/scripts/app.js')
    .pipe(uglify())
    .pipe(concat('app.min.js'))
    .pipe(gulp.dest('dist/scripts'));
});

gulp.task('templates', () => {
  return gulp.src('src/templates/**/*.html')
    .pipe(gulp.dest('./dist/templates'));
});

gulp.task('imagemin', () => {
  return gulp.src('src/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/images'));
});

gulp.task('watchers', () => {
  gulp.watch('src/styles/**/*.scss', ['sass']);
  gulp.watch('src/scripts/**/*.js', ['babel']);
  gulp.watch('src/templates/**/*.html', ['templates']);
  gulp.watch('src/images/*', ['imagemin']);
});

gulp.task('watch', ['lint', 'sass', 'babel', 'templates', 'imagemin', 'css-min', 'js-min', 'watchers']);
gulp.task('minify', ['css-min', 'js-min', 'imagemin']);
gulp.task('build', ['lint', 'sass', 'babel', 'templates', 'imagemin', 'css-min', 'js-min']);