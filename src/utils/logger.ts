import winston from 'winston';

const { combine, timestamp, json } = winston.format;

const createLogger = (level: string = 'info') => {
  return winston.createLogger({
    level,
    format: combine(timestamp(), json()),
    transports: [new winston.transports.Console()],
  });
};

const logger = createLogger();

export { logger };
