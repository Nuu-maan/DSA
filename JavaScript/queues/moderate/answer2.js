// Implement Queue using Stacks

/**
 * Approach 1: Two-Stack Implementation (Enqueue Heavy)
 * Time Complexity: 
 *   - push: O(n) - where n is the number of elements in the queue
 *   - pop: O(1)
 *   - peek: O(1)
 *   - empty: O(1)
 * Space Complexity: O(n) where n is the number of elements in the queue
 */
class MyQueueApproach1 {
  constructor() {
    this.stack1 = []; // Main stack
    this.stack2 = []; // Temporary stack
  }
  
  // Push element x to the back of queue
  push(x) {
    // Move all elements from stack1 to stack2
    while (this.stack1.length > 0) {
      this.stack2.push(this.stack1.pop());
    }
    
    // Push the new element to stack1
    this.stack1.push(x);
    
    // Move all elements back to stack1
    while (this.stack2.length > 0) {
      this.stack1.push(this.stack2.pop());
    }
  }
  
  // Removes the element from the front of queue and returns it
  pop() {
    if (this.empty()) {
      return null;
    }
    return this.stack1.pop();
  }
  
  // Get the front element
  peek() {
    if (this.empty()) {
      return null;
    }
    return this.stack1[this.stack1.length - 1];
  }
  
  // Return whether the queue is empty
  empty() {
    return this.stack1.length === 0;
  }
}

/**
 * Approach 2: Two-Stack Implementation (Dequeue Heavy)
 * Time Complexity: 
 *   - push: O(1)
 *   - pop: Amortized O(1)
 *   - peek: Amortized O(1)
 *   - empty: O(1)
 * Space Complexity: O(n) where n is the number of elements in the queue
 */
class MyQueueApproach2 {
  constructor() {
    this.inputStack = [];  // For enqueue operations
    this.outputStack = []; // For dequeue operations
  }
  
  // Push element x to the back of queue
  push(x) {
    this.inputStack.push(x);
  }
  
  // Removes the element from the front of queue and returns it
  pop() {
    this.peek(); // Ensure output stack has the elements
    return this.outputStack.pop();
  }
  
  // Get the front element
  peek() {
    if (this.outputStack.length === 0) {
      // Move all elements from inputStack to outputStack
      while (this.inputStack.length > 0) {
        this.outputStack.push(this.inputStack.pop());
      }
    }
    
    if (this.outputStack.length === 0) {
      return null;
    }
    
    return this.outputStack[this.outputStack.length - 1];
  }
  
  // Return whether the queue is empty
  empty() {
    return this.inputStack.length === 0 && this.outputStack.length === 0;
  }
}

/**
 * Approach 3: Functional Implementation using Factory Function
 * Time Complexity: 
 *   - push: O(1)
 *   - pop: Amortized O(1)
 *   - peek: Amortized O(1)
 *   - empty: O(1)
 * Space Complexity: O(n) where n is the number of elements in the queue
 */
const createMyQueue = () => {
  const inputStack = [];
  const outputStack = [];
  
  return {
    // Push element x to the back of queue
    push(x) {
      inputStack.push(x);
    },
    
    // Removes the element from the front of queue and returns it
    pop() {
      // Ensure output stack has the elements
      if (outputStack.length === 0) {
        // Move all elements from inputStack to outputStack
        while (inputStack.length > 0) {
          outputStack.push(inputStack.pop());
        }
      }
      
      return outputStack.pop();
    },
    
    // Get the front element
    peek() {
      if (outputStack.length === 0) {
        // Move all elements from inputStack to outputStack
        while (inputStack.length > 0) {
          outputStack.push(inputStack.pop());
        }
      }
      
      if (outputStack.length === 0) {
        return null;
      }
      
      return outputStack[outputStack.length - 1];
    },
    
    // Return whether the queue is empty
    empty() {
      return inputStack.length === 0 && outputStack.length === 0;
    }
  };
};

/**
 * Approach 4: Implementation using Map for Element Tracking
 * Time Complexity: 
 *   - push: O(1)
 *   - pop: Amortized O(1)
 *   - peek: Amortized O(1)
 *   - empty: O(1)
 * Space Complexity: O(n) where n is the number of elements in the queue
 */
class MyQueueWithMap {
  constructor() {
    this.inputStack = new Map();
    this.outputStack = new Map();
    this.inputTop = -1;
    this.outputTop = -1;
  }
  
  // Push element x to the back of queue
  push(x) {
    this.inputTop++;
    this.inputStack.set(this.inputTop, x);
  }
  
  // Removes the element from the front of queue and returns it
  pop() {
    this.peek(); // Ensure output stack has the elements
    
    if (this.outputTop === -1) {
      return null;
    }
    
    const value = this.outputStack.get(this.outputTop);
    this.outputStack.delete(this.outputTop);
    this.outputTop--;
    return value;
  }
  
  // Get the front element
  peek() {
    if (this.outputTop === -1) {
      // Move all elements from inputStack to outputStack
      while (this.inputTop >= 0) {
        const value = this.inputStack.get(this.inputTop);
        this.inputStack.delete(this.inputTop);
        this.inputTop--;
        
        this.outputTop++;
        this.outputStack.set(this.outputTop, value);
      }
    }
    
    if (this.outputTop === -1) {
      return null;
    }
    
    return this.outputStack.get(this.outputTop);
  }
  
  // Return whether the queue is empty
  empty() {
    return this.inputTop === -1 && this.outputTop === -1;
  }
}

/**
 * Approach 5: Queue Implementation with Custom Iterator
 * Time Complexity: 
 *   - push: O(1)
 *   - pop: Amortized O(1)
 *   - peek: Amortized O(1)
 *   - empty: O(1)
 * Space Complexity: O(n) where n is the number of elements in the queue
 */
class MyQueueWithIterator {
  constructor() {
    this.inputStack = [];
    this.outputStack = [];
  }
  
  // Push element x to the back of queue
  push(x) {
    this.inputStack.push(x);
  }
  
  // Removes the element from the front of queue and returns it
  pop() {
    this.peek(); // Ensure output stack has the elements
    return this.outputStack.pop();
  }
  
  // Get the front element
  peek() {
    if (this.outputStack.length === 0) {
      // Move all elements from inputStack to outputStack
      while (this.inputStack.length > 0) {
        this.outputStack.push(this.inputStack.pop());
      }
    }
    
    if (this.outputStack.length === 0) {
      return null;
    }
    
    return this.outputStack[this.outputStack.length - 1];
  }
  
  // Return whether the queue is empty
  empty() {
    return this.inputStack.length === 0 && this.outputStack.length === 0;
  }
  
  // Custom iterator for the queue
  *[Symbol.iterator]() {
    // Create a copy of both stacks to avoid modifying the original
    const inputCopy = [...this.inputStack];
    const outputCopy = [...this.outputStack];
    
    // First yield elements from output stack (in correct order)
    for (let i = outputCopy.length - 1; i >= 0; i--) {
      yield outputCopy[i];
    }
    
    // Then yield elements from input stack (in reverse order)
    for (let i = 0; i < inputCopy.length; i++) {
      yield inputCopy[i];
    }
  }
}

/**
 * Approach 6: Generator-based Queue Implementation with Step-by-Step Visualization
 * Time Complexity: 
 *   - push: O(1)
 *   - pop: Amortized O(1)
 *   - peek: Amortized O(1)
 *   - empty: O(1)
 * Space Complexity: O(n) where n is the number of elements in the queue
 */
class MyQueueWithGenerator {
  constructor() {
    this.inputStack = [];
    this.outputStack = [];
  }
  
  // Push element x to the back of queue
  *push(x) {
    yield { operation: 'push', element: x, before: this.getQueueState() };
    this.inputStack.push(x);
    yield { operation: 'push', element: x, after: this.getQueueState() };
  }
  
  // Removes the element from the front of queue and returns it
  *pop() {
    yield { operation: 'pop', before: this.getQueueState() };
    
    // Ensure output stack has the elements
    yield* this.peekInternal();
    
    if (this.outputStack.length === 0) {
      yield { operation: 'pop', result: null, reason: 'Queue is empty' };
      return null;
    }
    
    const value = this.outputStack.pop();
    yield { operation: 'pop', value, after: this.getQueueState() };
    return value;
  }
  
  // Get the front element
  *peek() {
    yield { operation: 'peek', before: this.getQueueState() };
    
    yield* this.peekInternal();
    
    if (this.outputStack.length === 0) {
      yield { operation: 'peek', result: null, reason: 'Queue is empty' };
      return null;
    }
    
    const value = this.outputStack[this.outputStack.length - 1];
    yield { operation: 'peek', result: value };
    return value;
  }
  
  // Internal helper for peek operation
  *peekInternal() {
    if (this.outputStack.length === 0) {
      yield { operation: 'peekInternal', message: 'Moving elements from input to output stack' };
      // Move all elements from inputStack to outputStack
      while (this.inputStack.length > 0) {
        const value = this.inputStack.pop();
        this.outputStack.push(value);
        yield { operation: 'peekInternal', moved: value, inputStack: [...this.inputStack], outputStack: [...this.outputStack] };
      }
    }
  }
  
  // Return whether the queue is empty
  *empty() {
    yield { operation: 'empty', queueState: this.getQueueState() };
    
    const result = this.inputStack.length === 0 && this.outputStack.length === 0;
    yield { operation: 'empty', result };
    return result;
  }
  
  // Helper method to get current queue state for visualization
  getQueueState() {
    return {
      inputStack: [...this.inputStack],
      outputStack: [...this.outputStack]
    };
  }
}

// Example usage and test cases
if (typeof window === 'undefined') {  // Node.js environment
  console.log('=== Testing Queue Implementation using Stacks ===');
  
  // Test with approach 1
  console.log('\n--- Testing Approach 1: Two-Stack Implementation (Enqueue Heavy) ---');
  const queue1 = new MyQueueApproach1();
  queue1.push(1);
  queue1.push(2);
  console.log('Peek:', queue1.peek()); // 1
  console.log('Pop:', queue1.pop()); // 1
  console.log('Empty:', queue1.empty()); // false
  
  // Test with approach 2
  console.log('\n--- Testing Approach 2: Two-Stack Implementation (Dequeue Heavy) ---');
  const queue2 = new MyQueueApproach2();
  queue2.push(1);
  queue2.push(2);
  console.log('Peek:', queue2.peek()); // 1
  console.log('Pop:', queue2.pop()); // 1
  console.log('Empty:', queue2.empty()); // false
  
  // Test with functional approach
  console.log('\n--- Testing Functional Implementation ---');
  const queue3 = createMyQueue();
  queue3.push(1);
  queue3.push(2);
  console.log('Peek:', queue3.peek()); // 1
  console.log('Pop:', queue3.pop()); // 1
  console.log('Empty:', queue3.empty()); // false
  
  // Test with Map-based approach
  console.log('\n--- Testing Map-based Implementation ---');
  const queue4 = new MyQueueWithMap();
  queue4.push(1);
  queue4.push(2);
  console.log('Peek:', queue4.peek()); // 1
  console.log('Pop:', queue4.pop()); // 1
  console.log('Empty:', queue4.empty()); // false
  
  // Test with iterator approach
  console.log('\n--- Testing Iterator Implementation ---');
  const queue5 = new MyQueueWithIterator();
  queue5.push(1);
  queue5.push(2);
  queue5.push(3);
  console.log('Iterator:');
  for (const item of queue5) {
    console.log('  ', item);
  }
  
  // Test with generator approach
  console.log('\n--- Testing Generator Implementation ---');
  const queue6 = new MyQueueWithGenerator();
  
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
  console.log('Push operations:');
  await runGenerator(queue6.push(1));
  await runGenerator(queue6.push(2));
  
  console.log('Peek operation:');
  await runGenerator(queue6.peek());
  
  console.log('Pop operation:');
  await runGenerator(queue6.pop());
  
  console.log('Empty operation:');
  await runGenerator(queue6.empty());
  
  // Performance comparison utility
  const performanceTest = (QueueClass, name, operations) => {
    const start = performance.now();
    const queue = new QueueClass();
    
    // Enqueue operations
    for (let i = 0; i < operations; i++) {
      queue.push(i);
    }
    
    // Dequeue operations
    for (let i = 0; i < operations; i++) {
      queue.pop();
    }
    
    const end = performance.now();
    console.log(`${name}: ${end - start}ms for ${operations} operations`);
  };
  
  // Run performance tests
  console.log('\n=== Performance Comparison ===');
  const testOperations = 10000;
  performanceTest(MyQueueApproach1, 'Approach 1 - Enqueue Heavy', testOperations);
  performanceTest(MyQueueApproach2, 'Approach 2 - Dequeue Heavy', testOperations);
  performanceTest(MyQueueWithMap, 'Map-based Implementation', testOperations);
}

// Export classes for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    MyQueueApproach1,
    MyQueueApproach2,
    createMyQueue,
    MyQueueWithMap,
    MyQueueWithIterator,
    MyQueueWithGenerator
  };
}
