var connect = require('gulp-connect'),
    del = require('del'),
    gulp = require('gulp'),
    requireDir = require('require-dir'),
    chokidar = require('chokidar'),
    hotLoader = require('angular2-hot-loader'),
    runSequence = require('run-sequence');

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
        projectRoot: __dirname,
        processPath: (file) => file.replace(__dirname, "")
    });
    connect.server({ root: global.paths.server, livereload: true });
});

// clean out www folder
gulp.task('clean', function () {
    return del([global.paths.www]);
});

gulp.task('libs', function () {
    return gulp.src(['node_modules/angular2/bundles/angular2-polyfills.min.js', 'node_modules/es6-shim/es6-shim.min.js'])
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
gulp.task('default', function(callback) {
  runSequence('clean', ['libs', 'compile'], 'watch', 'connect');
  callback();
});

gulp.task('compile', function(callback) {
  runSequence(['compile:css', 'compile:html', 'compile:img', 'compile:ts']);
  callback();
});

gulp.task('build', function(callback) {
  runSequence('clean', ['libs', 'compile:css', 'build:html', 'build:img', 'build:ts']);
  callback();
});