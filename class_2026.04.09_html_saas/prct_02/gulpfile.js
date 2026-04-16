const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));

const styles = () => {
  return gulp
    .src("./scss/**/*.scss", { sourcemaps: true })
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./css", { sourcemaps: "." }));
};

const watch = () => {
  gulp.watch("./scss/**/*.scss", styles);
};

exports.default = gulp.series(styles, watch);
