/*
 * @Author: mikey.zhaopeng 
 * @Date: 2018-12-03 08:59:09 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-12-03 09:54:06
 */
var gulp = require("gulp");
var sass = require("gulp-sass");
var mincss = require("gulp-clean-css");
var webserver = require("gulp-webserver");
var uglify = require("gulp-uglify");
var babel = require("gulp-babel");
var concat = require("gulp-concat");
var url = require("url");
var path = require("path");
var fs = require("fs");

//编译sass
gulp.task("sass", function() {
    return gulp.src("./src/scss/*.scss")
        .pipe(sass())
        .pipe(mincss())
        .pipe(gulp.dest("./src/css"))
});
//监听scss文件
gulp.task("watch", function() {
    return gulp.watch("./src/scss/*.scss", gulp.series("sass"))
});
//压缩合并js
gulp.task("js", function() {
    return gulp.src("./src/js/*.js")
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify("./src/js/*.js"))
        .pipe(gulp.dest("./src/aa"))
});
//监听js文件
gulp.task("watchjs", function() {
    return gulp.watch("./src/js/*.js", gulp.series("js"));
});
//服务
gulp.task("default", function() {
    return gulp.src("./src")
        .pipe(webserver({
            port: 9999,
            open: true,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname == "/favicon.ico") {
                    res.end("");
                    return;
                }
                if (pathname === "/") {
                    res.end(fs.readFileSync("./src/index.html"))
                } else {
                    var str = path.join(__dirname, "src", pathname);
                    res.end(fs.readFileSync(str))
                }
            }
        }))
})