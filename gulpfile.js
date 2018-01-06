const gulp        = require('gulp');
const browserSync = require('browser-sync').create();
const sass        = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const image = require('gulp-image');

// Compile Sass & Inject Into Browser
gulp.task('sass', function() {
    return gulp.src(['assets/css/scss/**/*.scss'])

    .pipe(sass({outputStyle: ''}).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 15 versions', '> 1%', 'ie 8', 'ie 7'],
      cascade: false
      }))
        .pipe(gulp.dest("assets/css"))
        .pipe(browserSync.stream());
});
gulp.task('image', function () {
    return gulp.src('assets/img/**')
        .pipe(image())
        .pipe(gulp.dest('assets/img'));
});

// Watch Sass & Serve
gulp.task('serve', ['sass'], function() {
    browserSync.init({
        server: "./"
});

gulp.watch(["assets/css/scss/**/*.scss"], ['sass']);

gulp.watch("./index.html").on('change', browserSync.reload);
gulp.watch("assets/js/*.js").on('change', browserSync.reload);
gulp.watch('assets/img/**');

});

// Default Task
gulp.task('default', ['serve', 'image']);
