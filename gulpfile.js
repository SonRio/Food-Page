// SET DEFAULT BROWSER
const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const { series, parallel } = require('gulp')
// JS AND CSS MODIFILE

// INCLUDE HTML
const htmlImport = require('gulp-html-import');
function IPHTML() {
    gulp.src('./app/html/*.html')
        .pipe(htmlImport('./app/html/components/'))
        .pipe(gulp.dest('dist')); 
};

// INCLUDE CSS
const cssnano = require('gulp-cssnano');
const sass = require('gulp-sass');
function CSS() {
  return gulp.src('./app/assets/scss/style.scss') // Gets all files ending with .scss in app/scss
  .pipe(sass())
  // .pipe(cssnano())
  .pipe(gulp.dest('dist/assets/css'))
  .pipe(browserSync.reload({
    stream: true
  }))
}


// INCLUDE JS
const concatJS = require('gulp-concat');
function JS() {
  return gulp.src('./app/assets/js/*.js') 
  .pipe(concatJS('main.js'))
  .pipe(gulp.dest('dist/assets/js'))
}

// IMG
const image = require('gulp-image');
const cache = require('gulp-cache');
function IMG() {
  return gulp.src('./app/assets/images/**/*.+(png|jpg|jpeg|gif|svg)')
  // Caching images that ran through imagemin
  .pipe(cache(image({
      interlaced: true
    })))
  .pipe(gulp.dest('dist/assets/images'))
}

// Do everything once!
function build(){
    browserSync.init({
        server: {
          baseDir: 'dist',
        },
    })
    // HTML
    gulp.watch("./app/html/components/**/*.html").on('change', browserSync.reload);
    gulp.watch("./app/html/components/**/*.html").on('change', IPHTML);

    // CSS
    gulp.watch("./app/assets/scss/**/*.scss").on('change', browserSync.reload);
    gulp.watch("./app/assets/scss/**/*.scss").on('change', CSS);

    // JS
    gulp.watch("./app/assets/js/*.js").on('change', browserSync.reload);
    gulp.watch("./app/assets/js/*.js").on('change', JS);

    // IMAGES
    gulp.watch("./app/assets/images/**/*.+(png|jpg|jpeg|gif|svg)").on('change', browserSync.reload);
    gulp.watch("./app/assets/images/**/*.+(png|jpg|jpeg|gif|svg)").on('change', IMG);
}

exports.default =  parallel(IPHTML,IMG, JS, CSS,build);

  