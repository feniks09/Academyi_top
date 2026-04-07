const { src, dest, watch, series } = require("gulp");
const autoprefixer = require("gulp-autoprefixer").default;
const cleanCSS = require("gulp-clean-css");

function styles() {
  return src("src/css/**/*.css")
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 10 versions"],
        cascade: true,
      })
    )
    .pipe(cleanCSS())
    .pipe(dest("build/css"));
}

function watching() {
  watch(["src/css/**/*.css"], styles);
}

exports.styles = styles;
exports.default = series(styles, watching);
