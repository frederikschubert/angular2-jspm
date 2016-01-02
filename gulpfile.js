var connect = require('gulp-connect'),
    del = require('del'),
    gulp = require('gulp'),
    requireDir = require('require-dir'),
    chokidar = require('chokidar'),
    hotLoader = require('angular2-hot-loader'),
    runSequence = require('run-sequence'),
    dependencies = require('./dependencies');

// include sub-tasks from folder
requireDir('gulp');

// run server
gulp.task('connect', function () {
    chokidar.watch(['www/**/*.ts', 'www/**/*.html', 'www/**/*.css']).on('all', function (event, path) {
        console.log(event, path);
        if (event === 'change' || event == 'add') {
            hotLoader.onChange([path]);
        }
    });
    hotLoader.listen({
        port: 4412,
        projectRoot: __dirname,
        processPath: (file) => file
    });
    connect.server({ root: '', livereload: true });
});

// clean out www folder
gulp.task('clean', function () {
    return del('www');
});

gulp.task('libs', ['fonts'], function () {
    return gulp.src(dependencies.libs)
        .pipe(gulp.dest('www/lib'));
});

gulp.task('fonts', function () {
    return gulp.src(dependencies.fonts)
        .pipe(gulp.dest('www/fonts'));
});

// watch for file changes
gulp.task('watch', function () {
    gulp.watch('src/**/*.html', ['compile:html']);
    gulp.watch('src/**/*.{png,jpg}', ['compile:img']);
    gulp.watch('src/**/*.scss', ['compile:css']);
    gulp.watch('src/**/*.ts', ['compile:ts']);
});

// shortcut tasks
gulp.task('default', function (callback) {
    runSequence('clean', ['libs', 'compile'], 'watch', 'connect');
    callback();
});

gulp.task('compile', function (callback) {
    runSequence(['compile:css', 'compile:html', 'compile:img', 'compile:ts']);
    callback();
});

gulp.task('build', function (callback) {
    runSequence('clean', ['libs', 'compile:css', 'build:html', 'build:img', 'build:ts']);
    callback();
});