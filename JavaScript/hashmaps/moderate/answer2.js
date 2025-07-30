// Find the first repeating element in an array
// Source: https://leetcode.com/problems/contains-duplicate-ii/

/**
 * Approach 1: Using Map for index tracking
 * Time Complexity: O(n) where n is the length of the array
 * Space Complexity: O(min(n, k)) for storing at most k+1 elements in the map
 */
const containsNearbyDuplicateMap = (nums, k) => {
  // Create a Map to store the latest index of each element
  const indexMap = new Map();
  
  // Iterate through the array
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    
    // If we've seen this number before
    if (indexMap.has(num)) {
      // Check if the distance is within k
      if (i - indexMap.get(num) <= k) {
        return true;
      }
    }
    
    // Update the latest index of this number
    indexMap.set(num, i);
  }
  
  return false;
};

/**
 * Approach 2: Using Set with sliding window
 * Time Complexity: O(n) where n is the length of the array
 * Space Complexity: O(min(n, k)) for storing at most k+1 elements in the set
 */
const containsNearbyDuplicateSet = (nums, k) => {
  // Create a Set to store elements in the current window
  const windowSet = new Set();
  
  // Iterate through the array
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    
    // If window size exceeds k, remove the oldest element
    if (i > k) {
      windowSet.delete(nums[i - k - 1]);
    }
    
    // If current element is already in window, we found a duplicate
    if (windowSet.has(num)) {
      return true;
    }
    
    // Add current element to window
    windowSet.add(num);
  }
  
  return false;
};

/**
 * Approach 3: Functional approach using array methods
 * Time Complexity: O(n * min(k, n)) in worst case
 * Space Complexity: O(1)
 */
const containsNearbyDuplicateFunctional = (nums, k) => {
  // For each element, check if there's a duplicate within k distance
  return nums.some((num, i) => 
    nums.slice(Math.max(0, i - k), i).includes(num)
  );
};

/**
 * Approach 4: Optimized Map approach with early termination
 * Time Complexity: O(n) where n is the length of the array
 * Space Complexity: O(min(n, k)) for storing at most k+1 elements in the map
 */
const containsNearbyDuplicateOptimized = (nums, k) => {
  // Handle edge cases
  if (k === 0 || nums.length <= 1) return false;
  
  // Create a Map to store the latest index of each element
  const indexMap = new Map();
  
  // Iterate through the array
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    
    // If we've seen this number before
    if (indexMap.has(num)) {
      // Check if the distance is within k
      if (i - indexMap.get(num) <= k) {
        return true;
      }
    }
    
    // Update the latest index of this number
    indexMap.set(num, i);
  }
  
  return false;
};

/**
 * Approach 5: Brute force approach
 * Time Complexity: O(n * min(k, n)) in worst case
 * Space Complexity: O(1)
 */
const containsNearbyDuplicateBrute = (nums, k) => {
  // For each element, check all elements within k distance
  for (let i = 0; i < nums.length; i++) {
    for (let j = Math.max(0, i - k); j < i; j++) {
      if (nums[i] === nums[j]) {
        return true;
      }
    }
  }
  
  return false;
};

/**
 * Approach 6: Generator-based approach for step-by-step visualization
 * Time Complexity: O(n) where n is the length of the array
 * Space Complexity: O(min(n, k)) for storing at most k+1 elements in the map
 */
function* containsNearbyDuplicateGenerator(nums, k) {
  // Create a Map to store the latest index of each element
  const indexMap = new Map();
  
  yield { step: 'initial', k, indexMap: {} };
  
  // Iterate through the array
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    
    yield { step: 'processing', index: i, number: num, currentIndexMap: Object.fromEntries(indexMap) };
    
    // If we've seen this number before
    if (indexMap.has(num)) {
      const previousIndex = indexMap.get(num);
      const distance = i - previousIndex;
      const withinRange = distance <= k;
      
      yield { step: 'duplicate_found', number: num, previousIndex, currentIndex: i, distance, withinRange };
      
      // Check if the distance is within k
      if (withinRange) {
        return true;
      }
    }
    
    // Update the latest index of this number
    indexMap.set(num, i);
    yield { step: 'index_updated', number: num, newIndex: i };
  }
  
  return false;
}

// Example usage and test cases
if (typeof window === 'undefined') {  // Node.js environment
  console.log('=== Testing Find the first repeating element in an array ===');
  
  // Test cases
  const testCases = [
    { nums: [1, 2, 3, 1], k: 3, expected: true },
    { nums: [1, 0, 1, 1], k: 1, expected: true },
    { nums: [1, 2, 3, 1, 2, 3], k: 2, expected: false },
    { nums: [99, 99], k: 2, expected: true },
    { nums: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], k: 1, expected: false }
  ];
  
  // Test all approaches
  testCases.forEach((testCase, index) => {
    console.log(`\nTest Case ${index + 1}:`);
    console.log(`Array: [${testCase.nums}], k: ${testCase.k}`);
    console.log(`Expected: ${testCase.expected}`);
    
    console.log(`Map Approach: ${containsNearbyDuplicateMap(testCase.nums, testCase.k)}`);
    console.log(`Set Approach: ${containsNearbyDuplicateSet(testCase.nums, testCase.k)}`);
    console.log(`Functional Approach: ${containsNearbyDuplicateFunctional(testCase.nums, testCase.k)}`);
    console.log(`Optimized Approach: ${containsNearbyDuplicateOptimized(testCase.nums, testCase.k)}`);
    console.log(`Brute Force Approach: ${containsNearbyDuplicateBrute(testCase.nums, testCase.k)}`);
    
    // Generator approach
    console.log('Generator Approach:');
    const generator = containsNearbyDuplicateGenerator(testCase.nums, testCase.k);
    let result;
    do {
      result = generator.next();
      if (!result.done) {
        console.log(`  ${JSON.stringify(result.value)}`);
      }
    } while (!result.done);
    console.log(`  Final Result: ${result.value}`);
  });
  
  // Performance comparison utility
  const performanceTest = (func, nums, k, name) => {
    const start = performance.now();
    for (let i = 0; i < 10000; i++) {
      func(nums, k);
    }
    const end = performance.now();
    console.log(`${name}: ${end - start}ms`);
  };
  
  // Run performance tests if performance object is available
  if (typeof performance !== 'undefined') {
    console.log('\n=== Performance Comparison ===');
    const largeArr = Array.from({length: 1000}, (_, i) => Math.floor(Math.random() * 100));
    const k = 50;
    
    performanceTest(containsNearbyDuplicateMap, largeArr, k, 'Map Approach');
    performanceTest(containsNearbyDuplicateSet, largeArr, k, 'Set Approach');
    performanceTest(containsNearbyDuplicateOptimized, largeArr, k, 'Optimized Approach');
  } else {
    console.log('\nPerformance testing requires browser environment or Node.js with performance API');
  }
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    containsNearbyDuplicateMap,
    containsNearbyDuplicateSet,
    containsNearbyDuplicateFunctional,
    containsNearbyDuplicateOptimized,
    containsNearbyDuplicateBrute,
    containsNearbyDuplicateGenerator
  };
}
