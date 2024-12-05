'use strict';

import gulp from 'gulp';
import watch from 'gulp-watch';
import prefixer from 'gulp-autoprefixer';
import uglify from 'gulp-uglify';
import dartSass from 'gulp-dart-sass';
import sourcemaps from 'gulp-sourcemaps';
import rigger from 'gulp-rigger';
import cleanCSS from 'gulp-clean-css';
import imagemin from 'gulp-imagemin';
import mozjpeg from 'imagemin-mozjpeg';
import optipng from 'imagemin-optipng';
import svgSprite from 'gulp-svg-sprite';
import svgmin from 'gulp-svgmin';
import cheerio from 'gulp-cheerio';
import replace from 'gulp-replace';
import browserSync from 'browser-sync';
import debug from 'gulp-debug';
import { promises as fs } from 'fs';

const reload = browserSync.reload;
const wp_path = 'wordpress/wp-content/themes/say-meow/';

const path = {
    build: {
        html: 'build/',
        js: 'build/assets/js/',
        css: 'build/assets/css/',
        img: 'build/assets/img/',
        svg: 'build/assets/img/',
        fonts: 'build/assets/fonts/',
        sass: 'build/assets/scss/',
        lib: 'build/assets/lib/',
        php: 'build/assets/php/',
        video: 'build/assets/video/',
    },
    wp: {
        js: wp_path + 'assets/js/',
        css: wp_path + 'assets/css/',
        img: wp_path + 'assets/img/',
        fonts: wp_path + 'assets/fonts/',
        sass: wp_path + 'assets/scss/',
        lib: wp_path + 'assets/lib/',
        php: wp_path + 'assets/php/',
        video: wp_path + 'assets/video/',
    },
    src: {
        html: 'src/*.html',
        js: 'src/js/*.js',
        style: 'src/scss/style.scss',
        img: 'src/img/**/*.*',
        svg: 'src/img/svg/**/*.svg',
        fonts: 'src/fonts/**/*.*',
        sass: 'src/scss/**/*.*',
        lib: 'src/lib/**/*.*',
        php: 'src/php/**/*.*',
        video: 'src/video/**/*.*',
    },
    watch: {
        html: 'src/**/*.html',
        js: 'src/js/**/*.js',
        style: 'src/scss/**/*.scss',
        img: 'src/img/**/*.*',
        svg: 'src/img/svg/**/*.svg',
        fonts: 'src/fonts/**/*.*',
        sass: 'src/scss/**/*.*',
        lib: 'src/lib/**/*.*',
        php: 'src/php/**/*.*',
        video: 'src/video/**/*.*',
    },
    clean: './build',
    cleanwp: wp_path + 'assets'
};

// Задача очистки директорий
gulp.task('clean', async function () {
    // Удаление директорий build и WordPress assets
    await Promise.all([
        fs.rm(path.clean, { recursive: true, force: true }),
        fs.rm(path.cleanwp, { recursive: true, force: true }),
    ]);
});

// Задачи сборки

gulp.task('html:build', async function () {
    return gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({ stream: true }));
});

gulp.task('js:build', async function () {
    return gulp.src(path.src.js)
        .pipe(gulp.dest(path.build.js))
        .pipe(gulp.dest(path.wp.js))
        .pipe(reload({ stream: true }));
});

gulp.task('style:build', async function () {
    return gulp.src(path.src.style)
        .pipe(sourcemaps.init())
        .pipe(dartSass().on('error', dartSass.logError))
        .pipe(prefixer())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.build.css))
        .pipe(gulp.dest(path.wp.css))
        .pipe(reload({ stream: true }));
});

gulp.task('image:build', async function () {
    return gulp.src(path.src.img)
        .pipe(imagemin([
            mozjpeg({ quality: 75, progressive: true }),
            optipng({ optimizationLevel: 5 }),
        ]))
        .pipe(gulp.dest(path.build.img))
        .pipe(reload({ stream: true }));
});

gulp.task('svg:build', async function () {
    return gulp.src(path.src.svg)
        .pipe(svgmin({ js2svg: { pretty: true } }))
        .pipe(replace('&gt;', '>'))
        .pipe(svgSprite({
            mode: {
                symbol: {
                    sprite: '../sprite.svg'
                }
            }
        }))
        .pipe(gulp.dest(path.build.img))
        .pipe(gulp.dest(path.wp.img))
        .pipe(reload({ stream: true }));

});

gulp.task('fonts:build', async function () {
    return gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
        .pipe(gulp.dest(path.wp.fonts))
        .pipe(reload({ stream: true }));
});

gulp.task('sass:build', async function () {
    return gulp.src(path.src.sass)
        .pipe(gulp.dest(path.build.sass))
        .pipe(gulp.dest(path.wp.sass));
});

gulp.task('lib:build', async function () {
    return gulp.src(path.src.lib)
        .pipe(gulp.dest(path.build.lib))
        .pipe(gulp.dest(path.wp.lib));
});

gulp.task('php:build', async function () {
    return gulp.src(path.src.php)
        .pipe(gulp.dest(path.build.php))
        .pipe(gulp.dest(path.wp.php));
});

gulp.task('video:build', async function () {
    return gulp.src(path.src.video)
        .pipe(gulp.dest(path.build.video))
        .pipe(gulp.dest(path.wp.video));
});

// Общие задачи

gulp.task('build', gulp.series(
    'html:build',
    'js:build',
    'style:build',
    'fonts:build',
    'image:build',
    'svg:build',
    'sass:build',
    'lib:build',
    'php:build',
    'video:build'
));

gulp.task('watch', async function () {
    gulp.watch([path.watch.html], gulp.series('html:build'));
    gulp.watch([path.watch.style], gulp.series('style:build'));
    gulp.watch([path.watch.js], gulp.series('js:build'));
    gulp.watch([path.watch.img], gulp.series('image:build'));
    gulp.watch([path.watch.svg], gulp.series('svg:build'));
    gulp.watch([path.watch.fonts], gulp.series('fonts:build'));
    gulp.watch([path.watch.sass], gulp.series('sass:build'));
    gulp.watch([path.watch.lib], gulp.series('lib:build'));
    gulp.watch([path.watch.php], gulp.series('php:build'));
    gulp.watch([path.watch.video], gulp.series('video:build'));
});

gulp.task('webserver', async function () {
    browserSync({
        server: { baseDir: "./build" },
        host: 'localhost',
        port: 8080,
        open: false,
        logLevel: "info",
        notify: false
    });
});

gulp.task('default', gulp.series('build', gulp.parallel('webserver', 'watch')));