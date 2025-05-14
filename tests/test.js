import {assertEquals, assertThrows} from "jsr:@std/assert";
import {Deque} from "../src/main.js";

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
    },
});

Deno.test({
    name: "Multiple items can be popped from a queue",
    fn: () => {
        let q = Deque.from(["Z", "Y", "X", "A", "B", "C"]);
        assertEquals(q.popBackK(3), ["C", "B", "A"]);
        assertEquals(q.popFrontK(3), ["Z", "Y", "X"]);
        q = Deque.from(["Z", "Y", "X", "A", "B", "C"]);
        assertEquals(q.popBackK(6), ["C", "B", "A", "X", "Y", "Z"]);
        q = Deque.from(["Z", "Y", "X", "A", "B", "C"]);
        assertEquals(q.popFrontK(6), ["Z", "Y", "X", "A", "B", "C"]);
    },
});

Deno.test({
    name: "deque throws when popping too many items",
    fn: () => {
        const q = new Deque();
        q.pushAllBack(["A", "B", "C"]);
        q.pushAllFront(["X", "Y", "Z"]);
        assertThrows(() => q.popBackK(7));
        assertThrows(() => q.popFrontK(7));
    },
});

Deno.test({
    name: "Deques can be created with initial values",
    fn: () => assertEquals([...Deque.from("abc")], [..."abc"]),
});


Deno.test({
    name: "Items can be peeked from queues",
    fn: () => {
        const q = Deque.from("abc");
        assertEquals(q.peekBack(), "c");
        assertEquals(q.peekBackK(0), []);
        assertEquals(q.peekBackK(1), ["c"]);
        assertEquals(q.peekBackK(2), ["c", "b"]);
        assertEquals(q.peekBackK(3), ["c", "b", "a"]);
        assertEquals(q.peekFront(), "a");
        assertEquals(q.peekFrontK(0), []);
        assertEquals(q.peekFrontK(1), ["a"]);
        assertEquals(q.peekFrontK(2), ["a", "b"]);
        assertEquals(q.peekFrontK(3), ["a", "b", "c"]);
        assertEquals(new Deque().popFrontK(0), []);
        assertEquals(new Deque().popBackK(0), []);
    },
});


Deno.test({
    name: "Peek throws when peeking too many items",
    fn: () => {
        const empty = new Deque();
        assertThrows(() => empty.peekBack());
        assertThrows(() => empty.peekFront());
        assertThrows(() => empty.peekBackK(1));
        assertThrows(() => empty.peekFrontK(1));
        const q = Deque.from("abc");
        assertThrows(() => q.peekBackK(4));
        assertThrows(() => q.peekFrontK(4));
    },
});


Deno.test({
    name: "Deques can be iterated forwards and reversed",
    fn: () => {
        const values = ["Z", "Y", "X", "A", "B", "C"];
        const q = Deque.from(values);
        assertEquals([...q.values()], values);
        assertEquals([...q.values({reversed: true})], values.toReversed());
        const large = new Deque();
        const arr = [];
        for (let i = 0; i < BLOCK_SIZE * 3.5; i++) {
            large.pushBack(i);
            arr.push(i);
        }
        assertEquals([...large.values()], arr);
        assertEquals([...large.values({reversed: true})], arr.toReversed());
    },
});
