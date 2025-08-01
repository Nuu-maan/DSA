// Find GCD of an array of numbers

/**
 * Approach 1: Iterative with built-in GCD function
 * Time Complexity: O(n * log(min(a,b))) where n is array length
 * Space Complexity: O(1)
 */
const gcdOfArrayIterative = (arr) => {
  if (arr.length === 0) return 0;
  if (arr.length === 1) return arr[0];
  
  // Helper function to find GCD of two numbers
  const gcd = (a, b) => {
    while (b !== 0) {
      [a, b] = [b, a % b];
    }
    return a;
  };
  
  // Apply GCD iteratively to all elements
  let result = arr[0];
  for (let i = 1; i < arr.length; i++) {
    result = gcd(result, arr[i]);
    // Early termination if GCD becomes 1
    if (result === 1) break;
  }
  
  return result;
};

/**
 * Approach 2: Recursive with reduce
 * Time Complexity: O(n * log(min(a,b)))
 * Space Complexity: O(n) due to recursion stack
 */
const gcdOfArrayRecursive = (arr) => {
  if (arr.length === 0) return 0;
  if (arr.length === 1) return arr[0];
  
  // Helper function to find GCD of two numbers
  const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
  
  // Use reduce to apply GCD to all elements
  return arr.reduce((acc, curr) => gcd(acc, curr));
};

/**
 * Approach 3: Functional approach using array methods
 * Time Complexity: O(n * log(min(a,b)))
 * Space Complexity: O(1)
 */
const gcdOfArrayFunctional = (arr) => {
  if (arr.length === 0) return 0;
  if (arr.length === 1) return arr[0];
  
  // Helper function to find GCD of two numbers
  const gcd = (a, b) => {
    while (b !== 0) {
      [a, b] = [b, a % b];
    }
    return a;
  };
  
  // Use functional approach with spread operator
  return arr.slice(1).reduce((acc, curr) => gcd(acc, curr), arr[0]);
};

/**
 * Approach 4: Using Map for memoization
 * Time Complexity: O(n * log(min(a,b))) with caching
 * Space Complexity: O(k) where k is number of unique pairs
 */
const gcdOfArrayMemoized = (() => {
  const cache = new Map();
  
  // Helper function to find GCD of two numbers with memoization
  const gcd = (a, b) => {
    const key = `${Math.min(a, b)}_${Math.max(a, b)}`;
    if (cache.has(key)) return cache.get(key);
    
    let result = a;
    let divisor = b;
    while (divisor !== 0) {
      [result, divisor] = [divisor, result % divisor];
    }
    
    cache.set(key, result);
    return result;
  };
  
  return (arr) => {
    if (arr.length === 0) return 0;
    if (arr.length === 1) return arr[0];
    
    // Apply memoized GCD iteratively
    let result = arr[0];
    for (let i = 1; i < arr.length; i++) {
      result = gcd(result, arr[i]);
      if (result === 1) break;
    }
    
    return result;
  };
})();

/**
 * Approach 5: Using BigInt for very large numbers
 * Time Complexity: O(n * log(min(a,b)))
 * Space Complexity: O(1)
 */
const gcdOfArrayBigInt = (arr) => {
  if (arr.length === 0) return 0n;
  if (arr.length === 1) return BigInt(arr[0]);
  
  // Helper function to find GCD of two BigInt numbers
  const gcd = (a, b) => {
    while (b !== 0n) {
      [a, b] = [b, a % b];
    }
    return a;
  };
  
  // Convert all numbers to BigInt and apply GCD
  const bigArr = arr.map(BigInt);
  let result = bigArr[0];
  for (let i = 1; i < bigArr.length; i++) {
    result = gcd(result, bigArr[i]);
    if (result === 1n) break;
  }
  
  return result;
};

/**
 * Approach 6: Generator function for step-by-step visualization
 * Time Complexity: O(n * log(min(a,b)))
 * Space Complexity: O(1)
 */
function* gcdOfArrayGenerator(arr) {
  yield { step: 'initial', array: arr };
  
  if (arr.length === 0) {
    yield { step: 'result', gcd: 0 };
    return 0;
  }
  
  if (arr.length === 1) {
    yield { step: 'result', gcd: arr[0] };
    return arr[0];
  }
  
  // Helper function to find GCD of two numbers
  const gcd = (a, b) => {
    while (b !== 0) {
      [a, b] = [b, a % b];
    }
    return a;
  };
  
  yield { step: 'calculating_gcd', elements: [arr[0]] };
  let result = arr[0];
  
  for (let i = 1; i < arr.length; i++) {
    yield { step: 'processing', current: arr[i], accumulated: result };
    result = gcd(result, arr[i]);
    yield { step: 'intermediate_result', gcd: result };
    if (result === 1) {
      yield { step: 'early_termination', reason: 'GCD is 1' };
      break;
    }
  }
  
  yield { step: 'result', gcd: result };
  return result;
}

// Example usage and test cases
if (typeof window === 'undefined') {  // Node.js environment
  console.log('=== Testing GCD of Array ===');
  
  const testCases = [
    [12, 18, 24],
    [5, 7, 11],
    [48, 18, 24],
    [100, 75, 50, 25],
    [17, 19],
    [42]
  ];
  
  testCases.forEach((testCase) => {
    console.log(`\nTesting array: [${testCase.join(', ')}]`);
    
    const result1 = gcdOfArrayIterative(testCase);
    console.log(`Iterative approach: ${result1}`);
    
    const result2 = gcdOfArrayRecursive(testCase);
    console.log(`Recursive approach: ${result2}`);
    
    const result3 = gcdOfArrayFunctional(testCase);
    console.log(`Functional approach: ${result3}`);
    
    const result4 = gcdOfArrayMemoized(testCase);
    console.log(`Memoized approach: ${result4}`);
    
    const result5 = gcdOfArrayBigInt(testCase);
    console.log(`BigInt approach: ${result5}`);
    
    // Generator approach
    console.log('Generator approach:');
    const generator = gcdOfArrayGenerator(testCase);
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
  const performanceTest = (func, arr, name) => {
    const start = performance.now();
    func(arr);
    const end = performance.now();
    console.log(`${name}: ${end - start}ms`);
  };
  
  // Run performance tests
  console.log('\n=== Performance Comparison ===');
  const testArray = Array.from({ length: 1000 }, (_, i) => (i + 1) * 6);
  
  performanceTest(gcdOfArrayIterative, testArray, 'Iterative approach');
  performanceTest(gcdOfArrayRecursive, testArray, 'Recursive approach');
  performanceTest(gcdOfArrayFunctional, testArray, 'Functional approach');
  performanceTest(gcdOfArrayMemoized, testArray, 'Memoized approach');
  performanceTest(gcdOfArrayBigInt, testArray, 'BigInt approach');
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    gcdOfArrayIterative,
    gcdOfArrayRecursive,
    gcdOfArrayFunctional,
    gcdOfArrayMemoized,
    gcdOfArrayBigInt,
    gcdOfArrayGenerator
  };
}
