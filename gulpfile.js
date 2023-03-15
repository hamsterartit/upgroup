const gulp = require('gulp');
const fileInclude = require('gulp-file-include');
const sourcemap = require('gulp-sourcemaps');
const del = require('del');
const rename = require('gulp-rename');
const sync = require('browser-sync');
const scss = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const groupMedia = require('gulp-group-css-media-queries');
const autoprefixer = require('gulp-autoprefixer');
const scssCleanMin = require('gulp-clean-css');
const uglify = require('gulp-uglify-es').default;
const webpack = require('webpack-stream');
const imagemin = require('gulp-imagemin');
const imageWebp = require('gulp-webp');
const sprite = require('gulp-svg-symbols');
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');
const options = require('./config');
const tailwindcss = require('tailwindcss');

const mode = require('gulp-mode')({
  modes: ['prod', 'dev'],
  default: 'dev',
});

const path = {
  html: {
    src: 'src/*.html',
    dist: 'dist/',
    watch: ['src/*.html', 'src/blocks/**/*.html'],
  },
  css: {
    src: 'src/css/styles.scss',
    dist: 'dist/css',
    watch: [options.config.tailwindjs, 'src/css/**/*.scss', 'src/blocks/**/*.scss'],
  },
  js: {
    src: 'src/js/script.js',
    dist: 'dist/js',
    watch: ['src/js/**/*.js', 'src/blocks/**/*.js'],
  },
  img: {
    src: 'src/img/**/*.{png,jpg,jpeg,svg}',
    srcwebp: 'dist/img/**/*.{png,jpg,jpeg}',
    dist: 'dist/img',
    watch: 'src/img/**/*.{png,jpg,jpeg,svg}',
  },
  icons: {
    src: 'src/icons/*.svg',
    dist: 'dist/icons',
    watch: 'src/icons/*.svg',
  },
  fonts: {
    src: 'src/fonts/**/*.ttf',
    dist: 'dist/fonts',
    watch: '',
  },
  favicon: {
    src: 'src/favicon/*',
    dist: 'dist/',
    watch: '',
  },
};

function html() {
  return gulp.src(path.html.src).pipe(fileInclude()).pipe(gulp.dest(path.html.dist)).on('end', sync.reload);
}

function css() {
  const tailwindcss = require('tailwindcss');
  return gulp
    .src(path.css.src)
    .pipe(scss())
    .pipe(postcss([tailwindcss(options.config.tailwindjs)]))
   // .pipe(mode.prod(scssCleanMin()))
    .pipe(gulp.dest(path.css.dist))
    .on('end', sync.reload);
}

function js() {
  return gulp
    .src(path.js.src)
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(mode.prod(uglify()))
    .pipe(gulp.dest(path.js.dist))
    .on('end', sync.reload);
}

function img() {
  return gulp
    .src(path.img.src)
    .pipe(
      imagemin([
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.mozjpeg({ quality: 75, progressive: true }),
        imagemin.svgo(),
      ]),
    )
    .pipe(gulp.dest(path.img.dist))
    .on('end', sync.reload);
}

function webp() {
  return gulp
    .src(path.img.src)
    .pipe(imageWebp({ quality: 90 }))
    .pipe(gulp.dest(path.img.dist))
    .on('end', sync.reload);
}

function icons() {
  return gulp
    .src(path.icons.src)
    .pipe(
      sprite({
        title: false,
        id: 'icon_%f',
        templates: ['default-svg'],
      }),
    )
    .pipe(rename('icons.svg'))
    .pipe(gulp.dest(path.icons.dist));
}

exports.icons = icons;

function fonts() {
  gulp.src(path.fonts.src).pipe(gulp.dest(path.fonts.dist));
  gulp.src(path.fonts.src).pipe(ttf2woff()).pipe(gulp.dest(path.fonts.dist));
  return gulp.src(path.fonts.src).pipe(ttf2woff2()).pipe(gulp.dest(path.fonts.dist));
}

function favicon() {
  return gulp.src(path.favicon.src).pipe(gulp.dest(path.favicon.dist));
}

function cleanBuild() {
  return del('dist');
}

function serve() {
  sync.init({
    server: {
      baseDir: './dist/',
    },
    notify: false,
    open: true,
  });
}

function watch() {
  gulp.watch(path.html.watch, gulp.series(html, css));
  gulp.watch(path.css.watch, css);
  gulp.watch(path.js.watch, js);
  gulp.watch(path.img.watch, img);
  gulp.watch(path.img.watch, webp);
  gulp.watch(path.icons.watch, icons);
}

const build = gulp.series(cleanBuild, gulp.parallel(html, css, js, img, icons, fonts, favicon));
const run = gulp.parallel(gulp.series(build, serve), watch);

exports.mode = mode;
exports.build = build;
exports.run = run;
