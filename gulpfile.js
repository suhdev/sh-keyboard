var gulp = require('gulp'),
	concat = require('gulp-concat'),
	jshint = require('gulp-jshint'),
	stylish = require('jshint-stylish'),
	uglify = require('gulp-uglify'); 


var PATHS = {
	JS:{
		SRC:['./src/*.js']
	}
};

function onError(e){
	console.log(e); 
}

gulp.task('jshint',function(){
	gulp.src(PATHS.JS.SRC)
		.pipe(jshint())
		.pipe(jshint.reporter(stylish));
}); 

gulp.task('concat',['jshint'],function(){
	gulp.src(PATHS.JS.SRC)
		.on('error',onError)
		.pipe(concat('keyboard.js'))
		.pipe(gulp.dest('./'))
		.pipe(concat('keyboard.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./')); 
}); 

gulp.task('watch',['jshint','concat'],function(){
	gulp.watch(PATHS.JS.SRC, ['concat']);
});

gulp.task('default',['watch'],function(){
	
}); 