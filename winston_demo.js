const winston=require('winston');

const { Logger,transports }=winston; // logger为winston的logger字段值

const logger = winston.createLogger({
    transports: [
      new (transports.File)({
        name: 'info-file',
        filename: 'logs/info.log',
        level: 'info'
      }),
      new (transports.File)({
        name: 'error-file',
        filename: 'logs/error.log',
        level: 'error'
      }),
      new transports.Console(),
    ]
  });

  logger.info('my first log with winston');