// Design Circular Queue

/**
 * Approach 1: Basic Circular Queue Implementation
 * Time Complexity: 
 *   - enQueue: O(1)
 *   - deQueue: O(1)
 *   - Front: O(1)
 *   - Rear: O(1)
 *   - isEmpty: O(1)
 *   - isFull: O(1)
 * Space Complexity: O(k) where k is the size of the queue
 */
class MyCircularQueue {
  constructor(k) {
    this.capacity = k;
    this.queue = new Array(k);
    this.head = -1;
    this.tail = -1;
  }
  
  // Insert an element into the circular queue
  enQueue(value) {
    if (this.isFull()) {
      return false;
    }
    
    if (this.isEmpty()) {
      this.head = 0;
    }
    
    this.tail = (this.tail + 1) % this.capacity;
    this.queue[this.tail] = value;
    return true;
  }
  
  // Delete an element from the circular queue
  deQueue() {
    if (this.isEmpty()) {
      return false;
    }
    
    if (this.head === this.tail) {
      // Last element
      this.head = -1;
      this.tail = -1;
    } else {
      this.head = (this.head + 1) % this.capacity;
    }
    
    return true;
  }
  
  // Get the front item from the queue
  Front() {
    if (this.isEmpty()) {
      return -1;
    }
    return this.queue[this.head];
  }
  
  // Get the last item from the queue
  Rear() {
    if (this.isEmpty()) {
      return -1;
    }
    return this.queue[this.tail];
  }
  
  // Check if the queue is empty
  isEmpty() {
    return this.head === -1;
  }
  
  // Check if the queue is full
  isFull() {
    return ((this.tail + 1) % this.capacity) === this.head;
  }
}

/**
 * Approach 2: Circular Queue Implementation using Linked List
 * Time Complexity: 
 *   - enQueue: O(1)
 *   - deQueue: O(1)
 *   - Front: O(1)
 *   - Rear: O(1)
 *   - isEmpty: O(1)
 *   - isFull: O(1)
 * Space Complexity: O(k) where k is the size of the queue
 */
class ListNode {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class MyCircularQueueLinkedList {
  constructor(k) {
    this.capacity = k;
    this.size = 0;
    this.head = null;
    this.tail = null;
  }
  
  // Insert an element into the circular queue
  enQueue(value) {
    if (this.isFull()) {
      return false;
    }
    
    const newNode = new ListNode(value);
    
    if (this.isEmpty()) {
      this.head = newNode;
      this.tail = newNode;
      newNode.next = newNode; // Point to itself to form a circle
    } else {
      newNode.next = this.head; // New node points to head
      this.tail.next = newNode; // Tail points to new node
      this.tail = newNode; // Update tail
    }
    
    this.size++;
    return true;
  }
  
  // Delete an element from the circular queue
  deQueue() {
    if (this.isEmpty()) {
      return false;
    }
    
    if (this.size === 1) {
      // Last element
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
      this.tail.next = this.head; // Maintain circular structure
    }
    
    this.size--;
    return true;
  }
  
  // Get the front item from the queue
  Front() {
    if (this.isEmpty()) {
      return -1;
    }
    return this.head.value;
  }
  
  // Get the last item from the queue
  Rear() {
    if (this.isEmpty()) {
      return -1;
    }
    return this.tail.value;
  }
  
  // Check if the queue is empty
  isEmpty() {
    return this.size === 0;
  }
  
  // Check if the queue is full
  isFull() {
    return this.size === this.capacity;
  }
}

/**
 * Approach 3: Circular Queue Implementation using Map
 * Time Complexity: 
 *   - enQueue: O(1)
 *   - deQueue: O(1)
 *   - Front: O(1)
 *   - Rear: O(1)
 *   - isEmpty: O(1)
 *   - isFull: O(1)
 * Space Complexity: O(k) where k is the size of the queue
 */
class MyCircularQueueMap {
  constructor(k) {
    this.capacity = k;
    this.queue = new Map();
    this.head = 0;
    this.tail = 0;
    this.size = 0;
  }
  
  // Insert an element into the circular queue
  enQueue(value) {
    if (this.isFull()) {
      return false;
    }
    
    this.queue.set(this.tail, value);
    this.tail = (this.tail + 1) % this.capacity;
    this.size++;
    return true;
  }
  
  // Delete an element from the circular queue
  deQueue() {
    if (this.isEmpty()) {
      return false;
    }
    
    this.queue.delete(this.head);
    this.head = (this.head + 1) % this.capacity;
    this.size--;
    return true;
  }
  
  // Get the front item from the queue
  Front() {
    if (this.isEmpty()) {
      return -1;
    }
    return this.queue.get(this.head);
  }
  
  // Get the last item from the queue
  Rear() {
    if (this.isEmpty()) {
      return -1;
    }
    // Calculate the index of the last element
    const lastIndex = (this.tail - 1 + this.capacity) % this.capacity;
    return this.queue.get(lastIndex);
  }
  
  // Check if the queue is empty
  isEmpty() {
    return this.size === 0;
  }
  
  // Check if the queue is full
  isFull() {
    return this.size === this.capacity;
  }
}

/**
 * Approach 4: Functional Circular Queue Implementation
 * Time Complexity: 
 *   - enQueue: O(1)
 *   - deQueue: O(1)
 *   - Front: O(1)
 *   - Rear: O(1)
 *   - isEmpty: O(1)
 *   - isFull: O(1)
 * Space Complexity: O(k) where k is the size of the queue
 */
const createMyCircularQueue = (k) => {
  let capacity = k;
  let queue = new Array(k);
  let head = -1;
  let tail = -1;
  
  return {
    // Insert an element into the circular queue
    enQueue(value) {
      if (((tail + 1) % capacity) === head) {
        return false;
      }
      
      if (head === -1) {
        head = 0;
      }
      
      tail = (tail + 1) % capacity;
      queue[tail] = value;
      return true;
    },
    
    // Delete an element from the circular queue
    deQueue() {
      if (head === -1) {
        return false;
      }
      
      if (head === tail) {
        // Last element
        head = -1;
        tail = -1;
      } else {
        head = (head + 1) % capacity;
      }
      
      return true;
    },
    
    // Get the front item from the queue
    Front() {
      if (head === -1) {
        return -1;
      }
      return queue[head];
    },
    
    // Get the last item from the queue
    Rear() {
      if (head === -1) {
        return -1;
      }
      return queue[tail];
    },
    
    // Check if the queue is empty
    isEmpty() {
      return head === -1;
    },
    
    // Check if the queue is full
    isFull() {
      return ((tail + 1) % capacity) === head;
    }
  };
};

/**
 * Approach 5: Circular Queue with Custom Iterator
 * Time Complexity: 
 *   - enQueue: O(1)
 *   - deQueue: O(1)
 *   - Front: O(1)
 *   - Rear: O(1)
 *   - isEmpty: O(1)
 *   - isFull: O(1)
 * Space Complexity: O(k) where k is the size of the queue
 */
class MyCircularQueueWithIterator {
  constructor(k) {
    this.capacity = k;
    this.queue = new Array(k);
    this.head = -1;
    this.tail = -1;
  }
  
  // Insert an element into the circular queue
  enQueue(value) {
    if (this.isFull()) {
      return false;
    }
    
    if (this.isEmpty()) {
      this.head = 0;
    }
    
    this.tail = (this.tail + 1) % this.capacity;
    this.queue[this.tail] = value;
    return true;
  }
  
  // Delete an element from the circular queue
  deQueue() {
    if (this.isEmpty()) {
      return false;
    }
    
    if (this.head === this.tail) {
      // Last element
      this.head = -1;
      this.tail = -1;
    } else {
      this.head = (this.head + 1) % this.capacity;
    }
    
    return true;
  }
  
  // Get the front item from the queue
  Front() {
    if (this.isEmpty()) {
      return -1;
    }
    return this.queue[this.head];
  }
  
  // Get the last item from the queue
  Rear() {
    if (this.isEmpty()) {
      return -1;
    }
    return this.queue[this.tail];
  }
  
  // Check if the queue is empty
  isEmpty() {
    return this.head === -1;
  }
  
  // Check if the queue is full
  isFull() {
    return ((this.tail + 1) % this.capacity) === this.head;
  }
  
  // Custom iterator for the queue
  *[Symbol.iterator]() {
    if (this.isEmpty()) {
      return;
    }
    
    let index = this.head;
    let count = 0;
    const size = this.head <= this.tail ? 
      this.tail - this.head + 1 : 
      this.capacity - this.head + this.tail + 1;
    
    while (count < size) {
      yield this.queue[index];
      index = (index + 1) % this.capacity;
      count++;
    }
  }
}

/**
 * Approach 6: Generator-based Circular Queue Implementation with Step-by-Step Visualization
 * Time Complexity: 
 *   - enQueue: O(1)
 *   - deQueue: O(1)
 *   - Front: O(1)
 *   - Rear: O(1)
 *   - isEmpty: O(1)
 *   - isFull: O(1)
 * Space Complexity: O(k) where k is the size of the queue
 */
class MyCircularQueueWithGenerator {
  constructor(k) {
    this.capacity = k;
    this.queue = new Array(k);
    this.head = -1;
    this.tail = -1;
  }
  
  // Insert an element into the circular queue
  *enQueue(value) {
    yield { operation: 'enQueue', value, before: this.getQueueState() };
    
    if (this.isFull()) {
      yield { operation: 'enQueue', result: false, reason: 'Queue is full' };
      return false;
    }
    
    if (this.isEmpty()) {
      this.head = 0;
      yield { operation: 'enQueue', message: 'Queue was empty, setting head to 0' };
    }
    
    this.tail = (this.tail + 1) % this.capacity;
    this.queue[this.tail] = value;
    
    yield { operation: 'enQueue', value, after: this.getQueueState(), result: true };
    return true;
  }
  
  // Delete an element from the circular queue
  *deQueue() {
    yield { operation: 'deQueue', before: this.getQueueState() };
    
    if (this.isEmpty()) {
      yield { operation: 'deQueue', result: false, reason: 'Queue is empty' };
      return false;
    }
    
    const value = this.queue[this.head];
    
    if (this.head === this.tail) {
      // Last element
      this.head = -1;
      this.tail = -1;
      yield { operation: 'deQueue', message: 'Last element removed, resetting head and tail' };
    } else {
      this.head = (this.head + 1) % this.capacity;
    }
    
    yield { operation: 'deQueue', value, after: this.getQueueState(), result: true };
    return true;
  }
  
  // Get the front item from the queue
  *Front() {
    yield { operation: 'Front', queueState: this.getQueueState() };
    
    if (this.isEmpty()) {
      yield { operation: 'Front', result: -1, reason: 'Queue is empty' };
      return -1;
    }
    
    const value = this.queue[this.head];
    yield { operation: 'Front', result: value };
    return value;
  }
  
  // Get the last item from the queue
  *Rear() {
    yield { operation: 'Rear', queueState: this.getQueueState() };
    
    if (this.isEmpty()) {
      yield { operation: 'Rear', result: -1, reason: 'Queue is empty' };
      return -1;
    }
    
    const value = this.queue[this.tail];
    yield { operation: 'Rear', result: value };
    return value;
  }
  
  // Check if the queue is empty
  *isEmpty() {
    yield { operation: 'isEmpty', queueState: this.getQueueState() };
    
    const result = this.head === -1;
    yield { operation: 'isEmpty', result };
    return result;
  }
  
  // Check if the queue is full
  *isFull() {
    yield { operation: 'isFull', queueState: this.getQueueState() };
    
    const result = ((this.tail + 1) % this.capacity) === this.head;
    yield { operation: 'isFull', result };
    return result;
  }
  
  // Helper method to get current queue state for visualization
  getQueueState() {
    return {
      queue: [...this.queue],
      head: this.head,
      tail: this.tail,
      capacity: this.capacity
    };
  }
}

// Example usage and test cases
if (typeof window === 'undefined') {  // Node.js environment
  console.log('=== Testing Circular Queue Implementation ===');
  
  // Test with basic implementation
  console.log('\n--- Testing Basic Circular Queue Implementation ---');
  const queue1 = new MyCircularQueue(3);
  console.log('Enqueue 1:', queue1.enQueue(1)); // true
  console.log('Enqueue 2:', queue1.enQueue(2)); // true
  console.log('Enqueue 3:', queue1.enQueue(3)); // true
  console.log('Enqueue 4:', queue1.enQueue(4)); // false
  console.log('Rear:', queue1.Rear()); // 3
  console.log('Is Full:', queue1.isFull()); // true
  console.log('Dequeue:', queue1.deQueue()); // true
  console.log('Enqueue 4:', queue1.enQueue(4)); // true
  console.log('Rear:', queue1.Rear()); // 4
  
  // Test with linked list implementation
  console.log('\n--- Testing Linked List Circular Queue Implementation ---');
  const queue2 = new MyCircularQueueLinkedList(3);
  console.log('Enqueue 1:', queue2.enQueue(1)); // true
  console.log('Enqueue 2:', queue2.enQueue(2)); // true
  console.log('Enqueue 3:', queue2.enQueue(3)); // true
  console.log('Enqueue 4:', queue2.enQueue(4)); // false
  console.log('Rear:', queue2.Rear()); // 3
  console.log('Is Full:', queue2.isFull()); // true
  console.log('Dequeue:', queue2.deQueue()); // true
  console.log('Enqueue 4:', queue2.enQueue(4)); // true
  console.log('Rear:', queue2.Rear()); // 4
  
  // Test with map implementation
  console.log('\n--- Testing Map-based Circular Queue Implementation ---');
  const queue3 = new MyCircularQueueMap(3);
  console.log('Enqueue 1:', queue3.enQueue(1)); // true
  console.log('Enqueue 2:', queue3.enQueue(2)); // true
  console.log('Enqueue 3:', queue3.enQueue(3)); // true
  console.log('Enqueue 4:', queue3.enQueue(4)); // false
  console.log('Rear:', queue3.Rear()); // 3
  console.log('Is Full:', queue3.isFull()); // true
  console.log('Dequeue:', queue3.deQueue()); // true
  console.log('Enqueue 4:', queue3.enQueue(4)); // true
  console.log('Rear:', queue3.Rear()); // 4
  
  // Test with functional implementation
  console.log('\n--- Testing Functional Circular Queue Implementation ---');
  const queue4 = createMyCircularQueue(3);
  console.log('Enqueue 1:', queue4.enQueue(1)); // true
  console.log('Enqueue 2:', queue4.enQueue(2)); // true
  console.log('Enqueue 3:', queue4.enQueue(3)); // true
  console.log('Enqueue 4:', queue4.enQueue(4)); // false
  console.log('Rear:', queue4.Rear()); // 3
  console.log('Is Full:', queue4.isFull()); // true
  console.log('Dequeue:', queue4.deQueue()); // true
  console.log('Enqueue 4:', queue4.enQueue(4)); // true
  console.log('Rear:', queue4.Rear()); // 4
  
  // Test with iterator implementation
  console.log('\n--- Testing Iterator Circular Queue Implementation ---');
  const queue5 = new MyCircularQueueWithIterator(3);
  queue5.enQueue(1);
  queue5.enQueue(2);
  queue5.enQueue(3);
  console.log('Iterator:');
  for (const item of queue5) {
    console.log('  ', item);
  }
  
  // Test with generator implementation
  console.log('\n--- Testing Generator Circular Queue Implementation ---');
  const queue6 = new MyCircularQueueWithGenerator(3);
  
  // Run generator operations
  const runGenerator = async (generator) => {
    let result;
    do {
      result = generator.next();
      if (!result.done) {
        console.log('  ', result.value);
      }
    } while (!result.done);
    return result.value;
  };
  
  // Test operations
  console.log('Enqueue operations:');
  await runGenerator(queue6.enQueue(1));
  await runGenerator(queue6.enQueue(2));
  await runGenerator(queue6.enQueue(3));
  
  console.log('Is Full operation:');
  await runGenerator(queue6.isFull());
  
  console.log('Dequeue operation:');
  await runGenerator(queue6.deQueue());
  
  console.log('Enqueue 4:');
  await runGenerator(queue6.enQueue(4));
  
  console.log('Rear operation:');
  await runGenerator(queue6.Rear());
  
  // Performance comparison utility
  const performanceTest = (QueueClass, name, capacity, operations) => {
    const start = performance.now();
    const queue = new QueueClass(capacity);
    
    // Fill the queue
    for (let i = 0; i < capacity; i++) {
      queue.enQueue(i);
    }
    
    // Perform operations
    for (let i = 0; i < operations; i++) {
      queue.deQueue();
      queue.enQueue(i % capacity);
    }
    
    const end = performance.now();
    console.log(`${name}: ${end - start}ms for ${operations} operations`);
  };
  
  // Run performance tests
  console.log('\n=== Performance Comparison ===');
  const testCapacity = 1000;
  const testOperations = 10000;
  performanceTest(MyCircularQueue, 'Basic Circular Queue', testCapacity, testOperations);
  performanceTest(MyCircularQueueLinkedList, 'Linked List Circular Queue', testCapacity, testOperations);
  performanceTest(MyCircularQueueMap, 'Map-based Circular Queue', testCapacity, testOperations);
}

// Export classes for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    MyCircularQueue,
    MyCircularQueueLinkedList,
    MyCircularQueueMap,
    createMyCircularQueue,
    MyCircularQueueWithIterator,
    MyCircularQueueWithGenerator
  };
}
