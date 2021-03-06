var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/api');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('port', process.env.PORT || 3000);

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.all('/*', function(req,res,next){
	res.header('Access-Control-Allow-Origin','*');
  	res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE,OPTIONS');
  	res.header('Access-Control-Allow-Headers','Content-type,Accept,X-Access-Token,X-key');
	if(req.method == 'OPTIONS'){
		res.status(200).end();
	} else {
		next();
	}
});
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function(){
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err,req,res,next){
	res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {}
    });
});


var server = app.listen(app.get('port'), function(){
  console.log('app is listening to port ' + app.get('port'));
});


module.exports = app;
