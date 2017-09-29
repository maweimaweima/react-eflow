var gulp = require('gulp');
var babel = require('gulp-babel');
var gulpRename = require("gulp-rename");
var gulpClean = require('gulp-clean');


//构建任务
gulp.task('transform', function(){
  //这里是将script文件下的js转换为ES5，并添加到dist文件夹中
  gulp.src('src/**/*.js')
    .pipe(babel({
      "plugins": ["transform-class-properties"],
      "presets": ["stage-0", "es2015", "react"]
    }))
    .pipe(gulp.dest('lib'));
});

gulp.task('clean', ['transform'], function () {
  return gulp.src('react-eflow-build', {read: false})
    .pipe(gulpClean());
});

gulp.task('copy', ['clean'], function(){
  gulp.src(['package.json', 'README.md', 'lib/**/*', 'src/**/*'], {base:"."})
    .pipe(gulp.dest('../react-eflow-build'));
});

gulp.task('build', ['copy'], function(){
  gulp.src(['src/eflow.d.ts'])
    .pipe(gulpRename('index.d.ts'))
    .pipe(gulp.dest("../react-eflow-build"));
});