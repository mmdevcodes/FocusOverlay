const gulp = require("gulp");
const uglify = require("gulp-uglify");
const rename = require("gulp-rename");
const pump = require("pump");
const autoprefixer = require('gulp-autoprefixer');
const minify = require('gulp-clean-css');

gulp.task("css", function (cb) {
    pump([
        gulp.src("./src/focusOverlay.css"),
        autoprefixer({
            browsers: ["> 1%", "last 2 versions", "IE 9-11"],
            cascade: false
        }),
        minify({
            compatibility: "ie9",
            keepSpecialComments: '1'
        }),
        rename({ suffix: ".min" }),
        gulp.dest("./dist")
    ], cb);
});

gulp.task("js", function (cb) {
    pump([
        gulp.src("./src/focusOverlay.js"),
        uglify({
            output: {
                comments: "/^!/"
            }
        }),
        rename({ suffix: ".min" }),
        gulp.dest("./dist"),
    ], cb);
});

gulp.task("default", ["js", "css"]);