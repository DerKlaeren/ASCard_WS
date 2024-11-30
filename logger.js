// Logger
const winston = require('winston');
require('winston-daily-rotate-file');

const fileRotateCombinedTransport = new winston.transports.DailyRotateFile({
  filename: './log/combined-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxFiles: '14d',
});

const fileRotateErrorTransport = new winston.transports.DailyRotateFile({
  filename: './log/error-%DATE%.log',
  datePattern: 'YYYY-MM-DD',
  maxFiles: '14d',
});

const { createLogger, format, transports } = require('winston');

export const logger = createLogger({
    level: 'info',
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.align(),
		format.splat(),
        format.printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`)
    ),
    defaultMeta: { service: 'ascard-service' },
    transports: [ fileRotateCombinedTransport, fileRotateErrorTransport ]
});