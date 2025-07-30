// Group all anagrams in an array of strings
// Source: https://leetcode.com/problems/group-anagrams/

/**
 * Approach 1: Using Map with sorted string as key
 * Time Complexity: O(n * m * log(m)) where n is number of strings and m is average length of strings
 * Space Complexity: O(n * m) for storing all strings in the map
 */
const groupAnagramsSorted = (strs) => {
  // Create a Map to group anagrams
  const anagramMap = new Map();
  
  // For each string, sort its characters and use as key
  for (const str of strs) {
    // Sort characters to create a canonical form for anagrams
    const sorted = str.split('').sort().join('');
    
    // If key exists, add to existing group, otherwise create new group
    if (anagramMap.has(sorted)) {
      anagramMap.get(sorted).push(str);
    } else {
      anagramMap.set(sorted, [str]);
    }
  }
  
  // Return all groups
  return Array.from(anagramMap.values());
};

/**
 * Approach 2: Using Map with character frequency as key
 * Time Complexity: O(n * m) where n is number of strings and m is average length of strings
 * Space Complexity: O(n * m) for storing all strings in the map
 */
const groupAnagramsFrequency = (strs) => {
  // Create a Map to group anagrams
  const anagramMap = new Map();
  
  // For each string, create a character frequency signature
  for (const str of strs) {
    // Create frequency array for 26 lowercase letters
    const freq = new Array(26).fill(0);
    
    // Count frequency of each character
    for (const char of str) {
      freq[char.charCodeAt(0) - 'a'.charCodeAt(0)]++;
    }
    
    // Convert frequency array to string key
    const key = freq.join(',');
    
    // If key exists, add to existing group, otherwise create new group
    if (anagramMap.has(key)) {
      anagramMap.get(key).push(str);
    } else {
      anagramMap.set(key, [str]);
    }
  }
  
  // Return all groups
  return Array.from(anagramMap.values());
};

/**
 * Approach 3: Functional approach using array methods
 * Time Complexity: O(n * m * log(m)) where n is number of strings and m is average length of strings
 * Space Complexity: O(n * m) for storing all strings
 */
const groupAnagramsFunctional = (strs) => {
  // Group strings by their sorted form using reduce
  const grouped = strs.reduce((acc, str) => {
    // Sort characters to create a canonical form for anagrams
    const sorted = str.split('').sort().join('');
    
    // If key exists, add to existing group, otherwise create new group
    if (acc[sorted]) {
      acc[sorted].push(str);
    } else {
      acc[sorted] = [str];
    }
    
    return acc;
  }, {});
  
  // Return all groups as array of arrays
  return Object.values(grouped);
};

/**
 * Approach 4: Using Object with sorted string as key
 * Time Complexity: O(n * m * log(m)) where n is number of strings and m is average length of strings
 * Space Complexity: O(n * m) for storing all strings
 */
const groupAnagramsObject = (strs) => {
  // Create an object to group anagrams
  const anagramGroups = {};
  
  // For each string, sort its characters and use as key
  for (const str of strs) {
    // Sort characters to create a canonical form for anagrams
    const sorted = str.split('').sort().join('');
    
    // If key exists, add to existing group, otherwise create new group
    if (anagramGroups[sorted]) {
      anagramGroups[sorted].push(str);
    } else {
      anagramGroups[sorted] = [str];
    }
  }
  
  // Return all groups
  return Object.values(anagramGroups);
};

/**
 * Approach 5: Using Map with prime factorization as key
 * Time Complexity: O(n * m) where n is number of strings and m is average length of strings
 * Space Complexity: O(n * m) for storing all strings
 */
const groupAnagramsPrime = (strs) => {
  // Assign prime numbers to each letter (a-z)
  const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101];
  
  // Create a Map to group anagrams
  const anagramMap = new Map();
  
  // For each string, calculate prime product as key
  for (const str of strs) {
    // Calculate product of primes for each character
    let product = 1;
    for (const char of str) {
      product *= primes[char.charCodeAt(0) - 'a'.charCodeAt(0)];
    }
    
    // If key exists, add to existing group, otherwise create new group
    if (anagramMap.has(product)) {
      anagramMap.get(product).push(str);
    } else {
      anagramMap.set(product, [str]);
    }
  }
  
  // Return all groups
  return Array.from(anagramMap.values());
};

/**
 * Approach 6: Generator-based approach for step-by-step visualization
 * Time Complexity: O(n * m * log(m)) where n is number of strings and m is average length of strings
 * Space Complexity: O(n * m) for storing all strings
 */
function* groupAnagramsGenerator(strs) {
  // Create a Map to group anagrams
  const anagramMap = new Map();
  
  yield { step: 'initial', strings: strs, groups: {} };
  
  // For each string, sort its characters and use as key
  for (let i = 0; i < strs.length; i++) {
    const str = strs[i];
    // Sort characters to create a canonical form for anagrams
    const sorted = str.split('').sort().join('');
    
    yield { step: 'processing', index: i, string: str, sortedKey: sorted };
    
    // If key exists, add to existing group, otherwise create new group
    if (anagramMap.has(sorted)) {
      anagramMap.get(sorted).push(str);
    } else {
      anagramMap.set(sorted, [str]);
    }
    
    yield { step: 'grouped', key: sorted, group: [...anagramMap.get(sorted)] };
  }
  
  // Return all groups
  const result = Array.from(anagramMap.values());
  yield { step: 'final', result };
  return result;
}

// Example usage and test cases
if (typeof window === 'undefined') {  // Node.js environment
  console.log('=== Testing Group all anagrams in an array of strings ===');
  
  // Test cases
  const testCases = [
    { strs: ["eat","tea","tan","ate","nat","bat"], expected: [["bat"],["nat","tan"],["ate","eat","tea"]] },
    { strs: [""], expected: [[""]] },
    { strs: ["a"], expected: [["a"]] },
    { strs: ["abc","bca","cab","xyz","zyx","yxz"], expected: [["abc","bca","cab"],["xyz","zyx","yxz"]] }
  ];
  
  // Test all approaches
  testCases.forEach((testCase, index) => {
    console.log(`\nTest Case ${index + 1}:`);
    console.log(`Strings: [${testCase.strs.map(s => `"${s}"`).join(', ')}]`);
    
    console.log(`Sorted Approach: ${JSON.stringify(groupAnagramsSorted(testCase.strs))}`);
    console.log(`Frequency Approach: ${JSON.stringify(groupAnagramsFrequency(testCase.strs))}`);
    console.log(`Functional Approach: ${JSON.stringify(groupAnagramsFunctional(testCase.strs))}`);
    console.log(`Object Approach: ${JSON.stringify(groupAnagramsObject(testCase.strs))}`);
    console.log(`Prime Approach: ${JSON.stringify(groupAnagramsPrime(testCase.strs))}`);
    
    // Generator approach
    console.log('Generator Approach:');
    const generator = groupAnagramsGenerator(testCase.strs);
    let result;
    do {
      result = generator.next();
      if (!result.done) {
        console.log(`  ${JSON.stringify(result.value)}`);
      }
    } while (!result.done);
    console.log(`  Final Result: ${JSON.stringify(result.value)}`);
  });
  
  // Performance comparison utility
  const performanceTest = (func, strs, name) => {
    const start = performance.now();
    for (let i = 0; i < 1000; i++) {
      func(strs);
    }
    const end = performance.now();
    console.log(`${name}: ${end - start}ms`);
  };
  
  // Run performance tests if performance object is available
  if (typeof performance !== 'undefined') {
    console.log('\n=== Performance Comparison ===');
    const largeArr = Array.from({length: 100}, (_, i) => 
      String.fromCharCode(...Array.from({length: 5}, () => Math.floor(Math.random() * 26) + 97))
    );
    
    performanceTest(groupAnagramsSorted, largeArr, 'Sorted Approach');
    performanceTest(groupAnagramsFrequency, largeArr, 'Frequency Approach');
    performanceTest(groupAnagramsObject, largeArr, 'Object Approach');
  } else {
    console.log('\nPerformance testing requires browser environment or Node.js with performance API');
  }
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    groupAnagramsSorted,
    groupAnagramsFrequency,
    groupAnagramsFunctional,
    groupAnagramsObject,
    groupAnagramsPrime,
    groupAnagramsGenerator
  };
}
