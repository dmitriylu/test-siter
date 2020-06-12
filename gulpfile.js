// Подключаем модули галпа
const gulp = require('gulp');
const babel = require("gulp-babel");
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const del = require('del');
const browserSync = require('browser-sync').create();
const imagemin = require('gulp-imagemin');
const rename = require('gulp-rename');
const svgSprite = require('gulp-svg-sprite');
const svgmin = require('gulp-svgmin');
const cheerio = require('gulp-cheerio');
const replace = require('gulp-replace');



// Таск на стили CSS
gulp.task('styles', () => {
    // шаблон для поиска стилей
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('style.css'))
        .pipe(browserSync.stream())
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./build/css'))
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(rename({
            suffix: '.min'
        }))
        // Выходная папка для стилей
        .pipe(gulp.dest('./build/css'))
        .pipe(browserSync.stream())

});

gulp.task('lib-css', () => {
    return gulp.src([
        './node_modules/magnific-popup/dist/magnific-popup.css',
    ])
        .pipe(concat('_libs.scss'))
        .pipe(gulp.dest('./src/scss'))
        .pipe(browserSync.stream());
});
// Таск на скрипты JS
gulp.task('scripts', () => {
    // шаблон для поиска js
    return gulp.src([
            './src/js/main.js',
            './src/js/slider.js',
            './src/js/popup.js',
            './src/js/mail.js',
        ])
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(concat('index.js'))
        .pipe(uglify({
            toplevel: true
        }))
        .pipe(sourcemaps.write('./'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('./build/js'))
        .pipe(browserSync.stream());

});
gulp.task('lib-js', () => {
    return gulp.src([
        './node_modules/slick-carousel/slick/slick.js',
        './node_modules/magnific-popup/dist/jquery.magnific-popup.js',
    ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify({
            toplevel: true
        }))
        .pipe(gulp.dest('./build/js'))
        .pipe(browserSync.stream());

})
// отчистка
gulp.task('del', () => {
    return del(['build/*'])
});
gulp.task('img-compress', () => {
    return gulp.src('./src/img/**')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('./build/img/'))
});

gulp.task('svg', () => {
    return gulp.src('./src/img/svg/*.svg')
        .pipe(svgmin({
            js2svg: {
                pretty: true
            }
        }))
        .pipe(cheerio({
            run: function ($) {
                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
                $('[style]').removeAttr('style');
            },
            parserOptions: {
                xmlMode: true
            }
        }))
        .pipe(replace('&gt', '>'))
        .pipe(svgSprite({
            mode: {
                symbol: {
                    sprite: "sprite.svg",
                }
            }
        }))
        .pipe(gulp.dest('./build/img/svg/'))
});

gulp.task('fonts', () => {
    return gulp.src('./src/fonts/**')
        .pipe(gulp.dest('./build/fonts/'))
});

// для отслеживание файлов
gulp.task('watch', () => {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('./src/img/**', gulp.series('img-compress'))
    gulp.watch('./src/img/svg/**/*.svg', gulp.series('svg'))
    gulp.watch('./src/fonts/**', gulp.series('fonts'))
    gulp.watch('./src/scss/**/*.scss', gulp.series('styles'))
    gulp.watch('./src/scss/**/*.sass', gulp.series('styles'))
    gulp.watch('./src/js/**/*.js', gulp.series('scripts'))
    gulp.watch("./*.html").on('change', browserSync.reload);

});

// gulp.task('default', gulp.series('del', gulp.parallel('styles', 'scripts', 'img-compress', 'svg', 'fonts'), 'watch'));
// добавить таски lib-css и lib-js
gulp.task('default', gulp.series('del', gulp.parallel('styles', 'lib-css', 'lib-js', 'scripts', 'img-compress','svg', 'fonts'), 'watch'));