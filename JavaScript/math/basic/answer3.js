// Find LCM of an array of numbers

/**
 * Approach 1: Iterative with built-in GCD function
 * Time Complexity: O(n * log(min(a,b))) where n is array length
 * Space Complexity: O(1)
 */
const lcmOfArrayIterative = (arr) => {
  if (arr.length === 0) return 0;
  if (arr.length === 1) return arr[0];
  
  // Helper function to find GCD of two numbers
  const gcd = (a, b) => {
    while (b !== 0) {
      [a, b] = [b, a % b];
    }
    return a;
  };
  
  // Helper function to find LCM of two numbers
  const lcm = (a, b) => (a * b) / gcd(a, b);
  
  // Apply LCM iteratively to all elements
  let result = arr[0];
  for (let i = 1; i < arr.length; i++) {
    result = lcm(result, arr[i]);
  }
  
  return result;
};

/**
 * Approach 2: Recursive with reduce
 * Time Complexity: O(n * log(min(a,b)))
 * Space Complexity: O(n) due to recursion stack
 */
const lcmOfArrayRecursive = (arr) => {
  if (arr.length === 0) return 0;
  if (arr.length === 1) return arr[0];
  
  // Helper function to find GCD of two numbers
  const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
  
  // Helper function to find LCM of two numbers
  const lcm = (a, b) => (a * b) / gcd(a, b);
  
  // Use reduce to apply LCM to all elements
  return arr.reduce((acc, curr) => lcm(acc, curr));
};

/**
 * Approach 3: Functional approach using array methods
 * Time Complexity: O(n * log(min(a,b)))
 * Space Complexity: O(1)
 */
const lcmOfArrayFunctional = (arr) => {
  if (arr.length === 0) return 0;
  if (arr.length === 1) return arr[0];
  
  // Helper function to find GCD of two numbers
  const gcd = (a, b) => {
    while (b !== 0) {
      [a, b] = [b, a % b];
    }
    return a;
  };
  
  // Helper function to find LCM of two numbers
  const lcm = (a, b) => (a * b) / gcd(a, b);
  
  // Use functional approach with spread operator
  return arr.slice(1).reduce((acc, curr) => lcm(acc, curr), arr[0]);
};

/**
 * Approach 4: Using Map for memoization
 * Time Complexity: O(n * log(min(a,b))) with caching
 * Space Complexity: O(k) where k is number of unique pairs
 */
const lcmOfArrayMemoized = (() => {
  const gcdCache = new Map();
  const lcmCache = new Map();
  
  // Helper function to find GCD of two numbers with memoization
  const gcd = (a, b) => {
    const key = `${Math.min(a, b)}_${Math.max(a, b)}`;
    if (gcdCache.has(key)) return gcdCache.get(key);
    
    let result = a;
    let divisor = b;
    while (divisor !== 0) {
      [result, divisor] = [divisor, result % divisor];
    }
    
    gcdCache.set(key, result);
    return result;
  };
  
  // Helper function to find LCM of two numbers with memoization
  const lcm = (a, b) => {
    const key = `${Math.min(a, b)}_${Math.max(a, b)}`;
    if (lcmCache.has(key)) return lcmCache.get(key);
    
    const result = (a * b) / gcd(a, b);
    lcmCache.set(key, result);
    return result;
  };
  
  return (arr) => {
    if (arr.length === 0) return 0;
    if (arr.length === 1) return arr[0];
    
    // Apply memoized LCM iteratively
    let result = arr[0];
    for (let i = 1; i < arr.length; i++) {
      result = lcm(result, arr[i]);
    }
    
    return result;
  };
})();

/**
 * Approach 5: Using BigInt for very large numbers
 * Time Complexity: O(n * log(min(a,b)))
 * Space Complexity: O(1)
 */
const lcmOfArrayBigInt = (arr) => {
  if (arr.length === 0) return 0n;
  if (arr.length === 1) return BigInt(arr[0]);
  
  // Helper function to find GCD of two BigInt numbers
  const gcd = (a, b) => {
    while (b !== 0n) {
      [a, b] = [b, a % b];
    }
    return a;
  };
  
  // Helper function to find LCM of two BigInt numbers
  const lcm = (a, b) => (a * b) / gcd(a, b);
  
  // Convert all numbers to BigInt and apply LCM
  const bigArr = arr.map(BigInt);
  let result = bigArr[0];
  for (let i = 1; i < bigArr.length; i++) {
    result = lcm(result, bigArr[i]);
  }
  
  return result;
};

/**
 * Approach 6: Generator function for step-by-step visualization
 * Time Complexity: O(n * log(min(a,b)))
 * Space Complexity: O(1)
 */
function* lcmOfArrayGenerator(arr) {
  yield { step: 'initial', array: arr };
  
  if (arr.length === 0) {
    yield { step: 'result', lcm: 0 };
    return 0;
  }
  
  if (arr.length === 1) {
    yield { step: 'result', lcm: arr[0] };
    return arr[0];
  }
  
  // Helper function to find GCD of two numbers
  const gcd = (a, b) => {
    while (b !== 0) {
      [a, b] = [b, a % b];
    }
    return a;
  };
  
  // Helper function to find LCM of two numbers
  const lcm = (a, b) => (a * b) / gcd(a, b);
  
  yield { step: 'calculating_lcm', elements: [arr[0]] };
  let result = arr[0];
  
  for (let i = 1; i < arr.length; i++) {
    yield { step: 'processing', current: arr[i], accumulated: result };
    result = lcm(result, arr[i]);
    yield { step: 'intermediate_result', lcm: result };
  }
  
  yield { step: 'result', lcm: result };
  return result;
}

// Example usage and test cases
if (typeof window === 'undefined') {  // Node.js environment
  console.log('=== Testing LCM of Array ===');
  
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
    
    const result1 = lcmOfArrayIterative(testCase);
    console.log(`Iterative approach: ${result1}`);
    
    const result2 = lcmOfArrayRecursive(testCase);
    console.log(`Recursive approach: ${result2}`);
    
    const result3 = lcmOfArrayFunctional(testCase);
    console.log(`Functional approach: ${result3}`);
    
    const result4 = lcmOfArrayMemoized(testCase);
    console.log(`Memoized approach: ${result4}`);
    
    const result5 = lcmOfArrayBigInt(testCase);
    console.log(`BigInt approach: ${result5}`);
    
    // Generator approach
    console.log('Generator approach:');
    const generator = lcmOfArrayGenerator(testCase);
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
  const testArray = Array.from({ length: 100 }, (_, i) => (i + 1) * 2);
  
  performanceTest(lcmOfArrayIterative, testArray, 'Iterative approach');
  performanceTest(lcmOfArrayRecursive, testArray, 'Recursive approach');
  performanceTest(lcmOfArrayFunctional, testArray, 'Functional approach');
  performanceTest(lcmOfArrayMemoized, testArray, 'Memoized approach');
  performanceTest(lcmOfArrayBigInt, testArray, 'BigInt approach');
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    lcmOfArrayIterative,
    lcmOfArrayRecursive,
    lcmOfArrayFunctional,
    lcmOfArrayMemoized,
    lcmOfArrayBigInt,
    lcmOfArrayGenerator
  };
}
