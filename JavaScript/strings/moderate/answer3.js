/**
 * Longest Palindromic Substring - Multiple Approaches
 * 
 * Problem: Find the longest palindromic substring in a given string.
 * 
 * Example:
 * Input: "babad"
 * Output: "bab" or "aba"
 */

/**
 * Approach 1: Expand Around Center
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 */
const longestPalindrome1 = (s) => {
    if (s == null || s.length < 1) return '';
    
    let start = 0;
    let maxLength = 1;
    
    // Helper function to expand around center
    const expandAroundCenter = (left, right) => {
        while (left >= 0 && right < s.length && s[left] === s[right]) {
            left--;
            right++;
        }
        return right - left - 1; // (right - left + 1) - 2
    };
    
    for (let i = 0; i < s.length; i++) {
        // Check for odd length palindromes
        const len1 = expandAroundCenter(i, i);
        // Check for even length palindromes
        const len2 = expandAroundCenter(i, i + 1);
        
        // Get the maximum length palindrome centered at i
        const len = Math.max(len1, len2);
        
        // Update the maximum length and starting position
        if (len > maxLength) {
            maxLength = len;
            start = i - Math.floor((len - 1) / 2);
        }
    }
    
    return s.substring(start, start + maxLength);
};

/**
 * Approach 2: Dynamic Programming
 * Time Complexity: O(n²)
 * Space Complexity: O(n²)
 */
const longestPalindrome2 = (s) => {
    const n = s.length;
    if (n <= 1) return s;
    
    // Create a 2D array to store if s[i..j] is a palindrome
    const dp = Array(n).fill(false).map(() => Array(n).fill(false));
    let start = 0;
    let maxLength = 1;
    
    // Every single character is a palindrome
    for (let i = 0; i < n; i++) {
        dp[i][i] = true;
    }
    
    // Check for substrings of length 2
    for (let i = 0; i < n - 1; i++) {
        if (s[i] === s[i + 1]) {
            dp[i][i + 1] = true;
            start = i;
            maxLength = 2;
        }
    }
    
    // Check for substrings longer than 2
    for (let len = 3; len <= n; len++) {
        for (let i = 0; i < n - len + 1; i++) {
            const j = i + len - 1;
            
            // Check if the substring between i and j is a palindrome
            if (s[i] === s[j] && dp[i + 1][j - 1]) {
                dp[i][j] = true;
                
                // Update the maximum length and starting position
                if (len > maxLength) {
                    start = i;
                    maxLength = len;
                }
            }
        }
    }
    
    return s.substring(start, start + maxLength);
};

/**
 * Approach 3: Optimized Expand Around Center
 * Time Complexity: O(n²)
 * Space Complexity: O(1)
 */
const longestPalindrome3 = (s) => {
    if (s == null || s.length < 1) return '';
    
    let start = 0;
    let end = 0;
    
    for (let i = 0; i < s.length; i++) {
        // Find the longest odd length palindrome with center at i
        const len1 = expandAroundCenter(s, i, i);
        // Find the longest even length palindrome with center between i and i+1
        const len2 = expandAroundCenter(s, i, i + 1);
        
        // Get the maximum length
        const len = Math.max(len1, len2);
        
        // Update the maximum length and indices
        if (len > end - start) {
            start = i - Math.floor((len - 1) / 2);
            end = i + Math.floor(len / 2);
        }
    }
    
    return s.substring(start, end + 1);
};

// Helper function for expand around center
const expandAroundCenter = (s, left, right) => {
    while (left >= 0 && right < s.length && s[left] === s[right]) {
        left--;
        right++;
    }
    return right - left - 1;
};

/**
 * Approach 4: Manacher's Algorithm (Linear Time)
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
const longestPalindrome4 = (s) => {
    if (s == null || s.length === 0) return '';
    
    // Preprocess the string to handle even length palindromes
    const processed = '^#' + s.split('').join('#') + '#$';
    const n = processed.length;
    const p = new Array(n).fill(0);
    
    let center = 0;
    let right = 0;
    let maxLen = 0;
    let maxCenter = 0;
    
    for (let i = 1; i < n - 1; i++) {
        // Mirror of i with respect to center
        const mirror = 2 * center - i;
        
        // If i is within the right boundary, we can use the mirror value
        if (i < right) {
            p[i] = Math.min(right - i, p[mirror]);
        }
        
        // Attempt to expand palindrome centered at i
        while (
            i + 1 + p[i] < n - 1 && 
            i - 1 - p[i] >= 0 &&
            processed[i + 1 + p[i]] === processed[i - 1 - p[i]]
        ) {
            p[i]++;
        }
        
        // If palindrome centered at i expands past right,
        // adjust center and right boundary
        if (i + p[i] > right) {
            center = i;
            right = i + p[i];
        }
        
        // Update the maximum length and center
        if (p[i] > maxLen) {
            maxLen = p[i];
            maxCenter = i;
        }
    }
    
    // Extract the longest palindromic substring
    const start = Math.floor((maxCenter - maxLen) / 2);
    return s.substring(start, start + maxLen);
};

// Test cases
const testCases = [
    { input: "babad", expected: ["bab", "aba"] },
    { input: "cbbd", expected: ["bb"] },
    { input: "a", expected: ["a"] },
    { input: "ac", expected: ["a", "c"] },
    { input: "racecar", expected: ["racecar"] },
    { input: "babadada", expected: ["adada"] },
    { input: "aacabdkacaa", expected: ["aca"] },
    { input: "", expected: [""] },
    { input: "aabbbaa", expected: ["aabbbaa"] },
    { input: "bananas", expected: ["anana"] },
];

// Helper function to check if result is in expected array
const isInExpected = (result, expected) => {
    return expected.includes(result);
};

// Run tests
const runTests = () => {
    const functions = [
        longestPalindrome1, 
        longestPalindrome2, 
        longestPalindrome3, 
        longestPalindrome4
    ];
    
    const functionNames = [
        'Expand Around Center', 
        'Dynamic Programming', 
        'Optimized Expand', 
        "Manacher's Algorithm"
    ];
    
    functions.forEach((fn, index) => {
        console.log(`\nTesting ${functionNames[index]} approach:`);
        testCases.forEach((test, i) => {
            const result = fn(test.input);
            const passed = isInExpected(result, test.expected);
            console.log(`Test ${i + 1}: ${passed ? 'PASS' : 'FAIL'}`);
            if (!passed) {
                console.log(`  Input: "${test.input}"`);
                console.log(`  Expected one of: [${test.expected.map(s => `"${s}"`).join(', ')}]`);
                console.log(`  Got: "${result}"`);
            }
        });
    });
};

// Performance comparison
const measurePerformance = () => {
    // Generate a long string with palindromic patterns
    let longStr = '';
    const pattern1 = 'abacaba';
    const pattern2 = 'dcbaabcd';
    
    // Create a long string with palindromic patterns
    for (let i = 0; i < 100; i++) {
        longStr += (i % 2 === 0) ? pattern1 : pattern2;
    }
    
    console.log('\nPerformance Comparison (long string):');
    
    const functions = [
        longestPalindrome1, 
        longestPalindrome2, 
        longestPalindrome3, 
        longestPalindrome4
    ];
    
    const functionNames = [
        'Expand Around Center', 
        'Dynamic Programming', 
        'Optimized Expand', 
        "Manacher's Algorithm"
    ];
    
    functions.forEach((fn, index) => {
        const start = performance.now();
        const result = fn(longStr);
        const end = performance.now();
        console.log(`${functionNames[index]}: ${(end - start).toFixed(4)}ms`);
    });
};

// Run tests and performance comparison
console.log('=== Longest Palindromic Substring ===');
runTests();
measurePerformance();
