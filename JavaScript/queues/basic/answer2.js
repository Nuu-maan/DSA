// Implement Circular Queue

/**
 * Approach 1: Basic Circular Queue Implementation
 * Time Complexity: 
 *   - enQueue: O(1)
 *   - deQueue: O(1)
 *   - Front: O(1)
 *   - Rear: O(1)
 *   - isEmpty: O(1)
 *   - isFull: O(1)
 *   - size: O(1)
 *   - display: O(n)
 * Space Complexity: O(k) where k is the capacity of the queue
 */
class CircularQueueBasic {
  constructor(k) {
    this.capacity = k;
    this.queue = new Array(k);
    this.head = -1;
    this.tail = -1;
    this.size = 0;
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
    this.size++;
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
    
    this.size--;
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
    return this.size === 0;
  }
  
  // Check if the queue is full
  isFull() {
    return this.size === this.capacity;
  }
  
  // Get the number of elements in the queue
  getSize() {
    return this.size;
  }
  
  // Display all elements in the queue
  display() {
    if (this.isEmpty()) {
      return [];
    }
    
    const result = [];
    let index = this.head;
    
    for (let i = 0; i < this.size; i++) {
      result.push(this.queue[index]);
      index = (index + 1) % this.capacity;
    }
    
    return result;
  }
}

/**
 * Approach 2: Circular Queue Implementation using Map
 * Time Complexity: 
 *   - enQueue: O(1)
 *   - deQueue: O(1)
 *   - Front: O(1)
 *   - Rear: O(1)
 *   - isEmpty: O(1)
 *   - isFull: O(1)
 *   - size: O(1)
 *   - display: O(n)
 * Space Complexity: O(k) where k is the capacity of the queue
 */
class CircularQueueWithMap {
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
  
  // Get the number of elements in the queue
  getSize() {
    return this.size;
  }
  
  // Display all elements in the queue
  display() {
    if (this.isEmpty()) {
      return [];
    }
    
    const result = [];
    let index = this.head;
    
    for (let i = 0; i < this.size; i++) {
      result.push(this.queue.get(index));
      index = (index + 1) % this.capacity;
    }
    
    return result;
  }
}

/**
 * Approach 3: Functional Circular Queue Implementation
 * Time Complexity: 
 *   - enQueue: O(1)
 *   - deQueue: O(1)
 *   - Front: O(1)
 *   - Rear: O(1)
 *   - isEmpty: O(1)
 *   - isFull: O(1)
 *   - size: O(1)
 *   - display: O(n)
 * Space Complexity: O(k) where k is the capacity of the queue
 */
const createCircularQueue = (k) => {
  const capacity = k;
  const queue = new Array(k);
  let head = -1;
  let tail = -1;
  let size = 0;
  
  return {
    // Insert an element into the circular queue
    enQueue(value) {
      if (size === capacity) {
        return false;
      }
      
      if (size === 0) {
        head = 0;
      }
      
      tail = (tail + 1) % capacity;
      queue[tail] = value;
      size++;
      return true;
    },
    
    // Delete an element from the circular queue
    deQueue() {
      if (size === 0) {
        return false;
      }
      
      if (head === tail) {
        // Last element
        head = -1;
        tail = -1;
      } else {
        head = (head + 1) % capacity;
      }
      
      size--;
      return true;
    },
    
    // Get the front item from the queue
    Front() {
      if (size === 0) {
        return -1;
      }
      return queue[head];
    },
    
    // Get the last item from the queue
    Rear() {
      if (size === 0) {
        return -1;
      }
      return queue[tail];
    },
    
    // Check if the queue is empty
    isEmpty() {
      return size === 0;
    },
    
    // Check if the queue is full
    isFull() {
      return size === capacity;
    },
    
    // Get the number of elements in the queue
    getSize() {
      return size;
    },
    
    // Display all elements in the queue
    display() {
      if (size === 0) {
        return [];
      }
      
      const result = [];
      let index = head;
      
      for (let i = 0; i < size; i++) {
        result.push(queue[index]);
        index = (index + 1) % capacity;
      }
      
      return result;
    }
  };
};

/**
 * Approach 4: Circular Queue with Custom Iterator
 * Time Complexity: 
 *   - enQueue: O(1)
 *   - deQueue: O(1)
 *   - Front: O(1)
 *   - Rear: O(1)
 *   - isEmpty: O(1)
 *   - isFull: O(1)
 *   - size: O(1)
 *   - display: O(n)
 * Space Complexity: O(k) where k is the capacity of the queue
 */
class CircularQueueWithIterator {
  constructor(k) {
    this.capacity = k;
    this.queue = new Array(k);
    this.head = -1;
    this.tail = -1;
    this.size = 0;
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
    this.size++;
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
    
    this.size--;
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
    return this.size === 0;
  }
  
  // Check if the queue is full
  isFull() {
    return this.size === this.capacity;
  }
  
  // Get the number of elements in the queue
  getSize() {
    return this.size;
  }
  
  // Display all elements in the queue
  display() {
    if (this.isEmpty()) {
      return [];
    }
    
    const result = [];
    let index = this.head;
    
    for (let i = 0; i < this.size; i++) {
      result.push(this.queue[index]);
      index = (index + 1) % this.capacity;
    }
    
    return result;
  }
  
  // Custom iterator for the queue
  *[Symbol.iterator]() {
    if (this.isEmpty()) {
      return;
    }
    
    let index = this.head;
    for (let i = 0; i < this.size; i++) {
      yield this.queue[index];
      index = (index + 1) % this.capacity;
    }
  }
}

/**
 * Approach 5: Circular Queue with Performance Tracking
 * Time Complexity: 
 *   - enQueue: O(1)
 *   - deQueue: O(1)
 *   - Front: O(1)
 *   - Rear: O(1)
 *   - isEmpty: O(1)
 *   - isFull: O(1)
 *   - size: O(1)
 *   - display: O(n)
 * Space Complexity: O(k) where k is the capacity of the queue
 */
class CircularQueueWithPerformance {
  constructor(k) {
    this.capacity = k;
    this.queue = new Array(k);
    this.head = -1;
    this.tail = -1;
    this.size = 0;
    
    // Performance tracking
    this.operations = 0;
    this.totalTime = 0;
  }
  
  // Insert an element into the circular queue
  enQueue(value) {
    const start = performance.now();
    
    if (this.isFull()) {
      const end = performance.now();
      this.totalTime += (end - start);
      this.operations++;
      return false;
    }
    
    if (this.isEmpty()) {
      this.head = 0;
    }
    
    this.tail = (this.tail + 1) % this.capacity;
    this.queue[this.tail] = value;
    this.size++;
    
    const end = performance.now();
    this.totalTime += (end - start);
    this.operations++;
    return true;
  }
  
  // Delete an element from the circular queue
  deQueue() {
    const start = performance.now();
    
    if (this.isEmpty()) {
      const end = performance.now();
      this.totalTime += (end - start);
      this.operations++;
      return false;
    }
    
    if (this.head === this.tail) {
      // Last element
      this.head = -1;
      this.tail = -1;
    } else {
      this.head = (this.head + 1) % this.capacity;
    }
    
    this.size--;
    
    const end = performance.now();
    this.totalTime += (end - start);
    this.operations++;
    return true;
  }
  
  // Get the front item from the queue
  Front() {
    const start = performance.now();
    
    if (this.isEmpty()) {
      const end = performance.now();
      this.totalTime += (end - start);
      this.operations++;
      return -1;
    }
    
    const result = this.queue[this.head];
    
    const end = performance.now();
    this.totalTime += (end - start);
    this.operations++;
    return result;
  }
  
  // Get the last item from the queue
  Rear() {
    const start = performance.now();
    
    if (this.isEmpty()) {
      const end = performance.now();
      this.totalTime += (end - start);
      this.operations++;
      return -1;
    }
    
    const result = this.queue[this.tail];
    
    const end = performance.now();
    this.totalTime += (end - start);
    this.operations++;
    return result;
  }
  
  // Check if the queue is empty
  isEmpty() {
    const start = performance.now();
    
    const result = this.size === 0;
    
    const end = performance.now();
    this.totalTime += (end - start);
    this.operations++;
    return result;
  }
  
  // Check if the queue is full
  isFull() {
    const start = performance.now();
    
    const result = this.size === this.capacity;
    
    const end = performance.now();
    this.totalTime += (end - start);
    this.operations++;
    return result;
  }
  
  // Get the number of elements in the queue
  getSize() {
    const start = performance.now();
    
    const result = this.size;
    
    const end = performance.now();
    this.totalTime += (end - start);
    this.operations++;
    return result;
  }
  
  // Display all elements in the queue
  display() {
    const start = performance.now();
    
    if (this.isEmpty()) {
      const end = performance.now();
      this.totalTime += (end - start);
      this.operations++;
      return [];
    }
    
    const result = [];
    let index = this.head;
    
    for (let i = 0; i < this.size; i++) {
      result.push(this.queue[index]);
      index = (index + 1) % this.capacity;
    }
    
    const end = performance.now();
    this.totalTime += (end - start);
    this.operations++;
    return result;
  }
  
  // Get performance statistics
  getPerformanceStats() {
    return {
      operations: this.operations,
      totalTime: this.totalTime,
      averageTime: this.operations > 0 ? this.totalTime / this.operations : 0
    };
  }
  
  // Reset performance statistics
  resetPerformanceStats() {
    this.operations = 0;
    this.totalTime = 0;
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
 *   - size: O(1)
 *   - display: O(n)
 * Space Complexity: O(k) where k is the capacity of the queue
 */
class CircularQueueWithGenerator {
  constructor(k) {
    this.capacity = k;
    this.queue = new Array(k);
    this.head = -1;
    this.tail = -1;
    this.size = 0;
  }
  
  // Insert an element into the circular queue
  *enQueue(value) {
    yield { operation: 'enQueue', value, before: this.getQueueState() };
    
    if (this.size === this.capacity) {
      yield { operation: 'enQueue', result: false, reason: 'Queue is full' };
      return false;
    }
    
    if (this.size === 0) {
      this.head = 0;
      yield { operation: 'enQueue', message: 'Queue was empty, setting head to 0' };
    }
    
    this.tail = (this.tail + 1) % this.capacity;
    this.queue[this.tail] = value;
    this.size++;
    
    yield { operation: 'enQueue', value, after: this.getQueueState(), result: true };
    return true;
  }
  
  // Delete an element from the circular queue
  *deQueue() {
    yield { operation: 'deQueue', before: this.getQueueState() };
    
    if (this.size === 0) {
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
    
    this.size--;
    
    yield { operation: 'deQueue', value, after: this.getQueueState(), result: true };
    return true;
  }
  
  // Get the front item from the queue
  *Front() {
    yield { operation: 'Front', queueState: this.getQueueState() };
    
    if (this.size === 0) {
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
    
    if (this.size === 0) {
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
    
    const result = this.size === 0;
    yield { operation: 'isEmpty', result };
    return result;
  }
  
  // Check if the queue is full
  *isFull() {
    yield { operation: 'isFull', queueState: this.getQueueState() };
    
    const result = this.size === this.capacity;
    yield { operation: 'isFull', result };
    return result;
  }
  
  // Get the number of elements in the queue
  *getSize() {
    yield { operation: 'getSize', queueState: this.getQueueState() };
    
    const result = this.size;
    yield { operation: 'getSize', result };
    return result;
  }
  
  // Display all elements in the queue
  *display() {
    yield { operation: 'display', queueState: this.getQueueState() };
    
    if (this.size === 0) {
      yield { operation: 'display', result: [] };
      return [];
    }
    
    const result = [];
    let index = this.head;
    
    for (let i = 0; i < this.size; i++) {
      result.push(this.queue[index]);
      index = (index + 1) % this.capacity;
    }
    
    yield { operation: 'display', result };
    return result;
  }
  
  // Helper method to get current queue state for visualization
  getQueueState() {
    return {
      queue: [...this.queue],
      head: this.head,
      tail: this.tail,
      size: this.size,
      capacity: this.capacity
    };
  }
}

// Example usage and test cases
if (typeof window === 'undefined') {  // Node.js environment
  console.log('=== Testing Circular Queue Implementation ===');
  
  // Test with basic implementation
  console.log('\n--- Testing Basic Circular Queue Implementation ---');
  const queue1 = new CircularQueueBasic(3);
  console.log('Enqueue 1:', queue1.enQueue(1)); // true
  console.log('Enqueue 2:', queue1.enQueue(2)); // true
  console.log('Enqueue 3:', queue1.enQueue(3)); // true
  console.log('Enqueue 4:', queue1.enQueue(4)); // false
  console.log('Rear:', queue1.Rear()); // 3
  console.log('Is Full:', queue1.isFull()); // true
  console.log('Dequeue:', queue1.deQueue()); // true
  console.log('Enqueue 4:', queue1.enQueue(4)); // true
  console.log('Rear:', queue1.Rear()); // 4
  console.log('Display:', queue1.display()); // [2, 3, 4]
  
  // Test with Map-based implementation
  console.log('\n--- Testing Map-based Circular Queue Implementation ---');
  const queue2 = new CircularQueueWithMap(3);
  console.log('Enqueue 1:', queue2.enQueue(1)); // true
  console.log('Enqueue 2:', queue2.enQueue(2)); // true
  console.log('Enqueue 3:', queue2.enQueue(3)); // true
  console.log('Enqueue 4:', queue2.enQueue(4)); // false
  console.log('Rear:', queue2.Rear()); // 3
  console.log('Is Full:', queue2.isFull()); // true
  console.log('Dequeue:', queue2.deQueue()); // true
  console.log('Enqueue 4:', queue2.enQueue(4)); // true
  console.log('Rear:', queue2.Rear()); // 4
  console.log('Display:', queue2.display()); // [2, 3, 4]
  
  // Test with functional implementation
  console.log('\n--- Testing Functional Circular Queue Implementation ---');
  const queue3 = createCircularQueue(3);
  console.log('Enqueue 1:', queue3.enQueue(1)); // true
  console.log('Enqueue 2:', queue3.enQueue(2)); // true
  console.log('Enqueue 3:', queue3.enQueue(3)); // true
  console.log('Enqueue 4:', queue3.enQueue(4)); // false
  console.log('Rear:', queue3.Rear()); // 3
  console.log('Is Full:', queue3.isFull()); // true
  console.log('Dequeue:', queue3.deQueue()); // true
  console.log('Enqueue 4:', queue3.enQueue(4)); // true
  console.log('Rear:', queue3.Rear()); // 4
  console.log('Display:', queue3.display()); // [2, 3, 4]
  
  // Test with iterator implementation
  console.log('\n--- Testing Iterator Circular Queue Implementation ---');
  const queue4 = new CircularQueueWithIterator(3);
  queue4.enQueue(1);
  queue4.enQueue(2);
  queue4.enQueue(3);
  console.log('Iterator:');
  for (const item of queue4) {
    console.log('  ', item);
  }
  
  // Test with performance tracking implementation
  console.log('\n--- Testing Performance Tracking Circular Queue Implementation ---');
  const queue5 = new CircularQueueWithPerformance(3);
  queue5.enQueue(1);
  queue5.enQueue(2);
  queue5.enQueue(3);
  queue5.deQueue();
  queue5.enQueue(4);
  console.log('Performance Stats:', queue5.getPerformanceStats());
  
  // Test with generator implementation
  console.log('\n--- Testing Generator Circular Queue Implementation ---');
  const queue6 = new CircularQueueWithGenerator(3);
  
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
  
  console.log('Display operation:');
  await runGenerator(queue6.display());
  
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
  performanceTest(CircularQueueBasic, 'Basic Circular Queue', testCapacity, testOperations);
  performanceTest(CircularQueueWithMap, 'Map-based Circular Queue', testCapacity, testOperations);
  performanceTest(CircularQueueWithPerformance, 'Performance Tracking Circular Queue', testCapacity, testOperations);
}

// Export classes for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    CircularQueueBasic,
    CircularQueueWithMap,
    createCircularQueue,
    CircularQueueWithIterator,
    CircularQueueWithPerformance,
    CircularQueueWithGenerator
  };
}
