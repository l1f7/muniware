/* eslint-env node */
/* eslint padded-blocks: [0] */

// DEPENDENCIES =======================================================
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const autoprefixer = require('autoprefixer');


// FILE PATHS =========================================================
const source = {

  styles: 'raw/sass/**/*.scss',
  scripts: 'raw/js/*.js',
  images: 'raw/assets/images/*.{png,jpg,gif}',
  svgs: 'raw/assets/svgs/*.svg',
  plugins: 'raw/bower',

};
const assets = {

  styles: 'build/styles',
  scripts: 'build/scripts',
  images: 'build/assets/images',
  vendor: 'build/assets/vendor',

};
const plugins = [

  source.plugins + '/selectize/dist/js/standalone/selectize.js',

];
const vendor = [

  // source.plugins + '/idangerous-swiper/dist/js/swiper.jquery.min.js',
  // source.plugins + '/idangerous-swiper/dist/css/swiper.min.css',

];


// AUTOPREFIXER CONFIG ================================================
const AUTOPREFIXER_BROWSERS = [
  'ie >= 8',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10',
];


// COMPILE STYLESHEETS ================================================
gulp.task('styles', function styles() {

  return gulp.src('raw/sass/*.scss')
    .pipe($.changed('styles', {
      extension: '.scss',
    }))
    .pipe($.sass({
      precision: 10,
      onError: console.error.bind(console, 'SASS error:'),
    }))
    .pipe($.postcss([
      autoprefixer({
        browsers: AUTOPREFIXER_BROWSERS,
      }),
    ]))
    .pipe($.csso())
    .pipe(gulp.dest(assets.styles))
    .pipe($.size({ title: 'styles' }));

});


// LINT & CONCATENATE JS ==============================================
gulp.task('scripts', function jsScripts() {

  return gulp.src(source.scripts)
    .pipe($.concat('main.js'))
    .pipe($.uglify())
    .pipe(gulp.dest(assets.scripts));

});

gulp.task('plugins', function jsPlugins() {

  return gulp.src(plugins)
    .pipe($.concat('plugins.js'))
    .pipe($.uglify())
    .pipe(gulp.dest(assets.scripts))
    .pipe($.size({ title: 'plugins' }));

});

gulp.task('modernizr', function jsModernizr() {

  return gulp.src(source.scripts)
    .pipe($.modernizr({
      options: [
        'setClasses',
      ],
      tests: [
        'flexbox',
        'flexboxlegacy',
        'flexboxtweener',
      ],
      crawl: false,
    }))
    .pipe($.uglify())
    .pipe(gulp.dest(assets.scripts));

});


// COPY ONE-OFF VENDOR SCRIPTS ========================================
gulp.task('vendor', function jsVendor() {

  return gulp.src(vendor)
    .pipe(gulp.dest(assets.vendor))
    .pipe($.size({ title: 'vendor' }));

});


// OPTIMISE IMAGES ====================================================
gulp.task('images', function images() {

  return gulp.src(source.images)
    .pipe($.changed(assets.images))
    .pipe($.imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true,
    }))
    .pipe(gulp.dest(assets.images));

});


// CREATE SVG SPRITE ==================================================
gulp.task('sprite', function sprite() {

  return gulp.src(source.svgs)
  .pipe($.svgSprite({
    mode: {
      symbol: {
        dest: './',
        sprite: 'sprite.symbol.svg',
      },
    },
  }))
  .pipe(gulp.dest(assets.images));

});


// WATCH FOR CHANGES AND RELOAD =======================================
gulp.task('serve', function serve() {

  browserSync({
    notify: false,
    logPrefix: '↻',
    // proxy: 'localhost:8000',
    port: '1337',
    server: 'build',
  });

  gulp.watch(['build/**/*.html'], [reload]);
  gulp.watch([source.styles], ['styles']);
  // gulp.watch([source.scripts], ['scripts']);
  // gulp.watch([source.images], ['images', reload]);

});
