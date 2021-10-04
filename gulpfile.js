const fs = require('fs');

const gulp = require('gulp');

const browserSync = require('browser-sync').create();
const rename = require("gulp-rename");

const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const gcmq = require('gulp-group-css-media-queries');
const cssmin = require('gulp-cssmin');

const htmlmin = require('gulp-htmlmin');
const handlebars = require('gulp-compile-handlebars');

const uglify = require('gulp-uglify');

// const imagemin = require ('gulp-imagemin');
const svgo = require('gulp-svgo');
// const webp = require('gulp-webp');

// const del = require('del');
// const child_process = require('child_process');

const isDev = process.argv.includes('--dev');
const isProd = !isDev;

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

browserSync.init({
    server: path.build
});

function js() {
    return gulp
    .src('./public/s.js')
    // .pipe(uglify())
    // .pipe(gulp.dest(path.build))
    .pipe(browserSync.stream())
}

function css(){
    if (isProd) {
        return gulp
        .src(path.src.css)
        .pipe(less())
        .pipe(autoprefixer())
        .pipe(gcmq())
        .pipe(cssmin())
        .pipe(gulp.dest(path.build))
    } else {
        return gulp
        .src(path.src.css)
        .pipe(less())
        .pipe(gcmq())
        .pipe(gulp.dest(path.build))
        .pipe(browserSync.stream())
    }
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

async function html(){
    await loadData();
    return gulp
    .src(path.src.html)
    .pipe(handlebars($, hbsConfig))
    .pipe(rename(function (path) {
        const { basename } = path;
        path.dirname = basename !== 'index' ? `./${basename}` : './';
        path.basename = "index"
        path.extname = ".html";
    }))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(path.build))

    .pipe(browserSync.stream())
}

async function page () {
    await loadData();
    return gulp
    .src(path.src.page)
    .pipe(handlebars($, hbsConfig))
    .pipe(rename(function (path) {
        path.extname = ".html";
    }))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(path.build + '/page'))

    .pipe(browserSync.stream())
}

function svg () {
    return gulp
    .src('./assets/icon/*.svg')
    .pipe(svgo())
    .pipe(gulp.dest('./src/icon'))
}

// function img(){
//     setTimeout(()=>{
//         child_process.exec('rm ./assets/image/*.*');
//     },10000);
//     return gulp.src(path.src.img)
//     .pipe(webp({
//         quality:70
//     }))
//     .pipe(gulp.dest(path.build))
//     .pipe(gulp.src(path.src.img))
//     .pipe(imagemin({
//         progressive:true,
//         svgoPlugins:[{removeViewBox:false}],
//         interlaced:true,
//         optimizationLevel:3
//     }))
//     .pipe(gulp.dest(path.build))
// }

function watch(){
    // gulp.watch([path.src.img],img);
    gulp.watch([
        path.src.page,
        path.src.components,
        path.src.html,
        path.src.data
    ], gulp.parallel([page, html]));
    gulp.watch(['./src/style/**/*.less'], css);
    gulp.watch(['./public/**/*.js'], js);
}



// module.exports.css=css;
// module.exports.img=img;
module.exports.watch=watch;
module.exports.svg=svg;

module.exports.build = function () {
    return gulp.parallel([js, css, svg, page, html])
}