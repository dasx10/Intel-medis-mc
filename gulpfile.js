// vanila
const fs = require('fs');

// core
const gulp = require('gulp');

// helpers
const browserSync = require('browser-sync').create();
const rename      = require("gulp-rename");

const less         = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const gcmq         = require('gulp-group-css-media-queries');
const cssmin       = require('gulp-cssmin');

// html
const htmlmin    = require('gulp-htmlmin');
const handlebars = require('gulp-compile-handlebars');

// js
const uglify = require('gulp-uglify');

// const imagemin = require ('gulp-imagemin');
const svgo = require('gulp-svgo');
// const webp = require('gulp-webp');

// const del = require('del');
// const child_process = require('child_process');

const isDev   = process.argv.includes('--dev');
const isProd  = !isDev;

let path = {
    src:{
        css:        './src/style/main.less',
        js:         './src/js/**/*.js',
        img:        './src/image/**/*.{png,jpg,svg,webp}',
        html:       './src/html/*.hbs',
        page:       './src/page/*.hbs',
        components: './src/components/*.hbs',
        data:       './src/util/data.js',
    },
    build:'./public'
}

if (isDev) browserSync.init({ server: path.build });

function js() {
    if (isProd) return gulp
        .pipe(uglify())
        .src('./public/s.js')
        .pipe(gulp.dest(path.build))

    return gulp
        .src('./public/s.js')
        .pipe(gulp.dest(path.build))
        .pipe(browserSync.stream())
}

function css(){
    const run = gulp
    .src(path.src.css)
    .pipe(less())
    .pipe(gcmq())
    .pipe(autoprefixer())

    if (isProd)  return run
        .pipe(cssmin())
        .pipe(gulp.dest(path.build));

    return run
        .pipe(gulp.dest(path.build))
        .pipe(browserSync.stream())
}


let load = null;
const loadData = async () => {
    if (!load) load = fs.promises.readFile(path.src.data, 'utf-8');
    data = await load;
    load = null;
    eval(data);
}


const hbsConfig = {
    batch : ['./src/components', './src/page'],
    helpers : {
        up : function(str){
            return str.toUpperCase();
        },
        low: function(str) {
            return str.toUpperCase()
        },
        cap: function (string = '') {
            const [firstLetter = '', ...nextLetters] = string.split('');
            return firstLetter.toUpperCase() + [...nextLetters].join('').toLowerCase();
        },
        tel: function ({ hash }) {
            return '+38 ('
            + hash.tel.substr(0, 3)
            + ') '
            + hash.tel.substr(3, 3)
            + ' '
            + hash.tel.substr(6, 2)
            + ' '
            + hash.tel.substr(8, 2)
            ;
        },
        icon: function(src) {
            return fs.readFileSync('./src/icon/' + src.hash.src + '.svg', 'utf8');
        },
    }
}

function html(done){
    loadData().then(() => {
        const run = gulp
        .src(path.src.html)
        .pipe(handlebars($, hbsConfig))
        .pipe(rename(function (path) {
            const { basename } = path;
            path.dirname = basename !== 'index' ? `./${basename}` : './';
            path.basename = "index"
            path.extname = ".html";
        }));
    
        if (isProd) run
            .pipe(htmlmin({ collapseWhitespace: true }))
            .pipe(gulp.dest(path.build));

        else run
            .pipe(gulp.dest(path.build))
            .pipe(browserSync.stream());

        done()
    });
}

function page (done) {
    loadData()
    .then(() => {
        const run = gulp
        .src(path.src.page)
        .pipe(handlebars($, hbsConfig))
        .pipe(rename(function (path) {
            path.extname = ".html";
        }));

        if (isProd) run
            .pipe(htmlmin({ collapseWhitespace: true }))
            .pipe(gulp.dest(path.build + '/page'));

        else run
            .pipe(gulp.dest(path.build + '/page'))
            .pipe(browserSync.stream())

        return done();
    })
}

function svg () {
    return gulp
        .src('./assets/icon/*.svg')
        .pipe(svgo())
        .pipe(gulp.dest('./src/icon'))
}

function build () {
    return gulp.parallel([
        js,
        css,
        svg,
        page,
        html
    ]);
}

function watch() {
    gulp.watch([
        path.src.page,
        path.src.components,
        path.src.html,
        path.src.data
    ], gulp.parallel([page, html]))

    gulp.watch(['./src/style/**/*.less'], css)

    gulp.watch(['./public/**/*.js'], js)
}

module.exports.watch = watch;
module.exports.svg   = svg;
module.exports.build = build;