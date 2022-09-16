import { SinglyLinkedListNode } from '../../linkedList/model/singlyLinkedListNode';

export class QueueNode<T> extends SinglyLinkedListNode<T> {
  public constructor(value?: T, next?: QueueNode<T>) {
    super(value, next);
  }
}
