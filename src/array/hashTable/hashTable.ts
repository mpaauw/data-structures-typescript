import { BaseDataStructure } from '../../shared/baseDataStructure';
import { HashTableEntry } from './model/hashTableEntry';
import { SinglyLinkedList } from '../../list/linkedList/singlyLinkedList';


/**
 * Contains common functions for a HashTable data structure.
 */
export class HashTable<K, V> extends BaseDataStructure {
  private hashTable!: Array<SinglyLinkedList<HashTableEntry<K,V>>>;

  public constructor(numberOfBuckets: number) {
    super(__filename);
    this.instantiateHashTable(numberOfBuckets);
  }

  public put(
    key: K,
    value: V
  ): void {
    try {
      const hash = this.hash(key);
      const bucketLocation = hash % this.hashTable.length;
      this.hashTable[bucketLocation].insertAtHead(new HashTableEntry(
        key,
        value
      ));
      this.size += 1;
    } catch(error) {
      this.logger.error('Failed to put value into Hash Table.', {
        keyToPut: key,
        valueToPut: value,
        currentHashTableState: this,
        error: error
      });
      throw error;
    }
  }

  private hash(key: K): any {
    try {
      const stringifiedKey = JSON.stringify(key);
      let hash: number = 0;

      for(let i = 0; i < stringifiedKey.length; i++) {
        hash += stringifiedKey.charCodeAt(i) * 100 - stringifiedKey.charCodeAt(i - 1 < 0 ? 0 : i - 1);
      }

      return hash;
    } catch(error) {
      this.logger.error('Failed to hash key.', {
        keyToHash: key,
        currentHashTableState: this
      });
      throw error;
    }
  }

  private instantiateHashTable(numberOfBuckets: number): void {
    try {
      this.hashTable = new Array<SinglyLinkedList<HashTableEntry<K,V>>>();
      for(let i = 0; i < numberOfBuckets; i++) {
        this.hashTable[i] = new SinglyLinkedList<HashTableEntry<K,V>>();
      }
    } catch(error) {
      this.logger.error('Failed to instantiate Hash Table.', {
        initialSize: numberOfBuckets
      });
      throw error;
    }
  }

}
