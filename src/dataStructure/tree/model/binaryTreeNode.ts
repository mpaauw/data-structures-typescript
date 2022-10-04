import { TreeNode } from './treeNode';

export class BinaryTreeNode<T> extends TreeNode<T> {
  public leftChild!: BinaryTreeNode<T>;

  public rightChild!: BinaryTreeNode<T>;

  public constructor(
    value?: T,
    leftChild?: BinaryTreeNode<T>,
    rightChild?: BinaryTreeNode<T>,
  ) {
    super(value, [leftChild, rightChild]);
    this.leftChild = leftChild;
    this.rightChild = rightChild;
  }
}
