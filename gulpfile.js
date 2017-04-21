/**
 * This file is part of the MovieFinder package.
 *
 * (c) Ondřej Záruba <zarubaondra@gmail.com>
 *
 * For the full copyright and license information, please view the license.md
 * file that was distributed with this source code.
 */

const gulp = require('gulp');
const typescript = require('gulp-typescript');
const runSequence = require('run-sequence');
const less = require('gulp-less');
const rename = require('gulp-rename');

const tsProject = typescript.createProject('tsconfig.json');

gulp.task('typescript', () => {
    return gulp.src('src/scripts/**/*')
        .pipe(tsProject())
        .pipe(gulp.dest('./build/scripts'))
});

gulp.task('styles', () => {
    return gulp.src('src/assets/styles/bootstrap.less')
        .pipe(less())
        .pipe(rename('app.css'))
        .pipe(gulp.dest('./build/assets/styles'))
});

gulp.task('statics', () => {
    return gulp.src('src/statics/**/*')
        .pipe(gulp.dest('./build/statics'))
});

gulp.task('watch', () => {
    gulp.watch('src/scripts/**/*', () => {
        runSequence('typescript');
    });
    gulp.watch('src/assets/styles/**/*', () => {
        runSequence('styles');
    });
    gulp.watch('src/statics/**/*', () => {
        runSequence('statics');
    });
});

gulp.task('default', () => {
    runSequence(['typescript', 'styles', 'statics'], 'watch')
});

gulp.task('build', () => {
    runSequence(['typescript', 'styles', 'statics']);
});