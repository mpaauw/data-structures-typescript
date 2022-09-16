import { Queue } from './queue';
import { faker } from '@faker-js/faker';

describe('queue_Tests_', () => {
  let queue!: Queue<string>;

  beforeEach(() => {
    queue = new Queue<string>();
  });

  describe('enqueue_Tests_', () => {
    test('enqueue_CatchError_ThrowError', () => {
      // arrange
      jest.spyOn(queue, 'isEmpty').mockImplementationOnce(() => {
        throw new Error();
      });

      // act / assert
      expect(() => {
        queue.enqueue(generateUniqueValue());
      }).toThrowError();
    });

    test('enqueue_EmptyQueue_EnqueueToTail', () => {
      // arrange
      const oldSize = queue['size'];
      const valueToEnqueue = generateUniqueValue();

      // act
      queue.enqueue(valueToEnqueue);

      // assert
      expect(oldSize).toEqual(0);
      expect(queue['size']).toEqual(oldSize + 1);
      expect(queue['head'].value).toEqual(valueToEnqueue);
      expect(queue['head']).toEqual(queue['tail']);
    });

    test('enqueue_NonEmptyQueue_EnqueueToTail', () => {
      // arrange
      populateQueue();
      const oldSize = queue['size'];
      const oldHead = queue['head'];
      const oldTail = queue['tail'];
      const valueToEnqueue = generateUniqueValue();

      // act
      queue.enqueue(valueToEnqueue);

      // assert
      expect(oldSize).toBeGreaterThan(0);
      expect(queue['size']).toEqual(oldSize + 1);
      expect(oldHead).not.toEqual(oldTail);
      expect(queue['tail'].value).toEqual(valueToEnqueue);
    });
  });

  describe('dequeue_Tests_', () => {
    test('dequeue_CatchError_ThrowError', () => {
      // arrange
      jest.spyOn(queue, 'isEmpty').mockImplementationOnce(() => {
        throw new Error();
      });

      // act / assert
      expect(() => {
        queue.dequeue();
      }).toThrowError();
    });

    test('dequeue_EmptyQueue_ReturnUndefined', () => {
      // arrange
      const oldSize = queue['size'];

      // act
      const result = queue.dequeue();

      // assert
      expect(oldSize).toEqual(0);
      expect(queue['size']).toEqual(oldSize);
      expect(result).toBeUndefined();
    });

    test('dequeue_NonEmptyQueue_ReturnFrontNodeValue', () => {
      // arrange
      populateQueue();
      const oldSize = queue['size'];
      const oldHead = queue['head'];

      // act
      const result = queue.dequeue();

      // assert
      expect(oldSize).toBeGreaterThan(0);
      expect(queue['size']).toEqual(oldSize - 1);
      expect(oldHead).toBeDefined();
      expect(queue['head']).toEqual(oldHead.next);
    });
  });

  describe('peek_Tests_', () => {
    test('peek_CatchError_ThrowError', () => {
      // arrange
      jest.spyOn(queue, 'isEmpty').mockImplementationOnce(() => {
        throw new Error();
      });

      // act / assert
      expect(() => {
        queue.peek();
      }).toThrowError();
    });

    test('peek_EmptyQueue_ReturnUndefined', () => {
      // arrange
      const oldSize = queue['size'];

      // act
      const result = queue.peek();

      // assert
      expect(oldSize).toEqual(0);
      expect(result).toBeUndefined();
    });

    test('peek_NonEmptyQueue_ReturnFrontNodeValue', () => {
      // arrange
      populateQueue();
      const oldSize = queue['size'];
      const headNode = queue['head'];

      // act
      const result = queue.peek();

      // assert
      expect(oldSize).toBeGreaterThan(0);
      expect(headNode).toBeDefined();
      expect(queue['head']).toEqual(headNode);
    });
  });

  const generateUniqueValue = (): string => {
    return faker.hacker.noun() + faker.animal.dog() + new Date().getTime();
  };

  const populateQueue = (numberOfNodes: number = 10): void => {
    for (let i = 0; i < numberOfNodes; i++) {
      queue.enqueue(generateUniqueValue());
    }
  };
});
