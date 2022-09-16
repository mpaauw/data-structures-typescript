export class SinglyLinkedListNode<T> {
  public value!: T;

  public next!: SinglyLinkedListNode<T>;

  public constructor(value?: T, next?: SinglyLinkedListNode<T>) {
    this.value = value;
    this.next = next;
  }
}
