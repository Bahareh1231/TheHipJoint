const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const notify = require('gulp-notify');;
const browserSync = require('browser-sync')
const reload = browserSync.reload;
const uglify = require('gulp-uglify');
const babel = require('gulp-babel');
const useref = require('gulp-useref');
const gulpIf = require('gulp-if');
// const cssnano = require('gulp-cssnano');
const imagemin = require('gulp-imagemin');

// watchers 

gulp.task('styles', () => {
    return gulp.src('./dev/styles/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('styles.css'))
        .pipe(gulp.dest('./public/styles'))
        .pipe(reload({ stream: true }))
        .on('error', notify.onError({
        message: "Error: <%= error.message %>",
        title: 'Error in CSS 💩'
    }));
});

gulp.task('js', () => {
    browserify('./dev/scripts/script.js', { debug: true })
        .transform('babelify', {
            sourceMaps: true,
            presets: ['env']
        })
        .bundle()
        .on('error', notify.onError({
            message: "Error: <%= error.message %>",
            title: 'Error in JS 💩'
        }))
        .pipe(source('script.js'))
        .pipe(buffer())
        .pipe(gulp.dest('./public/scripts'))
        .pipe(reload({ stream: true }));
});

gulp.task('html', () => {
    return gulp.src('./dev/*.html')
        .pipe(gulp.dest('./public'))
        .pipe(reload({ stream: true }));;

});


gulp.task('bs', () => {
    browserSync.init({
        server: {
            baseDir: './public/'
        }
    })
})


gulp.task('watch', () => {
    gulp.watch('./dev/styles/**/*.scss', ['styles']);
    gulp.watch('./dev/scripts/**/*.js', ['js'])
    gulp.watch('./dev/*.html', ['html'])
})

// minification

gulp.task('useref', function () {
    return gulp.src('./dev/*.html')
        .pipe(useref())
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify().on('error', function (e) {
            console.log(e);
        }))
        .pipe(gulpIf('*.js', uglify()))
        // .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('./public'))
});

gulp.task('images', function () {
    return gulp.src('./public/images/**/*.+(png|jpg|gif|svg)')
        .pipe(imagemin())
        .pipe(gulp.dest('public/assets'))
});


gulp.task('build', ['html', 'styles', 'js']);

gulp.task('default', ['bs', 'styles', 'js', 'html', 'watch']);
