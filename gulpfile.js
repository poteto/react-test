var gulp    = require('gulp');
var concat  = require('gulp-concat');
var react   = require('gulp-react');
var express = require('express');
var app     = express();

gulp.task('react', function () {
  return gulp.src(['app/!(App)*.jsx', 'app/App.jsx'])
    .pipe(react({harmony: true}))
    .pipe(concat('app.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  gulp.watch('app/*.jsx', [ 'react' ]);
});

gulp.task('express', function() {
  app.use(express.static(__dirname));
  app.listen(1337);
});

gulp.task('default', [ 'react', 'watch', 'express' ]);
