/**
 * Longest Substring Without Repeating Characters - Multiple Approaches
 * 
 * Problem: Find the length of the longest substring without repeating characters.
 * 
 * Example:
 * Input: "abcabcbb"
 * Output: 3 ("abc")
 */

/**
 * Approach 1: Sliding Window with Set
 * Time Complexity: O(n)
 * Space Complexity: O(min(m, n)) where m is the size of the character set
 */
const lengthOfLongestSubstring1 = (s) => {
    const n = s.length;
    const seen = new Set();
    let maxLen = 0;
    let left = 0;
    
    for (let right = 0; right < n; right++) {
        // If the current character is already in the set, contract the window from the left
        while (seen.has(s[right])) {
            seen.delete(s[left]);
            left++;
        }
        
        // Add the current character to the set
        seen.add(s[right]);
        
        // Update the maximum length
        maxLen = Math.max(maxLen, right - left + 1);
    }
    
    return maxLen;
};

/**
 * Approach 2: Sliding Window with Map (Optimized)
 * Time Complexity: O(n)
 * Space Complexity: O(min(m, n))
 */
const lengthOfLongestSubstring2 = (s) => {
    const charIndexMap = new Map(); // Store the last index of each character
    let maxLen = 0;
    let left = 0;
    
    for (let right = 0; right < s.length; right++) {
        const currentChar = s[right];
        
        // If the character is in the map and its index is within the current window
        if (charIndexMap.has(currentChar) && charIndexMap.get(currentChar) >= left) {
            left = charIndexMap.get(currentChar) + 1; // Move left pointer
        }
        
        // Update the character's last index
        charIndexMap.set(currentChar, right);
        
        // Update the maximum length
        maxLen = Math.max(maxLen, right - left + 1);
    }
    
    return maxLen;
};

/**
 * Approach 3: Sliding Window with Array (Optimized for ASCII)
 * Time Complexity: O(n)
 * Space Complexity: O(1) - fixed size array
 */
const lengthOfLongestSubstring3 = (s) => {
    const chars = new Array(128).fill(-1); // Assuming ASCII characters
    let maxLen = 0;
    let left = 0;
    
    for (let right = 0; right < s.length; right++) {
        const currentChar = s.charCodeAt(right);
        
        // If the character is in the current window, update left pointer
        if (chars[currentChar] >= left) {
            left = chars[currentChar] + 1;
        }
        
        // Update the character's last index
        chars[currentChar] = right;
        
        // Update the maximum length
        maxLen = Math.max(maxLen, right - left + 1);
    }
    
    return maxLen;
};

/**
 * Approach 4: Sliding Window with Set (Alternative Implementation)
 * Time Complexity: O(n)
 * Space Complexity: O(min(m, n))
 */
const lengthOfLongestSubstring4 = (s) => {
    const charSet = new Set();
    let maxLen = 0;
    let left = 0;
    
    for (let right = 0; right < s.length; right++) {
        const currentChar = s[right];
        
        // If the character is already in the set, remove characters from the left
        while (charSet.has(currentChar)) {
            charSet.delete(s[left]);
            left++;
        }
        
        // Add the current character to the set
        charSet.add(currentChar);
        
        // Update the maximum length
        maxLen = Math.max(maxLen, right - left + 1);
    }
    
    return maxLen;
};

// Test cases
const testCases = [
    { input: "abcabcbb", expected: 3 },
    { input: "bbbbb", expected: 1 },
    { input: "pwwkew", expected: 3 },
    { input: "", expected: 0 },
    { input: " ", expected: 1 },
    { input: "au", expected: 2 },
    { input: "aab", expected: 2 },
    { input: "dvdf", expected: 3 },
    { input: "abcdeafghijk", expected: 11 },
    { input: "tmmzuxt", expected: 5 },
];

// Run tests
const runTests = () => {
    const functions = [
        lengthOfLongestSubstring1, 
        lengthOfLongestSubstring2, 
        lengthOfLongestSubstring3, 
        lengthOfLongestSubstring4
    ];
    
    const functionNames = [
        'Sliding Window (Set)', 
        'Sliding Window (Map)', 
        'Sliding Window (Array)', 
        'Sliding Window (Set Alt)'
    ];
    
    functions.forEach((fn, index) => {
        console.log(`\nTesting ${functionNames[index]} approach:`);
        testCases.forEach((test, i) => {
            const result = fn(test.input);
            const passed = result === test.expected;
            console.log(`Test ${i + 1}: ${passed ? 'PASS' : 'FAIL'}`);
            if (!passed) {
                console.log(`  Input: "${test.input}"`);
                console.log(`  Expected: ${test.expected}`);
                console.log(`  Got: ${result}`);
            }
        });
    });
};

// Performance comparison
const measurePerformance = () => {
    // Generate a long string with repeating patterns
    let longStr = '';
    const pattern = 'abcdefghijklmnopqrstuvwxyz';
    
    // Create a long string with repeating patterns
    for (let i = 0; i < 1000; i++) {
        longStr += pattern;
    }
    
    console.log('\nPerformance Comparison (long string):');
    
    const functions = [
        lengthOfLongestSubstring1, 
        lengthOfLongestSubstring2, 
        lengthOfLongestSubstring3, 
        lengthOfLongestSubstring4
    ];
    
    const functionNames = [
        'Sliding Window (Set)', 
        'Sliding Window (Map)', 
        'Sliding Window (Array)', 
        'Sliding Window (Set Alt)'
    ];
    
    functions.forEach((fn, index) => {
        const start = performance.now();
        const result = fn(longStr);
        const end = performance.now();
        console.log(`${functionNames[index]}: ${(end - start).toFixed(4)}ms`);
    });
};

// Run tests and performance comparison
console.log('=== Longest Substring Without Repeating Characters ===');
runTests();
measurePerformance();
