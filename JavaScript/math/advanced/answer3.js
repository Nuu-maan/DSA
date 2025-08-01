// Super Pow

/**
 * Approach 1: Modular exponentiation with array-based exponent
 * Time Complexity: O(n) where n is the length of the exponent array
 * Space Complexity: O(1)
 */
const superPowModular = (a, b) => {
  const MOD = 1337;
  
  // Helper function for modular exponentiation
  const modPow = (base, exp, mod) => {
    let result = 1;
    base %= mod;
    
    while (exp > 0) {
      if (exp % 2 === 1) {
        result = (result * base) % mod;
      }
      base = (base * base) % mod;
      exp = Math.floor(exp / 2);
    }
    
    return result;
  };
  
  let result = 1;
  
  // Process each digit of the exponent array
  for (let i = 0; i < b.length; i++) {
    // result = result^10 * a^b[i] mod 1337
    result = modPow(result, 10, MOD) * modPow(a, b[i], MOD);
    result %= MOD;
  }
  
  return result;
};

/**
 * Approach 2: Recursive approach with modular arithmetic
 * Time Complexity: O(n) where n is the length of the exponent array
 * Space Complexity: O(n) for the recursion stack
 */
const superPowRecursive = (a, b) => {
  const MOD = 1337;
  
  // Helper function for modular exponentiation
  const modPow = (base, exp, mod) => {
    if (exp === 0) return 1;
    if (exp === 1) return base % mod;
    
    const half = modPow(base, Math.floor(exp / 2), mod);
    if (exp % 2 === 0) {
      return (half * half) % mod;
    } else {
      return (half * half * (base % mod)) % mod;
    }
  };
  
  // Base case
  if (b.length === 0) return 1;
  if (b.length === 1) return modPow(a, b[0], MOD);
  
  // Take the last digit and process the rest
  const lastDigit = b.pop();
  const rest = superPowRecursive(a, b);
  
  // result = (rest^10) * (a^lastDigit) mod 1337
  return (modPow(rest, 10, MOD) * modPow(a, lastDigit, MOD)) % MOD;
};

/**
 * Approach 3: Functional approach using array reduction
 * Time Complexity: O(n) where n is the length of the exponent array
 * Space Complexity: O(1)
 */
const superPowFunctional = (a, b) => {
  const MOD = 1337;
  
  // Helper function for modular exponentiation
  const modPow = (base, exp) => {
    let result = 1;
    base %= MOD;
    
    while (exp > 0) {
      if (exp % 2 === 1) {
        result = (result * base) % MOD;
      }
      base = (base * base) % MOD;
      exp = Math.floor(exp / 2);
    }
    
    return result;
  };
  
  // Process the exponent array from left to right
  return b.reduce((result, digit) => {
    return (modPow(result, 10) * modPow(a, digit)) % MOD;
  }, 1);
};

/**
 * Approach 4: Using Map for memoization of modular powers
 * Time Complexity: O(n) where n is the length of the exponent array
 * Space Complexity: O(k) where k is the number of unique base/exponent pairs
 */
const superPowMemoized = (() => {
  const MOD = 1337;
  const cache = new Map();
  
  // Helper function for modular exponentiation with memoization
  const modPow = (base, exp) => {
    const key = `${base % MOD}_${exp}`;
    if (cache.has(key)) return cache.get(key);
    
    let result = 1;
    let b = base % MOD;
    let e = exp;
    
    while (e > 0) {
      if (e % 2 === 1) {
        result = (result * b) % MOD;
      }
      b = (b * b) % MOD;
      e = Math.floor(e / 2);
    }
    
    cache.set(key, result);
    return result;
  };
  
  return (a, b) => {
    let result = 1;
    
    for (let i = 0; i < b.length; i++) {
      result = (modPow(result, 10) * modPow(a, b[i])) % MOD;
    }
    
    return result;
  };
})();

/**
 * Approach 5: Using BigInt for handling large numbers
 * Time Complexity: O(n) where n is the length of the exponent array
 * Space Complexity: O(1)
 */
const superPowBigInt = (a, b) => {
  const MOD = 1337n;
  const bigA = BigInt(a);
  
  // Helper function for modular exponentiation with BigInt
  const modPow = (base, exp) => {
    let result = 1n;
    let b = base % MOD;
    let e = BigInt(exp);
    
    while (e > 0n) {
      if (e % 2n === 1n) {
        result = (result * b) % MOD;
      }
      b = (b * b) % MOD;
      e /= 2n;
    }
    
    return result;
  };
  
  let result = 1n;
  
  for (let i = 0; i < b.length; i++) {
    result = (modPow(result, 10) * modPow(bigA, b[i])) % MOD;
  }
  
  return Number(result);
};

/**
 * Approach 6: Generator function for step-by-step visualization
 * Time Complexity: O(n) where n is the length of the exponent array
 * Space Complexity: O(1)
 */
function* superPowGenerator(a, b) {
  const MOD = 1337;
  
  yield { step: 'initial', a, b };
  
  // Helper function for modular exponentiation
  const modPow = (base, exp, mod) => {
    let result = 1;
    base %= mod;
    
    while (exp > 0) {
      if (exp % 2 === 1) {
        result = (result * base) % mod;
      }
      base = (base * base) % mod;
      exp = Math.floor(exp / 2);
    }
    
    return result;
  };
  
  let result = 1;
  
  yield { step: 'start_calculation', result };
  
  // Process each digit of the exponent array
  for (let i = 0; i < b.length; i++) {
    yield { step: 'processing_digit', index: i, digit: b[i], currentResult: result };
    
    // result = result^10 * a^b[i] mod 1337
    const pow10 = modPow(result, 10, MOD);
    const powDigit = modPow(a, b[i], MOD);
    result = (pow10 * powDigit) % MOD;
    
    yield { step: 'updated_result', result, pow10, powDigit };
  }
  
  yield { step: 'final_result', result };
  return result;
}

// Example usage and test cases
if (typeof window === 'undefined') {  // Node.js environment
  console.log('=== Testing Super Pow ===');
  
  const testCases = [
    { a: 2, b: [3] },
    { a: 2, b: [1, 0] },
    { a: 1, b: [4, 3, 3, 8, 5, 2] },
    { a: 2147483647, b: [2, 0, 0] },
    { a: 2, b: [1, 1, 1] },
    { a: 3, b: [2, 5] }
  ];
  
  testCases.forEach((testCase, index) => {
    const { a, b } = testCase;
    console.log(`\nTesting case ${index + 1}: a = ${a}, b = [${b.join(', ')}]`);
    
    const result1 = superPowModular(a, [...b]);  // Use spread to avoid mutating original array
    console.log(`Modular approach: ${result1}`);
    
    const result2 = superPowRecursive(a, [...b]);
    console.log(`Recursive approach: ${result2}`);
    
    const result3 = superPowFunctional(a, [...b]);
    console.log(`Functional approach: ${result3}`);
    
    const result4 = superPowMemoized(a, [...b]);
    console.log(`Memoized approach: ${result4}`);
    
    const result5 = superPowBigInt(a, [...b]);
    console.log(`BigInt approach: ${result5}`);
    
    // Generator approach
    console.log('Generator approach:');
    const generator = superPowGenerator(a, [...b]);
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
  const performanceTest = (func, a, b, name) => {
    const start = performance.now();
    func(a, b);
    const end = performance.now();
    console.log(`${name}: ${end - start}ms`);
  };
  
  // Run performance tests
  console.log('\n=== Performance Comparison ===');
  const testA = 2;
  const testB = Array.from({ length: 100 }, () => Math.floor(Math.random() * 10));
  
  performanceTest(superPowModular, testA, [...testB], 'Modular approach');
  performanceTest(superPowRecursive, testA, [...testB], 'Recursive approach');
  performanceTest(superPowFunctional, testA, [...testB], 'Functional approach');
  performanceTest(superPowMemoized, testA, [...testB], 'Memoized approach');
  performanceTest(superPowBigInt, testA, [...testB], 'BigInt approach');
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    superPowModular,
    superPowRecursive,
    superPowFunctional,
    superPowMemoized,
    superPowBigInt,
    superPowGenerator
  };
}
