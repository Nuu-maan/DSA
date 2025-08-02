// Implement a Queue using an Array

/**
 * Approach 1: Basic Queue Implementation using Array
 * Time Complexity: 
 *   - enqueue: O(1)
 *   - dequeue: O(n) - due to shifting elements
 *   - front: O(1)
 *   - isEmpty: O(1)
 *   - size: O(1)
 * Space Complexity: O(n) where n is the number of elements in the queue
 */
class QueueBasic {
  constructor() {
    this.items = [];
  }
  
  // Add an element to the rear of the queue
  enqueue(element) {
    this.items.push(element);
  }
  
  // Remove and return the element from the front of the queue
  dequeue() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items.shift(); // O(n) operation
  }
  
  // Return the element at the front without removing it
  front() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items[0];
  }
  
  // Check if the queue is empty
  isEmpty() {
    return this.items.length === 0;
  }
  
  // Return the number of elements in the queue
  size() {
    return this.items.length;
  }
  
  // Display all elements in the queue
  display() {
    return [...this.items]; // Return a copy to prevent direct manipulation
  }
}

/**
 * Approach 2: Optimized Queue Implementation using Array with Front Pointer
 * Time Complexity: 
 *   - enqueue: O(1)
 *   - dequeue: O(1) amortized
 *   - front: O(1)
 *   - isEmpty: O(1)
 *   - size: O(1)
 * Space Complexity: O(n) where n is the number of elements in the queue
 */
class QueueOptimized {
  constructor() {
    this.items = [];
    this.frontIndex = 0;
    this.rearIndex = 0;
  }
  
  // Add an element to the rear of the queue
  enqueue(element) {
    this.items[this.rearIndex] = element;
    this.rearIndex++;
  }
  
  // Remove and return the element from the front of the queue
  dequeue() {
    if (this.isEmpty()) {
      return null;
    }
    
    const item = this.items[this.frontIndex];
    delete this.items[this.frontIndex]; // Optional: free up memory
    this.frontIndex++;
    
    // Reset indices when queue becomes empty to prevent index overflow
    if (this.frontIndex === this.rearIndex) {
      this.frontIndex = 0;
      this.rearIndex = 0;
      this.items = [];
    }
    
    return item;
  }
  
  // Return the element at the front without removing it
  front() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items[this.frontIndex];
  }
  
  // Check if the queue is empty
  isEmpty() {
    return this.frontIndex === this.rearIndex;
  }
  
  // Return the number of elements in the queue
  size() {
    return this.rearIndex - this.frontIndex;
  }
  
  // Display all elements in the queue
  display() {
    const result = [];
    for (let i = this.frontIndex; i < this.rearIndex; i++) {
      result.push(this.items[i]);
    }
    return result;
  }
}

/**
 * Approach 3: Functional Queue Implementation using Factory Function
 * Time Complexity: 
 *   - enqueue: O(1)
 *   - dequeue: O(n) - due to shifting elements
 *   - front: O(1)
 *   - isEmpty: O(1)
 *   - size: O(1)
 * Space Complexity: O(n) where n is the number of elements in the queue
 */
const createQueue = () => {
  const items = [];
  
  return {
    // Add an element to the rear of the queue
    enqueue(element) {
      items.push(element);
    },
    
    // Remove and return the element from the front of the queue
    dequeue() {
      if (items.length === 0) {
        return null;
      }
      return items.shift();
    },
    
    // Return the element at the front without removing it
    front() {
      if (items.length === 0) {
        return null;
      }
      return items[0];
    },
    
    // Check if the queue is empty
    isEmpty() {
      return items.length === 0;
    },
    
    // Return the number of elements in the queue
    size() {
      return items.length;
    },
    
    // Display all elements in the queue
    display() {
      return [...items];
    }
  };
};

/**
 * Approach 4: Queue Implementation using Map for Element Tracking
 * Time Complexity: 
 *   - enqueue: O(1)
 *   - dequeue: O(1)
 *   - front: O(1)
 *   - isEmpty: O(1)
 *   - size: O(1)
 * Space Complexity: O(n) where n is the number of elements in the queue
 */
class QueueWithMap {
  constructor() {
    this.items = new Map();
    this.frontIndex = 0;
    this.rearIndex = 0;
  }
  
  // Add an element to the rear of the queue
  enqueue(element) {
    this.items.set(this.rearIndex, element);
    this.rearIndex++;
  }
  
  // Remove and return the element from the front of the queue
  dequeue() {
    if (this.isEmpty()) {
      return null;
    }
    
    const item = this.items.get(this.frontIndex);
    this.items.delete(this.frontIndex);
    this.frontIndex++;
    
    // Reset indices when queue becomes empty
    if (this.frontIndex === this.rearIndex) {
      this.frontIndex = 0;
      this.rearIndex = 0;
      this.items.clear();
    }
    
    return item;
  }
  
  // Return the element at the front without removing it
  front() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items.get(this.frontIndex);
  }
  
  // Check if the queue is empty
  isEmpty() {
    return this.frontIndex === this.rearIndex;
  }
  
  // Return the number of elements in the queue
  size() {
    return this.rearIndex - this.frontIndex;
  }
  
  // Display all elements in the queue
  display() {
    const result = [];
    for (let i = this.frontIndex; i < this.rearIndex; i++) {
      result.push(this.items.get(i));
    }
    return result;
  }
}

/**
 * Approach 5: Queue Implementation with Custom Iterator
 * Time Complexity: 
 *   - enqueue: O(1)
 *   - dequeue: O(n) - due to shifting elements
 *   - front: O(1)
 *   - isEmpty: O(1)
 *   - size: O(1)
 * Space Complexity: O(n) where n is the number of elements in the queue
 */
class QueueWithIterator {
  constructor() {
    this.items = [];
  }
  
  // Add an element to the rear of the queue
  enqueue(element) {
    this.items.push(element);
  }
  
  // Remove and return the element from the front of the queue
  dequeue() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items.shift();
  }
  
  // Return the element at the front without removing it
  front() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items[0];
  }
  
  // Check if the queue is empty
  isEmpty() {
    return this.items.length === 0;
  }
  
  // Return the number of elements in the queue
  size() {
    return this.items.length;
  }
  
  // Display all elements in the queue
  display() {
    return [...this.items];
  }
  
  // Custom iterator for the queue
  *[Symbol.iterator]() {
    for (let i = 0; i < this.items.length; i++) {
      yield this.items[i];
    }
  }
}

/**
 * Approach 6: Generator-based Queue Implementation with Step-by-Step Visualization
 * Time Complexity: 
 *   - enqueue: O(1)
 *   - dequeue: O(n) - due to shifting elements
 *   - front: O(1)
 *   - isEmpty: O(1)
 *   - size: O(1)
 * Space Complexity: O(n) where n is the number of elements in the queue
 */
class QueueWithGenerator {
  constructor() {
    this.items = [];
  }
  
  // Add an element to the rear of the queue
  *enqueue(element) {
    yield { operation: 'enqueue', element, before: [...this.items] };
    this.items.push(element);
    yield { operation: 'enqueue', element, after: [...this.items] };
  }
  
  // Remove and return the element from the front of the queue
  *dequeue() {
    yield { operation: 'dequeue', before: [...this.items] };
    if (this.isEmpty()) {
      yield { operation: 'dequeue', result: null };
      return null;
    }
    const item = this.items.shift();
    yield { operation: 'dequeue', result: item, after: [...this.items] };
    return item;
  }
  
  // Return the element at the front without removing it
  *front() {
    yield { operation: 'front', queue: [...this.items] };
    if (this.isEmpty()) {
      yield { operation: 'front', result: null };
      return null;
    }
    const item = this.items[0];
    yield { operation: 'front', result: item };
    return item;
  }
  
  // Check if the queue is empty
  *isEmpty() {
    yield { operation: 'isEmpty', queue: [...this.items] };
    const result = this.items.length === 0;
    yield { operation: 'isEmpty', result };
    return result;
  }
  
  // Return the number of elements in the queue
  *size() {
    yield { operation: 'size', queue: [...this.items] };
    const result = this.items.length;
    yield { operation: 'size', result };
    return result;
  }
  
  // Display all elements in the queue
  *display() {
    yield { operation: 'display', queue: [...this.items] };
    const result = [...this.items];
    yield { operation: 'display', result };
    return result;
  }
}

// Example usage and test cases
if (typeof window === 'undefined') {  // Node.js environment
  console.log('=== Testing Queue Implementation ===');
  
  // Test with basic implementation
  console.log('\n--- Testing Basic Queue Implementation ---');
  const queue1 = new QueueBasic();
  queue1.enqueue(1);
  queue1.enqueue(2);
  queue1.enqueue(3);
  console.log('Front:', queue1.front()); // 1
  console.log('Dequeue:', queue1.dequeue()); // 1
  console.log('Size:', queue1.size()); // 2
  console.log('Display:', queue1.display()); // [2, 3]
  
  // Test with optimized implementation
  console.log('\n--- Testing Optimized Queue Implementation ---');
  const queue2 = new QueueOptimized();
  queue2.enqueue(1);
  queue2.enqueue(2);
  queue2.enqueue(3);
  console.log('Front:', queue2.front()); // 1
  console.log('Dequeue:', queue2.dequeue()); // 1
  console.log('Size:', queue2.size()); // 2
  console.log('Display:', queue2.display()); // [2, 3]
  
  // Test with functional implementation
  console.log('\n--- Testing Functional Queue Implementation ---');
  const queue3 = createQueue();
  queue3.enqueue(1);
  queue3.enqueue(2);
  queue3.enqueue(3);
  console.log('Front:', queue3.front()); // 1
  console.log('Dequeue:', queue3.dequeue()); // 1
  console.log('Size:', queue3.size()); // 2
  console.log('Display:', queue3.display()); // [2, 3]
  
  // Test with Map-based implementation
  console.log('\n--- Testing Map-based Queue Implementation ---');
  const queue4 = new QueueWithMap();
  queue4.enqueue(1);
  queue4.enqueue(2);
  queue4.enqueue(3);
  console.log('Front:', queue4.front()); // 1
  console.log('Dequeue:', queue4.dequeue()); // 1
  console.log('Size:', queue4.size()); // 2
  console.log('Display:', queue4.display()); // [2, 3]
  
  // Test with iterator implementation
  console.log('\n--- Testing Iterator Queue Implementation ---');
  const queue5 = new QueueWithIterator();
  queue5.enqueue(1);
  queue5.enqueue(2);
  queue5.enqueue(3);
  console.log('Front:', queue5.front()); // 1
  console.log('Dequeue:', queue5.dequeue()); // 1
  console.log('Size:', queue5.size()); // 2
  console.log('Display:', queue5.display()); // [2, 3]
  console.log('Iterator:');
  for (const item of queue5) {
    console.log('  ', item);
  }
  
  // Test with generator implementation
  console.log('\n--- Testing Generator Queue Implementation ---');
  const queue6 = new QueueWithGenerator();
  
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
  
  // Test enqueue
  console.log('Enqueue operations:');
  await runGenerator(queue6.enqueue(1));
  await runGenerator(queue6.enqueue(2));
  await runGenerator(queue6.enqueue(3));
  
  console.log('Front operation:');
  await runGenerator(queue6.front());
  
  console.log('Dequeue operation:');
  await runGenerator(queue6.dequeue());
  
  console.log('Size operation:');
  await runGenerator(queue6.size());
  
  console.log('Display operation:');
  await runGenerator(queue6.display());
  
  // Performance comparison utility
  const performanceTest = (QueueClass, name, operations) => {
    const start = performance.now();
    const queue = new QueueClass();
    
    for (let i = 0; i < operations; i++) {
      queue.enqueue(i);
    }
    
    for (let i = 0; i < operations; i++) {
      queue.dequeue();
    }
    
    const end = performance.now();
    console.log(`${name}: ${end - start}ms for ${operations} operations`);
  };
  
  // Run performance tests
  console.log('\n=== Performance Comparison ===');
  const testOperations = 10000;
  performanceTest(QueueBasic, 'Basic Queue', testOperations);
  performanceTest(QueueOptimized, 'Optimized Queue', testOperations);
  performanceTest(QueueWithMap, 'Map-based Queue', testOperations);
}

// Export classes for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    QueueBasic,
    QueueOptimized,
    createQueue,
    QueueWithMap,
    QueueWithIterator,
    QueueWithGenerator
  };
}
