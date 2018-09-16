const gulp = require('gulp'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync'), 
  autoprefixer = require('gulp-autoprefixer'),
  webpack = require('webpack'),
  imagemin = require('gulp-imagemin'),
  pngquant = require('imagemin-pngquant'),
  webpackStream = require('webpack-stream');


gulp.task('sass', () => { 
return gulp.src('src/sass/**/*.sass') 
    .pipe(sass()) 
    .pipe(autoprefixer({
        browsers: 'last 20 versions', cascade: true }))
    .pipe(gulp.dest('./public/css/')) 
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('scripts', () => {
  return gulp.src('./src/js/app.js')
    .pipe(webpackStream({
      output: {
        filename: 'app.js',
      },
      module: {
        rules: [
          {
            test: /\.(js)$/,
            exclude: /(node_modules)/,
            loader: 'babel-loader',
            query: {
              presets: ['env']
            }
          }
        ]
      },
      externals: {
        es6: 'ES6'
      }
    }))
    .pipe(gulp.dest('./public/js/'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('./public/js/'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', () => { 
    browserSync({ 
        server: { 
            baseDir: 'public' 
        },
        notify: false 
    });
});

gulp.task('watch', gulp.parallel('browser-sync', 'sass', 'scripts', () => {
    gulp.watch('src/sass/**/*.sass', gulp.series('sass'));
    gulp.watch('public/*.html', browserSync.reload);
    gulp.watch('src/js/**/*.js', gulp.series('scripts')); 
}));

gulp.task('img', () => {
  return gulp.src('public/img/**/*')
      .pipe(imagemin({ 
          interlaced: true,
          progressive: true,
          svgoPlugins: [{removeViewBox: false}],
          use: [pngquant()]
      }))
      .pipe(gulp.dest('dist/img'));
});

gulp.task('build', gulp.parallel('sass', 'scripts', 'img', () => {

    const buildCss = gulp.src('public/css/*.css')
    .pipe(gulp.dest('dist/css'))

    const buildFonts = gulp.src('public/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))

    const buildJs = gulp.src('public/js/*.js')
    .pipe(gulp.dest('dist/js'))

    const buildHtml = gulp.src('public/*.html')
    .pipe(gulp.dest('dist'));

}));

gulp.task('default', gulp.series('watch'));