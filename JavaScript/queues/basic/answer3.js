// Queue Operations - Reverse First K Elements

/**
 * Approach 1: Basic Implementation using Stack
 * Time Complexity: O(n + k) where n is the size of the queue and k is the number of elements to reverse
 * Space Complexity: O(k) for the temporary stack
 */
function reverseFirstKApproach1(queue, k) {
  if (k <= 0 || k > queue.length) {
    return queue;
  }
  
  // Create a temporary stack to store first k elements
  const stack = [];
  
  // Dequeue first k elements and push them to stack
  for (let i = 0; i < k; i++) {
    stack.push(queue.shift());
  }
  
  // Pop elements from stack and enqueue them back to queue
  while (stack.length > 0) {
    queue.push(stack.pop());
  }
  
  // Dequeue remaining elements and enqueue them back
  for (let i = 0; i < queue.length - k; i++) {
    queue.push(queue.shift());
  }
  
  return queue;
}

/**
 * Approach 2: Using Array Methods and Slice
 * Time Complexity: O(n) where n is the size of the queue
 * Space Complexity: O(n) for creating new arrays
 */
function reverseFirstKApproach2(queue, k) {
  if (k <= 0 || k > queue.length) {
    return queue;
  }
  
  // Extract first k elements and reverse them
  const firstK = queue.slice(0, k).reverse();
  
  // Extract remaining elements
  const remaining = queue.slice(k);
  
  // Combine reversed first k elements with remaining elements
  return [...firstK, ...remaining];
}

/**
 * Approach 3: Using Recursion
 * Time Complexity: O(n + k) where n is the size of the queue and k is the number of elements to reverse
 * Space Complexity: O(k) for the recursion stack
 */
function reverseFirstKApproach3(queue, k) {
  if (k <= 0 || k > queue.length) {
    return queue;
  }
  
  // Helper function to reverse first k elements using recursion
  function reverseKElements(q, count) {
    // Base case
    if (count === 0) {
      return;
    }
    
    // Remove the front element
    const element = q.shift();
    
    // Recursively reverse the remaining elements
    reverseKElements(q, count - 1);
    
    // Add the removed element to the rear
    q.push(element);
  }
  
  // Reverse first k elements
  reverseKElements(queue, k);
  
  // Move remaining elements to the rear
  for (let i = 0; i < queue.length - k; i++) {
    queue.push(queue.shift());
  }
  
  return queue;
}

/**
 * Approach 4: Using Custom Queue Class with Stack
 * Time Complexity: O(n + k) where n is the size of the queue and k is the number of elements to reverse
 * Space Complexity: O(k) for the temporary stack
 */
class QueueWithReverse {
  constructor() {
    this.items = [];
  }
  
  enqueue(element) {
    this.items.push(element);
  }
  
  dequeue() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items.shift();
  }
  
  front() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items[0];
  }
  
  isEmpty() {
    return this.items.length === 0;
  }
  
  size() {
    return this.items.length;
  }
  
  display() {
    return [...this.items];
  }
  
  // Reverse first k elements
  reverseFirstK(k) {
    if (k <= 0 || k > this.items.length) {
      return this.items;
    }
    
    // Create a temporary stack
    const stack = [];
    
    // Dequeue first k elements and push them to stack
    for (let i = 0; i < k; i++) {
      stack.push(this.dequeue());
    }
    
    // Pop elements from stack and enqueue them back
    while (stack.length > 0) {
      this.enqueue(stack.pop());
    }
    
    // Dequeue remaining elements and enqueue them back
    for (let i = 0; i < this.size() - k; i++) {
      this.enqueue(this.dequeue());
    }
    
    return this.items;
  }
}

/**
 * Approach 5: Functional Approach with Reduce
 * Time Complexity: O(n) where n is the size of the queue
 * Space Complexity: O(n) for creating new arrays
 */
const reverseFirstKApproach5 = (queue, k) => {
  if (k <= 0 || k > queue.length) {
    return queue;
  }
  
  return [
    ...queue.slice(0, k).reduce((acc, _, i) => [queue[k - 1 - i], ...acc], []),
    ...queue.slice(k)
  ];
};

/**
 * Approach 6: Generator-based Implementation with Step-by-Step Visualization
 * Time Complexity: O(n + k) where n is the size of the queue and k is the number of elements to reverse
 * Space Complexity: O(k) for the temporary stack
 */
function* reverseFirstKGenerator(queue, k) {
  yield { operation: 'start', queue: [...queue], k };
  
  if (k <= 0 || k > queue.length) {
    yield { operation: 'invalid_k', result: [...queue] };
    return queue;
  }
  
  // Create a temporary stack
  const stack = [];
  yield { operation: 'created_stack', stack: [...stack] };
  
  // Dequeue first k elements and push them to stack
  for (let i = 0; i < k; i++) {
    const element = queue.shift();
    stack.push(element);
    yield { operation: 'move_to_stack', element, stack: [...stack], queue: [...queue] };
  }
  
  // Pop elements from stack and enqueue them back
  while (stack.length > 0) {
    const element = stack.pop();
    queue.push(element);
    yield { operation: 'move_back_to_queue', element, stack: [...stack], queue: [...queue] };
  }
  
  // Dequeue remaining elements and enqueue them back
  const remaining = queue.length - k;
  yield { operation: 'moving_remaining', count: remaining };
  
  for (let i = 0; i < remaining; i++) {
    const element = queue.shift();
    queue.push(element);
    yield { operation: 'move_remaining', element, queue: [...queue] };
  }
  
  yield { operation: 'complete', result: [...queue] };
  return queue;
}

// Example usage and test cases
if (typeof window === 'undefined') {  // Node.js environment
  console.log('=== Testing Reverse First K Elements Implementation ===');
  
  // Test with approach 1
  console.log('\n--- Testing Approach 1: Basic Implementation using Stack ---');
  const queue1 = [1, 2, 3, 4, 5];
  console.log('Original queue:', queue1);
  console.log('Reverse first 3 elements:', reverseFirstKApproach1([...queue1], 3)); // [3, 2, 1, 4, 5]
  console.log('Reverse first 1 element:', reverseFirstKApproach1([...queue1], 1)); // [1, 2, 3, 4, 5]
  console.log('Reverse first 5 elements:', reverseFirstKApproach1([...queue1], 5)); // [5, 4, 3, 2, 1]
  
  // Test with approach 2
  console.log('\n--- Testing Approach 2: Using Array Methods and Slice ---');
  const queue2 = [1, 2, 3, 4, 5];
  console.log('Original queue:', queue2);
  console.log('Reverse first 3 elements:', reverseFirstKApproach2([...queue2], 3)); // [3, 2, 1, 4, 5]
  console.log('Reverse first 1 element:', reverseFirstKApproach2([...queue2], 1)); // [1, 2, 3, 4, 5]
  console.log('Reverse first 5 elements:', reverseFirstKApproach2([...queue2], 5)); // [5, 4, 3, 2, 1]
  
  // Test with approach 3
  console.log('\n--- Testing Approach 3: Using Recursion ---');
  const queue3 = [1, 2, 3, 4, 5];
  console.log('Original queue:', queue3);
  console.log('Reverse first 3 elements:', reverseFirstKApproach3([...queue3], 3)); // [3, 2, 1, 4, 5]
  console.log('Reverse first 1 element:', reverseFirstKApproach3([...queue3], 1)); // [1, 2, 3, 4, 5]
  console.log('Reverse first 5 elements:', reverseFirstKApproach3([...queue3], 5)); // [5, 4, 3, 2, 1]
  
  // Test with approach 4
  console.log('\n--- Testing Approach 4: Using Custom Queue Class with Stack ---');
  const queue4 = new QueueWithReverse();
  [1, 2, 3, 4, 5].forEach(item => queue4.enqueue(item));
  console.log('Original queue:', queue4.display());
  console.log('Reverse first 3 elements:', queue4.reverseFirstK(3)); // [3, 2, 1, 4, 5]
  
  // Test with approach 5
  console.log('\n--- Testing Approach 5: Functional Approach with Reduce ---');
  const queue5 = [1, 2, 3, 4, 5];
  console.log('Original queue:', queue5);
  console.log('Reverse first 3 elements:', reverseFirstKApproach5([...queue5], 3)); // [3, 2, 1, 4, 5]
  console.log('Reverse first 1 element:', reverseFirstKApproach5([...queue5], 1)); // [1, 2, 3, 4, 5]
  console.log('Reverse first 5 elements:', reverseFirstKApproach5([...queue5], 5)); // [5, 4, 3, 2, 1]
  
  // Test with approach 6
  console.log('\n--- Testing Approach 6: Generator-based Implementation ---');
  const queue6 = [1, 2, 3, 4, 5];
  
  // Run generator
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
  
  console.log('Reverse first 3 elements:');
  await runGenerator(reverseFirstKGenerator([...queue6], 3));
  
  // Performance comparison utility
  const performanceTest = (func, name, queueSize, k) => {
    const queue = Array.from({ length: queueSize }, (_, i) => i + 1);
    
    const start = performance.now();
    func([...queue], k);
    const end = performance.now();
    
    console.log(`${name}: ${end - start}ms for queue of size ${queueSize} with k=${k}`);
  };
  
  // Run performance tests
  console.log('\n=== Performance Comparison ===');
  const testQueueSize = 10000;
  const testK = 1000;
  
  performanceTest(reverseFirstKApproach1, 'Approach 1 - Stack', testQueueSize, testK);
  performanceTest(reverseFirstKApproach2, 'Approach 2 - Array Methods', testQueueSize, testK);
  performanceTest(reverseFirstKApproach5, 'Approach 5 - Functional', testQueueSize, testK);
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    reverseFirstKApproach1,
    reverseFirstKApproach2,
    reverseFirstKApproach3,
    QueueWithReverse,
    reverseFirstKApproach5,
    reverseFirstKGenerator
  };
}
