'use strict';

import gulp from 'gulp';
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
import replace from 'gulp-replace';
import browserSync from 'browser-sync';
import { promises as fs } from 'fs';
import { parse } from 'node-html-parser';
import { createWriteStream, readdirSync, statSync, readFileSync } from 'fs';
import archiver from 'archiver';
import paths from 'path';

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
        lib: 'build/assets/lib/',
        php: 'build/assets/php/',
        video: 'build/assets/video/',
    },
    wp: {
        js: wp_path + 'assets/js/',
        css: wp_path + 'assets/css/',
        img: wp_path + 'assets/img/',
        fonts: wp_path + 'assets/fonts/',
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
        lib: 'src/lib/**/*.*',
        php: 'src/php/**/*.*',
        video: 'src/video/**/*.*',
    },
    clean: './build',
    cleanwp: wp_path + 'assets'
};

// Задача очистки директорий
gulp.task('clean', async function () {
    await Promise.all([
        fs.rm(path.clean, { recursive: true, force: true }),
        fs.rm(path.cleanwp, { recursive: true, force: true }),
    ]);
});

// Задачи сборки

gulp.task('html:build', async function () {
    return gulp.src(path.src.html)
        .pipe(rigger())
        .pipe(replace('{{version}}', `${Date.now()}` )) // обновления версий в HTML
        .pipe(gulp.dest(path.build.html))
        .pipe(reload({ stream: true }));
});

gulp.task('js:build', async function () {
    return gulp.src(path.src.js)
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
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
    return gulp.src(path.src.img, { encoding: false })
        .pipe(imagemin([
            mozjpeg({ quality: 75, progressive: true }),
            optipng({ optimizationLevel: 5 }),
        ]))
        .pipe(gulp.dest(path.build.img))
        .pipe(gulp.dest(path.wp.img))
        .pipe(reload({ stream: true }));
});

gulp.task('svg:build', async function () {
    return gulp.src(path.src.svg)
        .pipe(svgmin({ js2svg: { pretty: true } }))
        .on('data', (file) => {
            if (file.isBuffer()) {
                const content = file.contents.toString();
                const root = parse(content);
                root.querySelectorAll('[fill]').forEach((el) => el.removeAttribute('fill'));
                root.querySelectorAll('[stroke]').forEach((el) => el.removeAttribute('stroke'));
                root.querySelectorAll('[style]').forEach((el) => el.removeAttribute('style'));
                file.contents = Buffer.from(root.toString());
            }
        })
        .pipe(replace('&gt;', '>'))
        .pipe(svgSprite({
            mode: {
                symbol: {
                    sprite: '../sprite.svg',
                },
            },
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
    return gulp.src(path.src.video, { encoding: false })
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
    gulp.watch([path.watch.lib], gulp.series('lib:build'));
    gulp.watch([path.watch.php], gulp.series('php:build'));
    gulp.watch([path.watch.video], gulp.series('video:build'));
});

gulp.task('webserver', async function () {
    browserSync({
        server: { baseDir: "./build" },
        host: 'localhost',
        port: 8081,
        open: false,
        logLevel: "info",
        notify: false
    });
});

gulp.task('default', gulp.series('build', gulp.parallel('webserver', 'watch')));

// Архивация
gulp.task('zip', async function (done) {
    const output = createWriteStream('./build.zip');
    const archive = archiver('zip', { zlib: { level: 9 } });

    archive.on('error', (err) => {
        throw err;
    });

    archive.pipe(output);

    // Исключаем .map файлы и строки
    const addFilesToArchive = (dirPath) => {
        const files = readdirSync(dirPath);

        files.forEach((file) => {
            const fullPath = paths.join(dirPath, file);
            const stats = statSync(fullPath);

            if (stats.isDirectory()) {
                addFilesToArchive(fullPath);
            } else {
                if (!fullPath.endsWith('.map')) {
                    let fileContent;
                    if (fullPath.match(/\.(jpg|jpeg|png|gif|mp4|webm|svg|bmp|avi|mov)$/)) {
                        fileContent = readFileSync(fullPath);
                    } else {
                        fileContent = readFileSync(fullPath, 'utf8');
                        fileContent = fileContent.replace(/\/\*# sourceMappingURL=.*\.map \*\//g, '');
                        fileContent = fileContent.replace(/\/\/# sourceMappingURL=.*\.map/g, '');
                    }

                    archive.append(fileContent, { name: paths.relative('build', fullPath) });
                }
            }
        });
    };

    addFilesToArchive('build');

    const robotsContent = `
User-agent: *
Disallow: /
    `.trim();
    archive.append(robotsContent, { name: 'robots.txt' });

    await archive.finalize();

    output.on('close', done);
});