/**
 * Every day I pray for <https://tc39.es/proposal-type-annotations/>
 */

/**
 * Creates a deque with the given items
 *
 * @template T
 * @param {Iterable<T> | null} initial
 * @returns {Deque<T>}
 */
export function deque<T>(initial?: Iterable<T> | null): Deque<T>;

/**
 * Generic double-ended queue.
 *
 * All push/pop operations are O(1)
 *
 * @template T
 */
export class Deque<T> {
  /**
   * Creates a deque with the given items
   * @param {Iterable<T> | null} initial
   */
  constructor(initial: Iterable<T> | null);
  /**
   * Returns the size of the queue
   * @returns {number}
   */
  size(): number;
  /**
   * Pushes an item to the back of the queue
   * @param {T} item
   */
  pushBack(item: T): void;
  /**
   * Pushes all items to the back of the queue
   * @param {Iterable<T>} items
   */
  pushAllBack(items: Iterable<T>): void;
  /**
   * Pushes an item to the front of the queue
   * @param {T} item
   */
  pushFront(item: T): void;
  /**
   * Pushes all items to the front of the queue.
   * @param {Iterable<T>} items
   * @note this in effect reverses the items in `items`
   */
  pushAllFront(items: Iterable<T>): void;
  /**
   * Pops and returns the item at the back of the queue.
   * @returns {T}
   * @throws {Error} if the queue is empty
   */
  popBack(): T;
  /**
   * Pops and returns the item at the front of the queue.
   * @returns {T}
   * @throws {Error} if the queue is empty
   */
  popFront(): T;
  /**
   * Returns the item at the back of the queue.
   * @returns {T}
   * @throws {Error} if the queue is empty
   */
  peekBack(): T;
  /**
   * Returns the item at the front of the queue.
   * @returns {T}
   * @throws {Error} if the queue is empty
   */
  peekFront(): T;
  /**
   * Iterates over items in the queue
   * @returns {Generator<T, void, void>}
   */
  [Symbol.iterator](): Generator<T, void, void>;
}
