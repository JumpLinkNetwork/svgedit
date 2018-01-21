const gulp = require('gulp');
const uglify = require('gulp-uglify');
const pump = require('pump');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const debug = require('gulp-debug');
const webserver = require('gulp-webserver');
const watch = require('gulp-watch');

const JS_FILES = [
	'src/svgedit.js',
	'src/jquery-svg.js',
	'src/contextmenu/jquery.contextMenu.js',
	'src/pathseg.js',
	'src/browser.js',
	'src/svgtransformlist.js',
	'src/math.js',
	'src/units.js',
	'src/svgutils.js',
	'src/sanitize.js',
	'src/history.js',
	'src/historyrecording.js',
	'src/coords.js',
	'src/recalculate.js',
	'src/select.js',
	'src/draw.js',
	'src/layer.js',
	'src/path.js',
	'src/svgcanvas.js',
	'src/svg-editor.js',
  'src/locale/locale.js',
	'src/contextmenu',
];

gulp.task('default', ['compress']);

gulp.task('compress', function (cb) {
  pump([
    gulp.src(JS_FILES, {base: 'src'}),
    debug({title: 'src:'}),
    concat('svg-edit.js'),
    gulp.dest('dist'),
    debug({title: 'dist:'}),
    uglify(),
    rename('svg-edit.min.js'),
    gulp.dest('dist'),
    debug({title: 'dist:'}),
  ],cb);
});

gulp.task('watch', function (cb) {
  return watch(JS_FILES, function () {
    gulp.start('compress');
  });

});

gulp.task('serve', function() {
  gulp.src('.')
    .pipe(webserver({
      livereload: true,
      directoryListing: true,
      open: '/demo/classic/index.html',
    }));
});