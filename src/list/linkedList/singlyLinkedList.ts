import { BaseDataStructure } from '../../shared/baseDataStructure';
import { SinglyLinkedListNode } from './model/singlyLinkedListNode';

/**
 * Contains common functions for a Singly-Linked List data structure.
 */
export class SinglyLinkedList<T> extends BaseDataStructure {
  private head!: SinglyLinkedListNode<T>;

  private tail!: SinglyLinkedListNode<T>;

  public constructor() {
    super(__filename);
  }

  /**
   * Inserts a new value to the head of the Singly-Linked List.
   * @param value value to insert.
   */
  public insertAtHead(value: T): void {
    try {
      this.logger.debug('Attempting to insert value at head of Singly-Linked List...', {
        valueToInsert: value,
        currentListState: this,
      });

      if (this.head == null) {
        this.head = new SinglyLinkedListNode<T>();
        this.head.value = value;
        this.head.next = this.tail;
      } else {
        const oldHead = this.head;
        this.head = new SinglyLinkedListNode<T>();
        this.head.value = value;
        this.head.next = oldHead;
      }

      this.size += 1;
      this.updateTail(this.head);

      this.logger.debug('Successfully inserted value at head of Singly-Linked List.', {
        insertedValue: value,
        currentListState: this,
      });
    } catch (error) {
      this.logger.error('Failed to insert value at head of Singly-Linked List.', {
        valueToInsert: value,
        currentListState: this,
        error,
      });
      throw error;
    }
  }

  /**
   * Inserts a new value to the tail of the Singly-Linked List.
   * @param value value to insert.
   */
  public insertAtTail(value: T): void {
    try {
      this.logger.debug('Attempting to insert value at tail of Singly-Linked List...', {
        valueToInsert: value,
        currentListState: this,
      });

      if (this.tail == null) {
        this.tail = new SinglyLinkedListNode<T>();
        this.tail.value = value;
      } else {
        const oldTail = this.tail;
        this.tail = new SinglyLinkedListNode<T>();
        this.tail.value = value;
        oldTail.next = this.tail;
      }

      this.size += 1;
      this.updateTail(this.tail);

      this.logger.debug('Successfully inserted value at tail of Singly-Linked List.', {
        insertedValue: value,
        currentListState: this,
      });
    } catch (error) {
      this.logger.error('Failed to insert value at tail of Singly-Linked List.', {
        valueToInsert: value,
        currentListState: this,
        error,
      });
      throw error;
    }
  }

  /**
   * Inserts a new value at a specified index in the Singly-Linked List.
   * Index is zero-based.
   * @param index location in list to insert.
   * @param value value to insert at specified index.
   */
  public insertAt(index: number, value: T): void {
    try {
      this.logger.debug('Attempting to insert value at index in Singly-Linked List...', {
        index,
        valueToInsert: value,
        currentListState: this,
      });

      if (index < 0 || (index > 0 && index > (this.size - 1))) {
        this.logger.warn('Unable to insert value at index in Singly-Linked List; invalid index submitted.', {
          index,
          valueToInsert: value,
          currentListState: this,
        });
        return;
      }

      if (index === 0) {
        return this.insertAtHead(value);
      } if (index === this.size - 1) {
        return this.insertAtTail(value);
      }

      let iterator = this.head;
      for (let i = 0; i < index - 1; i++) {
        iterator = iterator.next;
      }
      const newNode = new SinglyLinkedListNode<T>();
      newNode.value = value;
      newNode.next = iterator.next;
      iterator.next = newNode;
      this.size += 1;
      this.updateTail(newNode);

      this.logger.debug('Successfully inserted value at index in Singly-Linked List.', {
        index,
        insertedValue: value,
        currentListState: this,
      });
    } catch (error) {
      this.logger.error('Failed to insert value at index in Singly-Linked List.', {
        index,
        valueToInsert: value,
        currentListState: this,
        error,
      });
      throw error;
    }
  }

  /**
   * Attempts to find a specified value within the Singly-Linked List.
   * @param value value to find.
   * @returns full node of value if found, null if otherwise.
   */
  public find(value: T): SinglyLinkedListNode<T> | undefined {
    try {
      this.logger.debug('Attempting to find value in Singly-Linked List...', {
        valueToFind: value,
        currentListState: this,
      });

      let iteratorNode = this.head;
      while (iteratorNode != null) {
        if (iteratorNode.value === value) {
          return iteratorNode;
        }
        iteratorNode = iteratorNode.next;
      }

      this.logger.warn('Unable to find value in Singly-Linked List; returning undefined.', {
        valueToFind: value,
        currentListState: this,
      });

      return undefined;
    } catch (error) {
      this.logger.error('Failed to find value in Singly-Linked List.', {
        valueToFind: value,
        currentListState: this,
        error,
      });
      throw error;
    }
  }

  public findAt(index: number): SinglyLinkedListNode<T> | void {
    try {
      this.logger.debug('Attempting to find value at index in Singly-Linked List...', {
        indexToFind: index,
        currentListState: this,
      });

      if (index < 0 || (index > 0 && index > (this.size - 1))) {
        this.logger.warn('Unable to find value at index in Singly-Linked List; invalid index submitted.', {
          index,
          indexToFind: index,
          currentListState: this,
        });
        return;
      }

      let foundNode!: SinglyLinkedListNode<T>;

      if (index === 0) {
        foundNode = this.head;
      } else if (index === this.size - 1) {
        foundNode = this.tail;
      } else {
        let iterator = this.head;
        for (let i = 0; i < this.size - 1; i++) {
          if (i === index) {
            foundNode = iterator;
            break;
          }
          iterator = iterator.next;
        }
      }

      this.logger.debug('Successfully found value at index in Singly-Linked List.', {
        indexToFind: index,
        foundNode,
        currentListState: this,
      });

      return foundNode;
    } catch (error) {
      this.logger.error('Failed to find value at index in Singly-Linked List.', {
        indexToFind: index,
        currentListState: this,
        error,
      });
      throw error;
    }
  }

  /**
   * Removes a node from the head of the Singly-Linked List.
   */
  public removeAtHead(): void {
    try {
      this.logger.debug('Attempting to remove node from head of Singly-Linked List...', {
        currentListState: this,
      });

      if (this.isEmpty() || this.head == null) {
        this.logger.warn('Unable to remove node from head of Singly-Linked List; no head node exists.', {
          currentListState: this,
        });
        return;
      }

      const newHead = this.head.next;
      this.head = newHead;
      this.size -= 1;
      this.updateTail(this.head);

      this.logger.debug('Successfully removed node from head of Singly-Linked List.', {
        currentListState: this,
      });
    } catch (error) {
      this.logger.error('Failed to remove node from head of Singly-Linked List.', {
        currentListState: this,
        error,
      });
      throw error;
    }
  }

  /**
   * Removes a node from the tail of the Singly-Linked List.
   */
  public removeAtTail(): void {
    try {
      this.logger.debug('Attempting to remove node from tail of Singly-Linked List...', {
        currentListState: this,
      });

      if (this.isEmpty() || this.tail == null) {
        this.logger.warn('Unable to remove node from tail of Singly-Linked List; no tail node exists.', {
          currentListState: this,
        });
        return;
      } if (this.size === 1) {
        this.tail = undefined;
        this.head = undefined;
      } else {
        let iterator = this.head;
        for (let i = 0; i < this.size - 1; i++) {
          if (iterator.next === this.tail) {
            break;
          }
          iterator = iterator.next;
        }
        iterator.next = null;
        this.tail = iterator;
      }

      this.size -= 1;
      this.updateTail(this.tail);

      this.logger.debug('Successfully removed node from tail of Singly-Linked List.', {
        currentListState: this,
      });
    } catch (error) {
      this.logger.error('Failed to remove node from tail of Singly-Linked List.', {
        currentListState: this,
        error,
      });
      throw error;
    }
  }

  /**
   * Removes a node from a specified index in the Singly-Linked List.
   * @param index location at which to remove.
   */
  public removeAt(index: number): void {
    try {
      this.logger.debug('Attempting to remove node at index in Singly-Linked List...', {
        index,
        currentListState: this,
      });

      if (index < 0 || (index > 0 && index > (this.size - 1))) {
        this.logger.warn('Unable to remove node at index in Singly-Linked List; invalid index submitted.', {
          index,
          currentListState: this,
        });
        return;
      }

      if (index === 0) {
        return this.removeAtHead();
      } if (index === this.size - 1) {
        return this.removeAtTail();
      }

      let iterator = this.head;
      for (let i = 0; i < index - 1; i++) {
        iterator = iterator.next;
      }
      iterator.next = iterator.next.next;
      this.size -= 1;
      this.updateTail(iterator);

      this.logger.debug('Successfully removed node at index in Singly-Linked List.', {
        index,
        currentListState: this,
      });
    } catch (error) {
      this.logger.error('Failed to remove node at index in Singly-Linked List.', {
        index,
        currentListState: this,
        error,
      });
      throw error;
    }
  }

  /**
   * Quick method that determines whether or not the Singly-Linked List is empty.
   * @returns true if Singly-Linked List is empty, false if otherwise.
   */
  public isEmpty(): boolean {
    return (this.size === 0);
  }

  /**
   * Determines if a node is located at the tail, and updates the class member accordingly.
   * @param node to check for tail reference.
   */
  private updateTail(node: SinglyLinkedListNode<T>): void {
    if (this.size === 2 && this.head.next != null) { // handle base case at low list sizes
      this.tail = this.head.next;
    }

    if (node != null) {
      if (node.next === null || node.next === undefined) {
        this.tail = node;
      }
    }
  }

  /**
   * Simple method that returns the head node of the List for traversal purposes.
   * @returns head of Singly-Linked List.
   */
  public getHead(): SinglyLinkedListNode<T> {
    return this.head;
  }
}
