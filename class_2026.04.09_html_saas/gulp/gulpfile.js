import gulp from "gulp";
import webp from "gulp-webp";

export default () =>
  gulp.src("app/img/*.{jpg,jpeg,png}").pipe(webp()).pipe(gulp.dest("dist"));
