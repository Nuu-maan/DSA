// Count primes in a range

/**
 * Approach 1: Basic iteration with prime checking
 * Time Complexity: O((R-L+1) * √R)
 * Space Complexity: O(1)
 */
const countPrimesBasic = (L, R) => {
  // Helper function to check if a number is prime
  const isPrime = (n) => {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;
    
    for (let i = 5; i * i <= n; i += 6) {
      if (n % i === 0 || n % (i + 2) === 0) return false;
    }
    
    return true;
  };
  
  let count = 0;
  for (let i = L; i <= R; i++) {
    if (isPrime(i)) count++;
  }
  
  return count;
};

/**
 * Approach 2: Sieve of Eratosthenes
 * Time Complexity: O(R log log R)
 * Space Complexity: O(R)
 */
const countPrimesSieve = (L, R) => {
  // Create a boolean array and initialize all entries as true
  const prime = new Array(R + 1).fill(true);
  prime[0] = prime[1] = false;
  
  // Sieve of Eratosthenes
  for (let p = 2; p * p <= R; p++) {
    if (prime[p]) {
      // Update all multiples of p
      for (let i = p * p; i <= R; i += p) {
        prime[i] = false;
      }
    }
  }
  
  // Count primes in range [L, R]
  let count = 0;
  for (let i = L; i <= R; i++) {
    if (prime[i]) count++;
  }
  
  return count;
};

/**
 * Approach 3: Segmented Sieve (for large ranges)
 * Time Complexity: O(R log log R)
 * Space Complexity: O(√R)
 */
const countPrimesSegmented = (L, R) => {
  // Find all primes up to √R
  const limit = Math.floor(Math.sqrt(R)) + 1;
  const prime = new Array(limit + 1).fill(true);
  prime[0] = prime[1] = false;
  
  for (let p = 2; p * p <= limit; p++) {
    if (prime[p]) {
      for (let i = p * p; i <= limit; i += p) {
        prime[i] = false;
      }
    }
  }
  
  // Collect all primes up to √R
  const primes = [];
  for (let i = 2; i <= limit; i++) {
    if (prime[i]) primes.push(i);
  }
  
  // Create an array for the range [L, R]
  const rangeSize = R - L + 1;
  const rangePrime = new Array(rangeSize).fill(true);
  
  // Mark multiples of primes in range [L, R]
  for (const p of primes) {
    // Find the first multiple of p in range [L, R]
    let start = Math.max(p * p, Math.ceil(L / p) * p);
    
    // Mark multiples of p as not prime
    for (let i = start; i <= R; i += p) {
      rangePrime[i - L] = false;
    }
  }
  
  // Special case for L = 1
  if (L === 1) rangePrime[0] = false;
  
  // Count primes in range [L, R]
  let count = 0;
  for (let i = 0; i < rangeSize; i++) {
    if (rangePrime[i]) count++;
  }
  
  return count;
};

/**
 * Approach 4: Functional approach using array methods
 * Time Complexity: O((R-L+1) * √R)
 * Space Complexity: O(R-L+1)
 */
const countPrimesFunctional = (L, R) => {
  // Helper function to check if a number is prime
  const isPrime = (n) => {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;
    
    for (let i = 5; i * i <= n; i += 6) {
      if (n % i === 0 || n % (i + 2) === 0) return false;
    }
    
    return true;
  };
  
  // Create array of numbers in range and filter primes
  return Array.from(
    { length: R - L + 1 },
    (_, i) => L + i
  ).filter(isPrime).length;
};

/**
 * Approach 5: Using Map for memoization
 * Time Complexity: O((R-L+1) * √R) with caching
 * Space Complexity: O(k) where k is number of unique calls
 */
const countPrimesMemoized = (() => {
  const cache = new Map();
  
  // Helper function to check if a number is prime (with memoization)
  const isPrime = (n) => {
    if (cache.has(`prime_${n}`)) return cache.get(`prime_${n}`);
    
    if (n <= 1) {
      cache.set(`prime_${n}`, false);
      return false;
    }
    if (n <= 3) {
      cache.set(`prime_${n}`, true);
      return true;
    }
    if (n % 2 === 0 || n % 3 === 0) {
      cache.set(`prime_${n}`, false);
      return false;
    }
    
    for (let i = 5; i * i <= n; i += 6) {
      if (n % i === 0 || n % (i + 2) === 0) {
        cache.set(`prime_${n}`, false);
        return false;
      }
    }
    
    cache.set(`prime_${n}`, true);
    return true;
  };
  
  return (L, R) => {
    const key = `${L}_${R}`;
    if (cache.has(key)) return cache.get(key);
    
    let count = 0;
    for (let i = L; i <= R; i++) {
      if (isPrime(i)) count++;
    }
    
    cache.set(key, count);
    return count;
  };
})();

/**
 * Approach 6: Generator function for step-by-step visualization
 * Time Complexity: O((R-L+1) * √R)
 * Space Complexity: O(1)
 */
function* countPrimesGenerator(L, R) {
  yield { step: 'initial', L, R };
  
  // Helper function to check if a number is prime
  const isPrime = (n) => {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;
    
    for (let i = 5; i * i <= n; i += 6) {
      if (n % i === 0 || n % (i + 2) === 0) return false;
    }
    
    return true;
  };
  
  yield { step: 'counting_primes', range: [L, R] };
  
  let count = 0;
  for (let i = L; i <= R; i++) {
    yield { step: 'checking', number: i };
    if (isPrime(i)) {
      count++;
      yield { step: 'found_prime', prime: i, count };
    }
  }
  
  yield { step: 'result', count };
  return count;
}

// Example usage and test cases
if (typeof window === 'undefined') {  // Node.js environment
  console.log('=== Testing Count Primes in Range ===');
  
  const testCases = [
    { L: 10, R: 20 },
    { L: 1, R: 10 },
    { L: 50, R: 100 },
    { L: 1, R: 1000 }
  ];
  
  testCases.forEach((testCase) => {
    const { L, R } = testCase;
    console.log(`\nTesting range [${L}, ${R}]`);
    
    const result1 = countPrimesBasic(L, R);
    console.log(`Basic approach: ${result1}`);
    
    const result2 = countPrimesSieve(L, R);
    console.log(`Sieve approach: ${result2}`);
    
    const result3 = countPrimesSegmented(L, R);
    console.log(`Segmented Sieve approach: ${result3}`);
    
    const result4 = countPrimesFunctional(L, R);
    console.log(`Functional approach: ${result4}`);
    
    const result5 = countPrimesMemoized(L, R);
    console.log(`Memoized approach: ${result5}`);
    
    // Generator approach
    console.log('Generator approach:');
    const generator = countPrimesGenerator(L, R);
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
  const performanceTest = (func, L, R, name) => {
    const start = performance.now();
    func(L, R);
    const end = performance.now();
    console.log(`${name}: ${end - start}ms`);
  };
  
  // Run performance tests
  console.log('\n=== Performance Comparison ===');
  const testRange = { L: 1, R: 10000 };
  
  performanceTest(countPrimesBasic, testRange.L, testRange.R, 'Basic approach');
  performanceTest(countPrimesSieve, testRange.L, testRange.R, 'Sieve approach');
  performanceTest(countPrimesSegmented, testRange.L, testRange.R, 'Segmented Sieve approach');
  performanceTest(countPrimesFunctional, testRange.L, testRange.R, 'Functional approach');
  performanceTest(countPrimesMemoized, testRange.L, testRange.R, 'Memoized approach');
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    countPrimesBasic,
    countPrimesSieve,
    countPrimesSegmented,
    countPrimesFunctional,
    countPrimesMemoized,
    countPrimesGenerator
  };
}
