var gulp = require('gulp');
var del = require('del');
var mode = require('gulp-mode')();

var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');
var merge = require('merge2');

var rollup = require('rollup').rollup;
var commonjs = require('rollup-plugin-commonjs');
var resolve = require('rollup-plugin-node-resolve');
var uglify = require('rollup-plugin-uglify');

var buildInfo = require('./buildinfo.json');

// remove dist folder task
gulp.task('clean', (cb) => {
    return del([buildInfo.dest], cb);
});

// typescript compile & make dist folder task
gulp.task('tscompile', () => {
    var tsResult = gulp.src("src/**/*.ts")
        .pipe(tsProject());
    return merge([
        tsResult.js.pipe(gulp.dest(buildInfo.dest)),
        tsResult.dts.pipe(gulp.dest(buildInfo.dest))
    ])
});

// make umd build task
gulp.task('umd-build',['tscompile'], () => {
    return rollup({
        entry: buildInfo.rollupEntryFile,
        plugins: [
                resolve({
                    jsnext: true,
                    main: true,
                    browser: true,
                }),
                commonjs(),
                mode.production(uglify())
        ]
    }).then((bundle) => {
        return bundle.write({
            format: buildInfo.rollupFormat,
            moduleName: buildInfo.moduleName,
            dest: buildInfo.rollupDestFile
        });
    });
})

gulp.task('default', [ 'clean', 'umd-build' ]);
