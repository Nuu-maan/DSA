// Find the length of the longest consecutive sequence in an array
// Source: https://leetcode.com/problems/longest-consecutive-sequence/

/**
 * Approach 1: Using Set for O(1) lookups with optimization
 * Time Complexity: O(n) where n is the length of the array
 * Space Complexity: O(n) for storing elements in the set
 */
const longestConsecutiveSet = (nums) => {
  // Handle edge cases
  if (!nums || nums.length === 0) return 0;
  
  // Create a Set for O(1) lookups
  const numSet = new Set(nums);
  let maxLength = 0;
  
  // For each number, check if it's the start of a sequence
  for (const num of numSet) {
    // Only start counting if this is the beginning of a sequence
    if (!numSet.has(num - 1)) {
      let currentNum = num;
      let currentLength = 1;
      
      // Count consecutive numbers
      while (numSet.has(currentNum + 1)) {
        currentNum++;
        currentLength++;
      }
      
      maxLength = Math.max(maxLength, currentLength);
    }
  }
  
  return maxLength;
};

/**
 * Approach 2: Using Map for tracking visited elements
 * Time Complexity: O(n) where n is the length of the array
 * Space Complexity: O(n) for storing elements in the map
 */
const longestConsecutiveMap = (nums) => {
  // Handle edge cases
  if (!nums || nums.length === 0) return 0;
  
  // Create a Map to track visited elements
  const visited = new Map();
  nums.forEach(num => visited.set(num, false));
  
  let maxLength = 0;
  
  // For each number, check if it's the start of a sequence
  for (const num of nums) {
    // Skip if already visited
    if (visited.get(num)) continue;
    
    // Only start counting if this is the beginning of a sequence
    if (!visited.has(num - 1)) {
      let currentNum = num;
      let currentLength = 1;
      
      // Mark as visited and count consecutive numbers
      visited.set(currentNum, true);
      while (visited.has(currentNum + 1)) {
        currentNum++;
        currentLength++;
        visited.set(currentNum, true);
      }
      
      maxLength = Math.max(maxLength, currentLength);
    }
  }
  
  return maxLength;
};

/**
 * Approach 3: Functional approach using array methods
 * Time Complexity: O(n) where n is the length of the array
 * Space Complexity: O(n) for storing elements in the set
 */
const longestConsecutiveFunctional = (nums) => {
  // Handle edge cases
  if (!nums || nums.length === 0) return 0;
  
  // Create a Set for O(1) lookups
  const numSet = new Set(nums);
  
  // Find all sequence starts and calculate their lengths
  return [...numSet].reduce((maxLen, num) => {
    // Only process if this is the start of a sequence
    if (!numSet.has(num - 1)) {
      let currentNum = num;
      let currentLength = 1;
      
      // Count consecutive numbers
      while (numSet.has(currentNum + 1)) {
        currentNum++;
        currentLength++;
      }
      
      return Math.max(maxLen, currentLength);
    }
    return maxLen;
  }, 0);
};

/**
 * Approach 4: Sorting approach
 * Time Complexity: O(n log n) for sorting + O(n) for traversal = O(n log n)
 * Space Complexity: O(1) if sorting in-place, O(n) if creating new array
 */
const longestConsecutiveSort = (nums) => {
  // Handle edge cases
  if (!nums || nums.length === 0) return 0;
  
  // Sort the array
  const sorted = [...new Set(nums)].sort((a, b) => a - b);
  
  let maxLength = 1;
  let currentLength = 1;
  
  // Traverse sorted array to find longest consecutive sequence
  for (let i = 1; i < sorted.length; i++) {
    if (sorted[i] === sorted[i - 1] + 1) {
      currentLength++;
    } else {
      maxLength = Math.max(maxLength, currentLength);
      currentLength = 1;
    }
  }
  
  return Math.max(maxLength, currentLength);
};

/**
 * Approach 5: Brute force approach
 * Time Complexity: O(n³) in worst case
 * Space Complexity: O(1)
 */
const longestConsecutiveBrute = (nums) => {
  // Handle edge cases
  if (!nums || nums.length === 0) return 0;
  
  let maxLength = 0;
  
  // For each number, check how long a sequence starting with it would be
  for (const num of nums) {
    let currentNum = num;
    let currentLength = 1;
    
    // Count consecutive numbers
    while (nums.includes(currentNum + 1)) {
      currentNum++;
      currentLength++;
    }
    
    maxLength = Math.max(maxLength, currentLength);
  }
  
  return maxLength;
};

/**
 * Approach 6: Generator-based approach for step-by-step visualization
 * Time Complexity: O(n) where n is the length of the array
 * Space Complexity: O(n) for storing elements in the set
 */
function* longestConsecutiveGenerator(nums) {
  // Handle edge cases
  if (!nums || nums.length === 0) return 0;
  
  // Create a Set for O(1) lookups
  const numSet = new Set(nums);
  let maxLength = 0;
  
  yield { step: 'initial', numSet: [...numSet], maxLength };
  
  // For each number, check if it's the start of a sequence
  for (const num of numSet) {
    yield { step: 'checking', number: num, isStart: !numSet.has(num - 1) };
    
    // Only start counting if this is the beginning of a sequence
    if (!numSet.has(num - 1)) {
      let currentNum = num;
      let currentLength = 1;
      
      yield { step: 'sequence_start', start: num, length: currentLength };
      
      // Count consecutive numbers
      while (numSet.has(currentNum + 1)) {
        currentNum++;
        currentLength++;
        
        yield { step: 'sequence_extend', current: currentNum, length: currentLength };
      }
      
      maxLength = Math.max(maxLength, currentLength);
      yield { step: 'sequence_end', length: currentLength, maxLength };
    }
  }
  
  return maxLength;
}

// Example usage and test cases
if (typeof window === 'undefined') {  // Node.js environment
  console.log('=== Testing Find the length of the longest consecutive sequence in an array ===');
  
  // Test cases
  const testCases = [
    { nums: [100, 4, 200, 1, 3, 2], expected: 4 },
    { nums: [0, 3, 7, 2, 5, 8, 4, 6, 0, 1], expected: 9 },
    { nums: [], expected: 0 },
    { nums: [1], expected: 1 },
    { nums: [1, 2, 0, 1], expected: 3 }
  ];
  
  // Test all approaches
  testCases.forEach((testCase, index) => {
    console.log(`\nTest Case ${index + 1}:`);
    console.log(`Array: [${testCase.nums}]`);
    console.log(`Expected: ${testCase.expected}`);
    
    console.log(`Set Approach: ${longestConsecutiveSet(testCase.nums)}`);
    console.log(`Map Approach: ${longestConsecutiveMap(testCase.nums)}`);
    console.log(`Functional Approach: ${longestConsecutiveFunctional(testCase.nums)}`);
    console.log(`Sorting Approach: ${longestConsecutiveSort(testCase.nums)}`);
    console.log(`Brute Force Approach: ${longestConsecutiveBrute(testCase.nums)}`);
    
    // Generator approach
    console.log('Generator Approach:');
    const generator = longestConsecutiveGenerator(testCase.nums);
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
  const performanceTest = (func, nums, name) => {
    const start = performance.now();
    for (let i = 0; i < 1000; i++) {
      func(nums);
    }
    const end = performance.now();
    console.log(`${name}: ${end - start}ms`);
  };
  
  // Run performance tests if performance object is available
  if (typeof performance !== 'undefined') {
    console.log('\n=== Performance Comparison ===');
    const largeArr = Array.from({length: 1000}, (_, i) => Math.floor(Math.random() * 2000));
    
    performanceTest(longestConsecutiveSet, largeArr, 'Set Approach');
    performanceTest(longestConsecutiveMap, largeArr, 'Map Approach');
    performanceTest(longestConsecutiveSort, largeArr, 'Sorting Approach');
  } else {
    console.log('\nPerformance testing requires browser environment or Node.js with performance API');
  }
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    longestConsecutiveSet,
    longestConsecutiveMap,
    longestConsecutiveFunctional,
    longestConsecutiveSort,
    longestConsecutiveBrute,
    longestConsecutiveGenerator
  };
}
