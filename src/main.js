/* @ts-self-types="./types.d.ts" */

const BLOCK_SIZE = 64;

/**
 * Creates a deque with the given items
 *
 * @template T
 * @param {Iterable<T> | null} initial
 * @returns {Deque<T>}
 */
export function deque(initial = null) {
    return new Deque(initial);
}

/**
 * @template T
 */
class Block {
    /** @type {?Block<T>} */
    left;
    /** @type {?Block<T>} */
    right;
    /** @type {?T[]} */
    data;

    /**
     * @param {?Block<T>} left
     * @param {?Block<T>} right
     */
    constructor({left = null, right = null} = {}) {
        this.left = left;
        this.right = right;
        this.data = Array(BLOCK_SIZE).fill(null);
    }
}

/**
 * Generic double-ended queue.
 *
 * All push/pop operations are O(1)
 *
 * @template T
 */
export class Deque {
    /** @type {Block<T>} */
    #left;
    /** @type {Block<T>} */
    #right;
    /** @type {number} */
    #leftIndex;
    /** @type {number} */
    #rightIndex;
    /** @type {number} */
    #size;

    /**
     * Creates a deque with the given items
     * @param {Iterable<T> | null} initial
     */
    constructor(initial = null) {
        const emptyBlock = new Block();
        this.#left = emptyBlock;
        this.#right = emptyBlock;
        // Indices are 0 <= index < BLOCK_SIZE
        this.#leftIndex = Math.floor(BLOCK_SIZE / 2);
        this.#rightIndex = Math.floor(BLOCK_SIZE / 2) - 1;
        this.#size = 0;
        if (initial !== null) {
            this.pushAllBack(initial);
        }
    }

    /**
     * Returns the size of the queue
     * @returns {number}
     */
    size() {
        return this.#size;
    }

    /**
     * Pushes an item to the back of the queue
     * @param {T} item
     */
    pushBack(item) {
        this.#rightIndex += 1;
        if (this.#rightIndex === BLOCK_SIZE) {
            const newBlock = new Block({left: this.#right});
            this.#right.right = newBlock;
            this.#right = newBlock;
            this.#rightIndex = 0;
        }
        this.#right.data[this.#rightIndex] = item;
        this.#size += 1;
    }

    /**
     * Pushes all items to the back ofthe queue
     * @param {Iterable<T>} items
     */
    pushAllBack(items) {
        for (const item of items) {
            this.pushBack(item);
        }
    }

    /**
     * Pushes an item to the front of the queue
     * @param {T} item
     */
    pushFront(item) {
        this.#leftIndex -= 1;
        if (this.#leftIndex === -1) {
            const newBlock = new Block({right: this.#left});
            this.#left.left = newBlock;
            this.#left = newBlock;
            this.#leftIndex = BLOCK_SIZE - 1;
        }
        this.#left.data[this.#leftIndex] = item;
        this.#size += 1;
    }

    /**
     * Pushes all items to the front of the queue.
     * @param {Iterable<T>} items
     * @note this in effect reverses the items in `items`
     */
    pushAllFront(items) {
        for (const item of items) {
            this.pushFront(item);
        }
    }

    /**
     * Pops and returns the item at the back of the queue.
     * @returns {T}
     * @throws {Error} if the queue is empty
     */
    popBack() {
        if (this.#size === 0) {
            throw new Error("Called `.popBack` on empty queue");
        }
        const value = this.#right.data[this.#rightIndex];
        this.#right.data[this.#rightIndex] = null;
        this.#rightIndex -= 1;
        this.#size -= 1;
        if (this.#size === 0) {
            this.#leftIndex = Math.floor(BLOCK_SIZE / 2);
            this.#rightIndex = Math.floor(BLOCK_SIZE / 2) - 1;
        } else if (this.#rightIndex < 0) {
            this.#right = this.#right.left;
            this.#right.right = null;
            this.#rightIndex = BLOCK_SIZE - 1;
        }
        return value;
    }

    /**
     * Pops and returns the item at the front of the queue.
     * @returns {T}
     * @throws {Error} if the queue is empty
     */
    popFront() {
        if (this.#size === 0) {
            throw new Error("Called `.popFront` on empty queue");
        }
        const value = this.#left.data[this.#leftIndex];
        this.#left.data[this.#leftIndex] = null;
        this.#leftIndex += 1;
        this.#size -= 1;
        if (this.#size === 0) {
            this.#leftIndex = Math.floor(BLOCK_SIZE / 2);
            this.#rightIndex = Math.floor(BLOCK_SIZE / 2) - 1;
        } else if (this.#leftIndex === BLOCK_SIZE) {
            this.#left = this.#left.right;
            this.#left.left = null;
            this.#leftIndex = 0;
        }
        return value;
    }

    /**
     * Returns the item at the back of the queue.
     * @returns {T}
     * @throws {Error} if the queue is empty
     */
    peekBack() {
        if (this.#size === 0) {
            throw new Error("called `.peekBack` on empty deque");
        } else {
            return this.#right.data[this.#rightIndex];
        }
    }

    /**
     * Returns the item at the front of the queue.
     * @returns {T}
     * @throws {Error} if the queue is empty
     */
    peekFront() {
        if (this.#size === 0) {
            throw new Error("called `.peekFront` on empty deque");
        } else {
            return this.#left.data[this.#leftIndex];
        }
    }

    /**
     * Iterates over items in the queue. Behaviour is not defined if the queue
     * is modified during iteration.
     * @returns {Generator<T, void, void>}
     */
    * [Symbol.iterator]() {
        if (this.#left === this.#right) {
            const block = this.#left;
            for (let i = this.#leftIndex; i <= this.#rightIndex; i++) {
                yield block.data[i];
            }
        } else {
            for (let i = this.#leftIndex; i < BLOCK_SIZE; i++) {
                yield this.#left.data[i];
            }
            let block = this.#left.right;
            while (block !== this.#right) {
                yield* block.data;
                block = block.right;
            }
            for (let i = 0; i <= this.#rightIndex; i++) {
                yield this.#right.data[i];
            }
        }
    }
}