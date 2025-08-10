/**
 * Minimum Window Substring - Multiple Approaches
 * 
 * Problem: Find the minimum window in string s that contains all characters of string t.
 * 
 * Example:
 * Input: s = "ADOBECODEBANC", t = "ABC"
 * Output: "BANC"
 */

/**
 * Approach 1: Sliding Window with Two Pointers and Hash Map
 * Time Complexity: O(|S| + |T|)
 * Space Complexity: O(1) - fixed size character set
 */
const minWindow1 = (s, t) => {
    if (s.length === 0 || t.length === 0 || s.length < t.length) return '';
    
    // Create frequency map for characters in t
    const targetFreq = new Map();
    for (const char of t) {
        targetFreq.set(char, (targetFreq.get(char) || 0) + 1);
    }
    
    const required = targetFreq.size;
    let formed = 0;
    let left = 0;
    let minLen = Infinity;
    let result = '';
    
    // Track characters in current window
    const windowFreq = new Map();
    
    for (let right = 0; right < s.length; right++) {
        const char = s[right];
        
        // Skip characters not in t
        if (!targetFreq.has(char)) continue;
        
        // Update window frequency
        windowFreq.set(char, (windowFreq.get(char) || 0) + 1);
        
        // Check if current character's frequency matches target
        if (windowFreq.get(char) === targetFreq.get(char)) {
            formed++;
        }
        
        // Try to contract the window from the left
        while (left <= right && formed === required) {
            // Update result if current window is smaller
            if (right - left + 1 < minLen) {
                minLen = right - left + 1;
                result = s.substring(left, right + 1);
            }
            
            const leftChar = s[left];
            
            // If left character is in t, update window frequency
            if (targetFreq.has(leftChar)) {
                windowFreq.set(leftChar, windowFreq.get(leftChar) - 1);
                
                // If frequency drops below target, decrement formed
                if (windowFreq.get(leftChar) < targetFreq.get(leftChar)) {
                    formed--;
                }
            }
            
            left++;
        }
    }
    
    return minLen === Infinity ? '' : result;
};

/**
 * Approach 2: Optimized Sliding Window with Filtered S
 * Time Complexity: O(|S| + |T|)
 * Space Complexity: O(1)
 */
const minWindow2 = (s, t) => {
    if (s.length === 0 || t.length === 0 || s.length < t.length) return '';
    
    // Create frequency map for characters in t
    const targetFreq = new Map();
    for (const char of t) {
        targetFreq.set(char, (targetFreq.get(char) || 0) + 1);
    }
    
    // Filter s to only include characters in t
    const filteredS = [];
    for (let i = 0; i < s.length; i++) {
        if (targetFreq.has(s[i])) {
            filteredS.push([i, s[i]]);
        }
    }
    
    const required = targetFreq.size;
    let left = 0;
    let formed = 0;
    let minLen = Infinity;
    let result = '';
    const windowFreq = new Map();
    
    for (let right = 0; right < filteredS.length; right++) {
        const [rightIdx, char] = filteredS[right];
        
        // Update window frequency
        windowFreq.set(char, (windowFreq.get(char) || 0) + 1);
        
        // Check if current character's frequency matches target
        if (windowFreq.get(char) === targetFreq.get(char)) {
            formed++;
        }
        
        // Try to contract the window from the left
        while (left <= right && formed === required) {
            const [leftIdx, leftChar] = filteredS[left];
            
            // Update result if current window is smaller
            const windowSize = rightIdx - leftIdx + 1;
            if (windowSize < minLen) {
                minLen = windowSize;
                result = s.substring(leftIdx, rightIdx + 1);
            }
            
            // Move left pointer
            windowFreq.set(leftChar, windowFreq.get(leftChar) - 1);
            if (windowFreq.get(leftChar) < targetFreq.get(leftChar)) {
                formed--;
            }
            
            left++;
        }
    }
    
    return minLen === Infinity ? '' : result;
};

/**
 * Approach 3: Using Array for Frequency Count (Optimized for ASCII)
 * Time Complexity: O(|S| + |T|)
 * Space Complexity: O(1) - fixed size arrays
 */
const minWindow3 = (s, t) => {
    if (s.length === 0 || t.length === 0 || s.length < t.length) return '';
    
    const targetFreq = new Array(128).fill(0);
    const windowFreq = new Array(128).fill(0);
    
    // Initialize target frequency
    for (const char of t) {
        targetFreq[char.charCodeAt(0)]++;
    }
    
    let required = 0;
    for (let i = 0; i < 128; i++) {
        if (targetFreq[i] > 0) required++;
    }
    
    let left = 0;
    let formed = 0;
    let minLen = Infinity;
    let result = '';
    
    for (let right = 0; right < s.length; right++) {
        const rightChar = s.charCodeAt(right);
        
        // Skip characters not in t
        if (targetFreq[rightChar] === 0) continue;
        
        // Expand window
        windowFreq[rightChar]++;
        
        // Check if current character's frequency matches target
        if (windowFreq[rightChar] === targetFreq[rightChar]) {
            formed++;
        }
        
        // Contract window from left
        while (left <= right && formed === required) {
            // Update result if current window is smaller
            const windowSize = right - left + 1;
            if (windowSize < minLen) {
                minLen = windowSize;
                result = s.substring(left, right + 1);
            }
            
            const leftChar = s.charCodeAt(left);
            
            // If left character is in t, update window frequency
            if (targetFreq[leftChar] > 0) {
                windowFreq[leftChar]--;
                
                // If frequency drops below target, decrement formed
                if (windowFreq[leftChar] < targetFreq[leftChar]) {
                    formed--;
                }
            }
            
            left++;
        }
    }
    
    return minLen === Infinity ? '' : result;
};

/**
 * Approach 4: Sliding Window with Optimized Space
 * Time Complexity: O(|S| + |T|)
 * Space Complexity: O(1)
 */
const minWindow4 = (s, t) => {
    if (s.length === 0 || t.length === 0 || s.length < t.length) return '';
    
    const targetFreq = new Map();
    for (const char of t) {
        targetFreq.set(char, (targetFreq.get(char) || 0) + 1);
    }
    
    let left = 0;
    let right = 0;
    let count = t.length;
    let minStart = 0;
    let minLen = Infinity;
    
    while (right < s.length) {
        // Move right pointer
        if (targetFreq.has(s[right]) && targetFreq.get(s[right]) > 0) {
            count--;
        }
        
        // Decrease frequency in targetFreq (can go negative)
        if (targetFreq.has(s[right])) {
            targetFreq.set(s[right], targetFreq.get(s[right]) - 1);
        }
        
        // When we've found all characters
        while (count === 0) {
            // Update result if needed
            if (right - left + 1 < minLen) {
                minLen = right - left + 1;
                minStart = left;
            }
            
            // Move left pointer
            if (targetFreq.has(s[left])) {
                targetFreq.set(s[left], targetFreq.get(s[left]) + 1);
                
                // If we've moved past a required character, increase count
                if (targetFreq.get(s[left]) > 0) {
                    count++;
                }
            }
            
            left++;
        }
        
        right++;
    }
    
    return minLen === Infinity ? '' : s.substring(minStart, minStart + minLen);
};

// Test cases
const testCases = [
    { s: "ADOBECODEBANC", t: "ABC", expected: "BANC" },
    { s: "a", t: "a", expected: "a" },
    { s: "a", t: "aa", expected: "" },
    { s: "aa", t: "aa", expected: "aa" },
    { s: "aab", t: "aab", expected: "aab" },
    { s: "cabwefgewcwaefgcf", t: "cae", expected: "cwae" },
    { s: "ab", t: "b", expected: "b" },
    { s: "abcabdebac", t: "cda", expected: "cabd" },
    { s: "this is a test string", t: "tist", expected: "t stri" },
    { s: "geeksforgeeks", t: "ork", expected: "ksfor" },
];

// Run tests
const runTests = () => {
    const functions = [minWindow1, minWindow2, minWindow3, minWindow4];
    const functionNames = ['Sliding Window', 'Optimized Sliding', 'Array Count', 'Space Optimized'];
    
    functions.forEach((fn, index) => {
        console.log(`\nTesting ${functionNames[index]} approach:`);
        testCases.forEach((test, i) => {
            const result = fn(test.s, test.t);
            const passed = result === test.expected;
            console.log(`Test ${i + 1}: ${passed ? 'PASS' : 'FAIL'}`);
            if (!passed) {
                console.log(`  Input: "${test.s}", "${test.t}"`);
                console.log(`  Expected: "${test.expected}"`);
                console.log(`  Got: "${result}"`);
            }
        });
    });
};

// Performance comparison
const measurePerformance = () => {
    // Generate a long string with a pattern
    let longS = '';
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    // Create a long string with a pattern that includes the target
    for (let i = 0; i < 10000; i++) {
        longS += chars[Math.floor(Math.random() * chars.length)];
    }
    
    // Ensure the target exists in the string
    const target = 'abc';
    const insertPos = Math.floor(Math.random() * (longS.length - target.length));
    longS = longS.substring(0, insertPos) + target + longS.substring(insertPos + target.length);
    
    console.log('\nPerformance Comparison (long string):');
    
    const functions = [minWindow1, minWindow2, minWindow3, minWindow4];
    const functionNames = ['Sliding Window', 'Optimized Sliding', 'Array Count', 'Space Optimized'];
    
    functions.forEach((fn, index) => {
        const start = performance.now();
        const result = fn(longS, target);
        const end = performance.now();
        console.log(`${functionNames[index]}: ${(end - start).toFixed(4)}ms`);
    });
};

// Run tests and performance comparison
console.log('=== Minimum Window Substring ===');
runTests();
measurePerformance();
