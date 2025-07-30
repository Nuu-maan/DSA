// Find the longest substring with k unique characters
// Source: https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/

/**
 * Approach 1: Sliding window with Map for character frequency tracking
 * Time Complexity: O(n) where n is the length of the string
 * Space Complexity: O(min(k, alphabet_size)) for storing at most k+1 characters
 */
const lengthOfLongestSubstringKDistinctSliding = (s, k) => {
  // Handle edge cases
  if (!s || k === 0) return 0;
  
  let left = 0, right = 0;
  let maxLength = 0;
  
  // Map to store character frequencies in current window
  const charFreq = new Map();
  
  // Expand window to the right
  while (right < s.length) {
    // Add character at right pointer to window
    const rightChar = s[right];
    charFreq.set(rightChar, (charFreq.get(rightChar) || 0) + 1);
    
    // Contract window from left until we have at most k distinct characters
    while (charFreq.size > k) {
      const leftChar = s[left];
      charFreq.set(leftChar, charFreq.get(leftChar) - 1);
      
      // Remove character from map if frequency becomes 0
      if (charFreq.get(leftChar) === 0) {
        charFreq.delete(leftChar);
      }
      
      left++;
    }
    
    // Update maximum length
    maxLength = Math.max(maxLength, right - left + 1);
    
    // Move right pointer
    right++;
  }
  
  return maxLength;
};

/**
 * Approach 2: Optimized sliding window with last occurrence tracking
 * Time Complexity: O(n) where n is the length of the string
 * Space Complexity: O(min(k, alphabet_size)) for storing at most k characters
 */
const lengthOfLongestSubstringKDistinctOptimized = (s, k) => {
  // Handle edge cases
  if (!s || k === 0) return 0;
  
  let left = 0, right = 0;
  let maxLength = 0;
  
  // Map to store last occurrence index of characters
  const lastOccurrence = new Map();
  
  // Expand window to the right
  while (right < s.length) {
    // Update last occurrence of right character
    lastOccurrence.set(s[right], right);
    
    // If we have more than k distinct characters, move left pointer
    if (lastOccurrence.size > k) {
      // Find the character with minimum last occurrence index
      let minIndex = Infinity;
      let minChar = '';
      
      for (const [char, index] of lastOccurrence) {
        if (index < minIndex) {
          minIndex = index;
          minChar = char;
        }
      }
      
      // Remove the character with minimum last occurrence
      lastOccurrence.delete(minChar);
      left = minIndex + 1;
    }
    
    // Update maximum length
    maxLength = Math.max(maxLength, right - left + 1);
    
    // Move right pointer
    right++;
  }
  
  return maxLength;
};

/**
 * Approach 3: Functional approach with array methods
 * Time Complexity: O(n²) in worst case
 * Space Complexity: O(min(k, alphabet_size))
 */
const lengthOfLongestSubstringKDistinctFunctional = (s, k) => {
  // Handle edge cases
  if (!s || k === 0) return 0;
  
  // For each starting position, find the longest valid substring
  return Array.from(s).reduce((maxLength, _, start) => {
    const charSet = new Set();
    let currentLength = 0;
    
    // Expand from start position
    for (let i = start; i < s.length; i++) {
      charSet.add(s[i]);
      
      // If we exceed k distinct characters, stop
      if (charSet.size > k) {
        break;
      }
      
      currentLength++;
    }
    
    return Math.max(maxLength, currentLength);
  }, 0);
};

/**
 * Approach 4: Two-pointer approach with Object
 * Time Complexity: O(n) where n is the length of the string
 * Space Complexity: O(min(k, alphabet_size)) for storing at most k characters
 */
const lengthOfLongestSubstringKDistinctTwoPointer = (s, k) => {
  // Handle edge cases
  if (!s || k === 0) return 0;
  
  let left = 0;
  let maxLength = 0;
  
  // Object to store character frequencies in current window
  const charFreq = {};
  let distinctCount = 0;
  
  // Expand window to the right
  for (let right = 0; right < s.length; right++) {
    const rightChar = s[right];
    
    // If this is a new character, increment distinct count
    if (!charFreq[rightChar]) {
      distinctCount++;
      charFreq[rightChar] = 0;
    }
    
    // Increment frequency of right character
    charFreq[rightChar]++;
    
    // Contract window from left until we have at most k distinct characters
    while (distinctCount > k) {
      const leftChar = s[left];
      charFreq[leftChar]--;
      
      // If frequency becomes 0, decrement distinct count
      if (charFreq[leftChar] === 0) {
        distinctCount--;
        delete charFreq[leftChar];
      }
      
      left++;
    }
    
    // Update maximum length
    maxLength = Math.max(maxLength, right - left + 1);
  }
  
  return maxLength;
};

/**
 * Approach 5: Brute force approach
 * Time Complexity: O(n³) in worst case
 * Space Complexity: O(min(k, alphabet_size))
 */
const lengthOfLongestSubstringKDistinctBrute = (s, k) => {
  // Handle edge cases
  if (!s || k === 0) return 0;
  
  let maxLength = 0;
  
  // Check all possible substrings
  for (let i = 0; i < s.length; i++) {
    for (let j = i; j < s.length; j++) {
      // Count distinct characters in substring s[i...j]
      const charSet = new Set();
      for (let l = i; l <= j; l++) {
        charSet.add(s[l]);
      }
      
      // If substring has at most k distinct characters, update max length
      if (charSet.size <= k) {
        maxLength = Math.max(maxLength, j - i + 1);
      }
    }
  }
  
  return maxLength;
};

/**
 * Approach 6: Generator-based approach for step-by-step visualization
 * Time Complexity: O(n) where n is the length of the string
 * Space Complexity: O(min(k, alphabet_size)) for storing at most k+1 characters
 */
function* lengthOfLongestSubstringKDistinctGenerator(s, k) {
  // Handle edge cases
  if (!s || k === 0) {
    yield { step: 'initial', s, k, result: 0 };
    return 0;
  }
  
  yield { step: 'initial', s, k };
  
  let left = 0, right = 0;
  let maxLength = 0;
  
  // Map to store character frequencies in current window
  const charFreq = new Map();
  
  yield { step: 'setup', left, right, maxLength };
  
  // Expand window to the right
  while (right < s.length) {
    // Add character at right pointer to window
    const rightChar = s[right];
    charFreq.set(rightChar, (charFreq.get(rightChar) || 0) + 1);
    
    yield { step: 'expand', right, rightChar, charFreq: Object.fromEntries(charFreq) };
    
    // Contract window from left until we have at most k distinct characters
    while (charFreq.size > k) {
      const leftChar = s[left];
      charFreq.set(leftChar, charFreq.get(leftChar) - 1);
      
      yield { step: 'contract_check', left, leftChar, size: charFreq.size, k };
      
      // Remove character from map if frequency becomes 0
      if (charFreq.get(leftChar) === 0) {
        charFreq.delete(leftChar);
        yield { step: 'remove_char', leftChar };
      }
      
      left++;
      yield { step: 'move_left', left };
    }
    
    // Update maximum length
    const currentLength = right - left + 1;
    if (currentLength > maxLength) {
      maxLength = currentLength;
      yield { step: 'update_max', maxLength, window: s.substring(left, right + 1) };
    }
    
    // Move right pointer
    right++;
    yield { step: 'move_right', right };
  }
  
  yield { step: 'final', result: maxLength };
  return maxLength;
}

// Example usage and test cases
if (typeof window === 'undefined') {  // Node.js environment
  console.log('=== Testing Find the longest substring with k unique characters ===');
  
  // Test cases
  const testCases = [
    { s: "eceba", k: 2, expected: 3 },
    { s: "aa", k: 1, expected: 2 },
    { s: "a", k: 2, expected: 1 },
    { s: "abcabcabc", k: 2, expected: 2 }
  ];
  
  // Test all approaches
  testCases.forEach((testCase, index) => {
    console.log(`\nTest Case ${index + 1}:`);
    console.log(`s: "${testCase.s}", k: ${testCase.k}`);
    console.log(`Expected: ${testCase.expected}`);
    
    console.log(`Sliding Window Approach: ${lengthOfLongestSubstringKDistinctSliding(testCase.s, testCase.k)}`);
    console.log(`Optimized Approach: ${lengthOfLongestSubstringKDistinctOptimized(testCase.s, testCase.k)}`);
    console.log(`Functional Approach: ${lengthOfLongestSubstringKDistinctFunctional(testCase.s, testCase.k)}`);
    console.log(`Two-Pointer Approach: ${lengthOfLongestSubstringKDistinctTwoPointer(testCase.s, testCase.k)}`);
    console.log(`Brute Force Approach: ${lengthOfLongestSubstringKDistinctBrute(testCase.s, testCase.k)}`);
    
    // Generator approach
    console.log('Generator Approach:');
    const generator = lengthOfLongestSubstringKDistinctGenerator(testCase.s, testCase.k);
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
  const performanceTest = (func, s, k, name) => {
    const start = performance.now();
    for (let i = 0; i < 1000; i++) {
      func(s, k);
    }
    const end = performance.now();
    console.log(`${name}: ${end - start}ms`);
  };
  
  // Run performance tests if performance object is available
  if (typeof performance !== 'undefined') {
    console.log('\n=== Performance Comparison ===');
    const longS = "eceba".repeat(100);
    const k = 2;
    
    performanceTest(lengthOfLongestSubstringKDistinctSliding, longS, k, 'Sliding Window Approach');
    performanceTest(lengthOfLongestSubstringKDistinctTwoPointer, longS, k, 'Two-Pointer Approach');
  } else {
    console.log('\nPerformance testing requires browser environment or Node.js with performance API');
  }
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    lengthOfLongestSubstringKDistinctSliding,
    lengthOfLongestSubstringKDistinctOptimized,
    lengthOfLongestSubstringKDistinctFunctional,
    lengthOfLongestSubstringKDistinctTwoPointer,
    lengthOfLongestSubstringKDistinctBrute,
    lengthOfLongestSubstringKDistinctGenerator
  };
}
