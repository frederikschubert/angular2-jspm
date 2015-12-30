var autoprefixer = require('gulp-autoprefixer'),
    connect = require('gulp-connect'),
    gulp = require('gulp'),
    sass = require('gulp-sass'),
    rename = require('gulp-rename'),
    cache = require('gulp-cached');

gulp.task('compile:css', function () {
    gulp.src([global.paths.src + global.paths.scss, '!src/style.scss'])
        .pipe(cache('css'))
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({ browsers: ['last 2 versions'] }))
        .pipe(gulp.dest(global.paths.www))
        .on('error', function (error) {
            console.error('css error: ' + error);
        });
    gulp.src(global.paths.src + '/style.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({ browsers: ['last 2 versions'] }))
        .pipe(gulp.dest(global.paths.www))
        .pipe(connect.reload())
        .on('error', function (error) {
            console.error('css error: ' + error);
        });
});

gulp.task('compile:html', function () {
    gulp.src([global.paths.src + global.paths.html, '!' + global.paths.src + '/index.prod.html'])
        .pipe(cache('html'))
        .pipe(gulp.dest(global.paths.www));
});

gulp.task('compile:img', function () {
    gulp.src(global.paths.src + global.paths.img)
        .pipe(cache('img'))
        .pipe(gulp.dest(global.paths.www))
        .pipe(connect.reload());
});

gulp.task('compile:ts', function () {
    gulp.src([global.paths.src + global.paths.ts, '!src/bootstrap.prod.ts'])
        .pipe(cache('ts'))
        .pipe(gulp.dest(global.paths.www));
});