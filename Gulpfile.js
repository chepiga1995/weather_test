var browserify = require('browserify');
var gulp = require('gulp');
var sass = require('gulp-sass');    
var source = require('vinyl-source-stream');
var concatCss = require('gulp-concat-css');

 
gulp.task('browserify', function() {
    return browserify('./js/main.js')
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('./public/js/'));
});

gulp.task('styles', function() {
    return gulp.src('sass/*.sass')
        .pipe(sass().on('error', sass.logError))
        .pipe(concatCss("style.css"))
        .pipe(gulp.dest('./public/css/'));
});

gulp.task('watch', function() {
    gulp.watch('sass/*.sass',['styles']);
    gulp.watch('js/*.js',['browserify']);
});