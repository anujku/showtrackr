var gulp = require('gulp'),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber');

gulp.task('sass', function() {
    gulp.src('public/stylesheets/style.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(gulp.dest('public/stylesheets'));
});

gulp.task('watch', function() {
    gulp.watch('public/stylesheets/*.scss', ['sass']);
});

gulp.task('default', ['sass', 'watch']);