/**
 * Wildcard Matching
 * 
 * Given an input string (s) and a pattern (p), implement wildcard pattern matching with support for '?' and '*' where:
 * - '?' Matches any single character.
 * - '*' Matches any sequence of characters (including the empty sequence).
 * The matching should cover the entire input string (not partial).
 * 
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */

// Approach 1: Dynamic Programming (Bottom-Up)
// Time complexity: O(SP) where S is length of string and P is length of pattern
// Space complexity: O(SP)
function isMatch_v1(s, p) {
    const dp = Array(s.length + 1).fill().map(() => Array(p.length + 1).fill(false));
    dp[0][0] = true;
    
    // Handle patterns starting with multiple '*' which can match empty string
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
                dp[i][j] = dp[i][j - 1] ||  // Match empty sequence
                           dp[i - 1][j];     // Match one or more characters
            }
        }
    }
    
    return dp[s.length][p.length];
}

// Approach 2: Dynamic Programming with Space Optimization
// Time complexity: O(SP)
// Space complexity: O(P)
function isMatch_v2(s, p) {
    let prev = Array(p.length + 1).fill(false);
    prev[0] = true;
    
    // Initialize first row (empty string)
    for (let j = 1; j <= p.length; j++) {
        if (p[j - 1] === '*') {
            prev[j] = prev[j - 1];
        }
    }
    
    for (let i = 1; i <= s.length; i++) {
        const curr = Array(p.length + 1).fill(false);
        
        for (let j = 1; j <= p.length; j++) {
            if (p[j - 1] === '?' || s[i - 1] === p[j - 1]) {
                curr[j] = prev[j - 1];
            } else if (p[j - 1] === '*') {
                curr[j] = curr[j - 1] || prev[j];
            }
        }
        
        prev = curr;
    }
    
    return prev[p.length];
}

// Approach 3: Two Pointers with Greedy Approach
// Time complexity: O(min(S, P)) for best/average case, O(S log P) for certain cases
// Space complexity: O(1)
function isMatch_v3(s, p) {
    let i = 0;      // Pointer for string
    let j = 0;      // Pointer for pattern
    let star = -1;  // Position of last '*' in pattern
    let match = 0;  // Position in string where we matched the last '*'
    
    while (i < s.length) {
        // If characters match or pattern has '?', move both pointers
        if (j < p.length && (p[j] === '?' || p[j] === s[i])) {
            i++;
            j++;
        } 
        // If pattern has '*', record the position and try to match empty string
        else if (j < p.length && p[j] === '*') {
            star = j;
            match = i;
            j++;
        } 
        // If we have a previous '*' in pattern, backtrack to it and try matching one more character
        else if (star !== -1) {
            j = star + 1;
            match++;
            i = match;
        } 
        // No match and no '*' to backtrack to
        else {
            return false;
        }
    }
    
    // Skip any remaining '*' in the pattern
    while (j < p.length && p[j] === '*') {
        j++;
    }
    
    return j === p.length;
}

// Approach 4: Recursive with Memoization
// Time complexity: O(SP)
// Space complexity: O(SP) for memoization
function isMatch_v4(s, p) {
    const memo = new Map();
    
    function dp(i, j) {
        const key = `${i},${j}`;
        if (memo.has(key)) return memo.get(key);
        
        let result;
        
        // Base cases
        if (j === p.length) {
            result = (i === s.length);
        } else if (i === s.length) {
            // If we've reached the end of string, remaining pattern must be all '*'
            result = (p[j] === '*' && dp(i, j + 1));
        } else if (p[j] === '*') {
            // Match zero or more characters
            result = dp(i, j + 1) || dp(i + 1, j);
        } else if (p[j] === '?' || s[i] === p[j]) {
            // Match single character
            result = dp(i + 1, j + 1);
        } else {
            result = false;
        }
        
        memo.set(key, result);
        return result;
    }
    
    return dp(0, 0);
}

// Approach 5: Iterative with Stack (DFS)
// Time complexity: O(SP) in worst case
// Space complexity: O(S + P) for the stack
function isMatch_v5(s, p) {
    const stack = [];
    const memo = new Set();
    
    stack.push([0, 0]);
    
    while (stack.length > 0) {
        const [i, j] = stack.pop();
        const key = `${i},${j}`;
        
        if (memo.has(key)) continue;
        memo.add(key);
        
        // If we've reached the end of both string and pattern
        if (i === s.length && j === p.length) {
            return true;
        }
        
        // If we've reached the end of pattern but not string
        if (j === p.length) {
            continue;
        }
        
        // If we've reached the end of string, remaining pattern must be all '*'
        if (i === s.length) {
            if (p[j] === '*') {
                stack.push([i, j + 1]);
            }
            continue;
        }
        
        if (p[j] === '*') {
            // Try matching zero characters
            stack.push([i, j + 1]);
            // Try matching one or more characters
            stack.push([i + 1, j]);
        } else if (p[j] === '?' || s[i] === p[j]) {
            // Match single character
            stack.push([i + 1, j + 1]);
        }
    }
    
    return false;
}

// Approach 6: Optimized Two Pointers with Greedy (Best Performance)
// Time complexity: O(min(S, P)) for best case, O(S + P) for worst case
// Space complexity: O(1)
function isMatch_v6(s, p) {
    let sIndex = 0, pIndex = 0;
    let starIndex = -1, sTempIndex = -1;
    
    while (sIndex < s.length) {
        // If pattern character is '?' or matches string character
        if (pIndex < p.length && (p[pIndex] === '?' || p[pIndex] === s[sIndex])) {
            sIndex++;
            pIndex++;
        } 
        // If pattern character is '*'
        else if (pIndex < p.length && p[pIndex] === '*') {
            starIndex = pIndex;
            sTempIndex = sIndex;
            pIndex++;
        } 
        // If pattern doesn't match and we have a previous '*'
        else if (starIndex !== -1) {
            pIndex = starIndex + 1;
            sIndex = ++sTempIndex;
        } 
        // If no match and no '*' to backtrack to
        else {
            return false;
        }
    }
    
    // Skip any remaining '*' in the pattern
    while (pIndex < p.length && p[pIndex] === '*') {
        pIndex++;
    }
    
    return pIndex === p.length;
}

// Testing the functions
function runTests() {
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
        { s: "aab", p: "c*a*b", expected: false },
        { s: "ab", p: "?*", expected: true },
        { s: "a", p: "a*", expected: true },
        { s: "aa", p: "a*a", expected: true },
        { s: "ab", p: "*?*?*", expected: true },
        { s: "abefcdgiescdfimde", p: "ab*cd?i*de", expected: true },
        { s: "leetcode", p: "*e*t?d*", expected: false },
        { s: "a", p: "a*", expected: true },
        { s: "a", p: "a?", expected: false },
        { s: "a", p: "*?*", expected: true }
    ];
    
    console.log('Running tests for wildcard matching functions...\n');
    
    const versions = [
        { name: 'v1 (DP Bottom-Up)', fn: isMatch_v1 },
        { name: 'v2 (DP Space Optimized)', fn: isMatch_v2 },
        { name: 'v3 (Two Pointers Greedy)', fn: isMatch_v3 },
        { name: 'v4 (Recursive with Memoization)', fn: isMatch_v4 },
        { name: 'v5 (Iterative DFS with Stack)', fn: isMatch_v5 },
        { name: 'v6 (Optimized Two Pointers)', fn: isMatch_v6 }
    ];
    
    // Run tests for each version
    for (const version of versions) {
        console.log(`Testing ${version.name}:`);
        let allPassed = true;
        
        for (const test of testCases) {
            const start = process.hrtime.bigint();
            const result = version.fn(test.s, test.p);
            const end = process.hrtime.bigint();
            const timeMs = Number(end - start) / 1e6; // Convert to milliseconds
            
            const status = result === test.expected ? '✅ PASS' : '❌ FAIL';
            if (status === '❌ FAIL') allPassed = false;
            
            console.log(`  "${test.s}" matches "${test.p}" ? ${result} (expected: ${test.expected}) - ${timeMs.toFixed(3)}ms - ${status}`);
        }
        
        console.log(allPassed ? '\n✅ All tests passed!\n' : '\n❌ Some tests failed!\n');
    }
}

// Run the tests
runTests();

// Export the functions for potential use in other files
module.exports = {
    isMatch_v1,
    isMatch_v2,
    isMatch_v3,
    isMatch_v4,
    isMatch_v5,
    isMatch_v6
};
