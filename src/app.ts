import createError from "http-errors";
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './routes/index';
import usersRouter from './routes/users';
import gamesRoute from './routes/game';

const app = express();

// DATA BASE CONNECTION
mongoose.connect('mongodb://carlosp:Carlos-89@ds259245.mlab.com:59245/tabletop-track', { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true/*, useCreateIndex: true */})
  .then(() => console.log("Conectado a Mongo DB"))
  .catch((error: any) => console.log("No se ha conectado a la DB \n" + error));

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/gamesRoute', gamesRoute);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err: any, req: any, res: any, next: any) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export = app;
