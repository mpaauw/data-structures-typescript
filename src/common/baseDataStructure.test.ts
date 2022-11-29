import { BaseDataStructure } from './baseDataStructure';
import { faker } from '@faker-js/faker';

describe('baseDataStructure_Tests_', () => {
  let dataStructure!: BaseDataStructure;

  beforeEach(() => {
    dataStructure = new TestDataStructure();
  });

  describe('isEmpty_Tests_', () => {
    test('isEmpty_CatchError_ThrowError', () => {
      // arrange
      dataStructure = null;

      // act / assert
      expect(() => {
        dataStructure.isEmpty();
      }).toThrowError();
    });

    test('isEmpty_SizeZero_ReturnTrue', () => {
      // arrange
      dataStructure['size'] = 0;

      // act
      const result = dataStructure.isEmpty();

      // assert
      expect(result).toBeTruthy();
    });

    test('isEmpty_SizeGreaterthanZero_ReturnFalse', () => {
      // arrange
      dataStructure['size'] = faker.datatype.number({
        min: 1,
        max: Number.MAX_SAFE_INTEGER,
      });

      // act
      const result = dataStructure.isEmpty();

      // assert
      expect(result).toBeFalsy();
    });
  });

  class TestDataStructure extends BaseDataStructure {
    public constructor() {
      super(faker.hacker.verb());
    }
  }
});
