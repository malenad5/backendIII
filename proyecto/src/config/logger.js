import winston from 'winston';


const levels = {
debug: 0,
http: 1,
info: 2,
warning: 3,
error: 4,
fatal: 5,
};


const format = winston.format.combine(
winston.format.timestamp(),
winston.format.printf(({ timestamp, level, message }) => {
return `${timestamp} [${level.toUpperCase()}]: ${message}`;
})
);


const developmentLogger = winston.createLogger({
levels,
level: 'debug',
format,
transports: [
    new winston.transports.Console(),
],
});


const productionLogger = winston.createLogger({
levels,
level: 'info',
format,
transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'errors.log', level: 'error' }),
],
});



const logger = process.env.NODE_ENV === 'production' ? productionLogger : developmentLogger;

export default logger;
