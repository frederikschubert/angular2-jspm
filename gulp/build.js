var htmlReplace = require('gulp-html-replace'),
    imagemin = require('gulp-imagemin'),
    jspm = require('gulp-jspm'),
    gulp = require('gulp'),
    minifyCss = require('gulp-minify-css'),
    minifyHtml = require('gulp-minify-html'),
    pngquant = require('imagemin-pngquant'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    inject = require('gulp-inject');

gulp.task('build:html', function () {
    gulp.src(global.paths.src + global.paths.html)
        .pipe(minifyHtml())
        .pipe(gulp.dest(global.paths.www))
        .on('error', function (error) {
            console.error('html error: ' + error);
        });
});

gulp.task('build:img', function () {
    gulp.src(global.paths.src + global.paths.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(global.paths.www))
        .on('error', function (error) {
            console.error('img error: ' + error);
        });
});

gulp.task('build:ts', function () {
    gulp.src(global.paths.src  + global.paths.ts)
        .pipe(jspm({selfExecutingBundle: true}))
        .pipe(uglify())
        .pipe(rename('bundle.min.js'))
        .pipe(gulp.dest(global.paths.www))
        .on('error', function (error) {
            console.error('js error: ' + error);
        });
});