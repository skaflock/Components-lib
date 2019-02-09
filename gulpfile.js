// Include gulp
const gulp = require('gulp');

// Include Our Plugins
const sass = require('gulp-sass');


const paths = {
    styles: {
        src: './public/styles/scss/**/*.scss',
        dest: './public/styles/css/'
    }
};

//////////////////////////////////////////////

// WATCH AREA
// compile scss -> .css -> min.css

gulp.task('styles', function(){
    gulp.src(paths.styles.src)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.styles.dest));
});

// Watch for changes, and live reload
gulp.task('watch', function () {
    gulp.watch(paths.styles.src, ['styles']);
});


// RUN console: gulp
gulp.task('default', ['watch']);
