'use strict';

// Set Env
process.env.NODE_ENV = 'development';
// process.env.NODE_ENV = 'production';

// Check ENV
global.devBuild = process.env.NODE_ENV !== 'production';


// common
const gulp = require('gulp');
const del = require('del');
const plumber = require('gulp-plumber');
const gutil = require('gulp-util');
const sourcemaps = require('gulp-sourcemaps');
const gulpif = require('gulp-if');
const notify = require('gulp-notify');
const runSequence =  require('run-sequence');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
// const newer = require('gulp-newer');
const changed = require('gulp-changed');
// pug
const pug = require('gulp-pug');
const cached = require('gulp-cached');
const filter = require('gulp-filter');
const pugInheritance = require('gulp-pug-inheritance');
const prettify = require('gulp-prettify');
// sass
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const mqpacker = require('css-mqpacker');
const cleancss = require('gulp-cleancss');
const rename = require('gulp-rename');
// js
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
// img
const imagemin = require('gulp-imagemin');
const pngquant = require('imagemin-pngquant');
const jpegoptim = require('imagemin-jpegoptim');
// png sprites
const spritesmith = require('gulp.spritesmith');
// svg sprites
const svgSprite = require('gulp-svg-sprites');
const svgmin = require('gulp-svgmin');
const svgstore = require('gulp-svgstore');
const cheerio = require('gulp-cheerio');
// deploy
const ghPages = require('gulp-gh-pages');

// Paths
var path = {
  build: {
    html: 'build',
    js: 'build/js/',
    css: 'build/css/',
    img: 'build/img/',
    fonts: 'build/fonts/',
    pngSprites: 'src/img/',
    pngSpritesCss: 'src/css/partials/abstracts/',
    svgSprites: 'src/img/',
    deploy: 'build/**/*'
  },
  src: {
    html: ['src/html/**/*.pug', '!src/html/partials/abstracts/bemto/**/*.*'],
    htmlDir: 'src/html',
    js: 'src/js/*.js',
    css: './src/css/*.scss',
    img: ['src/img/**/**.*', '!src/img/png-sprite/*.*', '!src/img/svg-sprite/*.*'],
    fonts: 'src/fonts/**/*.*',
    pngSprites: 'src/img/png-sprite/*.png',
    svgSprites: 'src/img/svg-sprite/*.svg',
  },
  watch: {
    html: 'src/html/**/*.pug',
    js: 'src/js/**/*.js',
    css: 'src/css/**/*.scss',
    img: 'src/img/*.*',
    fonts: 'src/fonts/**/*.*',
    pngSprites: 'src/img/png-sprite/*.png',
    svgSprites: 'src/img/svg-sprite/*.svg'
  },
  clean: './build'
};


// Compilation pug
gulp.task('pug', function() {
  return gulp.src(path.src.html)
    .pipe(plumber({ errorHandler: onError }))
    .pipe(gulpif(devBuild, changed(path.build.html, {extension: '.html'})))
    .pipe(gulpif(global.isWatching, cached('pug')))
    // .pipe(pugInheritance({basedir: path.src.htmlDir}))
    .pipe(pugInheritance({basedir: path.src.htmlDir, extension: '.pug', skip:'node_modules'}))
    .pipe(filter(function (file) {
      return !/\/_/.test(file.path) && !/^_/.test(file.relative);
    }))
    .pipe(pug())
    .pipe(prettify({
      indent_size: 2
    }))
    .pipe(gulp.dest(path.build.html))
    .pipe(reload({stream: true}));
})

// Compilation sass
gulp.task('sass', function () {
  return gulp.src(path.src.css)
//    .pipe(gulpif(devBuild, sourcemaps.init()))
    .pipe(plumber({ errorHandler: onError }))
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({browsers: ['last 3 version']}),
      mqpacker
    ]))
    .pipe(gulp.dest(path.build.css))    
    .pipe(cleancss())
    .pipe(rename('style.min.css'))
//    .pipe(gulpif(devBuild, sourcemaps.write()))
    .pipe(gulp.dest(path.build.css))
    .pipe(reload({stream: true}));
});


// Compilation js v1
// gulp.task('js', function() {
//   var jsFiles = glob.sync(path.src.browserify);
//   return browserify({
//       entries: jsFiles,
//       extensions: ['.jsx']
//     })
//     .bundle()  
//     .pipe(plumber({ errorHandler: onError }))
//     .pipe(source('script.js'))
//     .pipe(gulp.dest(path.build.js))
//     .pipe(buffer())
//     .pipe(sourcemaps.init())
//     .pipe(uglify())
//     .pipe(rename('script.min.js')) 
//     .pipe(sourcemaps.write('/'))   
//     .pipe(gulp.dest(path.build.js))
//     .pipe(reload({stream: true}));
// });

// Compilation js v2 
// (If jquery is used from 3rd party, and you need to exclude it from script.min.js, you should manually put all required .js files into path.src.js directory)
gulp.task('js', function() {
  return gulp.src(path.src.js)
//    .pipe(gulpif(devBuild, sourcemaps.init({loadMaps: true})))
    .pipe(plumber({ errorHandler: onError }))
    .pipe(concat('script.min.js'))
    .pipe(uglify())
//    .pipe(gulpif(devBuild, sourcemaps.write('/')))
    .pipe(gulp.dest(path.build.js))
    .pipe(reload({stream: true}));
});

// Optimization images
gulp.task('img', function () {
  return gulp.src(path.src.img)
    .pipe(gulpif(devBuild, changed(path.build.img)))
    .pipe(gulpif(!devBuild, imagemin()))
    .pipe(gulp.dest(path.build.img))
    .pipe(reload({stream: true}));
});

// Creation png-sprites
gulp.task('png-sprites', function () {
  var spriteData =
    gulp.src(path.src.pngSprites)
      .pipe(spritesmith({
        imgName: 'png-sprite.png',
        imgPath: '../img/png-sprite.png',
        padding: 2,
        cssFormat: 'scss_maps',
        algorithm: 'binary-tree',
        cssName: '_png-sprite.scss',
        cssFormat: 'scss',
        cssVarMap: function(sprite) {
          sprite.name = 's-' + sprite.name
        }
      }));
  spriteData.img.pipe(gulp.dest(path.build.pngSprites));
  spriteData.css.pipe(gulp.dest(path.build.pngSpritesCss));
});

// Creation svg-sprites
gulp.task('svg-sprites', function () {
  return gulp.src(path.src.svgSprites)
    .pipe(plumber(function(error) {
        gutil.log(gutil.colors.red(error.message));
        this.emit('end');
    }))
    .pipe(svgmin())
    .pipe(svgstore())
    .pipe(cheerio({
      run: function ($, file) {
        $('svg').css('display', 'none');
        $('[fill]').removeAttr('fill');
      },
      parserOptions: { xmlMode: true }
    }))  
    .pipe(gulp.dest(path.build.svgSprites))
    .pipe(reload({stream: true}));
});


// Copying fonts
gulp.task('fonts', function() {
  return gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.build.fonts))
});

// Clean
gulp.task('clean', function () {
  return del(path.clean);
});

// Overall build
gulp.task('build', function (cb) {
  runSequence('clean', ['pug', 'png-sprites', 'svg-sprites', 'img', 'sass', 'js', 'fonts'], cb);
});     


//Server config
var config = {
  server: {
    baseDir: "./build"
  },
  // tunnel: true,
  host: 'localhost',
  port: 9000
};
// Browser sync
gulp.task('browserSync', ['build'], function() {
  browserSync(config);
});

// Watching regime
gulp.task('setWatch', function() {
    global.isWatching = true;
});
// Overall watch
gulp.task('watch', ['setWatch', 'browserSync'], function(){
  gulp.watch([path.watch.html], function(event, cb) {
    gulp.start('pug');
  }, [reload]);
  gulp.watch([path.watch.css], function(event, cb) {
    gulp.start('sass');
  });
  gulp.watch([path.watch.js], function(event, cb) {
    gulp.start('js');
  });
  gulp.watch([path.watch.img], function(event, cb) {
    gulp.start('img');
  });
  gulp.watch([path.watch.pngSprites], function(event, cb) {
    gulp.start('png-sprites');
  });
  gulp.watch([path.watch.svgSprites], function(event, cb) {
    gulp.start('svg-sprites');
  });
  gulp.watch([path.watch.fonts], function(event, cb) {
    gulp.start('fonts');
  });
});

// Deploy on github.io
gulp.task('deploy', function() {
  return gulp.src(path.build.deploy)
    .pipe(ghPages());
});

// Default task
gulp.task('default', ['watch']);


var onError = function(err) {
    notify.onError({
      title: "Error in " + err.plugin,
    })(err);
    this.emit('end');
}
