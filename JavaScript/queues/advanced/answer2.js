// Shortest Subarray with Sum at Least K

/**
 * Approach 1: Deque-based Solution (Optimal)
 * Time Complexity: O(n) where n is the length of nums
 * Space Complexity: O(n) for the deque
 */
const shortestSubarrayApproach1 = (nums, k) => {
  const n = nums.length;
  let result = n + 1;
  
  // Compute prefix sums
  const prefixSums = new Array(n + 1).fill(0);
  for (let i = 0; i < n; i++) {
    prefixSums[i + 1] = prefixSums[i] + nums[i];
  }
  
  // Deque to store indices
  const deque = [];
  
  for (let i = 0; i <= n; i++) {
    // Check if we found a valid subarray ending at index i-1
    while (deque.length > 0 && prefixSums[i] - prefixSums[deque[0]] >= k) {
      result = Math.min(result, i - deque[0]);
      deque.shift();
    }
    
    // Maintain deque in increasing order of prefix sums
    while (deque.length > 0 && prefixSums[deque[deque.length - 1]] >= prefixSums[i]) {
      deque.pop();
    }
    
    // Add current index to deque
    deque.push(i);
  }
  
  return result <= n ? result : -1;
};

/**
 * Approach 2: Brute Force Solution
 * Time Complexity: O(n^2) where n is the length of nums
 * Space Complexity: O(1)
 */
const shortestSubarrayApproach2 = (nums, k) => {
  const n = nums.length;
  let result = n + 1;
  
  // Check all possible subarrays
  for (let i = 0; i < n; i++) {
    let sum = 0;
    for (let j = i; j < n; j++) {
      sum += nums[j];
      if (sum >= k) {
        result = Math.min(result, j - i + 1);
        break; // No need to extend further as we want the shortest
      }
    }
  }
  
  return result <= n ? result : -1;
};

/**
 * Approach 3: Sliding Window with Prefix Sums
 * Time Complexity: O(n^2) in worst case, but can be better in some cases
 * Space Complexity: O(n) for prefix sums array
 */
const shortestSubarrayApproach3 = (nums, k) => {
  const n = nums.length;
  
  // Compute prefix sums
  const prefixSums = new Array(n + 1).fill(0);
  for (let i = 0; i < n; i++) {
    prefixSums[i + 1] = prefixSums[i] + nums[i];
  }
  
  let result = n + 1;
  
  // Check all possible subarrays using prefix sums
  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      const sum = prefixSums[j + 1] - prefixSums[i];
      if (sum >= k) {
        result = Math.min(result, j - i + 1);
        break; // No need to extend further
      }
    }
  }
  
  return result <= n ? result : -1;
};

/**
 * Approach 4: Functional Programming Solution
 * Time Complexity: O(n^2) where n is the length of nums
 * Space Complexity: O(n) for intermediate arrays
 */
const shortestSubarrayApproach4 = (nums, k) => {
  const n = nums.length;
  
  // Compute prefix sums
  const prefixSums = [0, ...nums].reduce((acc, val, i) => {
    if (i > 0) acc.push(acc[i - 1] + val);
    return acc;
  }, [0]);
  
  // Find minimum length subarray with sum >= k
  let result = n + 1;
  
  for (let i = 0; i < n; i++) {
    for (let j = i; j < n; j++) {
      const sum = prefixSums[j + 1] - prefixSums[i];
      if (sum >= k) {
        result = Math.min(result, j - i + 1);
        break;
      }
    }
  }
  
  return result <= n ? result : -1;
};

/**
 * Approach 5: Priority Queue Solution
 * Time Complexity: O(n*log(n)) where n is the length of nums
 * Space Complexity: O(n) for the priority queue
 */
class MinHeap {
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
    
    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown(0);
    return min;
  }
  
  peek() {
    return this.heap.length > 0 ? this.heap[0] : null;
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
      
      if (this.heap[currentIndex][0] >= this.heap[parentIndex][0]) {
        break;
      }
      
      [this.heap[currentIndex], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[currentIndex]];
      currentIndex = parentIndex;
    }
  }
  
  heapifyDown(i) {
    let currentIndex = i;
    
    while (true) {
      let smallestIndex = currentIndex;
      const leftChildIndex = this.getLeftChildIndex(currentIndex);
      const rightChildIndex = this.getRightChildIndex(currentIndex);
      
      if (leftChildIndex < this.heap.length && this.heap[leftChildIndex][0] < this.heap[smallestIndex][0]) {
        smallestIndex = leftChildIndex;
      }
      
      if (rightChildIndex < this.heap.length && this.heap[rightChildIndex][0] < this.heap[smallestIndex][0]) {
        smallestIndex = rightChildIndex;
      }
      
      if (smallestIndex === currentIndex) {
        break;
      }
      
      [this.heap[currentIndex], this.heap[smallestIndex]] = [this.heap[smallestIndex], this.heap[currentIndex]];
      currentIndex = smallestIndex;
    }
  }
}

const shortestSubarrayApproach5 = (nums, k) => {
  const n = nums.length;
  let result = n + 1;
  
  // Compute prefix sums
  const prefixSums = new Array(n + 1).fill(0);
  for (let i = 0; i < n; i++) {
    prefixSums[i + 1] = prefixSums[i] + nums[i];
  }
  
  // Min heap to store [prefixSum, index]
  const minHeap = new MinHeap();
  
  for (let i = 0; i <= n; i++) {
    // Check if we found a valid subarray ending at index i-1
    while (minHeap.size() > 0 && prefixSums[i] - minHeap.peek()[0] >= k) {
      const [, index] = minHeap.pop();
      result = Math.min(result, i - index);
    }
    
    // Add current prefix sum and index to heap
    minHeap.push([prefixSums[i], i]);
  }
  
  return result <= n ? result : -1;
};

/**
 * Approach 6: Generator-based Solution with Step-by-Step Visualization
 * Time Complexity: O(n) where n is the length of nums
 * Space Complexity: O(n) for the deque
 */
function* shortestSubarrayGenerator(nums, k) {
  yield { operation: 'init', nums, k };
  
  const n = nums.length;
  let result = n + 1;
  
  yield { operation: 'initialized_result', result };
  
  // Compute prefix sums
  const prefixSums = new Array(n + 1).fill(0);
  for (let i = 0; i < n; i++) {
    prefixSums[i + 1] = prefixSums[i] + nums[i];
  }
  
  yield { operation: 'computed_prefix_sums', prefixSums: [...prefixSums] };
  
  // Deque to store indices
  const deque = [];
  
  yield { operation: 'created_deque', deque: [...deque] };
  
  for (let i = 0; i <= n; i++) {
    yield { operation: 'processing_index', index: i, prefixSum: prefixSums[i] };
    
    // Check if we found a valid subarray ending at index i-1
    while (deque.length > 0 && prefixSums[i] - prefixSums[deque[0]] >= k) {
      const frontIndex = deque[0];
      const length = i - frontIndex;
      result = Math.min(result, length);
      deque.shift();
      yield { operation: 'found_valid_subarray', length, result, deque: [...deque] };
    }
    
    // Maintain deque in increasing order of prefix sums
    while (deque.length > 0 && prefixSums[deque[deque.length - 1]] >= prefixSums[i]) {
      const popped = deque.pop();
      yield { operation: 'removed_greater_prefix_sum', popped, deque: [...deque] };
    }
    
    // Add current index to deque
    deque.push(i);
    yield { operation: 'added_index_to_deque', index: i, deque: [...deque] };
  }
  
  const finalResult = result <= n ? result : -1;
  yield { operation: 'complete', result: finalResult };
  return finalResult;
}

// Example usage and test cases
if (typeof window === 'undefined') {  // Node.js environment
  console.log('=== Testing Shortest Subarray with Sum at Least K Implementation ===');
  
  const testNums1 = [1];
  const testK1 = 1;
  const expected1 = 1;
  
  const testNums2 = [1, 2];
  const testK2 = 4;
  const expected2 = -1;
  
  const testNums3 = [2, -1, 2];
  const testK3 = 3;
  const expected3 = 3;
  
  // Test with approach 1
  console.log('\n--- Testing Approach 1: Deque-based Solution ---');
  console.log('Input:', testNums1, 'K:', testK1);
  console.log('Expected:', expected1);
  console.log('Result:', shortestSubarrayApproach1([...testNums1], testK1));
  
  console.log('\nInput:', testNums2, 'K:', testK2);
  console.log('Expected:', expected2);
  console.log('Result:', shortestSubarrayApproach1([...testNums2], testK2));
  
  console.log('\nInput:', testNums3, 'K:', testK3);
  console.log('Expected:', expected3);
  console.log('Result:', shortestSubarrayApproach1([...testNums3], testK3));
  
  // Test with approach 2
  console.log('\n--- Testing Approach 2: Brute Force Solution ---');
  console.log('Input:', testNums1, 'K:', testK1);
  console.log('Expected:', expected1);
  console.log('Result:', shortestSubarrayApproach2([...testNums1], testK1));
  
  console.log('\nInput:', testNums2, 'K:', testK2);
  console.log('Expected:', expected2);
  console.log('Result:', shortestSubarrayApproach2([...testNums2], testK2));
  
  console.log('\nInput:', testNums3, 'K:', testK3);
  console.log('Expected:', expected3);
  console.log('Result:', shortestSubarrayApproach2([...testNums3], testK3));
  
  // Test with approach 3
  console.log('\n--- Testing Approach 3: Sliding Window with Prefix Sums ---');
  console.log('Input:', testNums1, 'K:', testK1);
  console.log('Expected:', expected1);
  console.log('Result:', shortestSubarrayApproach3([...testNums1], testK1));
  
  console.log('\nInput:', testNums2, 'K:', testK2);
  console.log('Expected:', expected2);
  console.log('Result:', shortestSubarrayApproach3([...testNums2], testK2));
  
  console.log('\nInput:', testNums3, 'K:', testK3);
  console.log('Expected:', expected3);
  console.log('Result:', shortestSubarrayApproach3([...testNums3], testK3));
  
  // Test with approach 4
  console.log('\n--- Testing Approach 4: Functional Programming Solution ---');
  console.log('Input:', testNums1, 'K:', testK1);
  console.log('Expected:', expected1);
  console.log('Result:', shortestSubarrayApproach4([...testNums1], testK1));
  
  console.log('\nInput:', testNums2, 'K:', testK2);
  console.log('Expected:', expected2);
  console.log('Result:', shortestSubarrayApproach4([...testNums2], testK2));
  
  console.log('\nInput:', testNums3, 'K:', testK3);
  console.log('Expected:', expected3);
  console.log('Result:', shortestSubarrayApproach4([...testNums3], testK3));
  
  // Test with approach 5
  console.log('\n--- Testing Approach 5: Priority Queue Solution ---');
  console.log('Input:', testNums1, 'K:', testK1);
  console.log('Expected:', expected1);
  console.log('Result:', shortestSubarrayApproach5([...testNums1], testK1));
  
  console.log('\nInput:', testNums2, 'K:', testK2);
  console.log('Expected:', expected2);
  console.log('Result:', shortestSubarrayApproach5([...testNums2], testK2));
  
  console.log('\nInput:', testNums3, 'K:', testK3);
  console.log('Expected:', expected3);
  console.log('Result:', shortestSubarrayApproach5([...testNums3], testK3));
  
  // Test with approach 6
  console.log('\n--- Testing Approach 6: Generator-based Solution ---');
  console.log('Input:', testNums1, 'K:', testK1);
  
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
  
  await runGenerator(shortestSubarrayGenerator([...testNums1], testK1));
  
  // Performance comparison utility
  const performanceTest = (func, name, nums, k) => {
    const start = performance.now();
    func([...nums], k);
    const end = performance.now();
    console.log(`${name}: ${end - start}ms for array of size ${nums.length}`);
  };
  
  // Run performance tests
  console.log('\n=== Performance Comparison ===');
  const testArray = [2, 1, 3, -1, 2, 4, -2, 1, 3, 5, -1, 2, 4, -3, 1, 2, 3, 4, 5, -1];
  const testK = 7;
  
  performanceTest(shortestSubarrayApproach1, 'Approach 1 - Deque-based', testArray, testK);
  performanceTest(shortestSubarrayApproach2, 'Approach 2 - Brute Force', testArray, testK);
  performanceTest(shortestSubarrayApproach3, 'Approach 3 - Sliding Window', testArray, testK);
  performanceTest(shortestSubarrayApproach4, 'Approach 4 - Functional', testArray, testK);
  performanceTest(shortestSubarrayApproach5, 'Approach 5 - Priority Queue', testArray, testK);
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    shortestSubarrayApproach1,
    shortestSubarrayApproach2,
    shortestSubarrayApproach3,
    shortestSubarrayApproach4,
    MinHeap,
    shortestSubarrayApproach5,
    shortestSubarrayGenerator
  };
}
