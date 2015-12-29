var imagemin = require('gulp-imagemin'),
    gulp = require('gulp'),
    pngquant = require('imagemin-pngquant'),
    rename = require('gulp-rename'),
    spawn = require('child_process').spawn;

gulp.task('build:html', function () {
    gulp.src([global.paths.src + global.paths.html, '!' + global.paths.src + '/index.*'])
        .pipe(gulp.dest(global.paths.www))
        .on('error', function (error) {
            console.error('html error: ' + error);
        });
    gulp.src(global.paths.src + '/index.prod.html')
        .pipe(rename('index.html'))
        .pipe(gulp.dest(global.paths.www))
        .on('error', function (error) {
            console.error('html error: ' + error);
        });
});

gulp.task('build:img', function () {
    gulp.src(global.paths.src + global.paths.img)
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            use: [pngquant()]
        }))
        .pipe(gulp.dest(global.paths.www))
        .on('error', function (error) {
            console.error('img error: ' + error);
        });
});

gulp.task('build:ts', function () {
    var jspm = spawn('jspm', ['bundle-sfx', 'src', 'www/bundle.sfx.js', '--minify']);
    jspm.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
    });
});