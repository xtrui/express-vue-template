let createError = require('http-errors');
let webpackConfig = require('./vue/webpack.config.js');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let logger = require('morgan');
let history = require('connect-history-api-fallback');
let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');
const middleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const compiler = webpack(webpackConfig);
let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static('public'));
app.use(express.static('vue/src/assets'));
// app.use(express.static(''));
// app.use(express.static(path.join(__dirname, 'public')));
console.log(path.join(__dirname, 'public'));

// app.use('/', indexRouter);
// app.use('/users', usersRouter);

//前端路由
app.use(history({
    htmlAcceptHeaders: ['text/html'],
    index: '/',
    verbose: true
}));

//middleware
app.use(middleware(compiler, {}));


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
