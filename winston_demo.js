const winston=require('winston');
require('winston-daily-rotate-file');

const { Logger,transports }=winston; // logger为winston的logger字段值

const logger = winston.createLogger({
    transports: [

      // 将info输出至logs目录下的info.log  
      new (transports.File)({
        name: 'info-file',
        filename: 'logs/info.log',
        level: 'info',
      }),

      // 将error输出至logs目录下的error.log  
      new (transports.File)({
        name: 'error-file',
        filename: 'logs/error.log',
        level: 'error'
      }),

      // 在控制台输出error
      new transports.Console({
          level:'error',
      }),
    ]
  });

// 记录一条info信息
// logger.info('my first log with winston');

// 记录一条error信息
// logger.error('my first log with winston');

// 处理请求的logger
const reqLogger=winston.createLogger({
    transports:[
        new transports.Console(),

        new transports.DailyRotateFile({
            filename:'./logs/req_log.log',
            datePattern:'YYYY_MM_dd', // 设置日期格式，便于将日志记录按照日期分档
            prepend:true,
            level:'info',
        })
    ]
});

reqLogger.info('request from client')
