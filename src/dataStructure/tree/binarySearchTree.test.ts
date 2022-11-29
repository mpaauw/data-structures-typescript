import { BinarySearchTree } from './binarySearchTree';
import { faker } from '@faker-js/faker';
import { BinaryTreeNode } from './model/binaryTreeNode';

describe('binarySearchTree_Tests_', () => {
  let binarySearchTree!: BinarySearchTree<number>;

  beforeEach(() => {
    binarySearchTree = new BinarySearchTree<number>();
  });

  describe('insertIteratively_Tests_', () => {
    test('insertIteratively_CatchError_ThrowError', async () => {
      // arrange
      binarySearchTree = null;

      // act / assert
      expect(() => {
        binarySearchTree.insertIteratively(faker.datatype.number());
      }).toThrowError();
    });

    test('insertIteratively_EmptyTree_SuccessfulInsert', () => {
      // arrange
      const oldSize = binarySearchTree['size'];
      const valueToInsert = faker.datatype.number();
      const expectedValuePriorToInsert = binarySearchTree.find(valueToInsert);

      // act
      binarySearchTree.insertIteratively(valueToInsert);

      // assert
      const expectedValueAfterInsert = binarySearchTree.find(valueToInsert);
      expect(expectedValuePriorToInsert).toBeUndefined();
      expect(binarySearchTree['size']).toEqual(oldSize + 1);
      expect(expectedValueAfterInsert).toBeDefined();
      expect(expectedValueAfterInsert.value).toEqual(valueToInsert);
    });

    test('insertIteratively_PopulatedTree_SuccessfulInsert', () => {
      // arrange
      populateTree();
      const oldSize = binarySearchTree['size'];
      const valueToInsert = faker.datatype.number();
      const expectedValuePriorToInsert = binarySearchTree.find(valueToInsert);

      // act
      binarySearchTree.insertIteratively(valueToInsert);

      // assert
      const expectedValueAfterInsert = binarySearchTree.find(valueToInsert);
      expect(oldSize).toBeGreaterThan(0);
      expect(expectedValuePriorToInsert).toBeUndefined();
      expect(binarySearchTree['size']).toEqual(oldSize + 1);
      expect(expectedValueAfterInsert).toBeDefined();
      expect(expectedValueAfterInsert.value).toEqual(valueToInsert);
    });
  });

  describe('insertRecursively_Tests_', () => {
    test('insertRecursively_CatchError_ThrowError', () => {
      // arrange
      const insertRecursivelyInternalSpy = jest
        .spyOn(binarySearchTree as any, 'insertRecursivelyInternal')
        .mockImplementationOnce(() => {
          throw new Error();
        });

      // act / assert
      expect(() => {
        binarySearchTree.insertRecursively(faker.datatype.number());
      }).toThrowError();
      expect(insertRecursivelyInternalSpy).toHaveBeenCalled();
    });

    test('insertRecursively_EmptyTree_SuccessfulInsert', () => {
      // arrange
      const oldSize = binarySearchTree['size'];
      const valueToInsert = faker.datatype.number();
      const expectedValuePriorToInsert = binarySearchTree.find(valueToInsert);

      // act
      binarySearchTree.insertRecursively(valueToInsert);

      // assert
      const expectedValueAfterInsert = binarySearchTree.find(valueToInsert);
      expect(expectedValuePriorToInsert).toBeUndefined();
      expect(binarySearchTree['size']).toEqual(oldSize + 1);
      expect(expectedValueAfterInsert).toBeDefined();
      expect(expectedValueAfterInsert.value).toEqual(valueToInsert);
    });

    test('insertRecursively_PopulatedTree_SuccessfulInsert', () => {
      // arrange
      populateTree();
      const oldSize = binarySearchTree['size'];
      const valueToInsert = faker.datatype.number();
      const expectedValuePriorToInsert = binarySearchTree.find(valueToInsert);

      // act
      binarySearchTree.insertRecursively(valueToInsert);

      // assert
      const expectedValueAfterInsert = binarySearchTree.find(valueToInsert);
      expect(oldSize).toBeGreaterThan(0);
      expect(expectedValuePriorToInsert).toBeUndefined();
      expect(binarySearchTree['size']).toEqual(oldSize + 1);
      expect(expectedValueAfterInsert).toBeDefined();
      expect(expectedValueAfterInsert.value).toEqual(valueToInsert);
    });
  });

  describe('removeIteratively_Tests_', () => {
    test('removeIteratively_CatchError_ThrowError', () => {
      // arrange
      jest.spyOn(binarySearchTree, 'isEmpty').mockImplementationOnce(() => {
        throw new Error();
      });

      // act / assert
      expect(() => {
        binarySearchTree.removeIteratively(faker.datatype.number());
      }).toThrowError();
    });

    test('removeIteratively_EmptyTree_Return', () => {
      // arrange
      const oldSize = binarySearchTree['size'];
      const oldRoot = binarySearchTree['root'];

      // act
      binarySearchTree.removeIteratively(faker.datatype.number());

      // assert
      const newSize = binarySearchTree['size'];
      const newRoot = binarySearchTree['root'];
      expect(oldSize).toEqual(0);
      expect(newSize).toEqual(oldSize);
      expect(oldRoot).toBeUndefined();
      expect(newRoot).toEqual(oldRoot);
    });

    test('removeIteratively_PopulatedTreeValueToRemoveNotPresent_Return', () => {
      // arrange
      populateTree();
      const valueToRemove = faker.datatype.number();
      const existingNodePriorToRemoval = binarySearchTree.find(valueToRemove);
      const oldSize = binarySearchTree['size'];

      // act
      binarySearchTree.removeIteratively(valueToRemove);

      // assert
      const existingNodeAfterRemoval = binarySearchTree.find(valueToRemove);
      expect(oldSize).toBeGreaterThan(0);
      expect(existingNodePriorToRemoval).toBeUndefined();
      expect(binarySearchTree['size']).toEqual(oldSize);
      expect(existingNodeAfterRemoval).toBeUndefined();
    });

    test('removeIteratively_PopulatedTreeNodeToRemoveAtLeaf_SuccessfulRemoval', () => {
      // arrange
      populateTree();
      const valueToRemove = faker.datatype.number();
      binarySearchTree.insertIteratively(valueToRemove);
      const existingNodePriorToRemoval = binarySearchTree.find(valueToRemove);
      const oldSize = binarySearchTree['size'];

      // act
      binarySearchTree.removeIteratively(valueToRemove);

      // assert
      const existingNodeAfterRemoval = binarySearchTree.find(valueToRemove);
      expect(oldSize).toBeGreaterThan(0);
      expect(existingNodePriorToRemoval).toBeDefined();
      expect(existingNodePriorToRemoval.value).toEqual(valueToRemove);
      expect(binarySearchTree['size']).toEqual(oldSize - 1);
      expect(existingNodeAfterRemoval).toBeUndefined();
    });
  });

  describe('removeRecursively_Tests_', () => {
    test('removeRecursively_CatchError_ThrowError', () => {
      // arrange
      const removeRecursivelyInternalSpy = jest
        .spyOn(binarySearchTree as any, 'removeRecursivelyInternal')
        .mockImplementationOnce(() => {
          throw new Error();
        });

      // act / assert
      expect(() => {
        binarySearchTree.removeRecursively(faker.datatype.number());
      }).toThrowError();
      expect(removeRecursivelyInternalSpy).toHaveBeenCalled();
    });

    test('removeRecursively_EmptyTree_Return', () => {
      // arrange
      const oldSize = binarySearchTree['size'];
      const oldRoot = binarySearchTree['root'];

      // act
      binarySearchTree.removeRecursively(faker.datatype.number());

      // assert
      const newSize = binarySearchTree['size'];
      const newRoot = binarySearchTree['root'];
      expect(oldSize).toEqual(0);
      expect(newSize).toEqual(oldSize);
      expect(oldRoot).toBeUndefined();
      expect(newRoot).toEqual(oldRoot);
    });

    test('removeRecursively_PopulatedTreeNodeToRemoveAtLeaf_SuccessfulRemoval', () => {
      // arrange
      populateTree();
      const valueToRemove = faker.datatype.number();
      binarySearchTree.insertIteratively(valueToRemove);
      const existingNodePriorToRemoval = binarySearchTree.find(valueToRemove);
      const oldSize = binarySearchTree['size'];

      // act
      binarySearchTree.removeRecursively(valueToRemove);

      // assert
      const existingNodeAfterRemoval = binarySearchTree.find(valueToRemove);
      expect(oldSize).toBeGreaterThan(0);
      expect(existingNodePriorToRemoval).toBeDefined();
      expect(existingNodePriorToRemoval.value).toEqual(valueToRemove);
      expect(binarySearchTree['size']).toEqual(oldSize - 1);
      expect(existingNodeAfterRemoval).toBeUndefined();
    });
  });

  describe('find_Tests_', () => {
    test('find_CatchError_ThrowError', () => {
      // arrange
      jest.spyOn(binarySearchTree, 'isEmpty').mockImplementationOnce(() => {
        throw new Error();
      });

      // act / assert
      expect(() => {
        binarySearchTree.find(faker.datatype.number());
      }).toThrowError();
    });

    test('find_EmptyTree_ReturnUndefined', () => {
      // arrange
      const isEmptySpy = jest
        .spyOn(binarySearchTree, 'isEmpty')
        .mockImplementationOnce(() => {
          return true;
        });

      // act
      const result = binarySearchTree.find(faker.datatype.number());

      // assert
      expect(result).toBeUndefined();
      expect(isEmptySpy).toHaveBeenCalled();
    });

    test('find_PopulatedTreeValueToFindNotPresent_ReturnUndefined', () => {
      // arrange
      populateTree();
      const size = binarySearchTree['size'];

      // act
      const result = binarySearchTree.find(faker.datatype.number());

      // assert
      expect(size).toBeGreaterThan(0);
      expect(result).toBeUndefined();
    });

    test('find_PopulatedTreeValueToFindAtLeaf_ReturnFoundNode', () => {
      // arrange
      populateTree();
      const valueToFind = faker.datatype.number();
      binarySearchTree.insertIteratively(valueToFind);
      const size = binarySearchTree['size'];

      // act
      const result = binarySearchTree.find(valueToFind);

      // assert
      expect(size).toBeGreaterThan(0);
      expect(result).toBeDefined();
      expect(result.value).toEqual(valueToFind);
    });

    test('find_PopulatedTreeValueToFindPresentNotAtLeaf_ReturnFoundNode', () => {
      // arrange
      populateTree(5);
      const valueToFind = faker.datatype.number();
      binarySearchTree.insertIteratively(valueToFind);
      populateTree(5);
      const size = binarySearchTree['size'];

      // act
      const result = binarySearchTree.find(valueToFind);

      // assert
      expect(size).toBeGreaterThan(0);
      expect(result).toBeDefined();
      expect(result.value).toEqual(valueToFind);
    });
  });

  describe('findMinimumNode_Tests_', () => {
    test('findMinimumNode_CatchError_ThrowError', () => {
      // arrange
      jest.spyOn(binarySearchTree, 'isEmpty').mockImplementationOnce(() => {
        throw new Error();
      });

      // act / assert
      expect(() => {
        binarySearchTree.findMinimumNode();
      }).toThrowError();
    });

    test('findMinimumNode_EmptyTree_ReturnUndefined', () => {
      // arrange
      const isEmptySpy = jest
        .spyOn(binarySearchTree, 'isEmpty')
        .mockImplementationOnce(() => {
          return true;
        });

      // act
      const result = binarySearchTree.findMinimumNode();

      // assert
      expect(result).toBeUndefined();
      expect(isEmptySpy).toHaveBeenCalled();
    });

    test('findMinimumNode_PopulatedTree_ReturnMinimumNode', () => {
      // arrange
      populateTree(5);
      const minimumValue = -1;
      binarySearchTree.insertIteratively(minimumValue);
      populateTree(5);
      const size = binarySearchTree['size'];

      // act
      const result = binarySearchTree.findMinimumNode();

      // assert
      expect(size).toBeGreaterThan(0);
      expect(result).toBeDefined();
      expect(result.value).toEqual(minimumValue);
    });
  });

  describe('findMaximumNode_Tests_', () => {
    test('findMaximumNode_CatchError_ThrowError', () => {
      // arrange
      jest.spyOn(binarySearchTree, 'isEmpty').mockImplementationOnce(() => {
        throw new Error();
      });

      // act / assert
      expect(() => {
        binarySearchTree.findMaximumNode();
      }).toThrowError();
    });

    test('findMaximumNode_EmptyTree_ReturnUndefined', () => {
      // arrange
      const isEmptySpy = jest
        .spyOn(binarySearchTree, 'isEmpty')
        .mockImplementationOnce(() => {
          return true;
        });

      // act
      const result = binarySearchTree.findMaximumNode();

      // assert
      expect(result).toBeUndefined();
      expect(isEmptySpy).toHaveBeenCalled();
    });

    test('findMaximumNode_PopulatedTree_ReturnMaximumNode', () => {
      // arrange
      populateTree(5);
      const maximumValue = Number.MAX_SAFE_INTEGER;
      binarySearchTree.insertIteratively(maximumValue);
      populateTree(5);
      const size = binarySearchTree['size'];

      // act
      const result = binarySearchTree.findMaximumNode();

      // assert
      expect(size).toBeGreaterThan(0);
      expect(result).toBeDefined();
      expect(result.value).toEqual(maximumValue);
    });
  });

  describe('validateRecursively_Tests_', () => {
    test('validateRecursively_CatchError_ThrowError', () => {
      // arrange
      const nodeToValidate = new BinaryTreeNode<number>(
        5,
        new BinaryTreeNode<number>(17),
        new BinaryTreeNode<number>(2)
      );
      const loggerWarnMock = jest
        .spyOn(binarySearchTree['logger'], 'warn')
        .mockImplementationOnce(() => {
          throw new Error();
        });

      // act / assert
      expect(() => {
        binarySearchTree.validateRecursively(nodeToValidate);
      }).toThrowError();
      expect(loggerWarnMock).toHaveBeenCalled();
    });

    test('validateRecursively_NullNode_ReturnTrue', () => {
      // arrange
      const nodeToValidate = null;

      // act
      const result = binarySearchTree.validateRecursively(nodeToValidate);

      // assert
      expect(result).toBeDefined();
      expect(result).toBeTruthy();
    });

    test('validateRecursively_PopulatedInvalidTree_ReturnFalse', () => {
      // arrange
      const nodeToValidate = new BinaryTreeNode<number>(
        5,
        new BinaryTreeNode<number>(17),
        new BinaryTreeNode<number>(2)
      );

      // act
      const result = binarySearchTree.validateRecursively(nodeToValidate);

      // assert
      expect(result).toBeDefined();
      expect(result).toBeFalsy();
    });

    test('validateRecursively_PopulatedValidTree_ReturnTrue', () => {
      // arrange
      populateTree(5);

      // act
      const result = binarySearchTree.validateRecursively();

      // assert
      expect(result).toBeDefined();
      expect(result).toBeTruthy();
    });
  });

  const populateTree = (numberOfNodes: number = 10): void => {
    for (let i = 0; i < numberOfNodes; i++) {
      binarySearchTree.insertIteratively(faker.datatype.number());
    }
  };
});
