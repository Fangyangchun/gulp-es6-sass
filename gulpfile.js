var gulp = require('gulp'),
    concat = require('gulp-concat'),    // 合并js
    rename = require('gulp-rename'),    // 重命名
    jshint = require('gulp-jshint'),   // 校验js的工具
    uglify = require('gulp-uglify'),    // 压缩js
    plumber = require('gulp-plumber'),
    babel = require('gulp-babel'),
    sass = require('gulp-sass');          // 编译sass
var browserSync = require('browser-sync').create();

var SRC_DIR = './app/**/*.js';
var DIST_DIR = './dist';
var SASS_DIR = './app/**/*.scss';
var CSS_DIR = './dist';
var HTML_DIR = './app/*.HTML';

/* es6 */
gulp.task('es6', () => {
    return gulp.src(SRC_DIR)
        .pipe(plumber())
        .pipe(babel()) 
        .pipe(gulp.dest(DIST_DIR));
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
        .pipe(gulp.dest(DIST_DIR));
})

/* sass */
gulp.task('sass', () => {
    return gulp.src(SASS_DIR)
        .pipe(sass())
        .pipe(gulp.dest(CSS_DIR))
        .pipe(browserSync.reload({
            stream: true
        }));
})

/* 生成服务器用于Browser Sync */
gulp.task('browserSync', () => {
    browserSync.init({
        server: {
            baseDir: 'app'
        }
    });
});

// 监听文件修改
gulp.task('watch', ['es6', 'browserSync', 'sass'], () => {
    gulp.watch([SASS_DIR], ['sass']);
    gulp.watch([SRC_DIR], ['es6']);
    gulp.watch('app/*.html',browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});