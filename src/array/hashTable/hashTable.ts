import { BaseDataStructure } from '../../shared/baseDataStructure';
import { HashTableEntry } from './model/hashTableEntry';

/**
 * Contains common functions for a HashTable data structure.
 */
export class HashTable<K, V> extends BaseDataStructure {
  private hashTable!: HashTableEntry<K, V>[];

  public constructor() {
    super(__filename);
  }
}
