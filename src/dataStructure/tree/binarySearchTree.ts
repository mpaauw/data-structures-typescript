/* eslint-disable no-param-reassign, @typescript-eslint/brace-style */
import { BaseDataStructure } from '../../common/baseDataStructure';
import { BinaryTreeNode } from './model/binaryTreeNode';

/**
 * Contains common functions for a Binary Search Tree.
 */
export class BinarySearchTree<T> extends BaseDataStructure {
  private root!: BinaryTreeNode<T>;

  public constructor() {
    super(__filename);
  }

  /**
   * Inserts a new value into the Tree iteratively.
   * @param valueToInsert value to insert.
   */
  public insertIteratively(valueToInsert: T): void {
    try {
      const newNode = new BinaryTreeNode<T>(valueToInsert);
      if (this.size === 0) {
        this.root = newNode;
      } else {
        let traversalNode = this.root;
        let parentNode: BinaryTreeNode<T> = null;
        while (traversalNode != null) {
          parentNode = traversalNode;
          if (traversalNode.value <= valueToInsert) {
            traversalNode = traversalNode.rightChild;
          } else {
            traversalNode = traversalNode.leftChild;
          }
        }
        if (parentNode.value <= valueToInsert) {
          parentNode.rightChild = newNode;
        } else {
          parentNode.leftChild = newNode;
        }
      }

      this.size += 1;
    } catch (error) {
      this.logger.error(
        'Failed to insert value iteratively into Binary Search Tree.',
        {
          valueToInsert,
          currentBinarySearchTreeState: this,
          error,
        },
      );
      throw error;
    }
  }

  /**
   * Inserts a new value into the Tree recursively.
   * @param valueToInsert value to insert.
   */
  public insertRecursively(valueToInsert: T): void {
    this.root = this.insertRecursivelyInternal(this.root, valueToInsert);
  }

  private insertRecursivelyInternal(
    nodeToRecurse: BinaryTreeNode<T>,
    valueToInsert: T,
  ): BinaryTreeNode<T> {
    try {
      if (nodeToRecurse == null) {
        nodeToRecurse = new BinaryTreeNode<T>(valueToInsert);
        this.size += 1;
        return nodeToRecurse;
      }
      if (nodeToRecurse.value < valueToInsert) {
        return this.insertRecursivelyInternal(
          nodeToRecurse.rightChild,
          valueToInsert,
        );
      }
      return this.insertRecursivelyInternal(
        nodeToRecurse.leftChild,
        valueToInsert,
      );
    } catch (error) {
      this.logger.error(
        'Failed to insert value recursively into Binary Search Tree',
        {
          nodeToRecurse,
          valueToInsert,
          currentBinarySearchTreeState: this,
          error,
        },
      );
      throw error;
    }
  }

  /**
   * Removes a value from the Tree iteratively.
   * @param valueToRemove value to remove.
   */
  public removeIteratively(valueToRemove: T): void {
    try {
      if (this.isEmpty()) {
        this.logger.warn(
          'Unable to remove value iteratively from Binary Search Tree; Tree is empty.',
          {
            valueToRemove,
            currentBinarySearchTreeState: this,
          },
        );
        return;
      }

      // traverse tree until either: 1. value to remove is found, or 2. leaf is encountered / end of tree reached / value not found in tree
      let traversalNode = this.root;
      let parentNode: BinaryTreeNode<T> = null;
      while (traversalNode != null && traversalNode.value !== valueToRemove) {
        parentNode = traversalNode;
        if (traversalNode.value < valueToRemove) {
          traversalNode = traversalNode.rightChild;
        } else {
          traversalNode = traversalNode.leftChild;
        }
      }

      if (traversalNode == null) {
        this.logger.warn(
          'Unable to remove value iteratively from Binary Search Tree; value not found.',
          {
            valueToRemove,
            currentBinarySearchTreeState: this,
          },
        );
        return;
      }

      // check to see if NTR (node to remove) has only one child
      if (traversalNode.leftChild == null || traversalNode.rightChild == null) {
        let replacementNode!: BinaryTreeNode<T>;

        // if NTR has no left child, replace with right child
        if (traversalNode.leftChild == null) {
          replacementNode = traversalNode.rightChild;
        } else {
          // if NTR has no right child, replace with left child.
          replacementNode = traversalNode.leftChild;
        }

        // if NTR is the root node of the tree
        if (parentNode == null) {
          this.root = replacementNode;
        }

        // if NTR is the parent node's left or right child, replace
        if (traversalNode === parentNode.leftChild) {
          parentNode.leftChild = replacementNode;
        } else {
          parentNode.rightChild = replacementNode;
        }
      } else {
        // if NTR has two child nodes, find the inorder successor (or, the smallest node of the NTR's right subtree)
        let subTraversalNode = traversalNode.rightChild;
        let subParentNode = null;
        while (subTraversalNode.leftChild != null) {
          subParentNode = subTraversalNode;
          subTraversalNode = subTraversalNode.leftChild;
        }

        if (subParentNode != null) {
          subParentNode.leftChild = subTraversalNode.rightChild;
        } else {
          traversalNode.rightChild = subTraversalNode.rightChild;
        }

        traversalNode.value = subTraversalNode.value;
      }

      this.size -= 1;
    } catch (error) {
      this.logger.error(
        'Failed to remove value iteratively from Binary Search Tree.',
        {
          valueToRemove,
          currentBinarySearchTreeState: this,
          error,
        },
      );
      throw error;
    }
  }

  /**
   * Removes a value from the Tree recursively.
   * @param valueToRemove value to remove.
   */
  public removeRecursively(valueToRemove: T): void {
    this.root = this.removeRecursivelyInternal(this.root, valueToRemove);
  }

  private removeRecursivelyInternal(
    nodeToRecurse: BinaryTreeNode<T>,
    valueToRemove: T,
  ): BinaryTreeNode<T> {
    try {
      if (nodeToRecurse == null) {
        return nodeToRecurse;
      }

      if (nodeToRecurse.value < valueToRemove) {
        // recursively traverse right subtree
        nodeToRecurse.rightChild = this.removeRecursivelyInternal(
          nodeToRecurse.rightChild,
          valueToRemove,
        );
      } else if (nodeToRecurse.value > valueToRemove) {
        // recursively traverse left subtree
        nodeToRecurse.leftChild = this.removeRecursivelyInternal(
          nodeToRecurse.leftChild,
          valueToRemove,
        );
      } else {
        // NTR has been found, act accordingly
        if (nodeToRecurse.leftChild == null) {
          this.size -= 1;
          return nodeToRecurse.rightChild;
        }
        if (nodeToRecurse.rightChild == null) {
          this.size -= 1;
          return nodeToRecurse.leftChild;
        }

        nodeToRecurse.value = this.findMinimumNode(
          nodeToRecurse.rightChild,
        ).value;
        nodeToRecurse.rightChild = this.removeRecursivelyInternal(
          nodeToRecurse.rightChild,
          nodeToRecurse.value,
        );
      }

      return nodeToRecurse;
    } catch (error) {
      this.logger.error(
        'Failed to remove value recursively from Binary Search Tree',
        {
          nodeToRecurse,
          valueToRemove,
          currentBinarySearchTreeState: this,
          error,
        },
      );
      throw error;
    }
  }

  /**
   * Attempts to find a specified value within the Tree.
   * @param valueToFind value to find.
   * @returns value of node if found; undefined if otherwise.
   */
  public find(valueToFind: T): BinaryTreeNode<T> | undefined {
    try {
      if (this.isEmpty()) {
        this.logger.warn(
          'Unable to find value in Binary Search Tree; Tree is empty; returning undefined.',
          {
            valueToFind,
            currentBinarySearchTreeState: this,
          },
        );
        return undefined;
      }

      let traversalNode = this.root;
      while (traversalNode != null) {
        if (traversalNode.value === valueToFind) {
          return traversalNode;
        }
        if (traversalNode.value < valueToFind) {
          traversalNode = traversalNode.rightChild;
        } else {
          traversalNode = traversalNode.leftChild;
        }
      }

      this.logger.warn(
        'Unable to find value in Binary Search Tree; value not found; returning undefined.',
        {
          currentBinarySearchTreeState: this,
        },
      );

      return undefined;
    } catch (error) {
      this.logger.error('Failed to find value in Binary Search Tree.', {
        valueToFind,
        currentBinarySearchTreeState: this,
        error,
      });
      throw error;
    }
  }

  /**
   * Finds the minimum node value within the Tree.
   * @param nodeToTraverse optional node to use as subtree root during traversal.
   * @returns value of node if found; undefined if otherwise.
   */
  public findMinimumNode(
    nodeToTraverse: BinaryTreeNode<T> = this.root,
  ): BinaryTreeNode<T> | undefined {
    try {
      if (this.isEmpty()) {
        this.logger.warn(
          'Unable to find minimum node in Binary Search Tree; Tree is empty; returning undefined.',
          {
            currentBinarySearchTreeState: this,
          },
        );
        return undefined;
      }

      let traversalNode = nodeToTraverse;
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

  /**
   * Finds the maxmimum node value within the Tree.
   * @param nodeToTraverse optional node to use as subtree root during traversal.
   * @returns value of node if found; undefined if otherwise.
   */
  public findMaximumNode(
    nodeToTraverse: BinaryTreeNode<T> = this.root,
  ): BinaryTreeNode<T> | undefined {
    try {
      if (this.isEmpty()) {
        this.logger.warn(
          'Unable to find maximum node in Binary Search Tree; Tree is empty; returning undefined.',
        );
        return undefined;
      }

      let traversalNode = nodeToTraverse;
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

  /**
   * Validates the Tree recursively.
   * Validation ensures that all nodes in the Tree follow BST rules.
   * @param node optional node to use as subtree root during traversal.
   * @returns true if validated, false if otherwise.
   */
  public validateRecursively(node: BinaryTreeNode<T> = this.root): boolean {
    try {
      // if node itself is null or has no children, it is validated
      if (node == null || (node.leftChild == null && node.rightChild == null)) {
        return true; // base case
      }

      // if a node has only a left child, validate left subtree
      if (node.leftChild != null && node.rightChild == null) {
        if (node.leftChild.value < node.value) {
          return this.validateRecursively(node.leftChild);
        }
      }
      // if a node has only a right child, validate right subtree
      else if (node.leftChild == null && node.rightChild != null) {
        if (node.rightChild.value >= node.value) {
          return this.validateRecursively(node.rightChild);
        }
      }
      // if a node has both right and left children, validate both subtrees
      else if (
        node.leftChild.value < node.value
        && node.rightChild.value >= node.value
      ) {
        return (
          this.validateRecursively(node.leftChild)
          && this.validateRecursively(node.rightChild)
        );
      }

      this.logger.warn('Encountered unbalance Binary Search Tree node.', {
        currentNode: node,
        currentBinarySearchTreeState: this,
      });

      // if all above checks failed, node is invalidated
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
