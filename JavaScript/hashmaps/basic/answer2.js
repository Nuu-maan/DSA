// Find the first non-repeating character in a string
// Source: https://www.geeksforgeeks.org/given-a-string-find-its-first-non-repeating-character/

/**
 * Approach 1: Using Map for character frequency counting
 * Time Complexity: O(n) where n is the length of the string
 * Space Complexity: O(k) where k is the number of unique characters
 */
const firstNonRepeatingMap = (str) => {
  // Create a Map to store frequency of each character
  const charCount = new Map();
  
  // Count frequency of each character
  for (const char of str) {
    charCount.set(char, (charCount.get(char) || 0) + 1);
  }
  
  // Find the first character with frequency 1
  for (let i = 0; i < str.length; i++) {
    if (charCount.get(str[i]) === 1) {
      return str[i];
    }
  }
  
  return -1;
};

/**
 * Approach 2: Using Object for character frequency counting
 * Time Complexity: O(n) where n is the length of the string
 * Space Complexity: O(k) where k is the number of unique characters
 */
const firstNonRepeatingObject = (str) => {
  // Create an object to store frequency of each character
  const charCount = {};
  
  // Count frequency of each character
  for (const char of str) {
    charCount[char] = (charCount[char] || 0) + 1;
  }
  
  // Find the first character with frequency 1
  for (let i = 0; i < str.length; i++) {
    if (charCount[str[i]] === 1) {
      return str[i];
    }
  }
  
  return -1;
};

/**
 * Approach 3: Functional approach using array methods
 * Time Complexity: O(n) where n is the length of the string
 * Space Complexity: O(k) where k is the number of unique characters
 */
const firstNonRepeatingFunctional = (str) => {
  // Create frequency map using reduce
  const charCount = [...str].reduce((acc, char) => {
    acc.set(char, (acc.get(char) || 0) + 1);
    return acc;
  }, new Map());
  
  // Find first non-repeating character using find
  const result = [...str].find(char => charCount.get(char) === 1);
  
  return result || -1;
};

/**
 * Approach 4: Two-pass approach with Set for tracking seen characters
 * Time Complexity: O(n) where n is the length of the string
 * Space Complexity: O(k) where k is the number of unique characters
 */
const firstNonRepeatingTwoPass = (str) => {
  // First pass: count characters
  const charCount = new Map();
  for (const char of str) {
    charCount.set(char, (charCount.get(char) || 0) + 1);
  }
  
  // Second pass: find first non-repeating character
  for (const char of str) {
    if (charCount.get(char) === 1) {
      return char;
    }
  }
  
  return -1;
};

/**
 * Approach 5: Using array methods with indexOf and lastIndexOf
 * Time Complexity: O(n²) in worst case
 * Space Complexity: O(1)
 */
const firstNonRepeatingIndex = (str) => {
  // Find first character where indexOf equals lastIndexOf
  for (let i = 0; i < str.length; i++) {
    if (str.indexOf(str[i]) === str.lastIndexOf(str[i])) {
      return str[i];
    }
  }
  
  return -1;
};

/**
 * Approach 6: Generator-based approach for step-by-step visualization
 * Time Complexity: O(n) where n is the length of the string
 * Space Complexity: O(k) where k is the number of unique characters
 */
function* firstNonRepeatingGenerator(str) {
  // First pass: count characters
  const charCount = new Map();
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    charCount.set(char, (charCount.get(char) || 0) + 1);
    yield { step: 'counting', index: i, character: char, count: charCount.get(char) };
  }
  
  // Second pass: find first non-repeating character
  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const isUnique = charCount.get(char) === 1;
    yield { step: 'checking', index: i, character: char, isUnique };
    
    if (isUnique) {
      return char;
    }
  }
  
  return -1;
}

// Example usage and test cases
if (typeof window === 'undefined') {  // Node.js environment
  console.log('=== Testing Find the first non-repeating character in a string ===');
  
  // Test cases
  const testCases = [
    { str: 'geeksforgeeks', expected: 'f' },
    { str: 'aabbcc', expected: -1 },
    { str: 'abcabc', expected: -1 },
    { str: 'abcdabc', expected: 'd' }
  ];
  
  // Test all approaches
  testCases.forEach((testCase, index) => {
    console.log(`\nTest Case ${index + 1}:`);
    console.log(`String: "${testCase.str}"`);
    console.log(`Expected: ${testCase.expected}`);
    
    console.log(`Map Approach: ${firstNonRepeatingMap(testCase.str)}`);
    console.log(`Object Approach: ${firstNonRepeatingObject(testCase.str)}`);
    console.log(`Functional Approach: ${firstNonRepeatingFunctional(testCase.str)}`);
    console.log(`Two-Pass Approach: ${firstNonRepeatingTwoPass(testCase.str)}`);
    console.log(`Index Approach: ${firstNonRepeatingIndex(testCase.str)}`);
    
    // Generator approach
    console.log('Generator Approach:');
    const generator = firstNonRepeatingGenerator(testCase.str);
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
  const performanceTest = (func, str, name) => {
    const start = performance.now();
    for (let i = 0; i < 10000; i++) {
      func(str);
    }
    const end = performance.now();
    console.log(`${name}: ${end - start}ms`);
  };
  
  // Run performance tests if performance object is available
  if (typeof performance !== 'undefined') {
    console.log('\n=== Performance Comparison ===');
    const longStr = 'a'.repeat(1000) + 'b' + 'c'.repeat(1000);
    
    performanceTest(firstNonRepeatingMap, longStr, 'Map Approach');
    performanceTest(firstNonRepeatingObject, longStr, 'Object Approach');
    performanceTest(firstNonRepeatingFunctional, longStr, 'Functional Approach');
  } else {
    console.log('\nPerformance testing requires browser environment or Node.js with performance API');
  }
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    firstNonRepeatingMap,
    firstNonRepeatingObject,
    firstNonRepeatingFunctional,
    firstNonRepeatingTwoPass,
    firstNonRepeatingIndex,
    firstNonRepeatingGenerator
  };
}
