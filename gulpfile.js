var gulp = require('gulp'),
    sass = require('gulp-sass'),
    csso = require('gulp-csso'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    templateCache = require('gulp-angular-templatecache');

plumber = require('gulp-plumber');

gulp.task('sass', function() {
    gulp.src('public/stylesheets/style.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(gulp.dest('public/stylesheets'));
});

gulp.task('compress', function() {
    gulp.src([
        'public/vendor/angular.js',
        'public/vendor/*.js',
        'public/app.js',
        'public/services/*.js',
        'public/controllers/*.js',
        'public/filters/*.js',
        'public/directives/*.js'
    ])
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('public'));
});

gulp.task('watch', function() {
    gulp.watch('public/stylesheets/*.scss', ['sass']);
    gulp.watch('public/views/**/*.html', ['templates']);
    gulp.watch(['public/**/*.js', '!public/app.min.js', '!public/templates.js', '!public/vendor'], ['compress']);
});

gulp.task('templates', function() {
    gulp.src('public/views/**/*.html')
        .pipe(templateCache({ root: 'views', module: 'MyApp' }))
        .pipe(gulp.dest('public'));
});

gulp.task('default', ['sass', 'compress', 'templates', 'watch']);
