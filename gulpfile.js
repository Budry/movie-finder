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

const tsProject = typescript.createProject('tsconfig.json');

gulp.task('typescript', () => {
    return gulp.src('src/**/*')
        .pipe(tsProject())
        .pipe(gulp.dest('./build'))
});

gulp.task('watch', () => {
    gulp.watch('src/**/*', () => {
        runSequence('typescript');
    })
});

gulp.task('default', () => {
    runSequence('typescript', 'watch')
});

gulp.task('build', () => {
    runSequence('typescript');
});