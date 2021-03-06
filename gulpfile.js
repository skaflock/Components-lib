// Include gulp
const gulp = require('gulp'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename');

// Include Our Plugins
const sass = require('gulp-sass');


const paths = {
    styles: {
        src: ['./public/styles/scss/*.scss', './public/components/*/*.scss'],
        dest: './public/styles/css/'
    }
};

//////////////////////////////////////////////

// WATCH AREA
// compile scss -> .css -> min.css

gulp.task('styles', function(){
    gulp.src(paths.styles.src)
        .pipe(sass({outputStyle: 'compressed'})).on('error', console.log)
        .pipe(concat('styles.css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest(paths.styles.dest));
});

// Watch for changes, and live reload
gulp.task('watch', function () {
    gulp.watch(paths.styles.src, ['styles']);
});


// RUN console: gulp
gulp.task('default', ['watch']);
