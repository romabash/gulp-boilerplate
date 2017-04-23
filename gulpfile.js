
let gulp = require('gulp');
let sass = require('gulp-sass');
let autoprefixer = require('gulp-autoprefixer');
let imagemin = require('gulp-imagemin');
let browserSync = require('browser-sync').create();


//Sass task
gulp.task('styles', function(){
  gulp.src('./scss/styles.scss')
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(gulp.dest('./css'))
    .pipe(browserSync.reload({stream: true}));
});

//Image task - compress
gulp.task('images', function(){
  gulp.src('./images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('./images'));
});

//Browser-Sync task
gulp.task('serve', function(){
  browserSync.init({
    server:{
      baseDir: './'
    }
  });
  gulp.watch('./scss/*.scss', ['styles']);
  gulp.watch('./images/*', ['images']);
  gulp.watch('./**/*.html').on('change', browserSync.reload);
  gulp.watch('./src/js/*.js').on('change', browserSync.reload);
});

gulp.task('default', ['styles', 'images', 'serve']);
