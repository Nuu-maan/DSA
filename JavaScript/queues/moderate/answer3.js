// Sliding Window Maximum

/**
 * Approach 1: Brute Force Solution
 * Time Complexity: O(n*k) where n is the length of nums and k is the window size
 * Space Complexity: O(1) excluding the output array
 */
const maxSlidingWindowApproach1 = (nums, k) => {
  if (!nums || nums.length === 0 || k <= 0) {
    return [];
  }
  
  const result = [];
  
  for (let i = 0; i <= nums.length - k; i++) {
    let max = nums[i];
    for (let j = 1; j < k; j++) {
      if (nums[i + j] > max) {
        max = nums[i + j];
      }
    }
    result.push(max);
  }
  
  return result;
};

/**
 * Approach 2: Deque (Double-ended Queue) Solution
 * Time Complexity: O(n) where n is the length of nums
 * Space Complexity: O(k) for the deque
 */
const maxSlidingWindowApproach2 = (nums, k) => {
  if (!nums || nums.length === 0 || k <= 0) {
    return [];
  }
  
  const result = [];
  const deque = []; // Store indices
  
  for (let i = 0; i < nums.length; i++) {
    // Remove indices that are out of the current window
    while (deque.length > 0 && deque[0] < i - k + 1) {
      deque.shift();
    }
    
    // Remove indices whose corresponding values are less than current value
    while (deque.length > 0 && nums[deque[deque.length - 1]] < nums[i]) {
      deque.pop();
    }
    
    // Add current index
    deque.push(i);
    
    // Add maximum for current window to result
    if (i >= k - 1) {
      result.push(nums[deque[0]]);
    }
  }
  
  return result;
};

/**
 * Approach 3: Dynamic Programming Solution
 * Time Complexity: O(n) where n is the length of nums
 * Space Complexity: O(n) for the left and right arrays
 */
const maxSlidingWindowApproach3 = (nums, k) => {
  if (!nums || nums.length === 0 || k <= 0) {
    return [];
  }
  
  const n = nums.length;
  if (k === 1) {
    return nums;
  }
  
  const left = new Array(n);
  const right = new Array(n);
  
  left[0] = nums[0];
  right[n - 1] = nums[n - 1];
  
  // Fill left array
  for (let i = 1; i < n; i++) {
    // From left to right
    if (i % k === 0) {
      left[i] = nums[i];
    } else {
      left[i] = Math.max(left[i - 1], nums[i]);
    }
  }
  
  // Fill right array
  for (let i = n - 2; i >= 0; i--) {
    // From right to left
    if ((i + 1) % k === 0) {
      right[i] = nums[i];
    } else {
      right[i] = Math.max(right[i + 1], nums[i]);
    }
  }
  
  const result = [];
  for (let i = 0; i <= n - k; i++) {
    result.push(Math.max(right[i], left[i + k - 1]));
  }
  
  return result;
};

/**
 * Approach 4: Priority Queue (Max Heap) Solution
 * Time Complexity: O(n*log(k)) where n is the length of nums
 * Space Complexity: O(k) for the priority queue
 */
class MaxHeap {
  constructor() {
    this.heap = [];
  }
  
  push(value) {
    this.heap.push(value);
    this.heapifyUp(this.heap.length - 1);
  }
  
  pop() {
    if (this.heap.length === 0) {
      return null;
    }
    
    if (this.heap.length === 1) {
      return this.heap.pop();
    }
    
    const max = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);
    return max;
  }
  
  peek() {
    return this.heap.length > 0 ? this.heap[0] : null;
  }
  
  remove(value) {
    const index = this.heap.indexOf(value);
    if (index === -1) {
      return;
    }
    
    if (index === this.heap.length - 1) {
      this.heap.pop();
      return;
    }
    
    this.heap[index] = this.heap.pop();
    
    if (index > 0 && this.heap[index] > this.heap[this.getParentIndex(index)]) {
      this.heapifyUp(index);
    } else {
      this.heapifyDown(index);
    }
  }
  
  size() {
    return this.heap.length;
  }
  
  getParentIndex(i) {
    return Math.floor((i - 1) / 2);
  }
  
  getLeftChildIndex(i) {
    return 2 * i + 1;
  }
  
  getRightChildIndex(i) {
    return 2 * i + 2;
  }
  
  heapifyUp(i) {
    let currentIndex = i;
    
    while (currentIndex > 0) {
      const parentIndex = this.getParentIndex(currentIndex);
      
      if (this.heap[currentIndex][0] <= this.heap[parentIndex][0]) {
        break;
      }
      
      [this.heap[currentIndex], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[currentIndex]];
      currentIndex = parentIndex;
    }
  }
  
  heapifyDown(i) {
    let currentIndex = i;
    
    while (true) {
      let largestIndex = currentIndex;
      const leftChildIndex = this.getLeftChildIndex(currentIndex);
      const rightChildIndex = this.getRightChildIndex(currentIndex);
      
      if (leftChildIndex < this.heap.length && this.heap[leftChildIndex][0] > this.heap[largestIndex][0]) {
        largestIndex = leftChildIndex;
      }
      
      if (rightChildIndex < this.heap.length && this.heap[rightChildIndex][0] > this.heap[largestIndex][0]) {
        largestIndex = rightChildIndex;
      }
      
      if (largestIndex === currentIndex) {
        break;
      }
      
      [this.heap[currentIndex], this.heap[largestIndex]] = [this.heap[largestIndex], this.heap[currentIndex]];
      currentIndex = largestIndex;
    }
  }
}

const maxSlidingWindowApproach4 = (nums, k) => {
  if (!nums || nums.length === 0 || k <= 0) {
    return [];
  }
  
  const result = [];
  const maxHeap = new MaxHeap();
  
  // Initialize heap with first k elements
  for (let i = 0; i < k; i++) {
    maxHeap.push([nums[i], i]);
  }
  
  result.push(maxHeap.peek()[0]);
  
  // Process remaining elements
  for (let i = k; i < nums.length; i++) {
    // Remove elements that are out of the window
    while (maxHeap.size() > 0 && maxHeap.peek()[1] <= i - k) {
      maxHeap.pop();
    }
    
    // Add current element
    maxHeap.push([nums[i], i]);
    
    // Add maximum to result
    result.push(maxHeap.peek()[0]);
  }
  
  return result;
};

/**
 * Approach 5: Functional Programming Solution
 * Time Complexity: O(n*k) where n is the length of nums and k is the window size
 * Space Complexity: O(1) excluding the output array
 */
const maxSlidingWindowApproach5 = (nums, k) => {
  if (!nums || nums.length === 0 || k <= 0) {
    return [];
  }
  
  return Array.from(
    { length: nums.length - k + 1 },
    (_, i) => Math.max(...nums.slice(i, i + k))
  );
};

/**
 * Approach 6: Generator-based Solution with Step-by-Step Visualization
 * Time Complexity: O(n) where n is the length of nums
 * Space Complexity: O(k) for the deque
 */
function* maxSlidingWindowGenerator(nums, k) {
  if (!nums || nums.length === 0 || k <= 0) {
    yield { operation: 'init', result: [] };
    return [];
  }
  
  yield { operation: 'init', nums, k };
  
  const result = [];
  const deque = []; // Store indices
  
  yield { operation: 'created_deque', deque: [...deque] };
  
  for (let i = 0; i < nums.length; i++) {
    yield { operation: 'processing_index', index: i, value: nums[i] };
    
    // Remove indices that are out of the current window
    while (deque.length > 0 && deque[0] < i - k + 1) {
      const removed = deque.shift();
      yield { operation: 'removed_out_of_window', removed, deque: [...deque] };
    }
    
    // Remove indices whose corresponding values are less than current value
    while (deque.length > 0 && nums[deque[deque.length - 1]] < nums[i]) {
      const removed = deque.pop();
      yield { operation: 'removed_smaller', removed, deque: [...deque] };
    }
    
    // Add current index
    deque.push(i);
    yield { operation: 'added_index', index: i, deque: [...deque] };
    
    // Add maximum for current window to result
    if (i >= k - 1) {
      const max = nums[deque[0]];
      result.push(max);
      yield { operation: 'added_max', max, window: i - k + 1, result: [...result] };
    }
  }
  
  yield { operation: 'complete', result: [...result] };
  return result;
}

// Example usage and test cases
if (typeof window === 'undefined') {  // Node.js environment
  console.log('=== Testing Sliding Window Maximum Implementation ===');
  
  const testNums = [1, 3, -1, -3, 5, 3, 6, 7];
  const testK = 3;
  
  // Test with approach 1
  console.log('\n--- Testing Approach 1: Brute Force Solution ---');
  console.log('Input:', testNums);
  console.log('Window size:', testK);
  console.log('Result:', maxSlidingWindowApproach1([...testNums], testK)); // [3, 3, 5, 5, 6, 7]
  
  // Test with approach 2
  console.log('\n--- Testing Approach 2: Deque Solution ---');
  console.log('Input:', testNums);
  console.log('Window size:', testK);
  console.log('Result:', maxSlidingWindowApproach2([...testNums], testK)); // [3, 3, 5, 5, 6, 7]
  
  // Test with approach 3
  console.log('\n--- Testing Approach 3: Dynamic Programming Solution ---');
  console.log('Input:', testNums);
  console.log('Window size:', testK);
  console.log('Result:', maxSlidingWindowApproach3([...testNums], testK)); // [3, 3, 5, 5, 6, 7]
  
  // Test with approach 4
  console.log('\n--- Testing Approach 4: Priority Queue Solution ---');
  console.log('Input:', testNums);
  console.log('Window size:', testK);
  console.log('Result:', maxSlidingWindowApproach4([...testNums], testK)); // [3, 3, 5, 5, 6, 7]
  
  // Test with approach 5
  console.log('\n--- Testing Approach 5: Functional Programming Solution ---');
  console.log('Input:', testNums);
  console.log('Window size:', testK);
  console.log('Result:', maxSlidingWindowApproach5([...testNums], testK)); // [3, 3, 5, 5, 6, 7]
  
  // Test with approach 6
  console.log('\n--- Testing Approach 6: Generator-based Solution ---');
  console.log('Input:', testNums);
  console.log('Window size:', testK);
  
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
  
  await runGenerator(maxSlidingWindowGenerator([...testNums], testK));
  
  // Performance comparison utility
  const performanceTest = (func, name, nums, k) => {
    const start = performance.now();
    func([...nums], k);
    const end = performance.now();
    console.log(`${name}: ${end - start}ms for array of size ${nums.length} with window size ${k}`);
  };
  
  // Run performance tests
  console.log('\n=== Performance Comparison ===');
  const testArray = Array.from({ length: 10000 }, () => Math.floor(Math.random() * 20000) - 10000);
  const testWindowSize = 100;
  
  performanceTest(maxSlidingWindowApproach1, 'Approach 1 - Brute Force', testArray, testWindowSize);
  performanceTest(maxSlidingWindowApproach2, 'Approach 2 - Deque', testArray, testWindowSize);
  performanceTest(maxSlidingWindowApproach3, 'Approach 3 - Dynamic Programming', testArray, testWindowSize);
  performanceTest(maxSlidingWindowApproach4, 'Approach 4 - Priority Queue', testArray, testWindowSize);
  performanceTest(maxSlidingWindowApproach5, 'Approach 5 - Functional', testArray, testWindowSize);
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    maxSlidingWindowApproach1,
    maxSlidingWindowApproach2,
    maxSlidingWindowApproach3,
    maxSlidingWindowApproach4,
    MaxHeap,
    maxSlidingWindowApproach5,
    maxSlidingWindowGenerator
  };
}
