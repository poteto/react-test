var gulp       = require('gulp');
var concat     = require('gulp-concat');
var react      = require('gulp-react');

var fs         = require('fs');
var path       = require('path');
var express    = require('express');
var bodyParser = require('body-parser');
var app        = express();

var comments   = JSON.parse(fs.readFileSync('_comments.json'));

gulp.task('html', function() {
  return gulp.src('index.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('react', function () {
  return gulp.src(['app/!(App)*.jsx', 'app/App.jsx'])
    .pipe(react({harmony: true}))
    .pipe(concat('app.js'))
    .pipe(gulp.dest('dist/js'));
});

gulp.task('watch', function() {
  gulp.watch('app/*.jsx', [ 'react' ]);
  gulp.watch('*.html', [ 'html' ]);
});

gulp.task('express', function() {
  app.use('/', express.static(path.join(__dirname, 'dist')));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));

  app.get('/comments.json', function(req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(comments));
  });

  app.post('/comments.json', function(req, res) {
    comments.push(req.body);
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(comments));
  });
  app.listen(1337);
});

gulp.task('default', [ 'html', 'react', 'watch', 'express' ]);
