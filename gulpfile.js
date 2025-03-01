const gulp = require('gulp');
const { series, parallel } = require('gulp');
const pug = require('gulp-pug');
const cssnano = require('gulp-cssnano');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();
const del = require('del')


const html = () => {
    return gulp.src('src/pug/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('build'))
}
const styles = () => {
    return gulp.src('src/styles/*.css')
        .pipe(cssnano())
        .pipe(gulp.dest('build/css'))
}
const images = () => {
    return gulp.src('src/images/*/*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/images'))
}
const server = () => {
    browserSync.init({
        server: {
            baseDir: './build'
        },
        notify: false
    });
    browserSync.watch('build', browserSync.reload)
}
const deleteBuild = (cb) => {
    return del('build/**/*.*').then(() => { cb() })
}
const watch = () => {
    gulp.watch('src/pug/**/*.pug', html)
    gulp.watch('src/styles/*.css', styles)
    gulp.watch('src/images/**/*.*', images)
}
exports.default = series(
    deleteBuild,
    parallel(html, styles, images),
    parallel(watch, server)
)