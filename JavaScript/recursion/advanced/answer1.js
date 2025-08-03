/**
 * Regular Expression Matching
 * 
 * Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*' where:
 * - '.' Matches any single character.
 * - '*' Matches zero or more of the preceding element.
 * The matching should cover the entire input string (not partial).
 * 
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */

// Approach 1: Recursive with Memoization (Top-Down)
// Time complexity: O(SP) where S is length of string and P is length of pattern
// Space complexity: O(SP) for memoization
function isMatch_v1(s, p) {
    const memo = new Map();
    
    function dp(i, j) {
        const key = `${i},${j}`;
        if (memo.has(key)) return memo.get(key);
        
        let ans;
        
        if (j === p.length) {
            ans = i === s.length;
        } else {
            const firstMatch = i < s.length && (p[j] === s[i] || p[j] === '.');
            
            if (j + 1 < p.length && p[j + 1] === '*') {
                ans = dp(i, j + 2) || (firstMatch && dp(i + 1, j));
            } else {
                ans = firstMatch && dp(i + 1, j + 1);
            }
        }
        
        memo.set(key, ans);
        return ans;
    }
    
    return dp(0, 0);
}

// Approach 2: Dynamic Programming (Bottom-Up)
// Time complexity: O(SP)
// Space complexity: O(SP)
function isMatch_v2(s, p) {
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
}

// Approach 3: Dynamic Programming with Space Optimization
// Time complexity: O(SP)
// Space complexity: O(P)
function isMatch_v3(s, p) {
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
            if (p[j - 1] === '*') {
                current[j] = current[j - 2] || 
                            ((s[i - 1] === p[j - 2] || p[j - 2] === '.') && dp[j]);
            } else if (p[j - 1] === '.' || s[i - 1] === p[j - 1]) {
                current[j] = dp[j - 1];
            }
        }
        
        dp = current;
    }
    
    return dp[p.length];
}

// Approach 4: Recursive with Memoization using Object
// Time complexity: O(SP)
// Space complexity: O(SP)
function isMatch_v4(s, p) {
    const memo = {};
    
    function dp(i, j) {
        const key = `${i},${j}`;
        if (key in memo) return memo[key];
        
        if (j === p.length) return i === s.length;
        
        const firstMatch = i < s.length && (p[j] === s[i] || p[j] === '.');
        
        let ans;
        if (j + 1 < p.length && p[j + 1] === '*') {
            ans = dp(i, j + 2) || (firstMatch && dp(i + 1, j));
        } else {
            ans = firstMatch && dp(i + 1, j + 1);
        }
        
        memo[key] = ans;
        return ans;
    }
    
    return dp(0, 0);
}

// Approach 5: NFA (Nondeterministic Finite Automaton)
// Time complexity: O(SP)
// Space complexity: O(SP)
function isMatch_v5(s, p) {
    // Convert pattern to NFA states
    const states = [];
    let state = 0;
    
    // Build NFA states
    for (let i = 0; i < p.length; i++) {
        const char = p[i];
        if (i + 1 < p.length && p[i + 1] === '*') {
            states.push({ char, isStar: true });
            i++; // Skip the '*' in the next iteration
        } else {
            states.push({ char, isStar: false });
        }
    }
    
    // Memoization for DP
    const memo = new Map();
    
    function dfs(si, stateIdx) {
        const key = `${si},${stateIdx}`;
        if (memo.has(key)) return memo.get(key);
        
        // If we've matched all characters and states
        if (si === s.length && stateIdx === states.length) {
            memo.set(key, true);
            return true;
        }
        
        // If we've reached the end of states but not the string
        if (stateIdx === states.length) {
            memo.set(key, false);
            return false;
        }
        
        const { char, isStar } = states[stateIdx];
        
        // Handle star state
        if (isStar) {
            // Try matching 0 occurrences
            if (dfs(si, stateIdx + 1)) {
                memo.set(key, true);
                return true;
            }
            
            // Try matching 1 or more occurrences
            if (si < s.length && (char === '.' || char === s[si])) {
                if (dfs(si + 1, stateIdx)) {
                    memo.set(key, true);
                    return true;
                }
            }
            
            memo.set(key, false);
            return false;
        } 
        // Handle normal state
        else {
            if (si >= s.length) {
                memo.set(key, false);
                return false;
            }
            
            if (char === '.' || char === s[si]) {
                const result = dfs(si + 1, stateIdx + 1);
                memo.set(key, result);
                return result;
            } else {
                memo.set(key, false);
                return false;
            }
        }
    }
    
    return dfs(0, 0);
}

// Approach 6: Iterative with Backtracking
// Time complexity: O((S+P) * 2^(S+P/2)) in worst case
// Space complexity: O(S² + P²) for the stack
function isMatch_v6(s, p) {
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
        
        const firstMatch = i < s.length && (p[j] === s[i] || p[j] === '.');
        
        if (j + 1 < p.length && p[j + 1] === '*') {
            // Try matching 0 occurrences
            stack.push([i, j + 2]);
            
            // Try matching 1 or more occurrences
            if (firstMatch) {
                stack.push([i + 1, j]);
            }
        } else if (firstMatch) {
            stack.push([i + 1, j + 1]);
        }
    }
    
    return false;
}

// Testing the functions
function runTests() {
    const testCases = [
        { s: "aa", p: "a", expected: false },
        { s: "aa", p: "a*", expected: true },
        { s: "ab", p: ".*", expected: true },
        { s: "aab", p: "c*a*b", expected: true },
        { s: "mississippi", p: "mis*is*p*.", expected: false },
        { s: "", p: "", expected: true },
        { s: "", p: ".*", expected: true },
        { s: "abc", p: "a.c", expected: true },
        { s: "aaa", p: "a*a", expected: true },
        { s: "a", p: "ab*", expected: true },
        { s: "bbbba", p: ".*a*a", expected: true },
        { s: "ab", p: ".*..", expected: true },
        { s: "a", p: ".*..a*", expected: false }
    ];
    
    console.log('Running tests for isMatch functions...\n');
    
    const versions = [
        { name: 'v1 (Recursive with Memoization)', fn: isMatch_v1 },
        { name: 'v2 (DP Bottom-Up)', fn: isMatch_v2 },
        { name: 'v3 (DP Space Optimized)', fn: isMatch_v3 },
        { name: 'v4 (Recursive with Object Memo)', fn: isMatch_v4 },
        { name: 'v5 (NFA)', fn: isMatch_v5 },
        { name: 'v6 (Iterative with Backtracking)', fn: isMatch_v6 }
    ];
    
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
