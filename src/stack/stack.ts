import { BaseDataStructure } from '../shared/baseDataStructure';
import { StackNode } from './model/stackNode';

/**
 * Contains common functions for a Stack data structure.
 */
export class Stack<T> extends BaseDataStructure {
  private top!: StackNode<T>;

  public constructor() {
    super(__filename);
  }

  /**
   * Inserts a new value within a new node on the top of the Stack.
   * @param value value to insert.
   */
  public push(value: T): void {
    try {
      if (this.isEmpty()) {
        this.top = new StackNode<T>(value, null);
      } else {
        const newNode = new StackNode<T>(value, this.top);
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

  /**
   * Removes the top-most node from the Stack, and returns it's value.
   * @returns value of the top-most node of the Stack.
   */
  public pop(): T | undefined {
    try {
      if (this.isEmpty()) {
        this.logger.warn(
          'Unable to pop value from Stack; Stack is empty; returning undefined.',
          {
            currentStackState: this,
          },
        );
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

  /**
   * Returns the current top-most node's value from the Stack.
   * @returns the value of the current top-most node.
   */
  public peek(): T | undefined {
    try {
      if (this.isEmpty()) {
        this.logger.warn(
          'Unable to peek value from Stack; Stack is empty; returning undefined.',
          {
            currentStackState: this,
          },
        );
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

  /**
   * Determines whether or not the Stack is empty.
   * @returns true if empty, false if otherwise.
   */
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
