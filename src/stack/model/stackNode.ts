import { SinglyLinkedListNode } from '../../list/linkedList/model/singlyLinkedListNode';

export class StackNode<T> extends SinglyLinkedListNode<T>{
  public constructor(
    value?: T,
    next?: StackNode<T>,
  ) {
    super(
      value,
      next,
    );
  }
}
