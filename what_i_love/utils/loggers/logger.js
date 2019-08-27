var winston = require('winston');
require('winston-daily-rotate-file');

const {Logger,transports}=winston;
const {Console,DailyRotateFile}=transports;

const logger=winston.createLogger({
    transports:[
        new Console(),
        new DailyRotateFile({
            name:'base_logger',
            filename:'./logs/info.log',
            prepend:false,
            datePattern:'YYYY-MM-dd.',
            level:'info',
        }),
        new DailyRotateFile({
            name:'error_logger',
            filename:'./logs/error.log',
            prepend:false,
            datePattern:'YYYY-MM-dd.',
            level:'error',
        }),
    ],
});