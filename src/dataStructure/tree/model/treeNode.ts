export class TreeNode<T> {
  public value!: T;

  public children!: Array<TreeNode<T>>;

  public constructor(value?: T, children?: Array<TreeNode<T>>) {
    this.value = value;
    this.children = children;
  }
}
