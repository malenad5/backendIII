import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import logger from './config/logger.js';


import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js';


const app = express();
const PORT = process.env.PORT||8080;
const connection = mongoose.connect("mongodb+srv://malenad954:malena@coderhousebackendi.dxyns.mongodb.net/coderHouseBackendI?retryWrites=true&w=majority&appName=coderHouseBackendI")


app.use(express.json());
app.use(cookieParser());

app.use((req, res, next) => {
    logger.http(`Solicitud ${req.method} a ${req.url}`);
    next();
});


app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);
app.use('/api/mocks', mocksRouter);


app.get('/', (req, res) => {
    res.send('Bienvenido a la aplicación');
});

app.get('/loggerTest', (req, res) => {
    logger.debug('Prueba de debug');
    logger.http('Prueba de HTTP');
    logger.info('Prueba de info');
    logger.warning('Prueba de warning');
    logger.error('Prueba de error');
    logger.fatal('Prueba de fatal');

    res.send('Logs generados correctamente');
});

app.use((err, req, res, next) => {
    logger.error(`Error detectado: ${err.message}`);
    res.status(500).send('Ocurrió un error en el servidor.');
});




app.listen(PORT,()=>console.log(`Listening on ${PORT}`))
