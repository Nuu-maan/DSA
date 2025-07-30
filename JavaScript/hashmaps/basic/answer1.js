// Find whether an array is a subset of another array
// Source: https://www.geeksforgeeks.org/find-whether-an-array-is-subset-of-another-array-set-1/

/**
 * Approach 1: Using Set for O(1) lookups
 * Time Complexity: O(m + n) where m and n are lengths of arrays
 * Space Complexity: O(m) for storing elements of first array
 */
const isSubsetSet = (a, b) => {
  // Create a Set from array a for O(1) lookups
  const setA = new Set(a);
  
  // Check if all elements of b are present in setA
  return b.every(element => setA.has(element));
};

/**
 * Approach 2: Using Map for frequency counting
 * Time Complexity: O(m + n) where m and n are lengths of arrays
 * Space Complexity: O(m) for storing elements of first array
 */
const isSubsetMap = (a, b) => {
  // Create a Map to store frequency of elements in array a
  const mapA = new Map();
  
  // Populate the map with elements from array a
  a.forEach(element => mapA.set(element, (mapA.get(element) || 0) + 1));
  
  // Check if all elements of b are present in mapA
  return b.every(element => mapA.has(element));
};

/**
 * Approach 3: Functional approach using reduce
 * Time Complexity: O(m + n) where m and n are lengths of arrays
 * Space Complexity: O(m) for storing elements of first array
 */
const isSubsetFunctional = (a, b) => {
  // Create a Set from array a using reduce
  const setA = a.reduce((acc, element) => acc.add(element), new Set());
  
  // Check if all elements of b are present in setA
  return b.reduce((isSubset, element) => isSubset && setA.has(element), true);
};

/**
 * Approach 4: Using array methods (filter)
 * Time Complexity: O(m * n) in worst case
 * Space Complexity: O(1)
 */
const isSubsetFilter = (a, b) => {
  // Count how many elements of b are present in a
  const count = b.filter(element => a.includes(element)).length;
  
  // If all elements of b are found in a, count will equal b's length
  return count === b.length;
};

/**
 * Approach 5: Traditional loop approach
 * Time Complexity: O(m * n) in worst case
 * Space Complexity: O(1)
 */
const isSubsetLoop = (a, b) => {
  // For each element in b, check if it exists in a
  for (let i = 0; i < b.length; i++) {
    let found = false;
    for (let j = 0; j < a.length; j++) {
      if (b[i] === a[j]) {
        found = true;
        break;
      }
    }
    if (!found) return false;
  }
  return true;
};

/**
 * Approach 6: Generator-based approach for step-by-step visualization
 * Time Complexity: O(m + n) where m and n are lengths of arrays
 * Space Complexity: O(m) for storing elements of first array
 */
function* isSubsetGenerator(a, b) {
  const setA = new Set(a);
  
  for (let i = 0; i < b.length; i++) {
    const isPresent = setA.has(b[i]);
    yield { index: i, element: b[i], isPresent };
    
    if (!isPresent) {
      return false;
    }
  }
  
  return true;
}

// Example usage and test cases
if (typeof window === 'undefined') {  // Node.js environment
  console.log('=== Testing Find whether an array is a subset of another array ===');
  
  // Test cases
  const testCases = [
    { a: [11, 1, 13, 21, 3, 7], b: [11, 3, 7, 1], expected: true },
    { a: [1, 2, 3, 4, 5, 6], b: [1, 2, 4], expected: true },
    { a: [10, 5, 2, 23, 19], b: [19, 5, 3], expected: false }
  ];
  
  // Test all approaches
  testCases.forEach((testCase, index) => {
    console.log(`\nTest Case ${index + 1}:`);
    console.log(`a = [${testCase.a}], b = [${testCase.b}]`);
    console.log(`Expected: ${testCase.expected}`);
    
    console.log(`Set Approach: ${isSubsetSet(testCase.a, testCase.b)}`);
    console.log(`Map Approach: ${isSubsetMap(testCase.a, testCase.b)}`);
    console.log(`Functional Approach: ${isSubsetFunctional(testCase.a, testCase.b)}`);
    console.log(`Filter Approach: ${isSubsetFilter(testCase.a, testCase.b)}`);
    console.log(`Loop Approach: ${isSubsetLoop(testCase.a, testCase.b)}`);
    
    // Generator approach
    console.log('Generator Approach:');
    const generator = isSubsetGenerator(testCase.a, testCase.b);
    let result;
    do {
      result = generator.next();
      if (!result.done) {
        console.log(`  Element ${result.value.element}: ${result.value.isPresent ? 'Found' : 'Not Found'}`);
      }
    } while (!result.done);
    console.log(`  Final Result: ${result.value}`);
  });
  
  // Performance comparison utility
  const performanceTest = (func, a, b, name) => {
    const start = performance.now();
    for (let i = 0; i < 10000; i++) {
      func(a, b);
    }
    const end = performance.now();
    console.log(`${name}: ${end - start}ms`);
  };
  
  // Run performance tests if performance object is available
  if (typeof performance !== 'undefined') {
    console.log('\n=== Performance Comparison ===');
    const largeA = Array.from({length: 1000}, (_, i) => i);
    const largeB = Array.from({length: 100}, (_, i) => i * 10);
    
    performanceTest(isSubsetSet, largeA, largeB, 'Set Approach');
    performanceTest(isSubsetMap, largeA, largeB, 'Map Approach');
    performanceTest(isSubsetFunctional, largeA, largeB, 'Functional Approach');
  } else {
    console.log('\nPerformance testing requires browser environment or Node.js with performance API');
  }
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    isSubsetSet,
    isSubsetMap,
    isSubsetFunctional,
    isSubsetFilter,
    isSubsetLoop,
    isSubsetGenerator
  };
}
