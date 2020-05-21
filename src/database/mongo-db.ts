import mongoose from 'mongoose';

export function databaseConnection() {
    mongoose.connect('mongodb://carlosp:Carlos-89@ds259245.mlab.com:59245/tabletop-track', { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true/*, useCreateIndex: true */ })
        .then(() => console.log("Conectado a Mongo DB"))
        .catch((error: any) => console.log("No se ha conectado a la DB \n" + error));
}

export function databaseLocalConnection() {
    mongoose.connect('mongodb://localhost/table-top-track', { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true, useCreateIndex: true })
        .then(() => console.log("Conectado a Mongo DB"))
        .catch(error => console.log("No se ha conectado a la DB \n" + error));
}