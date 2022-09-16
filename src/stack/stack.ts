import { BaseDataStructure } from '../shared/baseDataStructure';
import { StackNode } from './model/stackNode';

export class Stack<T> extends BaseDataStructure {
  private top!: StackNode<T>;

  public constructor() {
    super(__filename);
  }

  public push(value: T): void {
    try {
      if (this.isEmpty()) {
        this.top = new StackNode<T>(
          value,
          null,
        );
      } else {
        const newNode = new StackNode<T>(
          value,
          this.top,
        );
        this.top = newNode;
      }
      this.size += 1;
    } catch (error) {
      this.logger.error('Failed to push value onto Stack.', {
        valueToPush: value,
        currentStackState: this,
        error,
      });
      throw error;
    }
  }

  public pop(): T | undefined {
    try {
      if (this.isEmpty()) {
        this.logger.warn('Unable to pop value from Stack; Stack is empty; returning undefined.', {
          currentStackState: this,
        });
        return undefined;
      }
      const poppedValue = this.top.value;
      this.top = this.top.next;
      this.size -= 1;
      return poppedValue;
    } catch (error) {
      this.logger.error('Failed to pop value from Stack.', {
        currentStackState: this,
        error,
      });
      throw error;
    }
  }

  public peek(): T | undefined {
    try {
      if (this.isEmpty()) {
        this.logger.warn('Unable to peek value from Stack; Stack is empty; returning undefined.', {
          currentStackState: this,
        });
        return undefined;
      }
      return this.top.value;
    } catch (error) {
      this.logger.error('Failed to peek value from Stack.', {
        currentStackState: this,
        error,
      });
      throw error;
    }
  }

  public isEmpty(): boolean {
    try {
      return this.size === 0;
    } catch (error) {
      this.logger.error('Failed to determine if Stack is empty.', {
        currentStackState: this,
        error,
      });
      throw error;
    }
  }
}
