const {src, dest, watch, series} = require('gulp');
const imagemin = require('gulp-imagemin');

function images() {
    return src('src/images/**/*', { encoding: false})
        .pipe(imagemin())
        .pipe(dest('dist'));
    
}
function watching() {
    watch(['src/images/**/*'], images);
    

}
exports.images = images;
exports.default = series(images, watching);
