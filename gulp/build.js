var htmlReplace = require('gulp-html-replace'),
    imagemin = require('gulp-imagemin'),
    gulp = require('gulp'),
    minifyCss = require('gulp-minify-css'),
    minifyHtml = require('gulp-htmlmin'),
    pngquant = require('imagemin-pngquant'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify'),
    inject = require('gulp-inject'),
    spawn = require('child_process').spawn;

gulp.task('build:html', function () {
    gulp.src([global.paths.src + global.paths.html, '!' + global.paths.src + '/index.*'])
        .pipe(minifyHtml({collapseWhitespace: true}))
        .pipe(gulp.dest(global.paths.www))
        .on('error', function (error) {
            console.error('html error: ' + error);
        });
    gulp.src(global.paths.src + '/index.prod.html')
        .pipe(rename('index.html'))
        .pipe(minifyHtml({collapseWhitespace: true}))
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
    spawn('jspm', ['bundle-sfx', 'src', 'www/bundle.sfx.js', '--minify'])
});