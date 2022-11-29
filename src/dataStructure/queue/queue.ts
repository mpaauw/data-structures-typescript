import { BaseDataStructure } from '../../common/baseDataStructure';
import { QueueNode } from './model/queueNode';

/**
 * Contains common functions for a Queue data structure.
 */
export class Queue<T> extends BaseDataStructure {
  private head!: QueueNode<T>;

  private tail!: QueueNode<T>;

  public constructor() {
    super(__filename);
  }

  /**
   * Inserts a new value to a new node at the end of the Queue.
   * @param value value to insert.
   */
  public enqueue(value: T): void {
    try {
      if (this.isEmpty()) {
        this.head = new QueueNode<T>(value, null);
        this.tail = this.head;
      } else {
        this.tail.next = new QueueNode<T>(value, null);
        this.tail = this.tail.next;
      }
      this.size += 1;
    } catch (error) {
      this.logger.error('Failed to enqueue value to Queue.', {
        currentQueueState: this,
        error,
      });
      throw error;
    }
  }

  /**
   * Removes the front-most node from the Queue, and returns it's value.
   * @returns value of the front-most node of the Queue.
   */
  public dequeue(): T | undefined {
    try {
      if (this.isEmpty()) {
        this.logger.warn(
          'Unable to dequeue front node from Queue; Queue is empty; returning undefined.',
          {
            currentQueueState: this,
          },
        );
        return undefined;
      }
      const dequeuedValue = this.head.value;
      this.head = this.head.next;
      this.size -= 1;
      return dequeuedValue;
    } catch (error) {
      this.logger.error('Failed to dequeue front node from Queue.', {
        currentQueueState: this,
        error,
      });
      throw error;
    }
  }

  /**
   * Returns the value of the Queue's current front-most node.
   * @returns value of the Queue's current front-most node.
   */
  public peek(): T | undefined {
    try {
      if (this.isEmpty()) {
        this.logger.warn(
          'Unable to peek front node of Queue; Queue is empty; returning undefined.',
          {
            currentQueueState: this,
          },
        );
        return undefined;
      }
      return this.head.value;
    } catch (error) {
      this.logger.error('Failed to peek front node of Queue.', {
        currentQueueState: this,
        error,
      });
      throw error;
    }
  }
}
