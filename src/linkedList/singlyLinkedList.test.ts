import { SinglyLinkedList } from "./singlyLinkedList";
import { faker } from '@faker-js/faker';

describe('singlyLinkedList_Tests_', () => {

  let singlyLinkedList!: SinglyLinkedList<string>;

  beforeAll(() => {
    singlyLinkedList = new SinglyLinkedList<string>();
  });

  describe('insertAtHead_Tests_', () => {
  
    test('insertAtHead_InternalError_ThrowError', async () => {
      // arrange
      singlyLinkedList['logger'].debug = jest.fn()
        .mockImplementationOnce(() => {
          throw new Error();
        });
  
      // act / assert
      expect(() => {
        singlyLinkedList.insertAtHead(faker.hacker.noun());
      }).toThrowError();
    });
  
    test('insertAtHead_Success_Return', async () => {
      // arrange
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

    test('insertAtTail_InternalError_ThrowError', async () => {
      // arrange
      singlyLinkedList['logger'].debug = jest.fn()
        .mockImplementationOnce(() => {
          throw new Error();
        });

      // act / assert
      expect(() => {
        singlyLinkedList.insertAtTail(faker.hacker.noun());
      }).toThrowError();
    });

  });



});

