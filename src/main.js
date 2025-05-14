/* @ts-self-types="./main.d.ts" */

const BLOCK_SIZE = 64;

/** @template T */
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


export class Deque {
    #left;
    #right;
    #leftIndex;
    #rightIndex;
    #size;

    constructor() {
        const emptyBlock = new Block();
        this.#left = emptyBlock;
        this.#right = emptyBlock;
        // Indices are 0 <= index < BLOCK_SIZE
        this.#leftIndex = Math.floor(BLOCK_SIZE / 2);
        this.#rightIndex = Math.floor(BLOCK_SIZE / 2) - 1;
        this.#size = 0;
    }

    static from(initial) {
        const deque = new Deque();
        deque.pushAllBack(initial);
        return deque;
    }

    get length() {
        return this.#size;
    }

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

    pushAllBack(items) {
        for (const item of items) {
            this.pushBack(item);
        }
    }

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

    pushAllFront(items) {
        for (const item of items) {
            this.pushFront(item);
        }
    }

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

    popBackK(k) {
        if (this.#size < k) {
            throw new Error(
                "called `.popBackK` on deque with fewer than k items",
            );
        } else {
            const result = [];
            for (let i = 0; i < k; i++) {
                result.push(this.popBack());
            }
            return result;
        }
    }

    popFrontK(k) {
        if (this.#size < k) {
            throw new Error(
                "called `.popFrontK` on deque with fewer than k items",
            );
        } else {
            const result = [];
            for (let i = 0; i < k; i++) {
                result.push(this.popFront());
            }
            return result;
        }
    }

    peekBack() {
        if (this.#size === 0) {
            throw new Error("called `.peekBack` on empty deque");
        } else {
            return this.#right.data[this.#rightIndex];
        }
    }

    peekFront() {
        if (this.#size === 0) {
            throw new Error("called `.peekFront` on empty deque");
        } else {
            return this.#left.data[this.#leftIndex];
        }
    }

    peekBackK(k) {
        if (this.#size < k) {
            throw new Error("called `.peekBackK` on empty deque");
        } else {
            return [...this.#iterReversed().take(k)];
        }
    }

    peekFrontK(k) {
        if (this.#size < k) {
            throw new Error("called `.peekFrontK` on empty deque");
        } else {
            return [...this[Symbol.iterator]().take(k)];
        }
    }

    values({reversed = false} = {}) {
        if (reversed) {
            return this.#iterReversed();
        } else {
            return this[Symbol.iterator]();
        }
    }

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

    * #iterReversed() {
        if (this.#left === this.#right) {
            const block = this.#left;
            for (let i = this.#rightIndex; i >= this.#leftIndex; i--) {
                yield block.data[i];
            }
        } else {
            for (let i = this.#rightIndex; i >= 0; i--) {
                yield this.#right.data[i];
            }
            let block = this.#right.left;
            while (block !== this.#left) {
                for (let i = BLOCK_SIZE - 1; i >= 0; i--) {
                    yield block.data[i];
                }
                block = block.left;
            }
            for (let i = BLOCK_SIZE - 1; i >= this.#leftIndex; i--) {
                yield this.#left.data[i];
            }
        }
    }
}
