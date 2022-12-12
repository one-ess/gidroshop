//https://youtu.be/SVmnfkICqq0 сборка от Вадоса

const { src, dest, watch, parallel, series } = require("gulp");

const scss = require("gulp-sass")(require("sass"));
const concat = require("gulp-concat");
const browserSync = require("browser-sync").create();
const uglify = require("gulp-uglify-es").default;
const autoprefixer = require("gulp-autoprefixer");
const imagemin = require("gulp-imagemin");
const del = require("del");
const ttf2woff = require("gulp-ttf2woff");
const ttf2woff2 = require("gulp-ttf2woff2");

function browsersync() {
  browserSync.init({
    server: {
      baseDir: "app/",
    },
  });
}
function scripts() {
  return src(["app/js/main.js"]).pipe(concat("main.min.js")).pipe(uglify()).pipe(dest("app/js")).pipe(browserSync.stream());
}
function libs_js() {
  return src([
    "node_modules/slick-carousel/slick/slick.js",
    "node_modules/ion-rangeslider/js/ion.rangeSlider.js",
    "node_modules/rateyo/src/jquery.rateyo.js",
    "node_modules/@fancyapps/fancybox/dist/jquery.fancybox.js",
    "node_modules/jquery-validation/dist/jquery.validate.min.js",
    "app/js/dynamicAdapt.js",
  ])
    .pipe(concat("libs.min.js"))
    .pipe(uglify())
    .pipe(dest("app/js"))
    .pipe(browserSync.stream());
}
function libs_css() {
  return src([
    "node_modules/slick-carousel/slick/slick.css",
    "node_modules/ion-rangeslider/css/ion.rangeSlider.css",
    "node_modules/rateyo/src/jquery.rateyo.css",
    "node_modules/@fancyapps/fancybox/dist/jquery.fancybox.css",
  ])
    .pipe(concat("_libs.scss"))
    .pipe(dest("app/scss"))
    .pipe(browserSync.stream());
}

function fonts() {
  src("app/fonts/*.ttf").pipe(ttf2woff()).pipe(dest("app/fonts"));
  return src("app/fonts/*.ttf").pipe(ttf2woff2()).pipe(dest("app/fonts"));
}

function styles() {
  return src("app/scss/style.scss")
    .pipe(scss({ outputStyle: "compressed" }))
    .pipe(concat("style.min.css"))
    .pipe(
      autoprefixer({
        overrideBrowserslist: ["last 10 version"],
        grid: true,
      })
    )
    .pipe(dest("app/css"))
    .pipe(browserSync.stream());
}
function build() {
  return src(["app/css/style.min.css", "app/fonts/**/*", "app/js/main.min.js", "app/favicon.ico", "app/js/libs.min.js", "app/*.html"], {
    base: "app",
  }).pipe(dest("dist"));
}
function images() {
  return src("app/images/**/*")
    .pipe(
      imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.mozjpeg({ quality: 90, progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }],
        }),
      ])
    )
    .pipe(dest("dist/images"));
}
function cleanDist() {
  return del("dist");
}
function watching() {
  watch(["app/scss/**/*.scss"], styles);
  watch(["app/*.html"]).on("change", browserSync.reload);
  watch(["app/js/**/*.js", "!app/js/main.min.js"], scripts);
}

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.scripts = scripts;
exports.cleanDist = cleanDist;
exports.images = images;
exports.libs_css = libs_css;
exports.libs_js = libs_js;
exports.fonts = fonts;

exports.build = series(cleanDist, images, build);
exports.default = parallel(styles, scripts, fonts, libs_css, libs_js, browsersync, watching);
