![Build](https://github.com/mpaauw/data-structures-typescript/actions/workflows/build-and-test.yml/badge.svg)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# data-structures-typescript

A collection of commonly used data structures written in TypeScript.

## Installation
To install, simply add as an npm dependency:

```
npm install @mpaauw/data-structures-typescript
```

## Usage
This library offers a variety of data structures out-of-the-box. Currently supported structures include: Hash Table, Singly-Linked List, Queue, Stack, and Binary Search Tree. See the sections below for usage instructions.

### HashTable

```typescript
import { HashTable } from '@mpaauw/data-structures-typescript';

// instantiate a new Hash Table, choosing a default of 100 buckets
const hashTable = new HashTable<string, object>(100); 

// insert a new key-value pair into the Hash Table:
hashTable.put('cat', {
    name: 'Ms. Kitty',
    type: Animal.Cat,
    weightInLbs: 4.20
}); 

// retrieve an entry from the Hash Table, given a key:
const cat = hashTable.get('cat');

// determine whether or not the Hash Table is empty:
const isEmpty = hashTable.isEmpty();

// determine whether or not the Hash Table contains a given key:
const containsCat = hashTable.contains('cat');

// remove an entry from the Hash Table, given a key:
hashTable.remove('cat');
```

### singly-Linked List

```typescript
import { SinglyLinkedList } from '@mpaauw/data-structures-typescript';

// instantiate a new Singly-Linked List:
const singlyLinkedList = new SinglyLinkedList<string>();

// insert a value into the head of the list:
singlyLinkedList.insertAtHead('red');

// insert a value into the tail of the list:
singlyLinkedList.insertAtTail('blue');

// insert a value into a specific index of the list:
singlyLinkedList.insertAt(1, 'yellow');

// attempt to find a value within the linked list:
singlyLinkedList.find('green');

// attempt to find the value at a specific index within the list:
singlyLinkedList.findAt(2);

// retrieve the head of the list:
singlyLinkedList.getHead();

// retrieve the tail of the list:
singlyLinkedList.getTail();

// determines if the list is empty or not:
const isEmpty = singlyLinkedList.isEmpty();

// removes value from the head of the list:
singlyLinkedList.removeAtHead();

// removes value from the tail of the list:
singlyLinkedList.removeAtTail();

// removes value from a specified index within the list:
singlyLinkedList.removeAt(2);
```

### Queue

```typescript
import { Queue } from '@mpaauw/data-structures-typescript';

// instantiate a new Queue:
const queue = new Queue<string>();

// insert a value into the tail of the Queue:
queue.enqueue('dog');

// return the value from the head of the Queue:
const peekedValue = queue.peek();

// remove and return the value from the head of the Queue:
const dequeuedValue = queue.dequeue();

// determine if the Queue is empty or not:
const isEmpty = queue.isEmpty();
```

### Stack

```typescript
import { Stack } from '@mpaauw/data-structures-typescript';

// instantiate a new Stack:
const stack = new Stack<string>();

// insert a value onto the top of the Stack:
stack.push('fish');

// return the value from the top of the Stack:
stack.peek();

// remove and return the value from the top of the Stack:
stack.pop();

// determine if the Stack is empty or not:
const isEmpty = stack.isEmpty();
```

### Binary Search Tree

```typescript   
import { BinarySearchTree } from '@mpaauw/data-structures-typescript';

// instantiate a new Binary Search Tree:
const binarySearchTree = new BinarySearchTree<number>();

// insert a value into the Tree, either iteratively or recursively:
binarySearchTree.insertIteratively(5);
binarySearchTree.insertRecursively(10);

// determine whether or not a value exists within the Tree:
const foundNode = binarySearchTree.find(9001);

// find the minimum value in the Tree, passing an optional node to be used as the subtree within the search:
const minNode = binarySearchTree.findMinimumNode(foundNode);

// find the maximum value within the Tree, passing an optional node to be used as the subtree within the search:
const maxNode = binarySearchTree.findMaximumNode(minNode);

// remove a value from the Tree, either iteratively or recursively:
binarySearchTree.removeIteratively(1337);
binarySearchTree.removeRecursively(420);

// determine whether or not the Tree is empty:
const isEmpty = binarySearchTree.isEmpty();

// validate whether or not the Tree maintains BST rules:
const isBST = binarySearchTree.validateRecursively();
```



