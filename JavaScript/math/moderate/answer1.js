// Pow(x, n)

/**
 * Approach 1: Recursive with divide and conquer
 * Time Complexity: O(log n)
 * Space Complexity: O(log n) due to recursion stack
 */
const myPowRecursive = (x, n) => {
  // Base cases
  if (n === 0) return 1;
  if (n === 1) return x;
  if (n === -1) return 1 / x;
  
  // Handle negative exponents
  if (n < 0) {
    return 1 / myPowRecursive(x, -n);
  }
  
  // Divide and conquer
  const half = myPowRecursive(x, Math.floor(n / 2));
  
  if (n % 2 === 0) {
    return half * half;
  } else {
    return half * half * x;
  }
};

/**
 * Approach 2: Iterative with bit manipulation
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
const myPowIterative = (x, n) => {
  // Handle edge cases
  if (n === 0) return 1;
  if (x === 1) return 1;
  if (x === -1) return n % 2 === 0 ? 1 : -1;
  
  // Handle negative exponents
  let base = x;
  let exponent = n;
  let result = 1;
  
  if (exponent < 0) {
    base = 1 / base;
    exponent = -exponent;
  }
  
  // Fast exponentiation using bit manipulation
  while (exponent > 0) {
    // If exponent is odd, multiply base with result
    if (exponent % 2 === 1) {
      result *= base;
    }
    
    // Square the base and halve the exponent
    base *= base;
    exponent = Math.floor(exponent / 2);
  }
  
  return result;
};

/**
 * Approach 3: Functional approach using array reduction
 * Time Complexity: O(log n)
 * Space Complexity: O(log n)
 */
const myPowFunctional = (x, n) => {
  if (n === 0) return 1;
  
  // Handle negative exponents
  const isNegative = n < 0;
  const absN = Math.abs(n);
  
  // Convert exponent to binary representation
  const binary = absN.toString(2);
  
  // Use reduce to calculate result
  const result = binary.split('').reduceRight((acc, bit, index) => {
    const powerOf2 = Math.pow(2, binary.length - 1 - index);
    const term = bit === '1' ? Math.pow(x, powerOf2) : 1;
    return acc * term;
  }, 1);
  
  return isNegative ? 1 / result : result;
};

/**
 * Approach 4: Using Map for memoization
 * Time Complexity: O(log n) with caching
 * Space Complexity: O(k) where k is number of unique calls
 */
const myPowMemoized = (() => {
  const cache = new Map();
  
  const pow = (x, n) => {
    // Create cache key
    const key = `${x}_${n}`;
    if (cache.has(key)) return cache.get(key);
    
    // Base cases
    if (n === 0) {
      cache.set(key, 1);
      return 1;
    }
    if (n === 1) {
      cache.set(key, x);
      return x;
    }
    if (n === -1) {
      const result = 1 / x;
      cache.set(key, result);
      return result;
    }
    
    // Handle negative exponents
    if (n < 0) {
      const result = 1 / pow(x, -n);
      cache.set(key, result);
      return result;
    }
    
    // Divide and conquer
    const half = pow(x, Math.floor(n / 2));
    const result = n % 2 === 0 ? half * half : half * half * x;
    
    cache.set(key, result);
    return result;
  };
  
  return pow;
})();

/**
 * Approach 5: Using BigInt for very large exponents
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
const myPowBigInt = (x, n) => {
  // Handle edge cases
  if (n === 0) return 1;
  if (x === 1) return 1;
  if (x === -1) return n % 2 === 0 ? 1 : -1;
  
  // Convert to BigInt for large numbers
  let base = x;
  let exponent = BigInt(n);
  let result = 1;
  
  const isNegative = exponent < 0;
  if (isNegative) {
    base = 1 / base;
    exponent = -exponent;
  }
  
  // Fast exponentiation with BigInt
  while (exponent > 0) {
    if (exponent % 2n === 1n) {
      result *= base;
    }
    
    base *= base;
    exponent /= 2n;
  }
  
  return result;
};

/**
 * Approach 6: Generator function for step-by-step visualization
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
function* myPowGenerator(x, n) {
  yield { step: 'initial', x, n };
  
  // Base cases
  if (n === 0) {
    yield { step: 'result', result: 1 };
    return 1;
  }
  if (n === 1) {
    yield { step: 'result', result: x };
    return x;
  }
  if (n === -1) {
    const result = 1 / x;
    yield { step: 'result', result };
    return result;
  }
  
  // Handle negative exponents
  const isNegative = n < 0;
  let base = x;
  let exponent = isNegative ? -n : n;
  
  if (isNegative) {
    yield { step: 'negative_exponent', base: 1/x, exponent };
    base = 1 / x;
  }
  
  let result = 1;
  yield { step: 'start_calculation', base, exponent, result };
  
  // Fast exponentiation
  while (exponent > 0) {
    yield { step: 'iteration', exponent, base, result };
    
    if (exponent % 2 === 1) {
      result *= base;
      yield { step: 'multiply_result', result };
    }
    
    base *= base;
    exponent = Math.floor(exponent / 2);
    yield { step: 'update_base', base, exponent };
  }
  
  if (isNegative) {
    result = 1 / result;
    yield { step: 'final_negative', result };
  }
  
  yield { step: 'result', result };
  return result;
}

// Example usage and test cases
if (typeof window === 'undefined') {  // Node.js environment
  console.log('=== Testing Pow(x, n) ===');
  
  const testCases = [
    { x: 2.00000, n: 10 },
    { x: 2.10000, n: 3 },
    { x: 2.00000, n: -2 },
    { x: 3.00000, n: 0 },
    { x: 1.00000, n: 2147483647 },
    { x: 2.00000, n: -2147483648 }
  ];
  
  testCases.forEach((testCase) => {
    const { x, n } = testCase;
    console.log(`\nTesting x = ${x}, n = ${n}`);
    
    const result1 = myPowRecursive(x, n);
    console.log(`Recursive approach: ${result1}`);
    
    const result2 = myPowIterative(x, n);
    console.log(`Iterative approach: ${result2}`);
    
    const result3 = myPowFunctional(x, n);
    console.log(`Functional approach: ${result3}`);
    
    const result4 = myPowMemoized(x, n);
    console.log(`Memoized approach: ${result4}`);
    
    const result5 = myPowBigInt(x, n);
    console.log(`BigInt approach: ${result5}`);
    
    // Generator approach
    console.log('Generator approach:');
    const generator = myPowGenerator(x, n);
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
  const performanceTest = (func, x, n, name) => {
    const start = performance.now();
    func(x, n);
    const end = performance.now();
    console.log(`${name}: ${end - start}ms`);
  };
  
  // Run performance tests
  console.log('\n=== Performance Comparison ===');
  const testParams = { x: 1.0001, n: 1000000 };
  
  performanceTest(myPowRecursive, testParams.x, testParams.n, 'Recursive approach');
  performanceTest(myPowIterative, testParams.x, testParams.n, 'Iterative approach');
  performanceTest(myPowFunctional, testParams.x, testParams.n, 'Functional approach');
  performanceTest(myPowMemoized, testParams.x, testParams.n, 'Memoized approach');
  performanceTest(myPowBigInt, testParams.x, testParams.n, 'BigInt approach');
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    myPowRecursive,
    myPowIterative,
    myPowFunctional,
    myPowMemoized,
    myPowBigInt,
    myPowGenerator
  };
}
