import { BaseDataStructure } from '../../shared/baseDataStructure';
import { BinaryTreeNode } from './model/binaryTreeNode';

export class BinarySearchTree<T> extends BaseDataStructure {
  private root!: BinaryTreeNode<T>;

  public constructor() {
    super(__filename);
  }

  public insert(value: T): void {
    try {
      if (this.size === 0) {
        this.root = new BinaryTreeNode<T>(value);
      } else {
        let traversalNode = this.root;
        while (this.root != null) {
          if (traversalNode.value < value) {
            traversalNode = traversalNode.rightChild;
          } else {
            traversalNode = traversalNode.leftChild;
          }
        }
        traversalNode = new BinaryTreeNode<T>(value);
      }

      this.size += 1;
    } catch (error) {
      this.logger.error('Failed to insert value into Binary Search Tree.', {
        valueToInsert: value,
        currentBinarySearchTreeState: this,
        error,
      });
      throw error;
    }
  }

  public remove(value: T): void {
    try {
      if (this.isEmpty()) {
        this.logger.warn(
          'Unable to remove value from Binary Search Tree; Tree is empty.',
          {
            currentBinarySearchTreeState: this,
          },
        );
        return;
      }

      let traversalNode = this.root;
      while (traversalNode != null) {
        if (traversalNode.value === value) {
          // if NTR (node-to-remove) has only one child - left - move that into NTR's place
          if (traversalNode.leftChild && !traversalNode.rightChild) {
            traversalNode = traversalNode.leftChild;
            break;
          } else if (traversalNode.rightChild && !traversalNode.leftChild) {
            // else, if the opposite of the NTR rule above is true, move right child into node's place
            traversalNode = traversalNode.rightChild;
            break;
          } else {
            // otherwise, if NTR has two children, move smallest entry of the node's right subtree into the NTR's place. NOTE: be sure to account for right child node itself
            let subTraversalNode = traversalNode.rightChild;
            do {
              if (!subTraversalNode.leftChild) {
                break;
              } else {
                subTraversalNode = subTraversalNode.leftChild;
              }
            } while (subTraversalNode != null);
            traversalNode = subTraversalNode;
          }
        } else if (traversalNode.value < value) {
          traversalNode = traversalNode.rightChild;
        } else {
          traversalNode = traversalNode.leftChild;
        }
      }

      if (traversalNode === null || traversalNode === undefined) {
        this.logger.warn(
          'Unable to remove value from Binary Search Tree; value not found.',
          {
            currentBinarySearchTreeState: this,
          },
        );
      } else {
        this.size -= 1;
      }
    } catch (error) {
      this.logger.error('Failed to remove value from Binary Search Tree.', {
        valueToRemove: value,
        currentBinarySearchTreeState: this,
        error,
      });
      throw error;
    }
  }

  public find(value: T): BinaryTreeNode<T> | undefined {
    try {
      if (this.isEmpty()) {
        this.logger.warn(
          'Unable to find value in Binary Search Tree; Tree is empty; returning undefined.',
        );
        return undefined;
      }

      let traversalNode = this.root;
      while (traversalNode != null) {
        if (traversalNode.value === value) {
          return traversalNode;
        } if (traversalNode.value < value) {
          traversalNode = traversalNode.rightChild;
        } else {
          traversalNode = traversalNode.leftChild;
        }
      }

      this.logger.warn(
        'Unable to find value in Binary Search Tree; value not found; returning undefined.',
      );

      return undefined;
    } catch (error) {
      this.logger.error('Failed to find value in Binary Search Tree.', {
        valueToFind: value,
        currentBinarySearchTreeState: this,
        error,
      });
      throw error;
    }
  }

  public findMinimumNode(): BinaryTreeNode<T> | undefined {
    try {
      if (this.isEmpty()) {
        this.logger.warn(
          'Unable to find minimum node in Binary Search Tree; Tree is empty; returning undefined.',
        );
        return undefined;
      }

      let traversalNode = this.root;
      do {
        if (
          traversalNode.leftChild === null
          || traversalNode.leftChild === undefined
        ) {
          return traversalNode;
        }
        traversalNode = traversalNode.leftChild;
      } while (traversalNode != null);

      return undefined;
    } catch (error) {
      this.logger.error('Failed to find minimum node in Binary Search Tree.', {
        currentBinarySearchTreeState: this,
        error,
      });
      throw error;
    }
  }

  public findMaximumNode(): BinaryTreeNode<T> | undefined {
    try {
      if (this.isEmpty()) {
        this.logger.warn(
          'Unable to find maximum node in Binary Search Tree; Tree is empty; returning undefined.',
        );
        return undefined;
      }

      let traversalNode = this.root;
      do {
        if (
          traversalNode.rightChild === null
          || traversalNode.rightChild === undefined
        ) {
          return traversalNode;
        }
        traversalNode = traversalNode.rightChild;
      } while (traversalNode != null);

      return undefined;
    } catch (error) {
      this.logger.error('Failed to find maximum node in Binary Search Tree.', {
        currentBinarySearchTreeState: this,
        error,
      });
      throw error;
    }
  }

  public validate(node: BinaryTreeNode<T>): boolean {
    try {
      if (!node) {
        return true; // base case
      }

      if (
        node.leftChild.value <= node.value
        && node.rightChild.value > node.value
      ) {
        return this.validate(node.leftChild) && this.validate(node.rightChild);
      }
      this.logger.warn('Encountered unbalance Binary Search Tree node.', {
        currentNode: node,
        currentBinarySearchTreeState: this,
      });
      return false;
    } catch (error) {
      this.logger.error('Failed to validate Binary Search Tree.', {
        currentBinarySearchTreeState: this,
        error,
      });
      throw error;
    }
  }
}
