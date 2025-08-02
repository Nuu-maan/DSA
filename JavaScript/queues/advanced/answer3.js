// Find the Most Competitive Subsequence

/**
 * Approach 1: Stack-based Solution (Optimal)
 * Time Complexity: O(n) where n is the length of nums
 * Space Complexity: O(k) for the stack
 */
const mostCompetitiveApproach1 = (nums, k) => {
  const n = nums.length;
  const stack = [];
  
  for (let i = 0; i < n; i++) {
    // Pop elements from stack if:
    // 1. Stack is not empty
    // 2. Current element is smaller than top of stack
    // 3. We have enough elements left to fill the result
    while (stack.length > 0 && 
           stack[stack.length - 1] > nums[i] && 
           stack.length + (n - i) > k) {
      stack.pop();
    }
    
    // Add current element if we haven't filled the stack yet
    if (stack.length < k) {
      stack.push(nums[i]);
    }
  }
  
  return stack;
};

/**
 * Approach 2: Brute Force Solution
 * Time Complexity: O(n*k) where n is the length of nums
 * Space Complexity: O(k) for the result array
 */
const mostCompetitiveApproach2 = (nums, k) => {
  const n = nums.length;
  const result = [];
  let start = 0;
  
  for (let i = 0; i < k; i++) {
    let minIndex = start;
    let minVal = nums[start];
    
    // Find the minimum value in the remaining valid range
    for (let j = start + 1; j <= n - k + i; j++) {
      if (nums[j] < minVal) {
        minVal = nums[j];
        minIndex = j;
      }
    }
    
    result.push(minVal);
    start = minIndex + 1;
  }
  
  return result;
};

/**
 * Approach 3: Monotonic Stack Solution with Detailed Tracking
 * Time Complexity: O(n) where n is the length of nums
 * Space Complexity: O(k) for the stack
 */
const mostCompetitiveApproach3 = (nums, k) => {
  const n = nums.length;
  const stack = [];
  let toDelete = n - k; // Number of elements we need to delete
  
  for (let i = 0; i < n; i++) {
    // Remove elements from stack while:
    // 1. We still have elements to delete
    // 2. Stack is not empty
    // 3. Current element is smaller than top of stack
    while (toDelete > 0 && stack.length > 0 && stack[stack.length - 1] > nums[i]) {
      stack.pop();
      toDelete--;
    }
    
    stack.push(nums[i]);
  }
  
  // If we still have elements to delete, remove from the end
  while (toDelete > 0) {
    stack.pop();
    toDelete--;
  }
  
  // Return only the first k elements
  return stack.slice(0, k);
};

/**
 * Approach 4: Functional Programming Solution
 * Time Complexity: O(n*k) where n is the length of nums
 * Space Complexity: O(k) for intermediate arrays
 */
const mostCompetitiveApproach4 = (nums, k) => {
  return Array.from({ length: k }, (_, i) => {
    let minIndex = i;
    let minVal = nums[i];
    
    // Find the minimum value in the valid range
    for (let j = i + 1; j <= nums.length - k + i; j++) {
      if (nums[j] < minVal) {
        minVal = nums[j];
        minIndex = j;
      }
    }
    
    // Update nums to skip elements before minIndex for next iteration
    nums = nums.slice(minIndex + 1);
    return minVal;
  });
};

/**
 * Approach 5: Recursive Solution with Memoization
 * Time Complexity: O(n*k) where n is the length of nums
 * Space Complexity: O(n*k) for memoization table
 */
const mostCompetitiveApproach5 = (nums, k) => {
  const n = nums.length;
  const memo = new Map();
  
  const findMin = (start, end) => {
    let minIndex = start;
    for (let i = start + 1; i <= end; i++) {
      if (nums[i] < nums[minIndex]) {
        minIndex = i;
      }
    }
    return minIndex;
  };
  
  const helper = (start, remaining) => {
    // Base case
    if (remaining === 0) {
      return [];
    }
    
    // Check memo
    const key = `${start}-${remaining}`;
    if (memo.has(key)) {
      return [...memo.get(key)];
    }
    
    // Find the minimum element in the valid range
    const minIndex = findMin(start, n - remaining);
    
    // Recursively find the rest of the subsequence
    const rest = helper(minIndex + 1, remaining - 1);
    
    // Combine current element with the rest
    const result = [nums[minIndex], ...rest];
    
    // Save to memo
    memo.set(key, [...result]);
    
    return result;
  };
  
  return helper(0, k);
};

/**
 * Approach 6: Generator-based Solution with Step-by-Step Visualization
 * Time Complexity: O(n) where n is the length of nums
 * Space Complexity: O(k) for the stack
 */
function* mostCompetitiveGenerator(nums, k) {
  yield { operation: 'init', nums, k };
  
  const n = nums.length;
  const stack = [];
  
  yield { operation: 'created_stack', stack: [...stack] };
  
  for (let i = 0; i < n; i++) {
    yield { operation: 'processing_index', index: i, value: nums[i] };
    
    // Pop elements from stack if:
    // 1. Stack is not empty
    // 2. Current element is smaller than top of stack
    // 3. We have enough elements left to fill the result
    while (stack.length > 0 && 
           stack[stack.length - 1] > nums[i] && 
           stack.length + (n - i) > k) {
      const popped = stack.pop();
      yield { operation: 'popped_element', popped, stack: [...stack] };
    }
    
    // Add current element if we haven't filled the stack yet
    if (stack.length < k) {
      stack.push(nums[i]);
      yield { operation: 'pushed_element', element: nums[i], stack: [...stack] };
    } else {
      yield { operation: 'skipped_element', element: nums[i], reason: 'stack is full' };
    }
  }
  
  yield { operation: 'complete', result: [...stack] };
  return stack;
}

// Example usage and test cases
if (typeof window === 'undefined') {  // Node.js environment
  console.log('=== Testing Find the Most Competitive Subsequence Implementation ===');
  
  const testNums1 = [3, 5, 2, 6];
  const testK1 = 2;
  const expected1 = [2, 6];
  
  const testNums2 = [2, 4, 3, 3, 5, 4, 9, 6];
  const testK2 = 4;
  const expected2 = [2, 3, 3, 4];
  
  // Test with approach 1
  console.log('\n--- Testing Approach 1: Stack-based Solution ---');
  console.log('Input:', testNums1, 'K:', testK1);
  console.log('Expected:', expected1);
  console.log('Result:', mostCompetitiveApproach1([...testNums1], testK1));
  
  console.log('\nInput:', testNums2, 'K:', testK2);
  console.log('Expected:', expected2);
  console.log('Result:', mostCompetitiveApproach1([...testNums2], testK2));
  
  // Test with approach 2
  console.log('\n--- Testing Approach 2: Brute Force Solution ---');
  console.log('Input:', testNums1, 'K:', testK1);
  console.log('Expected:', expected1);
  console.log('Result:', mostCompetitiveApproach2([...testNums1], testK1));
  
  console.log('\nInput:', testNums2, 'K:', testK2);
  console.log('Expected:', expected2);
  console.log('Result:', mostCompetitiveApproach2([...testNums2], testK2));
  
  // Test with approach 3
  console.log('\n--- Testing Approach 3: Monotonic Stack Solution ---');
  console.log('Input:', testNums1, 'K:', testK1);
  console.log('Expected:', expected1);
  console.log('Result:', mostCompetitiveApproach3([...testNums1], testK1));
  
  console.log('\nInput:', testNums2, 'K:', testK2);
  console.log('Expected:', expected2);
  console.log('Result:', mostCompetitiveApproach3([...testNums2], testK2));
  
  // Test with approach 4
  console.log('\n--- Testing Approach 4: Functional Programming Solution ---');
  console.log('Input:', testNums1, 'K:', testK1);
  console.log('Expected:', expected1);
  console.log('Result:', mostCompetitiveApproach4([...testNums1], testK1));
  
  console.log('\nInput:', testNums2, 'K:', testK2);
  console.log('Expected:', expected2);
  console.log('Result:', mostCompetitiveApproach4([...testNums2], testK2));
  
  // Test with approach 5
  console.log('\n--- Testing Approach 5: Recursive Solution with Memoization ---');
  console.log('Input:', testNums1, 'K:', testK1);
  console.log('Expected:', expected1);
  console.log('Result:', mostCompetitiveApproach5([...testNums1], testK1));
  
  console.log('\nInput:', testNums2, 'K:', testK2);
  console.log('Expected:', expected2);
  console.log('Result:', mostCompetitiveApproach5([...testNums2], testK2));
  
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
  
  await runGenerator(mostCompetitiveGenerator([...testNums1], testK1));
  
  // Performance comparison utility
  const performanceTest = (func, name, nums, k) => {
    const start = performance.now();
    func([...nums], k);
    const end = performance.now();
    console.log(`${name}: ${end - start}ms for array of size ${nums.length} with k=${k}`);
  };
  
  // Run performance tests
  console.log('\n=== Performance Comparison ===');
  const testArray = Array.from({ length: 10000 }, () => Math.floor(Math.random() * 100000));
  const testK = 100;
  
  performanceTest(mostCompetitiveApproach1, 'Approach 1 - Stack-based', testArray, testK);
  performanceTest(mostCompetitiveApproach2, 'Approach 2 - Brute Force', testArray.slice(0, 1000), testK/10); // Smaller array
  performanceTest(mostCompetitiveApproach3, 'Approach 3 - Monotonic Stack', testArray, testK);
  performanceTest(mostCompetitiveApproach4, 'Approach 4 - Functional', testArray.slice(0, 1000), testK/10); // Smaller array
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    mostCompetitiveApproach1,
    mostCompetitiveApproach2,
    mostCompetitiveApproach3,
    mostCompetitiveApproach4,
    mostCompetitiveApproach5,
    mostCompetitiveGenerator
  };
}
