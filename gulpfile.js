const gulp = require("gulp");
const connect = require("gulp-connect");
const sass = require("gulp-sass");
const beautify = require("gulp-beautify");

function connectTask(cb) {
  connect.server({
    root: "./",
    livereload: true
  });
  cb();
}

function htmlReloadTask(cb) {
  gulp.src("**.html").pipe(connect.reload());
  cb();
}

function sassToCssTask(cb) {
  gulp
    .src("./sass/style.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./css"))
    .pipe(connect.reload());
  cb();
}

function watchTask(cb) {
  gulp.watch("**.html", htmlReloadTask);
  gulp.watch("./sass/**.scss", { ignoreInitial: false }, sassToCssTask);
  cb();
}

exports.default = gulp.series(connectTask, watchTask);
