/**
 * Wildcard Matching - Multiple Approaches
 * 
 * Problem: Implement wildcard pattern matching with support for '?' and '*'.
 * 
 * Example:
 * Input: s = "adceb", p = "*a*b"
 * Output: true
 */

/**
 * Approach 1: Dynamic Programming (Bottom-up)
 * Time Complexity: O(SP) where S and P are lengths of s and p
 * Space Complexity: O(SP)
 */
const isMatch1 = (s, p) => {
    const dp = Array(s.length + 1).fill().map(() => Array(p.length + 1).fill(false));
    dp[0][0] = true;
    
    // Handle patterns starting with multiple '*' (they can match empty string)
    for (let j = 1; j <= p.length; j++) {
        if (p[j - 1] === '*') {
            dp[0][j] = dp[0][j - 1];
        }
    }
    
    for (let i = 1; i <= s.length; i++) {
        for (let j = 1; j <= p.length; j++) {
            if (p[j - 1] === '?' || s[i - 1] === p[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else if (p[j - 1] === '*') {
                dp[i][j] = dp[i][j - 1] || dp[i - 1][j];
            }
        }
    }
    
    return dp[s.length][p.length];
};

/**
 * Approach 2: Backtracking with Memoization (Top-down DP)
 * Time Complexity: O(SP)
 * Space Complexity: O(SP) for memoization
 */
const isMatch2 = (s, p) => {
    const memo = new Map();
    
    const dp = (i, j) => {
        const key = `${i},${j}`;
        
        // Check memoization
        if (memo.has(key)) return memo.get(key);
        
        let result;
        
        // Base cases
        if (i === s.length && j === p.length) {
            result = true;
        } else if (j === p.length) {
            result = false;
        } else if (i === s.length) {
            // Check if remaining pattern is all '*'s
            result = p.slice(j).split('').every(char => char === '*');
        } else if (p[j] === '?' || s[i] === p[j]) {
            // Match single character
            result = dp(i + 1, j + 1);
        } else if (p[j] === '*') {
            // Match 0 or more characters
            result = dp(i, j + 1) || dp(i + 1, j);
        } else {
            result = false;
        }
        
        memo.set(key, result);
        return result;
    };
    
    return dp(0, 0);
};

/**
 * Approach 3: Two Pointers (Greedy)
 * Time Complexity: O(min(S, P)) for the best case, O(S log P) for the average case
 * Space Complexity: O(1)
 */
const isMatch3 = (s, p) => {
    let sIndex = 0, pIndex = 0;
    let starIndex = -1, sTmpIndex = -1;
    
    while (sIndex < s.length) {
        // If pattern character matches string character or pattern has '?'
        if (pIndex < p.length && (p[pIndex] === '?' || p[pIndex] === s[sIndex])) {
            sIndex++;
            pIndex++;
        } 
        // If pattern has '*'
        else if (pIndex < p.length && p[pIndex] === '*') {
            // Save the current positions
            starIndex = pIndex;
            sTmpIndex = sIndex;
            // Move pattern pointer forward
            pIndex++;
        } 
        // If pattern doesn't match and we have a previous '*' to fall back to
        else if (starIndex !== -1) {
            // Backtrack to the last '*' position and try matching one more character
            pIndex = starIndex + 1;
            sIndex = sTmpIndex + 1;
            sTmpIndex = sIndex;
        } 
        // If no match and no '*' to fall back to
        else {
            return false;
        }
    }
    
    // Check for remaining characters in pattern (should be all '*'s)
    while (pIndex < p.length && p[pIndex] === '*') {
        pIndex++;
    }
    
    return pIndex === p.length;
};

/**
 * Approach 4: Iterative with Backtracking
 * Time Complexity: O(S + P) in best case, O(S * P) in worst case
 * Space Complexity: O(1)
 */
const isMatch4 = (s, p) => {
    let sIndex = 0, pIndex = 0;
    let starIndex = -1, sTmpIndex = -1;
    
    while (sIndex < s.length) {
        // If pattern character matches string character or pattern has '?'
        if (pIndex < p.length && (p[pIndex] === '?' || p[pIndex] === s[sIndex])) {
            sIndex++;
            pIndex++;
        } 
        // If pattern has '*'
        else if (pIndex < p.length && p[pIndex] === '*') {
            // Save the current positions
            starIndex = pIndex;
            sTmpIndex = sIndex;
            // Move pattern pointer forward
            pIndex++;
        } 
        // If pattern doesn't match and we have a previous '*' to fall back to
        else if (starIndex !== -1) {
            // Backtrack to the last '*' position and try matching one more character
            pIndex = starIndex + 1;
            sIndex = sTmpIndex + 1;
            sTmpIndex = sIndex;
        } 
        // If no match and no '*' to fall back to
        else {
            return false;
        }
    }
    
    // Check for remaining characters in pattern (should be all '*'s)
    while (pIndex < p.length && p[pIndex] === '*') {
        pIndex++;
    }
    
    return pIndex === p.length;
};

// Test cases
const testCases = [
    { s: "aa", p: "a", expected: false },
    { s: "aa", p: "*", expected: true },
    { s: "cb", p: "?a", expected: false },
    { s: "adceb", p: "*a*b", expected: true },
    { s: "acdcb", p: "a*c?b", expected: false },
    { s: "", p: "", expected: true },
    { s: "", p: "******", expected: true },
    { s: "ho", p: "ho**", expected: true },
    { s: "mississippi", p: "m??*ss*?i*pi", expected: false },
    { s: "abcabczzzde", p: "*abc???de*", expected: true },
];

// Run tests
const runTests = () => {
    const functions = [isMatch1, isMatch2, isMatch3, isMatch4];
    const functionNames = [
        'Dynamic Programming', 
        'Memoization', 
        'Two Pointers (Greedy)', 
        'Iterative with Backtracking'
    ];
    
    functions.forEach((fn, index) => {
        console.log(`\nTesting ${functionNames[index]} approach:`);
        testCases.forEach((test, i) => {
            const result = fn(test.s, test.p);
            const passed = result === test.expected;
            console.log(`Test ${i + 1}: ${passed ? 'PASS' : 'FAIL'}`);
            if (!passed) {
                console.log(`  Input: "${test.s}", "${test.p}"`);
                console.log(`  Expected: ${test.expected}`);
                console.log(`  Got: ${result}`);
            }
        });
    });
};

// Performance comparison
const measurePerformance = () => {
    // Generate a complex pattern and string
    const s = 'a'.repeat(100) + 'b' + 'a'.repeat(99);
    const p = '*a*';
    
    console.log('\nPerformance Comparison (complex pattern):');
    
    const functions = [isMatch1, isMatch2, isMatch3, isMatch4];
    const functionNames = [
        'Dynamic Programming', 
        'Memoization', 
        'Two Pointers (Greedy)', 
        'Iterative with Backtracking'
    ];
    
    functions.forEach((fn, index) => {
        const start = performance.now();
        const result = fn(s, p);
        const end = performance.now();
        console.log(`${functionNames[index]}: ${(end - start).toFixed(4)}ms`);
    });
};

// Run tests and performance comparison
console.log('=== Wildcard Matching ===');
runTests();
measurePerformance();
