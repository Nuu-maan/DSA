// Sqrt(x)

/**
 * Approach 1: Binary search
 * Time Complexity: O(log x)
 * Space Complexity: O(1)
 */
const mySqrtBinarySearch = (x) => {
  if (x === 0) return 0;
  if (x === 1) return 1;
  
  let left = 1;
  let right = x;
  let result = 0;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (mid <= x / mid) {  // To avoid overflow, we use division instead of multiplication
      result = mid;
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return result;
};

/**
 * Approach 2: Newton's method (Newton-Raphson)
 * Time Complexity: O(log x)
 * Space Complexity: O(1)
 */
const mySqrtNewton = (x) => {
  if (x === 0) return 0;
  if (x === 1) return 1;
  
  let guess = x;
  
  // Newton's method: x_new = (x + n/x) / 2
  while (guess > x / guess) {  // To avoid overflow, we use division instead of multiplication
    guess = Math.floor((guess + Math.floor(x / guess)) / 2);
  }
  
  return guess;
};

/**
 * Approach 3: Linear search with optimization
 * Time Complexity: O(sqrt(x))
 * Space Complexity: O(1)
 */
const mySqrtLinear = (x) => {
  if (x === 0) return 0;
  if (x === 1) return 1;
  
  // For small numbers, use linear search
  if (x < 100) {
    for (let i = 1; i <= x; i++) {
      if (i * i === x) return i;
      if (i * i > x) return i - 1;
    }
  }
  
  // For larger numbers, use optimized linear search
  let i = 1;
  while (i * i <= x) {
    if (i * i === x) return i;
    i++;
  }
  
  return i - 1;
};

/**
 * Approach 4: Using Map for memoization
 * Time Complexity: O(log x) with caching
 * Space Complexity: O(k) where k is number of unique calls
 */
const mySqrtMemoized = (() => {
  const cache = new Map();
  
  const sqrt = (x) => {
    if (cache.has(x)) return cache.get(x);
    
    if (x === 0) {
      cache.set(0, 0);
      return 0;
    }
    if (x === 1) {
      cache.set(1, 1);
      return 1;
    }
    
    let left = 1;
    let right = x;
    let result = 0;
    
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      
      if (mid <= x / mid) {
        result = mid;
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    
    cache.set(x, result);
    return result;
  };
  
  return sqrt;
})();

/**
 * Approach 5: Using BigInt for very large numbers
 * Time Complexity: O(log x)
 * Space Complexity: O(1)
 */
const mySqrtBigInt = (x) => {
  if (x === 0) return 0n;
  if (x === 1) return 1n;
  
  const bigX = BigInt(x);
  let left = 1n;
  let right = bigX;
  let result = 0n;
  
  while (left <= right) {
    const mid = (left + right) / 2n;
    
    if (mid <= bigX / mid) {
      result = mid;
      left = mid + 1n;
    } else {
      right = mid - 1n;
    }
  }
  
  return result;
};

/**
 * Approach 6: Generator function for step-by-step visualization
 * Time Complexity: O(log x)
 * Space Complexity: O(1)
 */
function* mySqrtGenerator(x) {
  yield { step: 'initial', x };
  
  if (x === 0) {
    yield { step: 'result', result: 0 };
    return 0;
  }
  if (x === 1) {
    yield { step: 'result', result: 1 };
    return 1;
  }
  
  let left = 1;
  let right = x;
  let result = 0;
  
  yield { step: 'start_binary_search', left, right };
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    yield { step: 'calculate_mid', mid, left, right };
    
    if (mid <= x / mid) {
      result = mid;
      left = mid + 1;
      yield { step: 'update_result', result, left, right };
    } else {
      right = mid - 1;
      yield { step: 'update_bounds', left, right };
    }
  }
  
  yield { step: 'result', result };
  return result;
}

// Example usage and test cases
if (typeof window === 'undefined') {  // Node.js environment
  console.log('=== Testing Sqrt(x) ===');
  
  const testCases = [0, 1, 4, 8, 9, 16, 25, 100, 1000, 2147395600];
  
  testCases.forEach((testCase) => {
    console.log(`\nTesting x = ${testCase}`);
    
    const result1 = mySqrtBinarySearch(testCase);
    console.log(`Binary search approach: ${result1}`);
    
    const result2 = mySqrtNewton(testCase);
    console.log(`Newton's method approach: ${result2}`);
    
    const result3 = mySqrtLinear(testCase);
    console.log(`Linear search approach: ${result3}`);
    
    const result4 = mySqrtMemoized(testCase);
    console.log(`Memoized approach: ${result4}`);
    
    const result5 = mySqrtBigInt(testCase);
    console.log(`BigInt approach: ${result5}`);
    
    // Generator approach
    console.log('Generator approach:');
    const generator = mySqrtGenerator(testCase);
    let result;
    do {
      result = generator.next();
      if (!result.done) {
        console.log(`  ${JSON.stringify(result.value)}`);
      }
    } while (!result.done);
    console.log(`  Final result: ${result.value}`);
  });
  
  // Performance comparison utility
  const performanceTest = (func, x, name) => {
    const start = performance.now();
    func(x);
    const end = performance.now();
    console.log(`${name}: ${end - start}ms`);
  };
  
  // Run performance tests
  console.log('\n=== Performance Comparison ===');
  const testValue = 2147395600;  // Large perfect square
  
  performanceTest(mySqrtBinarySearch, testValue, 'Binary search approach');
  performanceTest(mySqrtNewton, testValue, 'Newton\'s method approach');
  performanceTest(mySqrtLinear, testValue, 'Linear search approach');
  performanceTest(mySqrtMemoized, testValue, 'Memoized approach');
  performanceTest(mySqrtBigInt, testValue, 'BigInt approach');
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    mySqrtBinarySearch,
    mySqrtNewton,
    mySqrtLinear,
    mySqrtMemoized,
    mySqrtBigInt,
    mySqrtGenerator
  };
}
