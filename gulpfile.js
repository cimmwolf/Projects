var gulp = require('gulp');
var sass = require('gulp-sass');
var flexibility = require('postcss-flexibility');
var postCss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var cssNano = require('cssnano');
var cache = require('gulp-cached');

// Components
var polyClean = require('polyclean');
var htmlMin = require('gulp-htmlmin');
var postCssHtml = require('gulp-html-postcss');
var gulpHtmlEntities = require('gulp-html-entities');

gulp.task('default', ['sass', 'components'], function () {
    gulp.src('dist/css/*.css')
        .pipe(postCss([
            flexibility,
            autoprefixer({browsers: ['> 1%', 'last 3 versions'], cascade: false}),
            cssNano({safe: true})
        ]))
        .pipe(gulp.dest('dist/css'));
    gulp.src([
        'bower_components/iron-*/*.html',
        'bower_components/paper-*/*.html',
        'bower_components/google-*/*.html',
        'bower_components/gold-*/*.html',
        'bower_components/neon-*/*.html',
        'bower_components/platinum-*/*.html',
        'bower_components/polymer/*.html'
    ], {base: 'bower_components'})
        .pipe(cache('components'))
        .pipe(polyClean.cleanCss())
        .pipe(polyClean.leftAlignJs())
        .pipe(polyClean.uglifyJs())
        .pipe(htmlMin({removeComments: true}))
        .pipe(gulp.dest('bower_components'));
    return gulp.src('dist/components/*')
        .pipe(polyClean.uglifyJs())
        .pipe(htmlMin({removeComments: true}))
        .pipe(postCssHtml([
            flexibility,
            autoprefixer({browsers: ['> 1%', 'last 3 versions'], cascade: false}),
            cssNano({safe: true})
        ]))
        .pipe(gulpHtmlEntities('decode'))
        .pipe(gulp.dest('dist/components'));
});

gulp.task('sass', function () {
    return gulp.src(['src/sass/*.sass'])
        .pipe(sass({includePaths: ['bower_components/bootstrap-sass/assets/stylesheets']}).on('error', sass.logError))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('components', function () {
    return gulp.src('src/components/*')
        .pipe(gulp.dest('dist/components'));
});