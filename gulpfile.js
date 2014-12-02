var gulp       = require('gulp');
var concat     = require('gulp-concat');
var react      = require('gulp-react');

gulp.task('react', function () {
  return gulp.src(['app/!(App)*.jsx', 'app/App.jsx'])
    .pipe(react({harmony: true}))
    .pipe(concat('app.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
  gulp.watch('app/*.jsx', [ 'react' ]);
});

gulp.task('default', [ 'react', 'watch' ]);
