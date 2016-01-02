var imagemin = require('gulp-imagemin'),
    gulp = require('gulp'),
    pngquant = require('imagemin-pngquant'),
    rename = require('gulp-rename'),
    spawn = require('child_process').spawn;

gulp.task('build:html', function () {
    gulp.src(['src/**/*.html', '!src/index.*'])
        .pipe(gulp.dest('www'))
        .on('error', function (error) {
            console.error('html error: ' + error);
        });
    gulp.src('src/index.prod.html')
        .pipe(rename('index.html'))
        .pipe(gulp.dest('www'))
        .on('error', function (error) {
            console.error('html error: ' + error);
        });
});

gulp.task('build:img', function () {
    gulp.src('src/**/*.{png,jpg}')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('www'))
        .on('error', function (error) {
            console.error('img error: ' + error);
        });
});

gulp.task('build:ts', function () {
    var jspm = spawn('jspm', ['bundle-sfx', 'src', 'www/bundle.sfx.js', '--minify']);
    jspm.stdout.on('data', function (data) {
        console.log('ts: ' + data);
    });
    jspm.stderr.on('data', function (data) {
        console.log('ts error: ' + data);
    });
});