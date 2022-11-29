import { Logger, YinstonLogger } from '@mpaauw/yinston';

/**
 * Includes common shared functions that can be used within any data structure implementation.
 */
export abstract class BaseDataStructure {
  protected logger!: Logger;

  public size!: number;

  public constructor(filename: string) {
    this.logger = YinstonLogger.createLogger(
      process.env.NODE_ENV === 'local' ? filename : '',
    );
    this.size = 0;
  }

  public isEmpty(): boolean {
    try {
      return this.size === 0;
    } catch (error) {
      this.logger.error('Failed to determine if Data Structure is empty.', {
        currentQueueState: this,
        error,
      });
      throw error;
    }
  }
}
