# @alg/deque

[![JSR](https://jsr.io/badges/@alg/deque)](https://jsr.io/@alg/deque)
[![API](https://img.shields.io/badge/API-blue?logo=readme&logoColor=white)](https://jsr.io/@alg/deque/doc)
[![License](https://img.shields.io/badge/MIT-green?label=license)](https://github.com/alg/deque/blob/main/LICENSE)

A deque implemented as an array blocked doubly linked list.

## Install

```
deno add jsr:@alg/deque
```

## Example

```javascript
import {deque} from "@alg/queues";

const q = deque(["I", "J"]);  // or new Deque();
q.pushFront("L");
q.pushBack("R");
q.pushAllBack(["X", "Y", "Z"]);
q.pushAllFront(["A", "B", "C"]);
console.log(q.size());  // 10
console.log(q.popBack());  // "Z"
console.log(q.popFront());  // "C"
console.log(q.peekBack());  // "Y"
console.log(q.peekFront());  // "B"
q.pushBack(q.popFront());  // Look, ma! O(1) rotate!
console.log([...q]);  // ["A", "L", "I", "J" "R", "X", "Y", "B"]
```
