import * as winston from 'winston';
import * as path from 'path';
import util from 'util';

/**
 * Defines a wrapper around an underlying Log framework, Winston.
 */
export class Logger {
  /**
   * Creates a Logger.
   * @param filePath of calling class.
   * @returns generated Logger.
   */
  public static createLogger(filePath: string): winston.Logger {
    return winston.createLogger({
      level: process.env.LOG_LEVEL,

      format:
        winston.format.combine(
          winston.format.timestamp(),
          winston.format.colorize(),
          winston.format.simple(),
          winston.format.json(),
          winston.format.printf((info: any) => {
            const timestamp = new Date().toISOString();
            const { level } = info;
            const message = (info.message || '').toString().trim();
            const logParams = info[Symbol.for('splat')];
            const stringifiedLogParams = (logParams || []).map((arg: any) => util.inspect(arg, {
              colors: true,
            })).join('\n');
            return `[${timestamp}] [${this.getRelativePath(filePath)}] ${level}: ${message}\n${stringifiedLogParams}\n`;
          }),
        ),
      transports: [
        new winston.transports.Console(),
      ],
    });
  }

  /**
   * Retrieves the relative path of a file.
   * @param filePath file from which to retrieve relative path.
   * @returns relative path of file.
   */
  private static getRelativePath(filePath: string): string {
    return path.relative(process.cwd(), filePath);
  }
}
