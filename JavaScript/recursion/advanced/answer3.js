/**
 * Word Break II
 * 
 * Given a string s and a dictionary of strings wordDict, add spaces in s to construct a sentence
 * where each word is a valid dictionary word. Return all such possible sentences in any order.
 * 
 * Note that the same word in the dictionary may be reused multiple times in the segmentation.
 * 
 * @param {string} s
 * @param {string[]} wordDict
 * @return {string[]}
 */

// Approach 1: Recursive with Memoization (Top-Down)
// Time complexity: O(N^2 + 2^N + W) where N is length of s, W is number of words in wordDict
// Space complexity: O(2^N * N + W)
function wordBreak_v1(s, wordDict) {
    const wordSet = new Set(wordDict);
    const memo = new Map();
    
    function backtrack(start) {
        if (memo.has(start)) {
            return memo.get(start);
        }
        
        const result = [];
        
        if (start === s.length) {
            result.push("");
            return result;
        }
        
        for (let end = start + 1; end <= s.length; end++) {
            const word = s.substring(start, end);
            
            if (wordSet.has(word)) {
                const subResults = backtrack(end);
                
                for (const subResult of subResults) {
                    const space = subResult === "" ? "" : " ";
                    result.push(word + space + subResult);
                }
            }
        }
        
        memo.set(start, result);
        return result;
    }
    
    return backtrack(0);
}

// Approach 2: Dynamic Programming (Bottom-Up)
// Time complexity: O(N^2 + 2^N + W)
// Space complexity: O(2^N * N + W)
function wordBreak_v2(s, wordDict) {
    const wordSet = new Set(wordDict);
    const dp = new Array(s.length + 1).fill().map(() => []);
    dp[0] = [""];
    
    for (let i = 1; i <= s.length; i++) {
        for (let j = 0; j < i; j++) {
            const word = s.substring(j, i);
            
            if (dp[j].length > 0 && wordSet.has(word)) {
                for (const sentence of dp[j]) {
                    const space = sentence === "" ? "" : " ";
                    dp[i].push(sentence + space + word);
                }
            }
        }
    }
    
    return dp[s.length];
}

// Approach 3: DFS with Memoization (Alternative Implementation)
// Time complexity: O(N^2 + 2^N + W)
// Space complexity: O(2^N * N + W)
function wordBreak_v3(s, wordDict) {
    const wordSet = new Set(wordDict);
    const memo = new Map();
    
    function dfs(s) {
        if (memo.has(s)) {
            return memo.get(s);
        }
        
        const result = [];
        
        if (s.length === 0) {
            result.push("");
            return result;
        }
        
        for (const word of wordSet) {
            if (s.startsWith(word)) {
                const subResults = dfs(s.substring(word.length));
                
                for (const subResult of subResults) {
                    const space = subResult === "" ? "" : " ";
                    result.push(word + space + subResult);
                }
            }
        }
        
        memo.set(s, result);
        return result;
    }
    
    return dfs(s);
}

// Approach 4: BFS with Memoization
// Time complexity: O(N^2 + 2^N + W)
// Space complexity: O(2^N * N + W)
function wordBreak_v4(s, wordDict) {
    const wordSet = new Set(wordDict);
    const memo = new Map();
    const queue = [[0, ""]]; // [index, current_sentence]
    const result = [];
    
    while (queue.length > 0) {
        const [start, current] = queue.shift();
        
        if (start === s.length) {
            result.push(current.trim());
            continue;
        }
        
        if (memo.has(start) && memo.get(start).has(current)) {
            continue;
        }
        
        for (let end = start + 1; end <= s.length; end++) {
            const word = s.substring(start, end);
            
            if (wordSet.has(word)) {
                const newSentence = current + (current ? " " : "") + word;
                queue.push([end, newSentence]);
            }
        }
        
        // Memoize the current state
        if (!memo.has(start)) {
            memo.set(start, new Set());
        }
        memo.get(start).add(current);
    }
    
    return result;
}

// Approach 5: Iterative with Stack (DFS)
// Time complexity: O(N^2 + 2^N + W)
// Space complexity: O(2^N * N + W)
function wordBreak_v5(s, wordDict) {
    const wordSet = new Set(wordDict);
    const memo = new Map();
    const stack = [[0, ""]]; // [index, current_sentence]
    const result = [];
    
    while (stack.length > 0) {
        const [start, current] = stack.pop();
        
        if (start === s.length) {
            result.push(current.trim());
            continue;
        }
        
        if (memo.has(start) && memo.get(start).has(current)) {
            continue;
        }
        
        for (let end = s.length; end > start; end--) {
            const word = s.substring(start, end);
            
            if (wordSet.has(word)) {
                const newSentence = current + (current ? " " : "") + word;
                stack.push([end, newSentence]);
            }
        }
        
        // Memoize the current state
        if (!memo.has(start)) {
            memo.set(start, new Set());
        }
        memo.get(start).add(current);
    }
    
    return result;
}

// Approach 6: Optimized with Word Lengths and Early Pruning
// Time complexity: O(N^2 + 2^N + W)
// Space complexity: O(2^N * N + W)
function wordBreak_v6(s, wordDict) {
    const wordSet = new Set(wordDict);
    const wordLens = new Set();
    const maxLen = Math.max(...wordDict.map(word => word.length));
    const memo = new Map();
    
    // Precompute word lengths for optimization
    for (const word of wordDict) {
        wordLens.add(word.length);
    }
    
    function backtrack(start) {
        if (memo.has(start)) {
            return memo.get(start);
        }
        
        const result = [];
        
        if (start === s.length) {
            result.push("");
            return result;
        }
        
        // Try all possible word lengths
        for (const len of wordLens) {
            const end = start + len;
            
            if (end > s.length) continue;
            
            const word = s.substring(start, end);
            
            if (wordSet.has(word)) {
                const subResults = backtrack(end);
                
                for (const subResult of subResults) {
                    const space = subResult === "" ? "" : " ";
                    result.push(word + space + subResult);
                }
            }
        }
        
        memo.set(start, result);
        return result;
    }
    
    return backtrack(0);
}

// Helper function to compare arrays of strings regardless of order
function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    const set1 = new Set(arr1);
    const set2 = new Set(arr2);
    return arr1.every(x => set2.has(x)) && arr2.every(x => set1.has(x));
}

// Testing the functions
function runTests() {
    const testCases = [
        {
            s: "catsanddog",
            wordDict: ["cat", "cats", "and", "sand", "dog"],
            expected: ["cats and dog", "cat sand dog"]
        },
        {
            s: "pineapplepenapple",
            wordDict: ["apple", "pen", "applepen", "pine", "pineapple"],
            expected: [
                "pine apple pen apple",
                "pineapple pen apple",
                "pine applepen apple"
            ]
        },
        {
            s: "catsandog",
            wordDict: ["cats", "dog", "sand", "and", "cat"],
            expected: []
        },
        {
            s: "a",
            wordDict: ["a"],
            expected: ["a"]
        },
        {
            s: "aaaaaaaa",
            wordDict: ["a", "aa", "aaa", "aaaa", "aaaaa"],
            expected: [
                "a a a a a a a a", "aa a a a a a a", "a aa a a a a a", 
                "a a aa a a a a", "aa aa a a a a", "aaa a a a a a", 
                "a a a aa a a a", "aa a aa a a a", "a aa aa a a a", 
                "a aaaa a a a", "a a a a aa a a", "aa a a aa a a", 
                "a aa a aa a a", "a a aa aa a a", "aa aa aa a a", 
                "aaa aa a a a", "a a aaa a a a", "aa aaa a a a", 
                "a a a a a aa a", "aa a a a aa a", "a aa a a aa a", 
                "a a aa a aa a", "aa aa a aa a", "aaa a a aa a", 
                "a a a aa aa a", "aa a aa aa a", "a aa aa aa a", 
                "a aaaa aa a", "a a a aaa a a", "aa a aaa a a", 
                "a aa aaa a a", "a a a a a a aa", "aa a a a a aa", 
                "a aa a a a aa", "a a aa a a aa", "aa aa a a aa", 
                "aaa a a a aa", "a a a aa a aa", "aa a aa a aa", 
                "a aa aa a aa", "a aaaa a aa", "a a a a aa aa", 
                "aa a a aa aa", "a aa a aa aa", "a a aa aa aa", 
                "aa aa aa aa", "aaa a aa aa", "a a aaaa aa", 
                "aa aaaa aa", "a a a a aaaa", "aa a a aaaa", 
                "a aa a aaaa", "a a aa aaaa", "aa aa aaaa", 
                "aaa a aaaa", "a a a aaa aa", "aa a aaa aa", 
                "a aa aaa aa", "a a a a a aaa", "aa a a a aaa", 
                "a aa a a aaa", "a a aa a aaa", "aa aa a aaa", 
                "aaa a a aaa", "a a a aa aaa", "aa a aa aaa", 
                "a aa aa aaa", "a aaaa aaa", "a a a a aaaaa", 
                "aa a a aaaaa", "a aa a aaaaa", "a a aa aaaaa", 
                "aa aa aaaaa", "aaa a aaaaa", "a a a aaa aaa", 
                "aa a aaa aaa", "a aa aaa aaa", "a a a a aaaaaa", 
                "aa a a aaaaaa", "a aa a aaaaaa", "a a aa aaaaaa", 
                "aa aa aaaaaa", "aaa a aaaaaa", "a a a aaa aaaa", 
                "aa a aaa aaaa", "a aa aaa aaaa", "a a a a aaaaaaa", 
                "aa a a aaaaaaa", "a aa a aaaaaaa", "a a aa aaaaaaa", 
                "aa aa aaaaaaa", "aaa a aaaaaaa", "a a a aaaaaaaaa", 
                "aa a aaaaaaaaa", "a aa aaaaaaaaa", "a a a aaaaaaaaaa", 
                "aa a aaaaaaaaaa", "a a a aaaaaaaaaaa", "aaaaaaaa"
            ]
        }
    ];
    
    console.log('Running tests for wordBreak functions...\n');
    
    const versions = [
        { name: 'v1 (Recursive with Memoization)', fn: wordBreak_v1 },
        { name: 'v2 (DP Bottom-Up)', fn: wordBreak_v2 },
        { name: 'v3 (DFS with Memoization)', fn: wordBreak_v3 },
        { name: 'v4 (BFS with Memoization)', fn: wordBreak_v4 },
        { name: 'v5 (Iterative DFS with Stack)', fn: wordBreak_v5 },
        { name: 'v6 (Optimized with Word Lengths)', fn: wordBreak_v6 }
    ];
    
    // Run tests for each version
    for (const version of versions) {
        console.log(`Testing ${version.name}:`);
        let allPassed = true;
        
        for (const test of testCases) {
            const start = process.hrtime.bigint();
            const result = version.fn(test.s, test.wordDict);
            const end = process.hrtime.bigint();
            const timeMs = Number(end - start) / 1e6; // Convert to milliseconds
            
            const isCorrect = arraysEqual(result, test.expected);
            const status = isCorrect ? '✅ PASS' : '❌ FAIL';
            
            if (!isCorrect) {
                allPassed = false;
                console.log(`  Input: s="${test.s}", wordDict=[${test.wordDict}]`);
                console.log(`  Expected: [${test.expected}]`);
                console.log(`  Got: [${result}]`);
            }
            
            console.log(`  Test case: ${status} - ${timeMs.toFixed(3)}ms`);
        }
        
        console.log(allPassed ? '\n✅ All tests passed!\n' : '\n❌ Some tests failed!\n');
    }
}

// Run the tests
runTests();

// Export the functions for potential use in other files
module.exports = {
    wordBreak_v1,
    wordBreak_v2,
    wordBreak_v3,
    wordBreak_v4,
    wordBreak_v5,
    wordBreak_v6,
    arraysEqual
};
