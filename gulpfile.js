var gulp = require('gulp');
var autoprefixer = require('autoprefixer');
var cssNano = require('cssnano');
var cache = require('gulp-cached');

// Components
var htmlMin = require('gulp-htmlmin');
var postCssHtml = require('gulp-html-postcss');

gulp.task('compress_components', function () {
    return gulp.src([
        'node_modules/@bower_components/iron-*/*.html',
        'node_modules/@bower_components/paper-*/*.html',
        'node_modules/@bower_components/google-*/*.html',
        'node_modules/@bower_components/gold-*/*.html',
        'node_modules/@bower_components/neon-*/*.html',
        'node_modules/@bower_components/platinum-*/*.html',
        'node_modules/@bower_components/polymer/*.html'
    ], {base: 'node_modules/@bower_components'})
        .pipe(cache('components'))
        .pipe(htmlMin({
            removeComments: true,
            preventAttributesEscaping: true,
            collapseWhitespace: true,
            minifyJS: true,
            minifyCSS: true
        }))
        .pipe(gulp.dest('node_modules/@bower_components'));
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