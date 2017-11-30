var gulp = require('gulp'),
    concat = require('gulp-concat'),    // 合并js
    rename = require('gulp-rename'),    // 重命名
    jshint = require('gulp-jshint'),   // 校验js的工具
    uglify = require('gulp-uglify'),    // 压缩js
    plumber = require('gulp-plumber'),
    babel = require('gulp-babel'),
    sass = require('gulp-sass'),
    useref = require('gulp-useref');           //处理引用          // 编译sass
var browserSync = require('browser-sync').create();

var SRC_DIR = './app/**/*.js';
var SASS_DIR = './app/**/*.scss';
var HTML_SRC = './app/**/*.html';
var DEST_DIR = './dist';

/* es6 */
gulp.task('es6', () => {
    return gulp.src(SRC_DIR)
        .pipe(plumber())
        .pipe(babel()) 
        .pipe(gulp.dest(DEST_DIR))
        .pipe(browserSync.reload({
            stream: true
        }));
})

/* es6-build */
gulp.task('es6-build', () => {
    return gulp.src(SRC_DIR)
        .pipe(plumber())
        .pipe(babel())
        .pipe(jshint())
        .pipe(jshint.reporter('default'))
        .pipe(uglify())
        .pipe(concat('build.js'))
        .pipe(gulp.dest(DEST_DIR))
        .pipe(browserSync.reload({
            stream: true
        }));
})

/* sass */
gulp.task('sass', () => {
    return gulp.src(SASS_DIR)
        .pipe(sass())
        .pipe(gulp.dest(DEST_DIR))
        .pipe(browserSync.reload({
            stream: true
        }));
})

/* html */
gulp.task('html', function () {
    gulp.src(HTML_SRC)
        .pipe(useref())
        .pipe(gulp.dest(DEST_DIR))
        .pipe(browserSync.reload({
            stream: true
        }));
});

/* 生成服务器用于Browser Sync */
gulp.task('browserSync', () => {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    });
});

// 监听文件修改
gulp.task('watch', ['es6', 'browserSync', 'sass', 'html'], () => {
    gulp.watch([SASS_DIR], ['sass']);
    gulp.watch([SRC_DIR], ['es6']);
    gulp.watch([HTML_SRC], ['html']);
});