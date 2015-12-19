var connect = require('gulp-connect'),
    del = require('del'),
    gulp = require('gulp'),
    requireDir = require('require-dir'),
    chokidar = require('chokidar'),
    hotLoader = require('angular2-hot-loader');

global.paths = {
    server: '',
    src: 'src',
    www: 'www',
    css: '/**/*.css',
    html: '/**/*.html',
    img: '/**/*.{jpg,png}',
    ts: '/**/*.ts',
    scss: '/**/*.scss'
};

// include sub-tasks from folder
requireDir('gulp');

// run server
gulp.task('connect', function () {
    chokidar.watch(['./www/**/*.ts', './www/**/*.html', './www/**/*.css']).on('all', function (event, path) {
        var fullPath = __dirname + '/' + path;
        console.log(event, fullPath);
        hotLoader.onChange([fullPath]);
    });
    hotLoader.listen({
        port: 4412,
        projectRoot: __dirname
    });
    connect.server({ root: global.paths.server, livereload: true });
});

// clean out www folder
gulp.task('clean', function () {
    del([global.paths.www]);
});

gulp.task('libs', function () {
    gulp.src(['jspm_packages/npm/zone.js@0.5.10/dist/zone.min.js'])
        .pipe(gulp.dest(global.paths.www + '/lib'));
});

// watch for file changes
gulp.task('watch', function () {
    gulp.watch([global.paths.src + global.paths.html], ['compile:html']);
    gulp.watch([global.paths.src + global.paths.img], ['compile:img']);
    gulp.watch([global.paths.src + global.paths.scss], ['compile:css']);
    gulp.watch([global.paths.src + global.paths.ts], ['compile:ts']);
});

// shortcut tasks
gulp.task('default', ['clean', 'libs', 'compile', 'watch', 'connect']);
gulp.task('compile', ['compile:css', 'compile:html', 'compile:img', 'compile:ts']);
gulp.task('build', ['clean', 'libs', 'compile:css', 'build:html', 'build:img', 'build:ts']);