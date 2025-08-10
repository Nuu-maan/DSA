/**
 * Regular Expression Matching - Multiple Approaches
 * 
 * Problem: Implement regular expression matching with support for '.' and '*'.
 * 
 * Example:
 * Input: s = "aab", p = "c*a*b"
 * Output: true
 */

/**
 * Approach 1: Recursion with Memoization (Top-down DP)
 * Time Complexity: O(SP) where S and P are lengths of s and p
 * Space Complexity: O(SP) for memoization
 */
const isMatch1 = (s, p) => {
    const memo = new Map();
    
    const dp = (i, j) => {
        const key = `${i},${j}`;
        
        // Check memoization
        if (memo.has(key)) return memo.get(key);
        
        let result;
        
        // Base case: both strings are empty
        if (j === p.length) {
            result = i === s.length;
        } else {
            // Check if current characters match or pattern is '.'
            const firstMatch = i < s.length && (p[j] === s[i] || p[j] === '.');
            
            // Handle '*' case
            if (j + 1 < p.length && p[j + 1] === '*') {
                // Either skip the pattern (match 0 times) or match one character and continue
                result = dp(i, j + 2) || (firstMatch && dp(i + 1, j));
            } else {
                // Simple match and move both pointers
                result = firstMatch && dp(i + 1, j + 1);
            }
        }
        
        // Memoize the result
        memo.set(key, result);
        return result;
    };
    
    return dp(0, 0);
};

/**
 * Approach 2: Dynamic Programming (Bottom-up)
 * Time Complexity: O(SP)
 * Space Complexity: O(SP)
 */
const isMatch2 = (s, p) => {
    const dp = Array(s.length + 1).fill().map(() => Array(p.length + 1).fill(false));
    dp[s.length][p.length] = true;
    
    for (let i = s.length; i >= 0; i--) {
        for (let j = p.length - 1; j >= 0; j--) {
            const firstMatch = i < s.length && (p[j] === s[i] || p[j] === '.');
            
            if (j + 1 < p.length && p[j + 1] === '*') {
                dp[i][j] = dp[i][j + 2] || (firstMatch && dp[i + 1][j]);
            } else {
                dp[i][j] = firstMatch && dp[i + 1][j + 1];
            }
        }
    }
    
    return dp[0][0];
};

/**
 * Approach 3: Optimized DP with Reduced Space
 * Time Complexity: O(SP)
 * Space Complexity: O(P)
 */
const isMatch3 = (s, p) => {
    let dp = Array(p.length + 1).fill(false);
    dp[0] = true;
    
    // Initialize first row (empty string)
    for (let j = 1; j <= p.length; j++) {
        if (p[j - 1] === '*') {
            dp[j] = dp[j - 2];
        }
    }
    
    for (let i = 1; i <= s.length; i++) {
        const current = Array(p.length + 1).fill(false);
        
        for (let j = 1; j <= p.length; j++) {
            if (p[j - 1] === '.' || p[j - 1] === s[i - 1]) {
                current[j] = dp[j - 1];
            } else if (p[j - 1] === '*') {
                current[j] = current[j - 2];
                if (p[j - 2] === '.' || p[j - 2] === s[i - 1]) {
                    current[j] = current[j] || dp[j];
                }
            }
        }
        
        dp = current;
    }
    
    return dp[p.length];
};

/**
 * Approach 4: Recursive Solution (No Memoization)
 * Time Complexity: O((S+P) * 2^(S+P/2))
 * Space Complexity: O(S² + P²) for recursion stack
 */
const isMatch4 = (s, p) => {
    if (p.length === 0) return s.length === 0;
    
    const firstMatch = s.length > 0 && (p[0] === s[0] || p[0] === '.');
    
    if (p.length >= 2 && p[1] === '*') {
        return isMatch4(s, p.substring(2)) || (firstMatch && isMatch4(s.substring(1), p));
    } else {
        return firstMatch && isMatch4(s.substring(1), p.substring(1));
    }
};

// Test cases
const testCases = [
    { s: "aa", p: "a", expected: false },
    { s: "aa", p: "a*", expected: true },
    { s: "ab", p: ".*", expected: true },
    { s: "aab", p: "c*a*b", expected: true },
    { s: "mississippi", p: "mis*is*p*.", expected: false },
    { s: "", p: "", expected: true },
    { s: "a", p: "", expected: false },
    { s: "", p: "a*", expected: true },
    { s: "aaa", p: "a*a", expected: true },
    { s: "ab", p: ".*c", expected: false },
];

// Run tests
const runTests = () => {
    const functions = [isMatch1, isMatch2, isMatch3, isMatch4];
    const functionNames = [
        'Recursion with Memoization', 
        'Dynamic Programming', 
        'Optimized DP', 
        'Pure Recursion'
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
    const s = 'a'.repeat(10) + 'b' + 'a'.repeat(9);
    const p = 'a*a*a*a*a*a*a*a*a*a*';
    
    console.log('\nPerformance Comparison (complex pattern):');
    
    const functions = [isMatch1, isMatch2, isMatch3];
    const functionNames = [
        'Recursion with Memoization', 
        'Dynamic Programming', 
        'Optimized DP'
    ];
    
    functions.forEach((fn, index) => {
        const start = performance.now();
        const result = fn(s, p);
        const end = performance.now();
        console.log(`${functionNames[index]}: ${(end - start).toFixed(4)}ms`);
    });
};

// Run tests and performance comparison
console.log('=== Regular Expression Matching ===');
runTests();
measurePerformance();
