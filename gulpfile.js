var gulp = require('gulp');
var autoprefixer = require('autoprefixer');
var cssNano = require('cssnano');
var cache = require('gulp-cached');

// Components
var htmlMin = require('gulp-htmlmin');
var postCssHtml = require('gulp-html-postcss');

gulp.task('compress_components', function () {
    return gulp.src([
        'bower_components/iron-*/*.html',
        'bower_components/paper-*/*.html',
        'bower_components/google-*/*.html',
        'bower_components/gold-*/*.html',
        'bower_components/neon-*/*.html',
        'bower_components/platinum-*/*.html',
        'bower_components/polymer/*.html'
    ], {base: 'bower_components'})
        .pipe(cache('components'))
        .pipe(htmlMin({
            removeComments: true,
            preventAttributesEscaping: true,
            collapseWhitespace: true,
            minifyJS: true,
            minifyCSS: true
        }))
        .pipe(gulp.dest('bower_components'));
});

gulp.task('publish', ['compress_components'], function () {
    return gulp.src('src/**/*.html')
        .pipe(htmlMin({
            removeComments: true,
            preventAttributesEscaping: true,
            collapseWhitespace: true,
            minifyJS: true,
            minifyCSS: true
        }))
        .pipe(postCssHtml([
            autoprefixer(),
            cssNano({safe: true})
        ]))
        .pipe(gulp.dest('src'));
});