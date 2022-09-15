import { Logger } from 'winston';
import { LoggerUtil } from '../util/loggerUtil';

export abstract class BaseDataStructure {
  public logger!: Logger;

  public size!: number;

  public constructor(filename: string) {
    this.logger = LoggerUtil.createLogger(process.env.ENVIRONMENT === ('local') ? filename : '');
    this.size = 0;
  }
}
