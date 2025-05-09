import {assertEquals, assertThrows} from "@std/assert";
import {Deque} from "@alg/deque";

const BLOCK_SIZE = 64;

Deno.test({
    name: "Empty queues have no items",
    fn: () => {
        const q = new Deque();
        assertEquals(q.size(), 0);
        assertEquals([...q], []);
        assertThrows(() => q.peekBack());
        assertThrows(() => q.peekFront());
        assertThrows(() => q.popBack());
        assertThrows(() => q.popFront());
    },
});

Deno.test({
    name: "Items can be pushed onto queues",
    fn: () => {
        const q = new Deque();
        q.pushBack("a");
        q.pushFront("b");
        assertEquals(q.size(), 2);
        assertEquals([...q], ["b", "a"]);
        assertEquals(q.peekBack(), "a");
        assertEquals(q.peekFront(), "b");
        q.pushBack("c");
        q.pushFront("d");
        assertEquals(q.size(), 4);
        assertEquals([...q], ["d", "b", "a", "c"]);
        assertEquals(q.peekBack(), "c");
        assertEquals(q.peekFront(), "d");
    },
});

Deno.test({
    name: "Items can be popped from queues",
    fn: () => {
        const q = new Deque();
        q.pushBack("a");
        q.pushFront("b");
        q.pushBack("c");
        q.pushFront("d");
        assertEquals(q.popBack(), "c");
        assertEquals(q.popFront(), "d");
        assertEquals(q.size(), 2);
        assertEquals([...q], ["b", "a"]);

        assertEquals(q.popBack(), "a");
        assertEquals(q.popFront(), "b");
        assertEquals(q.size(), 0);
        assertEquals([...q], []);

        const qRight = new Deque();
        for (let i = 0; i < BLOCK_SIZE * 1.5; i++) {
            qRight.pushBack(i);
        }
        for (let i = 0; i < BLOCK_SIZE * 1.5; i++) {
            assertEquals(qRight.popFront(), i);
        }
        assertEquals(qRight.size(), 0);
        assertEquals([...qRight], []);

        const qLeft = new Deque();
        for (let i = 0; i < BLOCK_SIZE * 1.5; i++) {
            qLeft.pushFront(i);
        }
        for (let i = 0; i < BLOCK_SIZE * 1.5; i++) {
            assertEquals(qLeft.popBack(), i);
        }
        assertEquals(qLeft.size(), 0);
        assertEquals([...qLeft], []);
    },
});

Deno.test({
    name: "Deques with multiple blocks can be iterated",
    fn: () => {
        let q = new Deque();
        let arr = [];
        for (let i = 0; i < BLOCK_SIZE * 3.5; i++) {
            q.pushBack(i);
            arr.push(i);
        }
        assertEquals([...q], arr);

        q = new Deque();
        arr = [];
        for (let i = 0; i < BLOCK_SIZE; i++) {
            q.pushBack(i);
            arr.push(i);
        }
        assertEquals([...q], arr);
    },
});

Deno.test({
    name: "Multiple items can be pushed to a queue",
    fn: () => {
        const q = new Deque();
        q.pushAllBack(["A", "B", "C"]);
        q.pushAllFront(["X", "Y", "Z"]);
        assertEquals(q.size(), 6);
        assertEquals([...q], ["Z", "Y", "X", "A", "B", "C"]);
    }
})