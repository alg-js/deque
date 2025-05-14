# @alg/deque

[![JSR](https://jsr.io/badges/@alg/deque)](https://jsr.io/@alg/deque)
[![License](https://img.shields.io/badge/MIT-green?label=license)](https://github.com/alg-js/deque/blob/main/LICENSE)

A deque implemented as an array blocked doubly linked list.

See [@alg/buffer](https://jsr.io/@alg/buffer) for a generic buffer.

## Install

```
deno add jsr:@alg/deque
```

## Example

```javascript
import {Deque} from "@alg/deque";

const q = Deque.from(["I", "J"]);

q.pushFront("L");
q.pushBack("R");
q.pushAllBack(["X", "Y", "Z"]);
q.pushAllFront(["A", "B", "C"]);

console.log([...q]);  // ["C", "B", "A", "L", "I", "J", "R", "X", "Y", "Z"]

console.log(q.size());  // 10

console.log(q.popBack());  // "Z"
console.log(q.popFront());  // "C"

console.log(q.popBackK(2));  // ["Y", "X"]
console.log(q.popFrontK(2));  // ["B", "A"]

console.log(q.peekBack());  // "R"
console.log(q.peekFront());  // "L"

q.pushBack(q.popFront());  // Look, ma! O(1) rotate!

console.log([...q]);  // ["I", "J", "R", "L"]
```
