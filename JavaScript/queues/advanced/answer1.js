// Number of Visible People in a Queue

/**
 * Approach 1: Stack-based Solution (Optimal)
 * Time Complexity: O(n) where n is the length of heights
 * Space Complexity: O(n) for the stack
 */
const canSeePersonsCountApproach1 = (heights) => {
  const n = heights.length;
  const result = new Array(n).fill(0);
  const stack = [];
  
  // Traverse from right to left
  for (let i = n - 1; i >= 0; i--) {
    let count = 0;
    
    // Pop elements from stack that are shorter than current height
    while (stack.length > 0 && stack[stack.length - 1] < heights[i]) {
      stack.pop();
      count++;
    }
    
    // If stack is not empty, current person can see one more person (the one at top of stack)
    result[i] = count + (stack.length > 0 ? 1 : 0);
    
    // Push current height to stack
    stack.push(heights[i]);
  }
  
  return result;
};

/**
 * Approach 2: Brute Force Solution
 * Time Complexity: O(n^2) where n is the length of heights
 * Space Complexity: O(1) excluding the output array
 */
const canSeePersonsCountApproach2 = (heights) => {
  const n = heights.length;
  const result = new Array(n).fill(0);
  
  for (let i = 0; i < n; i++) {
    let maxHeight = 0;
    
    for (let j = i + 1; j < n; j++) {
      // Person i can see person j if all people between them are shorter
      if (heights[j] > maxHeight) {
        result[i]++;
        maxHeight = heights[j];
      }
      
      // If person j is taller or equal to person i, person i cannot see anyone beyond j
      if (heights[j] >= heights[i]) {
        break;
      }
    }
  }
  
  return result;
};

/**
 * Approach 3: Monotonic Stack Solution with Detailed Tracking
 * Time Complexity: O(n) where n is the length of heights
 * Space Complexity: O(n) for the stack and auxiliary arrays
 */
const canSeePersonsCountApproach3 = (heights) => {
  const n = heights.length;
  const result = new Array(n).fill(0);
  const stack = []; // Stack to store indices
  
  // Traverse from right to left
  for (let i = n - 1; i >= 0; i--) {
    let count = 0;
    
    // Pop elements from stack while current height is greater
    while (stack.length > 0 && heights[stack[stack.length - 1]] < heights[i]) {
      stack.pop();
      count++;
    }
    
    // If stack is not empty, current person can see one more person
    result[i] = count + (stack.length > 0 ? 1 : 0);
    
    // Push current index to stack
    stack.push(i);
  }
  
  return result;
};

/**
 * Approach 4: Functional Programming Solution
 * Time Complexity: O(n^2) where n is the length of heights
 * Space Complexity: O(n) for intermediate arrays
 */
const canSeePersonsCountApproach4 = (heights) => {
  return heights.map((height, i) => {
    let count = 0;
    let maxHeight = 0;
    
    for (let j = i + 1; j < heights.length; j++) {
      if (heights[j] > maxHeight) {
        count++;
        maxHeight = heights[j];
      }
      
      if (heights[j] >= height) {
        break;
      }
    }
    
    return count;
  });
};

/**
 * Approach 5: Recursive Solution with Memoization
 * Time Complexity: O(n^2) in worst case, but with memoization can be better in some cases
 * Space Complexity: O(n^2) for memoization table
 */
const canSeePersonsCountApproach5 = (heights) => {
  const n = heights.length;
  const memo = new Map();
  
  const canSee = (i, j) => {
    // Check if already computed
    const key = `${i}-${j}`;
    if (memo.has(key)) {
      return memo.get(key);
    }
    
    // Base cases
    if (j >= n) {
      memo.set(key, false);
      return false;
    }
    
    if (i === j) {
      memo.set(key, false);
      return false;
    }
    
    // Check if person j is blocked by someone between i and j
    for (let k = i + 1; k < j; k++) {
      if (heights[k] >= heights[i] || heights[k] >= heights[j]) {
        memo.set(key, false);
        return false;
      }
    }
    
    memo.set(key, true);
    return true;
  };
  
  const result = new Array(n).fill(0);
  
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (canSee(i, j)) {
        result[i]++;
      } else {
        // If person i cannot see person j, they cannot see anyone beyond j
        if (heights[j] >= heights[i]) {
          break;
        }
      }
    }
  }
  
  return result;
};

/**
 * Approach 6: Generator-based Solution with Step-by-Step Visualization
 * Time Complexity: O(n) where n is the length of heights
 * Space Complexity: O(n) for the stack
 */
function* canSeePersonsCountGenerator(heights) {
  yield { operation: 'init', heights };
  
  const n = heights.length;
  const result = new Array(n).fill(0);
  const stack = [];
  
  yield { operation: 'created_arrays', result: [...result], stack: [...stack] };
  
  // Traverse from right to left
  for (let i = n - 1; i >= 0; i--) {
    yield { operation: 'processing_index', index: i, height: heights[i] };
    
    let count = 0;
    
    // Pop elements from stack that are shorter than current height
    while (stack.length > 0 && stack[stack.length - 1] < heights[i]) {
      const popped = stack.pop();
      count++;
      yield { operation: 'popped_shorter', popped, count, stack: [...stack] };
    }
    
    // If stack is not empty, current person can see one more person
    result[i] = count + (stack.length > 0 ? 1 : 0);
    yield { operation: 'updated_result', index: i, count: result[i], result: [...result] };
    
    // Push current height to stack
    stack.push(heights[i]);
    yield { operation: 'pushed_to_stack', height: heights[i], stack: [...stack] };
  }
  
  yield { operation: 'complete', result: [...result] };
  return result;
}

// Example usage and test cases
if (typeof window === 'undefined') {  // Node.js environment
  console.log('=== Testing Number of Visible People in a Queue Implementation ===');
  
  const testHeights1 = [10, 6, 8, 5, 11, 9];
  const expected1 = [3, 1, 2, 1, 1, 0];
  
  const testHeights2 = [5, 1, 2, 3, 10];
  const expected2 = [4, 1, 1, 1, 0];
  
  // Test with approach 1
  console.log('\n--- Testing Approach 1: Stack-based Solution ---');
  console.log('Input:', testHeights1);
  console.log('Expected:', expected1);
  console.log('Result:', canSeePersonsCountApproach1([...testHeights1]));
  
  console.log('\nInput:', testHeights2);
  console.log('Expected:', expected2);
  console.log('Result:', canSeePersonsCountApproach1([...testHeights2]));
  
  // Test with approach 2
  console.log('\n--- Testing Approach 2: Brute Force Solution ---');
  console.log('Input:', testHeights1);
  console.log('Expected:', expected1);
  console.log('Result:', canSeePersonsCountApproach2([...testHeights1]));
  
  console.log('\nInput:', testHeights2);
  console.log('Expected:', expected2);
  console.log('Result:', canSeePersonsCountApproach2([...testHeights2]));
  
  // Test with approach 3
  console.log('\n--- Testing Approach 3: Monotonic Stack Solution ---');
  console.log('Input:', testHeights1);
  console.log('Expected:', expected1);
  console.log('Result:', canSeePersonsCountApproach3([...testHeights1]));
  
  console.log('\nInput:', testHeights2);
  console.log('Expected:', expected2);
  console.log('Result:', canSeePersonsCountApproach3([...testHeights2]));
  
  // Test with approach 4
  console.log('\n--- Testing Approach 4: Functional Programming Solution ---');
  console.log('Input:', testHeights1);
  console.log('Expected:', expected1);
  console.log('Result:', canSeePersonsCountApproach4([...testHeights1]));
  
  console.log('\nInput:', testHeights2);
  console.log('Expected:', expected2);
  console.log('Result:', canSeePersonsCountApproach4([...testHeights2]));
  
  // Test with approach 5
  console.log('\n--- Testing Approach 5: Recursive Solution with Memoization ---');
  console.log('Input:', testHeights1);
  console.log('Expected:', expected1);
  console.log('Result:', canSeePersonsCountApproach5([...testHeights1]));
  
  console.log('\nInput:', testHeights2);
  console.log('Expected:', expected2);
  console.log('Result:', canSeePersonsCountApproach5([...testHeights2]));
  
  // Test with approach 6
  console.log('\n--- Testing Approach 6: Generator-based Solution ---');
  console.log('Input:', testHeights1);
  
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
  
  await runGenerator(canSeePersonsCountGenerator([...testHeights1]));
  
  // Performance comparison utility
  const performanceTest = (func, name, heights) => {
    const start = performance.now();
    func([...heights]);
    const end = performance.now();
    console.log(`${name}: ${end - start}ms for array of size ${heights.length}`);
  };
  
  // Run performance tests
  console.log('\n=== Performance Comparison ===');
  const testArray = Array.from({ length: 10000 }, () => Math.floor(Math.random() * 100000));
  
  performanceTest(canSeePersonsCountApproach1, 'Approach 1 - Stack-based', testArray);
  performanceTest(canSeePersonsCountApproach2, 'Approach 2 - Brute Force', testArray.slice(0, 1000)); // Smaller array for brute force
  performanceTest(canSeePersonsCountApproach3, 'Approach 3 - Monotonic Stack', testArray);
  performanceTest(canSeePersonsCountApproach4, 'Approach 4 - Functional', testArray.slice(0, 1000)); // Smaller array for functional
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    canSeePersonsCountApproach1,
    canSeePersonsCountApproach2,
    canSeePersonsCountApproach3,
    canSeePersonsCountApproach4,
    canSeePersonsCountApproach5,
    canSeePersonsCountGenerator
  };
}
