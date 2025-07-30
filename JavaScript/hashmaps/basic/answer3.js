// Find the pair with given sum in an array
// Source: https://www.geeksforgeeks.org/check-if-pair-with-given-sum-exists-in-array/

/**
 * Approach 1: Using Set for O(1) lookups
 * Time Complexity: O(n) where n is the length of the array
 * Space Complexity: O(n) for storing elements in the set
 */
const hasPairWithSumSet = (arr, target) => {
  // Create a Set to store elements we've seen
  const seen = new Set();
  
  // For each element, check if (target - element) exists in set
  for (const num of arr) {
    const complement = target - num;
    if (seen.has(complement)) {
      return true;
    }
    seen.add(num);
  }
  
  return false;
};

/**
 * Approach 2: Using Map for element tracking
 * Time Complexity: O(n) where n is the length of the array
 * Space Complexity: O(n) for storing elements in the map
 */
const hasPairWithSumMap = (arr, target) => {
  // Create a Map to store elements we've seen
  const seen = new Map();
  
  // For each element, check if (target - element) exists in map
  for (let i = 0; i < arr.length; i++) {
    const num = arr[i];
    const complement = target - num;
    if (seen.has(complement)) {
      return true;
    }
    seen.set(num, i);
  }
  
  return false;
};

/**
 * Approach 3: Functional approach using array methods
 * Time Complexity: O(n²) in worst case
 * Space Complexity: O(1)
 */
const hasPairWithSumFunctional = (arr, target) => {
  // Check if any element has its complement in the rest of the array
  return arr.some((num, index) => 
    arr.slice(index + 1).includes(target - num)
  );
};

/**
 * Approach 4: Two-pointer approach after sorting
 * Time Complexity: O(n log n) for sorting + O(n) for traversal = O(n log n)
 * Space Complexity: O(1) if sorting in-place, O(n) if creating new array
 */
const hasPairWithSumTwoPointer = (arr, target) => {
  // Create a sorted copy of the array
  const sorted = [...arr].sort((a, b) => a - b);
  
  // Use two pointers from both ends
  let left = 0;
  let right = sorted.length - 1;
  
  while (left < right) {
    const sum = sorted[left] + sorted[right];
    if (sum === target) {
      return true;
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }
  
  return false;
};

/**
 * Approach 5: Nested loop approach
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 */
const hasPairWithSumNested = (arr, target) => {
  // Check all pairs
  for (let i = 0; i < arr.length; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[i] + arr[j] === target) {
        return true;
      }
    }
  }
  
  return false;
};

/**
 * Approach 6: Generator-based approach for step-by-step visualization
 * Time Complexity: O(n) where n is the length of the array
 * Space Complexity: O(n) for storing elements in the set
 */
function* hasPairWithSumGenerator(arr, target) {
  const seen = new Set();
  
  for (let i = 0; i < arr.length; i++) {
    const num = arr[i];
    const complement = target - num;
    const found = seen.has(complement);
    
    yield { 
      index: i, 
      number: num, 
      complement, 
      seen: [...seen], 
      found 
    };
    
    if (found) {
      return true;
    }
    
    seen.add(num);
  }
  
  return false;
}

// Example usage and test cases
if (typeof window === 'undefined') {  // Node.js environment
  console.log('=== Testing Find the pair with given sum in an array ===');
  
  // Test cases
  const testCases = [
    { arr: [0, -1, 2, -3, 1], target: -2, expected: true },
    { arr: [1, 4, 45, 6, 10, -8], target: 16, expected: true },
    { arr: [1, 2, 4, 3, 6], target: 10, expected: false },
    { arr: [5, 3, 5, 8], target: 10, expected: true }
  ];
  
  // Test all approaches
  testCases.forEach((testCase, index) => {
    console.log(`\nTest Case ${index + 1}:`);
    console.log(`Array: [${testCase.arr}], Target: ${testCase.target}`);
    console.log(`Expected: ${testCase.expected}`);
    
    console.log(`Set Approach: ${hasPairWithSumSet(testCase.arr, testCase.target)}`);
    console.log(`Map Approach: ${hasPairWithSumMap(testCase.arr, testCase.target)}`);
    console.log(`Functional Approach: ${hasPairWithSumFunctional(testCase.arr, testCase.target)}`);
    console.log(`Two-Pointer Approach: ${hasPairWithSumTwoPointer(testCase.arr, testCase.target)}`);
    console.log(`Nested Loop Approach: ${hasPairWithSumNested(testCase.arr, testCase.target)}`);
    
    // Generator approach
    console.log('Generator Approach:');
    const generator = hasPairWithSumGenerator(testCase.arr, testCase.target);
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
  const performanceTest = (func, arr, target, name) => {
    const start = performance.now();
    for (let i = 0; i < 10000; i++) {
      func(arr, target);
    }
    const end = performance.now();
    console.log(`${name}: ${end - start}ms`);
  };
  
  // Run performance tests if performance object is available
  if (typeof performance !== 'undefined') {
    console.log('\n=== Performance Comparison ===');
    const largeArr = Array.from({length: 1000}, (_, i) => i);
    const target = 1500;
    
    performanceTest(hasPairWithSumSet, largeArr, target, 'Set Approach');
    performanceTest(hasPairWithSumMap, largeArr, target, 'Map Approach');
    performanceTest(hasPairWithSumTwoPointer, largeArr, target, 'Two-Pointer Approach');
  } else {
    console.log('\nPerformance testing requires browser environment or Node.js with performance API');
  }
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    hasPairWithSumSet,
    hasPairWithSumMap,
    hasPairWithSumFunctional,
    hasPairWithSumTwoPointer,
    hasPairWithSumNested,
    hasPairWithSumGenerator
  };
}
