/* Copyright 2025 @alg/deque contributors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * Generic double-ended queue.
 *
 * All push/pop operations are O(1) or O(k) in the case of pop K methods
 *
 * @template T
 */
export class Deque<T> {
  /** Returns the size of the queue */
  readonly length: number;

  /**
   * Creates an empty deque
   */
  constructor();

  /**
   * Creates a deque with the given items
   * @param {Iterable<T>} initial
   */
  static from<T>(initial: Iterable<T>): Deque<T>;

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
   * Pops and returns `k` elements from the back of the queue.
   *
   * @example
   * ```javascript
   * const deque = Deque.from(["a", "b", "c", "d"]);
   * const result = deque.popBackK(3);
   * console.log(result);  // ["d", "c", "b"]
   * console.log([...deque]);  // ["a"]
   * ```
   *
   * @param {number} k
   * @returns {T[]}
   * @throws {Error} if k is larger than the size of the deque.
   */
  popBackK(k: number): T[];

  /**
   * Pops and returns `k` elements from the front of the queue.
   *
   * @example
   * ```javascript
   * const deque = Deque.from(["a", "b", "c", "d"]);
   * const result = deque.popFrontK(3);
   * console.log(result);  // ["a", "b", "c"]
   * console.log([...deque]);  // ["d"]
   * ```
   *
   * @param {number} k
   * @returns {T[]}
   * @throws {Error} if k is larger than the size of the deque.
   */
  popFrontK(k: number): T[];

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
   * Returns `k` elements from the back of the queue leaving the queue
   * unmodified.
   *
   * @example
   * ```javascript
   * const deque = Deque.from(["a", "b", "c", "d"]);
   * const result = deque.peekBackK(3);
   * console.log(result);  // ["d", "c", "b"]
   * console.log([...deque]);  // ["a", "b", "c", "d"]
   * ```
   *
   * @param {number} k
   * @returns {T[]}
   * @throws {Error} If k is larger than the size of the queue
   */
  peekBackK(k: number): T[];

  /**
   * Returns `k` elements from the front of the queue leaving the queue
   * unmodified.
   *
   * @example
   * ```javascript
   * const deque = Deque.from(["a", "b", "c", "d"]);
   * const result = deque.peekFrontK(3);
   * console.log(result);  // ["a", "b", "c"]
   * console.log([...deque]);  // ["a", "b", "c", "d"]
   * ```
   *
   * @param {number} k
   * @returns {T[]}
   * @throws {Error} If k is larger than the size of the queue
   */
  peekFrontK(k: number): T[];

  /**
   * Returns an iterator over items in the deque. By default, iterates in
   * forwards order
   *
   * Modifying the deque while iterating is undefined behaviour.
   *
   * @param {Object} options Options for iterating over values
   * @param {boolean?} options.reversed `true` if items should be iterated in
   *  reversed order.
   */
  values(options?: { reversed?: boolean }): Iterator<T>;

  /**
   * Iterates over items in the queue.
   *
   * Modifying the deque while iterating is undefined behaviour.
   *
   * @returns {Iterator<T>}
   */
  [Symbol.iterator](): Iterator<T>;
}
