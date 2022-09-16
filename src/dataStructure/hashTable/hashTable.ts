import { BaseDataStructure } from '../../shared/baseDataStructure';
import { HashTableEntry } from './model/hashTableEntry';
import { SinglyLinkedList } from '../linkedList/singlyLinkedList';

/**
 * Contains common functions for a HashTable data structure.
 */
export class HashTable<K, V> extends BaseDataStructure {
  private hashTable!: Array<SinglyLinkedList<HashTableEntry<K, V>>>;

  /**
   * Numerical factor threshold used to determine when to resize the underlying HashTable data structure.
   */
  private loadFactor = 0.7;

  /**
   * Numerical factor used to determine new HashTable size during a resize event.
   */
  private resizeFactor = 2.0;

  public constructor(
    numberOfBuckets: number,
    loadFactor?: number,
    resizeFactor?: number,
  ) {
    super(__filename);
    this.init(numberOfBuckets);
    if (loadFactor) {
      this.loadFactor = loadFactor;
    }
    if (resizeFactor) {
      this.resizeFactor = resizeFactor;
    }
  }

  /**
   * Retrieves the full entry for a given key, if it exists.
   * @param key key to use during retrieval.
   * @returns full entry mapped to specified key; undefined if key does not exist / is not found.
   */
  public get(key: K): HashTableEntry<K, V> {
    try {
      const bucketLocation = this.getBucketLocationForKey(key);
      const bucket = this.hashTable[bucketLocation];
      let iteratorNode = bucket.getHead();
      for (let i = 0; i < bucket.size; i++) {
        if (iteratorNode != null) {
          if (iteratorNode.value.key === key) {
            return iteratorNode.value;
          }
        }
        iteratorNode = iteratorNode.next;
      }

      this.logger.warn('Unable to get entry in Hash Table; key not found.', {
        key,
        currentHashTableState: this,
      });

      return undefined;
    } catch (error) {
      this.logger.error('Failed to retrieve entry from Hash Table.', {
        key,
        currentHashTableState: this,
        error,
      });
      throw error;
    }
  }

  /**
   * Determines whether or not a key exists within the HashTable.
   * @param key key to use during search.
   * @returns true if key exists, false if otherwise.
   */
  public contains(key: K): boolean {
    try {
      const bucketLocation = this.getBucketLocationForKey(key);
      const bucket = this.hashTable[bucketLocation];
      const iteratorNode = bucket.getHead();
      for (let i = 0; i < bucket.size; i++) {
        if (iteratorNode.value.key === key) {
          return true;
        }
      }
      return false;
    } catch (error) {
      this.logger.error('Failed to determine if Hash Table contains key.', {
        key,
        currentHashTableState: this,
        error,
      });
      throw error;
    }
  }

  /**
   * Inserts a new entry to the HashTable, given a specified key and value.
   * @param key key to insert.
   * @param value value to insert.
   * @returns newly-created HashTableEntry.
   */
  public put(key: K, value: V): HashTableEntry<K, V> {
    try {
      const newEntry = new HashTableEntry(key, value);
      this.hashTable[this.getBucketLocationForKey(key)].insertAtHead(newEntry);
      this.size += 1;

      this.resize(); // attempt resize if load factor threshold has been reached

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

  /**
   * Removes an entry from the HashTable, if it exists.
   * @param key key to use during removal.
   * @returns newly-removed entry, undefined if key does not exist.
   */
  public remove(key: K): HashTableEntry<K, V> | undefined {
    try {
      const bucketLocation = this.getBucketLocationForKey(key);
      const bucket = this.hashTable[bucketLocation];
      const iteratorNode = bucket.getHead();
      for (let i = 0; i < bucket.size; i++) {
        if (iteratorNode.value.key === key) {
          bucket.removeAt(i);
          this.hashTable[bucketLocation] = bucket;
          this.size -= 1;
          return iteratorNode.value;
        }
      }

      this.logger.warn(
        'Unable to remove entry from Hash Table; key not found.',
        {
          key,
          currentHashTableState: this,
        },
      );

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

  /**
   * Dynamically performs an internal resize on the HashTable.
   */
  private resize() {
    try {
      if (this.size / this.hashTable.length >= this.loadFactor) {
        this.logger.warn(
          'Load factor threshold reached; dynamically resizing HashTable.',
          {
            currentNumberOfEntries: this.size,
            currentHashTableSize: this.hashTable.length,
            loadFactor: this.loadFactor,
          },
        );

        const oldHashTable = this.hashTable;
        this.init(oldHashTable.length * this.resizeFactor);
        oldHashTable.forEach((bucket) => {
          // reinsert (i.e., re-hash) all old entries, since existing keys will have their hash locations changed due to new underlying table size
          let iteratorNode = bucket.getHead();
          while (iteratorNode != null) {
            const entry = iteratorNode.value;
            if (entry != null) {
              this.put(entry.key, entry.value);
            }
            iteratorNode = iteratorNode.next;
          }
        });
      }
    } catch (error) {
      this.logger.error('Failed to resize Hash Table.', {
        currentHashTableState: this,
        error,
      });
      throw error;
    }
  }

  /**
   * Determines a valid numerical bucket location within the underlying HashTable data structure, given a key.
   * @param key key to use in location hash.
   * @returns numerical location value, existing within the bucket bounds of the underlying HashTable.
   */
  private getBucketLocationForKey(key: K): number {
    return this.hash(key) % this.hashTable.length;
  }

  /**
   * Provides a numerical hash value to a given key.
   * @param key key value to hash.
   * @returns hashed numerical key value.
   */
  private hash(key: K): any {
    try {
      const stringifiedKey = JSON.stringify(key);
      let hash = 0;
      for (let i = 0; i < stringifiedKey.length; i++) {
        hash
          += stringifiedKey.charCodeAt(i) * 100
          - stringifiedKey.charCodeAt(i - 1 < 0 ? 0 : i - 1);
      }
      return hash;
    } catch (error) {
      this.logger.error('Failed to hash key.', {
        keyToHash: key,
        currentHashTableState: this,
        error,
      });
      throw error;
    }
  }

  /**
   * Creates a new underlying HahsTable data structure, with a specified number of buckets.
   * @param numberOfBuckets total number of buckets to initialize within underlying HashTable data structure.
   */
  private init(numberOfBuckets: number): void {
    try {
      this.hashTable = new Array<SinglyLinkedList<HashTableEntry<K, V>>>();
      for (let i = 0; i < numberOfBuckets; i++) {
        this.hashTable[i] = new SinglyLinkedList<HashTableEntry<K, V>>();
      }
      this.size = 0;
    } catch (error) {
      this.logger.error('Failed to instantiate Hash Table.', {
        initialSize: numberOfBuckets,
        error,
      });
      throw error;
    }
  }
}
