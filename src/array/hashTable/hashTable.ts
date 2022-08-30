import { BaseDataStructure } from '../../shared/baseDataStructure';
import { HashTableEntry } from './model/hashTableEntry';
import { SinglyLinkedList } from '../../list/linkedList/singlyLinkedList';

/**
 * Contains common functions for a HashTable data structure.
 */
export class HashTable<K, V> extends BaseDataStructure {
  private hashTable!: Array<SinglyLinkedList<HashTableEntry<K, V>>>;

  public constructor(numberOfBuckets: number) {
    super(__filename);
    this.instantiateHashTable(numberOfBuckets);
  }

  public put(
    key: K,
    value: V,
  ): HashTableEntry<K, V> {
    try {
      const newEntry = new HashTableEntry(
        key,
        value,
      );
      this.hashTable[this.getBucketLocationForKey(key)].insertAtHead(newEntry);
      this.size += 1;
      return newEntry;
    } catch (error) {
      this.logger.error('Failed to put entry into Hash Table.', {
        keyToPut: key,
        valueToPut: value,
        currentHashTableState: this,
        error,
      });
      throw error;
    }
  }

  public remove(key: K): HashTableEntry<K, V> | undefined {
    try {
      const bucketLocation = this.getBucketLocationForKey(key);
      const bucket = this.hashTable[bucketLocation];
      const node = bucket.getHead();
      for (let i = 0; i < bucket.size; i++) {
        if (node.value.key === key) {
          bucket.removeAt(i);
          this.hashTable[bucketLocation] = bucket;
          this.size -= 1;
          return node.value;
        }
      }

      this.logger.warn('Unable to remove entry from Hash Table; key not found.', {
        key,
        currentHashTableState: this,
      });

      return undefined;
    } catch (error) {
      this.logger.error('Failed to remove entry from Hash Table.', {
        key,
        currentHashTableState: this,
        error,
      });
      throw error;
    }
  }

  private getBucketLocationForKey(key: K) {
    return this.hash(key) % this.hashTable.length;
  }

  private hash(key: K): any {
    try {
      const stringifiedKey = JSON.stringify(key);
      let hash = 0;
      for (let i = 0; i < stringifiedKey.length; i++) {
        hash += stringifiedKey.charCodeAt(i)
          * 100 - stringifiedKey.charCodeAt(i - 1 < 0 ? 0 : i - 1);
      }
      return hash;
    } catch (error) {
      this.logger.error('Failed to hash key.', {
        keyToHash: key,
        currentHashTableState: this,
      });
      throw error;
    }
  }

  private instantiateHashTable(numberOfBuckets: number): void {
    try {
      this.hashTable = new Array<SinglyLinkedList<HashTableEntry<K, V>>>();
      for (let i = 0; i < numberOfBuckets; i++) {
        this.hashTable[i] = new SinglyLinkedList<HashTableEntry<K, V>>();
      }
    } catch (error) {
      this.logger.error('Failed to instantiate Hash Table.', {
        initialSize: numberOfBuckets,
      });
      throw error;
    }
  }
}
