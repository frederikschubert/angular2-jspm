var autoprefixer = require('gulp-autoprefixer'),
    connect = require('gulp-connect'),
    gulp = require('gulp'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    cache = require('gulp-cached');

gulp.task('compile:css', function () {
    gulp.src(['src/**/*.scss', '!src/style.scss'])
        .pipe(cache('css'))
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({ browsers: ['last 2 versions'] }))
        .pipe(gulp.dest('www'))
        .on('error', function (error) {
            console.error('css error: ' + error);
        });
    gulp.src('src/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({ browsers: ['last 2 versions'] }))
        .pipe(gulp.dest('www'))
        .pipe(connect.reload())
        .on('error', function (error) {
            console.error('css error: ' + error);
        });
});

gulp.task('compile:html', function () {
    gulp.src(['src/**/*.html', '!src/index.prod.html'])
        .pipe(cache('html'))
        .pipe(gulp.dest('www'));
});

gulp.task('compile:img', function () {
    gulp.src('src/**/*.{png,jpg}')
        .pipe(cache('img'))
        .pipe(gulp.dest('www'))
        .pipe(connect.reload());
});

gulp.task('compile:ts', function () {
    gulp.src(['src/**/*.ts', '!src/bootstrap.prod.ts'])
        .pipe(cache('ts'))
        .pipe(gulp.dest('www'));
});