var gulp = require('gulp'),
    childProcess = require('child_process'),
    electron = require('electron-prebuilt'),
    uglify = require('gulp-uglify'),
    gulpIf = require('gulp-if'),
    cssnano = require('gulp-cssnano'),
    useref = require('gulp-useref'),
    packager = require('electron-packager');

var build_options = {
    "arch" : "ia32",
    "dir" : "./app",
    "platform" : "win32",
    "asar" : true,
    "out" : "./build"
};

// Run the application
gulp.task('run', function () {
    childProcess.spawn(electron, ['./app']);
});

/**
 * @TODO : Compile
*/

// Minify the application
//gulp.task('minify', function() {
//    return gulp.src('./app/*.html')
//        .pipe(useref())
//        .pipe(gulpIf('*.js', uglify()))
//        .pipe(gulpIf('*.css', cssnano()))
//        .pipe(gulp.dest('./dist'))
//});
//
//gulp.task('copyPartial', function(){
//    return gulp.src('./app/*/*/*.html')
//        .pipe(gulp.dest('./dist/scripts/partials'))
//});
//
//gulp.task('copyMain', function(){
//    return gulp.src('./app/main.js')
//        .pipe(gulp.dest('./dist'))
//});
//
//// Build this bad boy
//gulp.task('build', ['minify','copyPartial','copyMain'], function(){
//    packager(build_options,function done_callback(err, appPaths){
//        if(err){
//            console.log(err);
//        } else {
//            console.log(appPaths);
//        }
//    });
//});