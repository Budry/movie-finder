/**
 * This file is part of the MovieFinder package.
 *
 * (c) Ondřej Záruba <zarubaondra@gmail.com>
 *
 * For the full copyright and license information, please view the license.md
 * file that was distributed with this source code.
 */

const gulp = require('gulp');
const runSequence = require('run-sequence');
const less = require('gulp-less');
const rename = require('gulp-rename');
const replace = require('gulp-replace');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');

const webpackConfig = {
    target: 'node',
    resolve: {
        modules: ["node_modules"],
        extensions: [".js", ".ts", ".tsx"]
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "awesome-typescript-loader",
                exclude: /node_modules/,
            }
        ]
    },
    node: {
        __dirname: false
    },
    externals: [
        (function () {
            var IGNORES = [
                'electron'
            ];
            return function (context, request, callback) {
                if (IGNORES.indexOf(request) >= 0) {
                    return callback(null, "require('" + request + "')");
                }
                return callback();
            };
        })()
    ]
};

gulp.task('scripts:main', () => {
    return gulp.src('src/main.ts')
        .pipe(webpackStream(webpackConfig, webpack))
        .pipe(rename('main.js'))
        .pipe(gulp.dest('build/js'))
});

gulp.task('scripts:app', () => {
    return gulp.src('src/index.tsx')
        .pipe(webpackStream(webpackConfig, webpack))
        .pipe(rename('app.js'))
        .pipe(gulp.dest('build/js'))
});

gulp.task('styles', () => {
    return gulp.src('assets/styles/bootstrap.less')
        .pipe(less())
        .pipe(rename('app.css'))
        .pipe(gulp.dest('build/css'))
});

gulp.task('statics', () => {
    return gulp.src('statics/**/*')
        .pipe(gulp.dest('build/statics'))
});

gulp.task('package', () => {
    return gulp.src('package.json')
        .pipe(replace(/\.\/build\/js\/main\.js/g, './js/main.js'))
        .pipe(gulp.dest('build'))
});

gulp.task('images', () => {
    return gulp.src('assets/images/**/*')
        .pipe(gulp.dest('build/images'))
});

gulp.task('watch', () => {
    gulp.watch('src/**/*', () => {
        runSequence(['scripts:app', 'scripts:main']);
    });
    gulp.watch('assets/styles/**/*', () => {
        runSequence('styles');
    });
    gulp.watch('statics/**/*', () => {
        runSequence('statics');
    });
});

gulp.task('default', () => {
    runSequence(['scripts:app', 'scripts:main', 'styles', 'statics', 'package', 'images'], 'watch')
});

gulp.task('build', () => {
    runSequence(['scripts:app', 'scripts:main', 'styles', 'statics', 'package', 'images']);
});