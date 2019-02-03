// Include gulp
const gulp = require('gulp');

// Include Our Plugins
const concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    pump = require('pump'),
    cssUrlVersion = require('gulp-css-urlversion');



const pluginsJS = [
    'node_modules/jquery/dist/jquery.min.js'
];

const paths = {
    scripts: {
        src: [
            'public/js/**/*.js'
        ],
        dest: 'public/js.min/'
    }
};

//////////////////////////////////////////////

// WATCH AREA

// Compile _js -> _js.min
gulp.task('_js.min', function (cb) {
    pump([
            gulp.src(paths.scripts.src, {sourcemaps: true}),
            concat('scripts.min.js'),
            uglify(),
            gulp.dest(paths.scripts.dest)
        ],
        cb
    );
});

// Watch for changes, and live reload
gulp.task('watch', function () {
    gulp.watch('public/js/**/*.js', ['_js.min']);
});

//////////////////////////////////////////////


// Concatenate & Minify JS, CSS PLUGINS
gulp.task('plugins', function() {
    // concat minify plugins JS
    gulp.src(pluginsJS)
        .pipe(concat('_plugins-all.min.js')).on('error', sass.logError)
        .pipe(uglify())
        .pipe(gulp.dest('.'));
});

// RUN console: gulp
gulp.task('default', ['watch']);
gulp.task('all', ['scss', 'plugins', '_js.min']);
