import { Stack } from './stack';
import { faker } from '@faker-js/faker';

describe('stack_Tests_', () => {
  let stack!: Stack<string>;

  beforeEach(() => {
    stack = new Stack<string>();
  });

  describe('push_Tests_', () => {
    test('push_CatchError_ThrowError', () => {
      // arrange
      jest.spyOn(stack, 'isEmpty').mockImplementationOnce(() => {
        throw new Error();
      });

      // act / assert
      expect(() => {
        stack.push(generateUniqueValue());
      }).toThrowError();
    });

    test('push_EmptyStack_PushNodeToTop', () => {
      // arrange
      const oldSize = stack['size'];
      const valueToPush = generateUniqueValue();

      // act
      stack.push(valueToPush);

      // assert
      expect(oldSize).toEqual(0);
      expect(stack['size']).toEqual(oldSize + 1);
      expect(stack['top'].value).toEqual(valueToPush);
    });

    test('push_NonEmptyStack_PushNodeToTop', () => {
      // arrange
      populateStack();
      const oldSize = stack['size'];
      const oldTopNode = stack['top'];
      const valueToPush = generateUniqueValue();

      // act
      stack.push(valueToPush);

      // assert
      expect(oldSize).toBeGreaterThan(0);
      expect(stack['size']).toEqual(oldSize + 1);
      expect(stack['top']).not.toEqual(oldTopNode);
      expect(stack['top'].next).toEqual(oldTopNode);
      expect(stack['top'].value).toEqual(valueToPush);
    });
  });

  describe('pop_Tests_', () => {
    test('pop_CatchError_ThrowError', () => {
      // arrange
      jest.spyOn(stack, 'isEmpty').mockImplementationOnce(() => {
        throw new Error();
      });

      // act / assert
      expect(() => {
        stack.pop();
      }).toThrowError();
    });

    test('pop_EmptyStack_ReturnUndefined', () => {
      // arrange
      const oldSize = stack['size'];

      // act
      const result = stack.pop();

      // assert
      expect(oldSize).toEqual(0);
      expect(stack['size']).toEqual(oldSize);
      expect(result).toBeUndefined();
    });

    test('pop_NonEmptyStack_ReturnTopNodeValue', () => {
      // arrange
      populateStack();
      const oldSize = stack['size'];
      const oldTopNode = stack['top'];

      // act
      const result = stack.pop();

      // assert
      expect(oldSize).toBeGreaterThan(0);
      expect(stack['size']).toEqual(oldSize - 1);
      expect(oldTopNode).toBeDefined();
      expect(stack['top']).not.toEqual(oldTopNode);
      expect(stack['top']).toEqual(oldTopNode.next);
    });
  });

  describe('peek_Tests_', () => {
    test('peek_CatchError_ThrowError', () => {
      // arrange
      jest.spyOn(stack, 'isEmpty').mockImplementationOnce(() => {
        throw new Error();
      });

      // act / assert
      expect(() => {
        stack.peek();
      }).toThrowError();
    });

    test('peek_EmptyStack_ReturnUndefined', () => {
      // arrange
      const oldSize = stack['size'];

      // act
      const result = stack.peek();

      // assert
      expect(oldSize).toEqual(0);
      expect(result).toBeUndefined();
    });

    test('peek_NonEmptyStack_ReturnTopNodeValue', () => {
      // arrange
      populateStack();
      const size = stack['size'];
      const topNode = stack['top'];

      // act
      const result = stack.peek();

      // assert
      expect(size).toBeGreaterThan(0);
      expect(topNode).toBeDefined();
      expect(stack['top']).toEqual(topNode);
    });
  });

  const generateUniqueValue = (): string => {
    return faker.hacker.noun() + faker.animal.dog() + new Date().getTime();
  };

  const populateStack = (numberOfNodes: number = 10): void => {
    for (let i = 0; i < numberOfNodes; i++) {
      stack.push(generateUniqueValue());
    }
  };
});
