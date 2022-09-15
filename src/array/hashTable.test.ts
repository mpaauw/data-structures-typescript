import { HashTable } from "./hashTable/hashTable"
import { faker } from '@faker-js/faker';
import { HashTableEntry } from "./hashTable/model/hashTableEntry";

describe('hashTable_Tests_', () =>{

    let hashTable!: HashTable<string, string>;

    beforeEach(() => {
        hashTable = new HashTable<string, string>(100);
    });

    describe('get_Tests_', () => {
        
        test('get_CatchError_ThrowError', () => {
            // arrange
            hashTable['getBucketLocationForKey'] = jest.fn()
                .mockImplementationOnce(() => {
                    throw new Error();
                });

            // act / assert
            expect(() => {
                hashTable.get(faker.hacker.noun());
            }).toThrowError();
        });

        test('get_EmptyHashTable_ReturnUndefined', () => {
            // arrange / act
            const result = hashTable.get(faker.hacker.noun());

            // assert
            expect(result).toBeUndefined();
            expect(hashTable['size']).toEqual(0);
        });

        test('get_KeyNotFoundNonEmptyHashTable_ReturnUndefined', () => {
            // arrange
            const numberOfBuckets = faker.datatype.number({ 
                min: 10,
                max: 100
            });
            hashTable = new HashTable<string, string>(numberOfBuckets);
            const bucketInsertLocation = faker.datatype.number({
                min: 0,
                max: numberOfBuckets - 1
            });
            let bucket = hashTable['hashTable'][bucketInsertLocation];
            const existingValueInHashTable = new HashTableEntry<string, string>(
                faker.animal.bear(),
                faker.animal.cow()
            );
            bucket.insertAtHead(existingValueInHashTable);
            hashTable['hashTable'][bucketInsertLocation] = bucket;

            // act
            const result = hashTable.get(faker.animal.cat());

            // assert
            expect(result).toBeUndefined();
        });

        test('get_KeyFoundNonEmptyHashTable_ReturnEntry', () => {
            // arrange
            const numberOfBuckets = faker.datatype.number({ 
                min: 10,
                max: 100
            });
            hashTable = new HashTable<string, string>(numberOfBuckets);
            const existingValueInHashTable = new HashTableEntry<string, string>(
                faker.animal.bear(),
                faker.animal.cow()
            );
            const bucketInsertLocation = hashTable['getBucketLocationForKey'](existingValueInHashTable.key);
            let bucket = hashTable['hashTable'][bucketInsertLocation];
            
            bucket.insertAtHead(existingValueInHashTable);
            hashTable['hashTable'][bucketInsertLocation] = bucket;

            // act
            const result = hashTable.get(existingValueInHashTable.key);

            // assert
            expect(result).toBeDefined()
            expect(result.key).toEqual(existingValueInHashTable.key);
            expect(result.value).toEqual(existingValueInHashTable.value);
        });

    });

    describe('contains_Tests_', () => {

        test('contains_CatchError_ThrowError', () => {
            // arrange
            hashTable['getBucketLocationForKey'] = jest.fn()
                .mockImplementationOnce(() => {
                    throw new Error();
                });

            // act / assert
            expect(() => {
                hashTable.contains(faker.hacker.verb());
            }).toThrowError();
        });

        test('contains_EmptyHashTable_ReturnFalse', () => {
            // arrange / act
            const result = hashTable.contains(faker.color.human());

            // assert
            expect(result).toBeFalsy();
            expect(hashTable['size']).toEqual(0);
        });

        test('contains_KeyNotFoundNonEmptyHashTable_ReturnFalse', () => {
            // arrange
            const numberOfBuckets = faker.datatype.number({ 
                min: 10,
                max: 100
            });
            hashTable = new HashTable<string, string>(numberOfBuckets);
            const bucketInsertLocation = faker.datatype.number({
                min: 0,
                max: numberOfBuckets - 1
            });
            let bucket = hashTable['hashTable'][bucketInsertLocation];
            const existingValueInHashTable = new HashTableEntry<string, string>(
                faker.animal.bear(),
                faker.animal.cow()
            );
            bucket.insertAtHead(existingValueInHashTable);
            hashTable['hashTable'][bucketInsertLocation] = bucket;

            // act
            const result = hashTable.contains(faker.animal.crocodilia());

            // assert
            expect(result).toBeFalsy();
        });

        test('contains_KeyFoundNonEmptyHashTable_ReturnTrue', () => {
            // arrange
            const numberOfBuckets = faker.datatype.number({ 
                min: 10,
                max: 100
            });
            hashTable = new HashTable<string, string>(numberOfBuckets);
            const existingValueInHashTable = new HashTableEntry<string, string>(
                faker.animal.bear(),
                faker.animal.cow()
            );
            const bucketInsertLocation = hashTable['getBucketLocationForKey'](existingValueInHashTable.key);
            let bucket = hashTable['hashTable'][bucketInsertLocation];
            
            bucket.insertAtHead(existingValueInHashTable);
            hashTable['hashTable'][bucketInsertLocation] = bucket;

            // act
            const result = hashTable.contains(existingValueInHashTable.key);

            // assert
            expect(result).toBeTruthy();
        });
    });

    describe('put_Tests_', () => {

        test('put_CatchError_ThrowError', () => {
            // arrange
            hashTable['getBucketLocationForKey'] = jest.fn()
                .mockImplementationOnce(() => {
                    throw new Error();
                });

            // act / assert
            expect(() => {
                hashTable.put(
                    faker.hacker.noun(),
                    faker.hacker.verb()
                );
            }).toThrowError();
        }); 

        test('put_EmptyHashTableSuccessfulInsert_ReturnNewEntry', () => {
            // arrange
            const oldSize = hashTable['size'];
            const key = faker.hacker.noun();
            const value = faker.hacker.verb();
            const resizeSpy = jest.spyOn(hashTable as any, 'resize');

            // act
            const result = hashTable.put(
                key,
                value
            );

            // assert
            expect(oldSize).toEqual(0);
            expect(hashTable['size']).toEqual(oldSize + 1);
            expect(result.key).toEqual(key);
            expect(result.value).toEqual(value);
            expect(resizeSpy).toHaveBeenCalledTimes(1);
        });

        test('put_NonEmptyHashTableSuccessfulInsert_ReturnNewEntry', () => {
            // arrange
            populateHashTable();
            const oldSize = hashTable['size'];
            const key = faker.hacker.noun();
            const value = faker.hacker.verb();
            const resizeSpy = jest.spyOn(hashTable as any, 'resize');

            // act
            const result = hashTable.put(
                key,
                value
            );

            // assert
            expect(oldSize).toBeGreaterThan(0);
            expect(hashTable['size']).toEqual(oldSize + 1);
            expect(result.key).toEqual(key);
            expect(result.value).toEqual(value);
            expect(resizeSpy).toHaveBeenCalledTimes(1);
        });

    });

    describe('remove_Tests_', () => {
        test('remove_CatchError_ThrowError', () => {
            // arrange
            hashTable['getBucketLocationForKey'] = jest.fn()
                .mockImplementationOnce(() => {
                    throw new Error();
                });

            // act / assert
            expect(() => {
                hashTable.remove(faker.hacker.noun());
            }).toThrowError();
        });

        test('remove_EmptyHashTable_ReturnUndefined', () => {

            // arrange
            const oldSize = hashTable['size'];

            // act
            const result = hashTable.remove(faker.hacker.noun());

            // assert
            expect(hashTable['size'] && oldSize).toEqual(0);
            expect(result).toBeUndefined();
        });

        test('remove_NonEmptyHashTableEntryNotFound_ReturnUndefined', () => {
            // arrange
            populateHashTable();
            const oldSize = hashTable['size'];

            // act
            const result = hashTable.remove(faker.animal.cat());

            // assert
            expect(hashTable['size']).toEqual(oldSize);
            expect(result).toBeUndefined();
        });

        test('remove_NonEmptyHashTableEntryFound_ReturnRemovedEntry', () => {
            // arrange
            populateHashTable();
            const existingKey = 'thisIsAUniqueKey';
            const existingValue = 'thisIsAUniqueValue';
            hashTable.put(
                existingKey,
                existingValue
            );
            const oldSize = hashTable['size'];

            // act
            const result = hashTable.remove(existingKey);

            // assert
            expect(hashTable['size']).toEqual(oldSize - 1);
            expect(result).toBeDefined();
            expect(result.key).toEqual(existingKey);
            expect(result.value).toEqual(existingValue);
        });
    });

    describe('resize_Tests_', () => {

        test('resize_CatchError_ThrowError', () => {
            // arrange
            hashTable['size'] = 200; // spoof internal table size to trigger a resize based on load factor
            hashTable['logger'].warn = jest.fn()
                .mockImplementationOnce(() => {
                    throw new Error();
                });

            // act / assert
            expect(() => {
                hashTable['resize']();
            }).toThrowError();
        });

        test('resize_LoadFactorThresholdNotMet_DoNothing', () => {
            // arrange
            const oldNumberOfEntries = hashTable['size'];
            const oldTableSize = hashTable['hashTable'].length;
            const loadFactor = hashTable['loadFactor'];

            // act
            hashTable['resize']();

            // assert
            expect(oldNumberOfEntries / oldTableSize).toBeLessThan(loadFactor);
            expect(hashTable['size']).toEqual(oldNumberOfEntries);
            expect(hashTable['hashTable'].length).toEqual(oldTableSize);
        });

        test('resize_LoadFactorThresholdTriggersResize_PerformResize', () => {
            // arrange
            const configuredLoadFactor = 0.70;
            hashTable = new HashTable<string, string>(
                10,
                configuredLoadFactor,
                2.0
            );
            const existingEntries: HashTableEntry<string, string>[] = [];
            for(let i = 0; i < (configuredLoadFactor * 10) - 1; i++) {
                const entry = new HashTableEntry(
                    faker.hacker.noun() + faker.animal.dog() + new Date().getTime(),
                    faker.hacker.verb() + faker.animal.dog() + new Date().getTime()
                );
                existingEntries.push(entry);
                hashTable.put(
                    entry.key,
                    entry.value
                );
            }
            const oldNumberOfEntries = hashTable['size'];
            const oldTableSize = hashTable['hashTable'].length;
            const loadFactor = hashTable['loadFactor'];
            const resizeFactor = hashTable['resizeFactor'];
            
            // act
            hashTable.put( // indirectly trigger a resize event by adding an entry that will put the table size above it's configured load factor
                faker.hacker.adjective(),
                faker.hacker.phrase()
            );

            // assert
            expect((oldNumberOfEntries + 1) / oldTableSize).toBeGreaterThanOrEqual(loadFactor);
            expect(hashTable['size']).toEqual(oldNumberOfEntries + 1);
            expect(hashTable['hashTable'].length).toEqual(oldTableSize * resizeFactor);
            existingEntries.forEach((entry) => {
                const result = hashTable.get(entry.key);
                expect(result).toBeDefined();
                expect(result.key).toEqual(entry.key);
                expect(result.value).toEqual(entry.value);
            });
        });

    });

    describe('getBucketLocationForKey_Tests_', () => {

        test('getBucketLocationForKey_ValidInput_ReturnLocation', () => {
            // arrange
            const hashTableSize = hashTable['hashTable'].length;

            // act
            const result = hashTable['getBucketLocationForKey'](faker.animal.rodent());

            // assert
            expect(result).toBeDefined();
            expect(typeof result).toBe("number")
            expect(result).toBeGreaterThanOrEqual(0);
            expect(result).toBeLessThanOrEqual(hashTableSize - 1);
        });

    }); 

    describe('hash_Tests_', () => {

        test('hash_CatchError_ThrowError', () => {
            // arrange
            // JSON.stringify = jest.fn()
            //     .mockImplementationOnce(() => {
            //         throw new Error();
            //     });
            jest.spyOn(JSON, "stringify")
                .mockImplementationOnce(() => {
                    throw new Error();
                });

            // act / assert
            expect(() => {
                hashTable['hash'](faker.music.songName());
            }).toThrowError();
        });

        test('hash_ValidInput_ReturnHash', () => {
            // arrange / act
            const result = hashTable['hash'](faker.name.fullName());

            // assert
            expect(result).toBeDefined();
            expect(typeof result).toBe("number")
        });

    });

    describe('init_Tests_', () => {

        test('init_ValidInput_Initialize', () => {
            // arrange
            const numberOfBuckets = faker.datatype.number({
                min: 10,
                max: 1000
            });

            // act
            hashTable['init'](numberOfBuckets);

            // assert
            expect(hashTable).toBeDefined();
            expect(hashTable['hashTable']).toBeDefined();
            expect(hashTable['hashTable'].length).toEqual(numberOfBuckets);
        });

    });

    const populateHashTable = (numberOfEntries: number = 10) => {
        for(let i = 0; i < numberOfEntries; i++) {
            hashTable.put(
                faker.hacker.noun() + faker.animal.dog() + new Date().getTime(),
                faker.hacker.verb() + faker.animal.dog() + new Date().getTime()
            );
        }
    };
})