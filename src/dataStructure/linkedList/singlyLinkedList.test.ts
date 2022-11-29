import { SinglyLinkedList } from './singlyLinkedList';
import { faker } from '@faker-js/faker';
import { SinglyLinkedListNode } from './model/singlyLinkedListNode';

describe('singlyLinkedList_Tests_', () => {
  let singlyLinkedList!: SinglyLinkedList<string>;

  beforeEach(() => {
    singlyLinkedList = new SinglyLinkedList<string>();
  });

  describe('insertAtHead_Tests_', () => {
    test('insertAtHead_InternalError_ThrowError', () => {
      // arrange
      jest
        .spyOn(singlyLinkedList as any, 'updateTail')
        .mockImplementationOnce(() => {
          throw new Error();
        });

      // act / assert
      expect(() => {
        singlyLinkedList.insertAtHead(faker.hacker.noun());
      }).toThrowError();
    });

    test('insertAtHead_Success_Return', () => {
      // arrange
      populateTestNodes();
      const oldHead = singlyLinkedList['head'];
      const oldSize = singlyLinkedList['size'];
      const valueToInsert = faker.hacker.noun();

      // act
      singlyLinkedList.insertAtHead(valueToInsert);

      // assert
      expect(singlyLinkedList['head'].value).toEqual(valueToInsert);
      expect(singlyLinkedList['head'].next).toEqual(oldHead);
      expect(singlyLinkedList['size']).toEqual(oldSize + 1);
    });
  });

  describe('insertAtTail_Tests_', () => {
    test('insertAtTail_InternalError_ThrowError', () => {
      // arrange
      jest
        .spyOn(singlyLinkedList as any, 'updateTail')
        .mockImplementationOnce(() => {
          throw new Error();
        });

      // act / assert
      expect(() => {
        singlyLinkedList.insertAtTail(faker.hacker.noun());
      }).toThrowError();
    });

    test('insertAtTail_Success_Return', () => {
      // arrange
      populateTestNodes();
      const oldTail = singlyLinkedList['tail'];
      const oldSize = singlyLinkedList['size'];
      const valueToInsert = faker.animal.cat();

      // act
      singlyLinkedList.insertAtTail(valueToInsert);

      // assert
      expect(singlyLinkedList['tail'].value).toEqual(valueToInsert);
      expect(singlyLinkedList['size']).toEqual(oldSize + 1);
      expect(oldTail.next).toEqual(singlyLinkedList['tail']);
    });
  });

  describe('insertAt_Tests_', () => {
    test('insertAt_InternalError_ThrowError', () => {
      // arrange
      jest
        .spyOn(singlyLinkedList['logger'] as any, 'warn')
        .mockImplementationOnce(() => {
          throw new Error();
        });

      // act / assert
      expect(() => {
        singlyLinkedList.insertAt(-1, faker.music.songName());
      }).toThrowError();
    });

    test('insertAt_negativeIndex_Return', () => {
      // arrange
      const oldSize = singlyLinkedList['size'];
      const insertAtHeadSpy = jest.spyOn(singlyLinkedList, 'insertAtHead');
      const insertAtTailSpy = jest.spyOn(singlyLinkedList, 'insertAtTail');

      // act
      singlyLinkedList.insertAt(
        faker.datatype.number({ min: -10000, max: -1 }),
        faker.color.space()
      );

      // assert
      expect(singlyLinkedList['size']).toEqual(oldSize);
      expect(insertAtHeadSpy).toHaveBeenCalledTimes(0);
      expect(insertAtTailSpy).toHaveBeenCalledTimes(0);
    });

    test('insertAt_IndexOutOfBounds_Return', () => {
      // arrange
      const oldSize = singlyLinkedList['size'];
      const insertAtHeadSpy = jest.spyOn(singlyLinkedList, 'insertAtHead');
      const insertAtTailSpy = jest.spyOn(singlyLinkedList, 'insertAtTail');

      // act
      singlyLinkedList.insertAt(
        faker.datatype.number({ min: oldSize, max: oldSize + 10000 }),
        faker.science.chemicalElement().name
      );

      // assert
      expect(singlyLinkedList['size']).toEqual(oldSize);
      expect(insertAtHeadSpy).toHaveBeenCalledTimes(0);
      expect(insertAtTailSpy).toHaveBeenCalledTimes(0);
    });

    test('insertAt_ZeroIndex_ReturnInsertAtHead', () => {
      // arrange
      const oldSize = singlyLinkedList['size'];
      const oldNodeAtZeroIndex = singlyLinkedList['head'];
      const insertAtHeadSpy = jest.spyOn(singlyLinkedList, 'insertAtHead');
      const valueToInsert = faker.science.chemicalElement().name;

      // act
      singlyLinkedList.insertAt(0, valueToInsert);

      // assert
      expect(singlyLinkedList['size']).toEqual(oldSize + 1);
      expect(singlyLinkedList['head'].value).toEqual(valueToInsert);
      expect(singlyLinkedList['head'].next).toEqual(oldNodeAtZeroIndex);
      expect(insertAtHeadSpy).toHaveBeenCalledTimes(1);
    });

    test('insertAt_TailIndex_ReturnInsertAtTail', () => {
      // arrange
      populateTestNodes();
      const oldSize = singlyLinkedList['size'];
      const oldNodeAtTailIndex = singlyLinkedList['tail'];
      const valueToInsert = faker.internet.emoji();
      const indexToInsertAt = oldSize - 1;

      // act
      singlyLinkedList.insertAt(indexToInsertAt, valueToInsert);

      // assert
      expect(singlyLinkedList['size']).toEqual(oldSize + 1);
      expect(singlyLinkedList['tail'].value).toEqual(valueToInsert);
      expect(oldNodeAtTailIndex.next).toEqual(singlyLinkedList['tail']);
    });

    test('insertAt_Index_Return', () => {
      // arrange
      populateTestNodes();
      const oldSize = singlyLinkedList['size'];
      const indexToInsert = faker.datatype.number({
        min: 0,
        max: oldSize - 1,
      });
      const valueToInsert = faker.animal.dog();

      // act
      singlyLinkedList.insertAt(indexToInsert, valueToInsert);

      // assert
      const newSize = singlyLinkedList['size'];
      const actualNodeAtIndex = singlyLinkedList.findAt(
        indexToInsert
      ) as SinglyLinkedListNode<string>;
      expect(newSize).toEqual(oldSize + 1);
      expect(actualNodeAtIndex.value).toEqual(valueToInsert);
    });
  });

  describe('find_Tests_', () => {
    test('find_InternalError_ThrowError', () => {
      // arrange
      jest
        .spyOn(singlyLinkedList['logger'], 'warn')
        .mockImplementationOnce(() => {
          throw new Error();
        });

      // act / assert
      expect(() => {
        singlyLinkedList.find(faker.animal.bear());
      }).toThrowError();
    });

    test('find_ValueDoesNotExistList_ReturnUndefined', () => {
      // arrange
      populateTestNodes();
      const valueToFind = 'doesNotExist';

      // act
      const result = singlyLinkedList.find(valueToFind);

      // assert
      expect(result).toBeUndefined();
    });

    test('find_ValueExistsInList_Return', () => {
      // arrange
      populateTestNodes();
      const size = singlyLinkedList['size'];
      let randomPickIndex = faker.datatype.number({
        min: 0,
        max: size - 1,
      });
      let existingNodeInList = singlyLinkedList.findAt(
        randomPickIndex
      ) as SinglyLinkedListNode<string>;

      // act
      const result = singlyLinkedList.find(existingNodeInList.value);

      // assert
      expect(result).toBeDefined();
      expect(result.value).toEqual(existingNodeInList.value);
    });
  });

  describe('findAt_Tests_', () => {
    test('findAt_InternalError_ThrowError', () => {
      // arrange
      jest
        .spyOn(singlyLinkedList['logger'], 'warn')
        .mockImplementationOnce(() => {
          throw new Error();
        });

      // act / assert
      expect(() => {
        singlyLinkedList.findAt(-1);
      }).toThrowError();
    });

    test('findAt_NegativeIndex_ReturnUndefined', () => {
      // arrange / act
      const result = singlyLinkedList.findAt(
        faker.datatype.number({ min: -10000, max: -1 })
      );

      // assert
      expect(result).toBeUndefined();
    });

    test('findAt_IndexOutOfBounds_ReturnUndefined', () => {
      // arrange
      const size = singlyLinkedList['size'];

      // act
      const result = singlyLinkedList.findAt(
        faker.datatype.number({ min: size, max: size + 10000 })
      );

      // assert
      expect(result).toBeUndefined();
    });

    test('findAt_ZeroIndex_ReturnHead', () => {
      // arrange
      populateTestNodes();
      const head = singlyLinkedList['head'];

      // act
      const result = singlyLinkedList.findAt(0);

      // assert
      expect(result).toEqual(head);
    });

    test('findAt_TailIndex_ReturnHead', () => {
      // arrange
      populateTestNodes();
      const tail = singlyLinkedList['tail'];

      // act
      const result = singlyLinkedList.findAt(singlyLinkedList['size'] - 1);

      // assert
      expect(result).toEqual(tail);
    });

    test('findAt_Index_Return', () => {
      // arrange
      populateTestNodes();
      const size = singlyLinkedList['size'];
      const indexToFind = faker.datatype.number({ min: 0, max: size - 1 });
      let nodeAtIndex = singlyLinkedList['head'];
      for (let i = 0; i < size - 1; i++) {
        if (i === indexToFind) {
          break;
        }
        nodeAtIndex = nodeAtIndex.next;
      }

      // act
      const result = singlyLinkedList.findAt(
        indexToFind
      ) as SinglyLinkedListNode<string>;

      // assert
      expect(result).toBeDefined();
      expect(result.value as string).toEqual(nodeAtIndex.value);
    });
  });

  describe('removeAtHead_Tests_', () => {
    test('removeAtHead_InternalError_ThrowError', () => {
      // arrange
      jest
        .spyOn(singlyLinkedList as any, 'isEmpty')
        .mockImplementationOnce(() => {
          throw new Error();
        });

      // act / assert
      expect(() => {
        singlyLinkedList.removeAtHead();
      }).toThrowError();
    });

    test('removeAtHead_EmptyList_Return', () => {
      // arrange
      const oldSize = singlyLinkedList['size'];

      // act
      singlyLinkedList.removeAtHead();

      // assert
      expect(oldSize).toEqual(0);
      expect(singlyLinkedList['size']).toEqual(0);
    });

    test('removeAtHead_SuccessfulRemoval_Return', () => {
      // arrange
      populateTestNodes();
      const oldSize = singlyLinkedList['size'];
      const oldHead = singlyLinkedList['head'];

      // act
      singlyLinkedList.removeAtHead();

      // assert
      expect(singlyLinkedList['size']).toEqual(oldSize - 1);
      expect(singlyLinkedList['head']).toEqual(oldHead.next);
    });
  });

  describe('removeAtTail_Tests_', () => {
    test('removeAtTail_InternalError_ThrowError', () => {
      // arrange
      jest
        .spyOn(singlyLinkedList as any, 'isEmpty')
        .mockImplementationOnce(() => {
          throw new Error();
        });

      // act / assert
      expect(() => {
        singlyLinkedList.removeAtTail();
      }).toThrowError();
    });

    test('removeAtTail_ListEmpty_Return', () => {
      // arrange
      const oldSize = singlyLinkedList['size'];

      // act
      singlyLinkedList.removeAtTail();

      // assert
      expect(oldSize).toEqual(0);
      expect(singlyLinkedList['size']).toEqual(0);
    });

    test('removeAtTail_SuccessfulRemoval_Return', () => {
      // arrange
      populateTestNodes(1);
      const oldSize = singlyLinkedList['size'];
      const oldTail = singlyLinkedList['tail'];
      const expectedNewTail = singlyLinkedList.findAt(oldSize - 2);

      // act
      singlyLinkedList.removeAtTail();

      // assert
      expect(singlyLinkedList['size']).toEqual(oldSize > 0 ? oldSize - 1 : 0);
      expect(singlyLinkedList['tail']).toEqual(expectedNewTail);
    });
  });

  describe('removeAt_Tests_', () => {
    test('removeAt_InternalError_ThrowError', () => {
      // arrange
      singlyLinkedList['logger'].debug = jest
        .fn()
        .mockImplementationOnce(() => {
          throw new Error();
        });

      // act / assert
      expect(() => {
        singlyLinkedList.removeAt(faker.datatype.number());
      });
    });

    test('removeAt_NegativeIndex_Return', () => {
      // arrange / act
      const oldSize = singlyLinkedList['size'];
      singlyLinkedList.removeAt(
        faker.datatype.number({ min: -10000, max: -1 })
      );

      // assert
      expect(singlyLinkedList['size']).toEqual(oldSize);
    });

    test('removeAt_IndexOutOfBounds_Return', () => {
      // arrange
      const oldSize = singlyLinkedList['size'];

      // act
      singlyLinkedList.removeAt(
        faker.datatype.number({ min: oldSize, max: oldSize + 10000 })
      );

      // assert
      expect(singlyLinkedList['size']).toEqual(oldSize);
    });

    test('removeAt_ZeroIndex_RemoveHead', () => {
      // arrange
      populateTestNodes();
      const oldSize = singlyLinkedList['size'];
      const oldHead = singlyLinkedList['head'];
      const removeAtHeadSpy = jest.spyOn(singlyLinkedList, 'removeAtHead');

      // act
      singlyLinkedList.removeAt(0);

      // assert
      if (oldSize > 1) {
        expect(singlyLinkedList['size']).toEqual(oldSize - 1);
      }
      expect(singlyLinkedList['head']).toEqual(oldHead.next);
      expect(removeAtHeadSpy).toHaveBeenCalledTimes(1);
    });

    test('removeAt_TailIndex_RemoveTail', () => {
      // arrange
      populateTestNodes();
      const oldSize = singlyLinkedList['size'];
      const expectedNewTail = singlyLinkedList.findAt(oldSize - 2);
      const removeAtTailSpy = jest.spyOn(singlyLinkedList, 'removeAtTail');

      // act
      singlyLinkedList.removeAt(oldSize - 1);

      // assert
      if (oldSize > 1) {
        expect(singlyLinkedList['size']).toEqual(oldSize - 1);
        expect(removeAtTailSpy).toHaveBeenCalledTimes(1);
      }
      expect(singlyLinkedList['tail']).toEqual(expectedNewTail);
    });

    test('removeAt_Index_Return', () => {
      // arrange
      populateTestNodes();
      const oldSize = singlyLinkedList['size'];
      const indexToRemoveAt = faker.datatype.number({
        min: 0,
        max: oldSize - 1,
      });
      const nodeAtIndexToRemove = singlyLinkedList.findAt(
        indexToRemoveAt
      ) as SinglyLinkedListNode<string>;

      // act
      singlyLinkedList.removeAt(indexToRemoveAt);

      // assert
      if (oldSize > 1) {
        expect(singlyLinkedList['size']).toEqual(oldSize - 1);
      }
      expect(singlyLinkedList.findAt(indexToRemoveAt)).toEqual(
        nodeAtIndexToRemove.next
      );
    });
  });

  /**
   * Small test utility that populates a Singly-Linked list with a random number of nodes with unique values.
   * Number of nodes generates is between 1 - 100.
   */
  const populateTestNodes = (numberOfNodes: number = 10) => {
    for (let i = 0; i < numberOfNodes; i++) {
      singlyLinkedList.insertAtHead(faker.lorem.word() + new Date().getTime());
    }
  };
});
