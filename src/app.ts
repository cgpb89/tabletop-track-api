import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import passport  from 'passport';
import logger from 'morgan';
import { databaseLocalConnection } from "./database/mongo-db";
// ROUTES IMPORTS
import indexRouter from './routes/index';
import usersRouter from './routes/user';
import gamesRoute from './routes/game';
import groupRoute from './routes/group';
import matchRoute from './routes/match';
import positionRoute from './routes/position';
import userGames from './routes/userGames';
// tslint:disable-next-line: no-var-requires
require("./auth/auth");
const app = express();

// DATA BASE CONNECTION
databaseLocalConnection();

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ROUTES
app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/games', gamesRoute);
app.use('/group', groupRoute);
app.use('/match', matchRoute);
app.use('/position', positionRoute);
app.use('/my/games', userGames);

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
  res.send(`Error ${err}`);
});

export = app;
