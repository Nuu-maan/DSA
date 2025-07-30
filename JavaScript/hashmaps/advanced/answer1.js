// Find the minimum window in a string containing all characters of another string
// Source: https://leetcode.com/problems/minimum-window-substring/

/**
 * Approach 1: Sliding window with Map for character frequency tracking
 * Time Complexity: O(|s| + |t|) where |s| and |t| are lengths of strings s and t
 * Space Complexity: O(|s| + |t|) for storing character frequencies
 */
const minWindowSliding = (s, t) => {
  // Handle edge cases
  if (!s || !t || s.length === 0 || t.length === 0 || s.length < t.length) {
    return "";
  }
  
  // Create frequency map for string t
  const tFreq = new Map();
  for (const char of t) {
    tFreq.set(char, (tFreq.get(char) || 0) + 1);
  }
  
  // Required count of unique characters in t
  const required = tFreq.size;
  
  // Left and right pointers for sliding window
  let left = 0, right = 0;
  
  // Formed count of unique characters in current window that match required frequency
  let formed = 0;
  
  // Frequency map for current window
  const windowFreq = new Map();
  
  // Result variables
  let minLen = Infinity;
  let minLeft = 0, minRight = 0;
  
  // Expand window to the right
  while (right < s.length) {
    // Add character at right pointer to window
    const char = s[right];
    windowFreq.set(char, (windowFreq.get(char) || 0) + 1);
    
    // If current character's frequency in window matches required frequency, increment formed
    if (tFreq.has(char) && windowFreq.get(char) === tFreq.get(char)) {
      formed++;
    }
    
    // Try to contract window until it ceases to be valid
    while (left <= right && formed === required) {
      char = s[left];
      
      // Update result if current window is smaller
      if (right - left + 1 < minLength) {
        minLength = right - left + 1;
        minLeft = left;
      }
      
      // Remove character at left pointer from window
      windowFreq.set(char, windowFreq.get(char) - 1);
      if (tFreq.has(char) && windowFreq.get(char) < tFreq.get(char)) {
        formed--;
      }
      
      // Move left pointer
      left++;
    }
    
    // Move right pointer
    right++;
  }
  
  return minLen === Infinity ? "" : s.substring(minLeft, minRight + 1);
};

/**
 * Approach 2: Optimized sliding window with filtered string
 * Time Complexity: O(|s| + |t|) where |s| and |t| are lengths of strings s and t
 * Space Complexity: O(|s| + |t|) for storing character frequencies
 */
const minWindowOptimized = (s, t) => {
  // Handle edge cases
  if (!s || !t || s.length === 0 || t.length === 0 || s.length < t.length) {
    return "";
  }
  
  // Create frequency map for string t
  const tFreq = new Map();
  for (const char of t) {
    tFreq.set(char, (tFreq.get(char) || 0) + 1);
  }
  
  // Required count of unique characters in t
  const required = tFreq.size;
  
  // Filter string s to only include characters present in t
  const filtered = [];
  for (let i = 0; i < s.length; i++) {
    if (tFreq.has(s[i])) {
      filtered.push([i, s[i]]);
    }
  }
  
  // Left and right pointers for sliding window on filtered string
  let left = 0, right = 0;
  
  // Formed count of unique characters in current window that match required frequency
  let formed = 0;
  
  // Frequency map for current window
  const windowFreq = new Map();
  
  // Result variables
  let minLen = Infinity;
  let minLeft = 0, minRight = 0;
  
  // Expand window to the right
  while (right < filtered.length) {
    // Add character at right pointer to window
    const [index, char] = filtered[right];
    windowFreq.set(char, (windowFreq.get(char) || 0) + 1);
    
    // If current character's frequency in window matches required frequency, increment formed
    if (windowFreq.get(char) === tFreq.get(char)) {
      formed++;
    }
    
    // Try to contract window until it ceases to be valid
    while (left <= right && formed === required) {
      const [leftIndex, leftChar] = filtered[left];
      const [rightIndex, rightChar] = filtered[right];
      
      // Update result if current window is smaller
      if (rightIndex - leftIndex + 1 < minLen) {
        minLen = rightIndex - leftIndex + 1;
        minLeft = leftIndex;
        minRight = rightIndex;
      }
      
      // Remove character at left pointer from window
      windowFreq.set(leftChar, windowFreq.get(leftChar) - 1);
      if (windowFreq.get(leftChar) < tFreq.get(leftChar)) {
        formed--;
      }
      
      // Move left pointer
      left++;
    }
    
    // Move right pointer
    right++;
  }
  
  return minLen === Infinity ? "" : s.substring(minLeft, minRight + 1);
};

/**
 * Approach 3: Functional approach with array methods
 * Time Complexity: O(|s|² * |t|) in worst case
 * Space Complexity: O(|s| + |t|)
 */
const minWindowFunctional = (s, t) => {
  // Handle edge cases
  if (!s || !t || s.length === 0 || t.length === 0 || s.length < t.length) {
    return "";
  }
  
  // Create frequency map for string t
  const tFreq = [...t].reduce((acc, char) => {
    acc.set(char, (acc.get(char) || 0) + 1);
    return acc;
  }, new Map());
  
  // Check if a window contains all characters of t
  const containsAll = (window) => {
    const windowFreq = [...window].reduce((acc, char) => {
      acc.set(char, (acc.get(char) || 0) + 1);
      return acc;
    }, new Map());
    
    for (const [char, count] of tFreq) {
      if (!windowFreq.has(char) || windowFreq.get(char) < count) {
        return false;
      }
    }
    return true;
  };
  
  // Find all valid windows and return the smallest
  let minWindow = "";
  let minLen = Infinity;
  
  for (let i = 0; i <= s.length - t.length; i++) {
    for (let j = i + t.length - 1; j < s.length; j++) {
      const window = s.substring(i, j + 1);
      if (containsAll(window) && window.length < minLen) {
        minLen = window.length;
        minWindow = window;
      }
    }
  }
  
  return minWindow;
};

/**
 * Approach 4: Two-pointer approach with Map
 * Time Complexity: O(|s| + |t|) where |s| and |t| are lengths of strings s and t
 * Space Complexity: O(|s| + |t|) for storing character frequencies
 */
const minWindowTwoPointer = (s, t) => {
  // Handle edge cases
  if (!s || !t || s.length === 0 || t.length === 0 || s.length < t.length) {
    return "";
  }
  
  // Create frequency map for string t
  const tFreq = new Map();
  for (const char of t) {
    tFreq.set(char, (tFreq.get(char) || 0) + 1);
  }
  
  let left = 0;
  let minLen = Infinity;
  let minStart = 0;
  let needed = t.length;
  
  // Expand window to the right
  for (let right = 0; right < s.length; right++) {
    const rightChar = s[right];
    
    // If character is needed, decrement needed count
    if (tFreq.has(rightChar) && tFreq.get(rightChar) > 0) {
      needed--;
    }
    
    // Update frequency of right character
    tFreq.set(rightChar, (tFreq.get(rightChar) || 0) - 1);
    
    // Contract window from left when all characters are found
    while (needed === 0) {
      // Update minimum window if current window is smaller
      if (right - left + 1 < minLen) {
        minLen = right - left + 1;
        minStart = left;
      }
      
      const leftChar = s[left];
      tFreq.set(leftChar, tFreq.get(leftChar) + 1);
      
      // If character is now missing, increment needed count
      if (tFreq.has(leftChar) && tFreq.get(leftChar) > 0) {
        needed++;
      }
      
      left++;
    }
  }
  
  return minLen === Infinity ? "" : s.substring(minStart, minStart + minLen);
};

/**
 * Approach 5: Brute force approach
 * Time Complexity: O(|s|³ * |t|) in worst case
 * Space Complexity: O(|s| + |t|)
 */
const minWindowBrute = (s, t) => {
  // Handle edge cases
  if (!s || !t || s.length === 0 || t.length === 0 || s.length < t.length) {
    return "";
  }
  
  // Create frequency map for string t
  const tFreq = {};
  for (const char of t) {
    tFreq[char] = (tFreq[char] || 0) + 1;
  }
  
  // Check if a window contains all characters of t
  const containsAll = (window) => {
    const windowFreq = {};
    for (const char of window) {
      windowFreq[char] = (windowFreq[char] || 0) + 1;
    }
    
    for (const char in tFreq) {
      if (!windowFreq[char] || windowFreq[char] < tFreq[char]) {
        return false;
      }
    }
    return true;
  };
  
  // Find all valid windows and return the smallest
  let minWindow = "";
  let minLen = Infinity;
  
  for (let i = 0; i <= s.length - t.length; i++) {
    for (let j = i + t.length - 1; j < s.length; j++) {
      const window = s.substring(i, j + 1);
      if (containsAll(window) && window.length < minLen) {
        minLen = window.length;
        minWindow = window;
      }
    }
  }
  
  return minWindow;
};

/**
 * Approach 6: Generator-based approach for step-by-step visualization
 * Time Complexity: O(|s| + |t|) where |s| and |t| are lengths of strings s and t
 * Space Complexity: O(|s| + |t|) for storing character frequencies
 */
function* minWindowGenerator(s, t) {
  // Handle edge cases
  if (!s || !t || s.length === 0 || t.length === 0 || s.length < t.length) {
    return "";
  }
  
  yield { step: 'initial', s, t };
  
  // Create frequency map for string t
  const tFreq = new Map();
  for (const char of t) {
    tFreq.set(char, (tFreq.get(char) || 0) + 1);
  }
  
  yield { step: 'tFreq', tFreq: Object.fromEntries(tFreq) };
  
  // Required count of unique characters in t
  const required = tFreq.size;
  
  // Left and right pointers for sliding window
  let left = 0, right = 0;
  
  // Formed count of unique characters in current window that match required frequency
  let formed = 0;
  
  // Frequency map for current window
  const windowFreq = new Map();
  
  // Result variables
  let minLen = Infinity;
  let minLeft = 0, minRight = 0;
  
  yield { step: 'setup', required, left, right, formed, minLen };
  
  // Expand window to the right
  while (right < s.length) {
    // Add character at right pointer to window
    const char = s[right];
    windowFreq.set(char, (windowFreq.get(char) || 0) + 1);
    
    yield { step: 'expand', right, char, windowFreq: Object.fromEntries(windowFreq) };
    
    // If current character's frequency in window matches required frequency, increment formed
    if (tFreq.has(char) && windowFreq.get(char) === tFreq.get(char)) {
      formed++;
      yield { step: 'formed_increment', formed, char };
    }
    
    // Try to contract window until it ceases to be valid
    while (left <= right && formed === required) {
      char = s[left];
      
      yield { step: 'contract_check', left, right, formed, required };
      
      // Update result if current window is smaller
      if (right - left + 1 < minLen) {
        minLen = right - left + 1;
        minLeft = left;
        minRight = right;
        yield { step: 'update_result', minLen, minLeft, minRight };
      }
      
      // Remove character at left pointer from window
      windowFreq.set(char, windowFreq.get(char) - 1);
      if (tFreq.has(char) && windowFreq.get(char) < tFreq.get(char)) {
        formed--;
        yield { step: 'formed_decrement', formed, char };
      }
      
      // Move left pointer
      left++;
      yield { step: 'move_left', left };
    }
    
    // Move right pointer
    right++;
    yield { step: 'move_right', right };
  }
  
  const result = minLen === Infinity ? "" : s.substring(minLeft, minRight + 1);
  yield { step: 'final', result, minLen, minLeft, minRight };
  return result;
}

// Example usage and test cases
if (typeof window === 'undefined') {  // Node.js environment
  console.log('=== Testing Find the minimum window in a string containing all characters of another string ===');
  
  // Test cases
  const testCases = [
    { s: "ADOBECODEBANC", t: "ABC", expected: "BANC" },
    { s: "a", t: "a", expected: "a" },
    { s: "a", t: "aa", expected: "" },
    { s: "abc", t: "cba", expected: "abc" }
  ];
  
  // Test all approaches
  testCases.forEach((testCase, index) => {
    console.log(`\nTest Case ${index + 1}:`);
    console.log(`s: "${testCase.s}", t: "${testCase.t}"`);
    console.log(`Expected: "${testCase.expected}"`);
    
    console.log(`Sliding Window Approach: "${minWindowSliding(testCase.s, testCase.t)}"`);
    console.log(`Optimized Approach: "${minWindowOptimized(testCase.s, testCase.t)}"`);
    console.log(`Functional Approach: "${minWindowFunctional(testCase.s, testCase.t)}"`);
    console.log(`Two-Pointer Approach: "${minWindowTwoPointer(testCase.s, testCase.t)}"`);
    console.log(`Brute Force Approach: "${minWindowBrute(testCase.s, testCase.t)}"`);
    
    // Generator approach
    console.log('Generator Approach:');
    const generator = minWindowGenerator(testCase.s, testCase.t);
    let result;
    do {
      result = generator.next();
      if (!result.done) {
        console.log(`  ${JSON.stringify(result.value)}`);
      }
    } while (!result.done);
    console.log(`  Final Result: "${result.value}"`);
  });
  
  // Performance comparison utility
  const performanceTest = (func, s, t, name) => {
    const start = performance.now();
    for (let i = 0; i < 1000; i++) {
      func(s, t);
    }
    const end = performance.now();
    console.log(`${name}: ${end - start}ms`);
  };
  
  // Run performance tests if performance object is available
  if (typeof performance !== 'undefined') {
    console.log('\n=== Performance Comparison ===');
    const longS = "ADOBECODEBANC".repeat(100);
    const longT = "ABC";
    
    performanceTest(minWindowSliding, longS, longT, 'Sliding Window Approach');
    performanceTest(minWindowTwoPointer, longS, longT, 'Two-Pointer Approach');
  } else {
    console.log('\nPerformance testing requires browser environment or Node.js with performance API');
  }
}

// Export functions for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    minWindowSliding,
    minWindowOptimized,
    minWindowFunctional,
    minWindowTwoPointer,
    minWindowBrute,
    minWindowGenerator
  };
}
