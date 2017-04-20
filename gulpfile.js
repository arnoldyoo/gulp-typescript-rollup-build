var gulp = require('gulp');
var del = require('del');

var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');
var merge = require('merge2');
var inlineNg2Template = require('gulp-inline-ng2-template');

var sass = require('gulp-sass');

var rollup = require('rollup').rollup;
var commonjs = require('rollup-plugin-commonjs');
var resolve = require('rollup-plugin-node-resolve');
var uglify = require('rollup-plugin-uglify');
var babel = require('rollup-plugin-babel');

var buildInfo = require('./buildinfo.json');

var ignore = require('rollup-plugin-ignore');

const rollupFunc = () => {
    return rollup({
        entry: buildInfo.rollupEntryFile,
        treeshake: true,
        globals : {
            '@angular/core': 'ng.core',
            '@ngrx/core': 'ngrx.core',
            'rxjs/Observable': 'Rx',
            'underscore': '_'
        },
        plugins: [
                ignore([
                    'underscore', 'rxjs'
                ]),
                resolve({
                    jsnext: true,
                    main: true,
                    browser: true,
                }),
                commonjs(),
                uglify()
        ]
    }).then((bundle) => {
        return bundle.write({
            format: buildInfo.rollupFormat,
            moduleName: buildInfo.moduleName,
            dest: buildInfo.rollupDestFile
        });
    });
}

// remove dist folder task
gulp.task('clean', (cb) => {
    return del([buildInfo.dest], cb);
});

// typescript compile & make dist folder task
gulp.task('tscompile', ['clean', 'sass'], () => {
    var tsResult = gulp.src("src/**/*.ts")
        .pipe(inlineNg2Template({ base: '/src' }))
        .pipe(tsProject());
    return merge([
        tsResult.js.pipe(gulp.dest(buildInfo.dest)),
        tsResult.dts.pipe(gulp.dest(buildInfo.dest))
    ])
});

//  build task
gulp.task('build:prod',['tscompile'], rollupFunc);

gulp.task('sass', function () {
  return gulp.src('src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest((file) => {
        return file.base;
    }));
});

// production build
gulp.task('build.prod', ['build:prod' ]);

gulp.task('default', ['build:prod' ]);
