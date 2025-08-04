/**
 * Longest Duplicate Substring
 * 
 * Problem: Given a string s, return the longest substring that appears at least twice in s.
 * If multiple such substrings exist, return any one of them.
 * Source: https://leetcode.com/problems/longest-duplicate-substring/
 * 
 * Approach 1: Binary Search with Rolling Hash (Rabin-Karp)
 * Time Complexity: O(n log n) - binary search + rolling hash
 * Space Complexity: O(n) - for the hash set
 */
function longestDupSubstringRabinKarp(s) {
    const MOD = 2**32; // Large prime for hashing
    const a = 26; // Base for hashing (number of lowercase letters)
    const n = s.length;
    let result = "";
    
    // Binary search for the maximum length
    let left = 1;
    let right = n - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const found = rabinKarpSearch(s, mid, a, MOD);
        
        if (found !== "") {
            result = found;
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return result;
}

function rabinKarpSearch(s, len, a, mod) {
    const n = s.length;
    let hash = 0;
    let aL = 1; // a^len % mod
    
    // Calculate a^len % mod
    for (let i = 0; i < len; i++) {
        aL = (aL * a) % mod;
    }
    
    // Calculate initial hash for the first window
    const seen = new Map();
    
    for (let i = 0; i < len; i++) {
        hash = (hash * a + s.charCodeAt(i)) % mod;
    }
    
    seen.set(hash, 0);
    
    // Slide the window and check for duplicates
    for (let i = 1; i <= n - len; i++) {
        // Remove leftmost character and add new right character
        const leftChar = s.charCodeAt(i - 1);
        const rightChar = s.charCodeAt(i + len - 1);
        
        hash = (hash * a - leftChar * aL % mod + mod) % mod; // Remove left
        hash = (hash + rightChar) % mod; // Add right
        
        if (seen.has(hash)) {
            const start = seen.get(hash);
            const currentSub = s.substring(i, i + len);
            const existingSub = s.substring(start, start + len);
            
            // Handle hash collision by comparing actual substrings
            if (currentSub === existingSub) {
                return currentSub;
            }
        } else {
            seen.set(hash, i);
        }
    }
    
    return "";
}

/**
 * Approach 2: Binary Search with Suffix Array
 * Time Complexity: O(n log n) - building suffix array + binary search
 * Space Complexity: O(n) - for the suffix array
 */
function longestDupSubstringSuffixArray(s) {
    const n = s.length;
    const sa = buildSuffixArray(s);
    let maxLen = 0;
    let result = "";
    
    // Compare adjacent suffixes to find the longest common prefix
    for (let i = 1; i < n; i++) {
        const lcp = longestCommonPrefix(s, sa[i], sa[i-1]);
        if (lcp > maxLen) {
            maxLen = lcp;
            result = s.substring(sa[i], sa[i] + lcp);
        }
    }
    
    return result;
}

function buildSuffixArray(s) {
    const n = s.length;
    const k = 1;
    let c = new Array(n);
    let p = new Array(n);
    
    // Initialize with single characters
    const a = Array.from({ length: n }, (_, i) => s.charCodeAt(i) - 'a'.charCodeAt(0));
    
    // Sort the characters and assign ranks
    const count = new Array(26).fill(0);
    for (let i = 0; i < n; i++) count[a[i]]++;
    for (let i = 1; i < 26; i++) count[i] += count[i-1];
    for (let i = n-1; i >= 0; i--) p[--count[a[i]]] = i;
    
    c[p[0]] = 0;
    let classes = 1;
    
    for (let i = 1; i < n; i++) {
        if (a[p[i]] !== a[p[i-1]]) classes++;
        c[p[i]] = classes - 1;
    }
    
    // Build suffix array by doubling the length of sorted suffixes
    let pn = new Array(n);
    let cn = new Array(n);
    
    for (let h = 0; (1 << h) < n; h++) {
        for (let i = 0; i < n; i++) {
            pn[i] = p[i] - (1 << h);
            if (pn[i] < 0) pn[i] += n;
        }
        
        const count = new Array(classes).fill(0);
        for (let i = 0; i < n; i++) count[c[pn[i]]]++;
        for (let i = 1; i < classes; i++) count[i] += count[i-1];
        for (let i = n-1; i >= 0; i--) p[--count[c[pn[i]]]] = pn[i];
        
        cn[p[0]] = 0;
        classes = 1;
        
        for (let i = 1; i < n; i++) {
            const curr = [c[p[i]], c[(p[i] + (1 << h)) % n]];
            const prev = [c[p[i-1]], c[(p[i-1] + (1 << h)) % n]];
            
            if (curr[0] !== prev[0] || curr[1] !== prev[1]) classes++;
            cn[p[i]] = classes - 1;
        }
        
        [c, cn] = [cn, c];
    }
    
    return p.slice(1); // Exclude the empty suffix
}

function longestCommonPrefix(s, i, j) {
    let len = 0;
    while (i < s.length && j < s.length && s[i] === s[j]) {
        i++;
        j++;
        len++;
    }
    return len;
}

/**
 * Approach 3: Binary Search with Trie
 * Time Complexity: O(n²) in worst case, but O(n log n) on average
 * Space Complexity: O(n²) in worst case
 */
function longestDupSubstringTrie(s) {
    let left = 1;
    let right = s.length - 1;
    let result = "";
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const found = searchWithTrie(s, mid);
        
        if (found !== "") {
            result = found;
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return result;
}

function searchWithTrie(s, len) {
    const root = new Map();
    
    for (let i = 0; i <= s.length - len; i++) {
        const substr = s.substring(i, i + len);
        
        if (hasOrAdd(root, substr)) {
            return substr;
        }
    }
    
    return "";
}

function hasOrAdd(root, s) {
    let node = root;
    let isNew = false;
    
    for (const char of s) {
        if (!node.has(char)) {
            node.set(char, new Map());
            isNew = true;
        }
        node = node.get(char);
    }
    
    // Mark as end of word
    if (!node.has('$')) {
        node.set('$', true);
        return false; // Not found before
    }
    
    return true; // Found before
}

/**
 * Approach 4: Suffix Automaton
 * Time Complexity: O(n)
 * Space Complexity: O(n)
 */
function longestDupSubstringSuffixAutomaton(s) {
    class State {
        constructor() {
            this.len = 0;
            this.link = -1;
            this.next = new Map();
            this.cnt = 0;
        }
    }
    
    class SuffixAutomaton {
        constructor() {
            this.size = 1;
            this.last = 0;
            this.states = [new State()];
        }
        
        saExtend(c) {
            const p = this.last;
            const curr = new State();
            curr.len = this.states[p].len + 1;
            
            let q = p;
            while (q !== -1 && !this.states[q].next.has(c)) {
                this.states[q].next.set(c, this.size);
                q = this.states[q].link;
            }
            
            if (q === -1) {
                curr.link = 0;
            } else {
                const next = this.states[q].next.get(c);
                if (this.states[q].len + 1 === this.states[next].len) {
                    curr.link = next;
                } else {
                    const clone = { ...this.states[next] };
                    clone.len = this.states[q].len + 1;
                    
                    while (q !== -1 && this.states[q].next.get(c) === next) {
                        this.states[q].next.set(c, this.size);
                        q = this.states[q].link;
                    }
                    
                    clone.link = this.states[next].link;
                    this.states[next].link = this.size;
                    curr.link = this.size;
                    
                    this.states.push(clone);
                    this.size++;
                }
            }
            
            this.states.push(curr);
            this.last = this.size;
            this.size++;
        }
    }
    
    const sam = new SuffixAutomaton();
    
    // Build the suffix automaton
    for (const c of s) {
        sam.saExtend(c);
    }
    
    // Find the deepest state with count > 1
    let maxLen = 0;
    let result = "";
    
    function dfs(node, current, len) {
        if (node.cnt > 1 && len > maxLen) {
            maxLen = len;
            result = current;
        }
        
        for (const [c, next] of node.next) {
            dfs(sam.states[next], current + c, len + 1);
        }
    }
    
    // Count occurrences of each state
    const visited = new Set();
    
    function countOccurrences(node) {
        if (visited.has(node)) return node.cnt;
        visited.add(node);
        
        let cnt = 0;
        for (const next of node.next.values()) {
            cnt += countOccurrences(sam.states[next]);
        }
        
        node.cnt = cnt || 1; // Leaf nodes represent suffixes
        return node.cnt;
    }
    
    countOccurrences(sam.states[0]);
    dfs(sam.states[0], "", 0);
    
    return result;
}

/**
 * Approach 5: Optimized Rolling Hash with Large Prime
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */
function longestDupSubstringOptimized(s) {
    const MOD = 2**53 - 1; // Large prime for hashing
    const a = 26; // Base for hashing
    const n = s.length;
    let result = "";
    
    // Binary search for the maximum length
    let left = 1;
    let right = n - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const found = searchWithOptimizedHash(s, mid, a, MOD);
        
        if (found !== "") {
            result = found;
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return result;
}

function searchWithOptimizedHash(s, len, a, mod) {
    const n = s.length;
    let hash = 0;
    let aL = 1; // a^len % mod
    
    // Calculate a^len % mod using exponentiation by squaring
    for (let i = 0; i < len; i++) {
        aL = (aL * a) % mod;
    }
    
    // Calculate initial hash for the first window
    const seen = new Map();
    
    for (let i = 0; i < len; i++) {
        hash = (hash * a + s.charCodeAt(i)) % mod;
    }
    
    seen.set(hash, 0);
    
    // Slide the window and check for duplicates
    for (let i = 1; i <= n - len; i++) {
        // Remove leftmost character and add new right character
        const leftChar = s.charCodeAt(i - 1);
        const rightChar = s.charCodeAt(i + len - 1);
        
        hash = (hash * a - leftChar * aL % mod + mod) % mod; // Remove left
        hash = (hash + rightChar) % mod; // Add right
        
        if (seen.has(hash)) {
            const start = seen.get(hash);
            const currentSub = s.substring(i, i + len);
            const existingSub = s.substring(start, start + len);
            
            // Handle hash collision by comparing actual substrings
            if (currentSub === existingSub) {
                return currentSub;
            }
        } else {
            seen.set(hash, i);
        }
    }
    
    return "";
}

/**
 * Approach 6: Using JavaScript Built-in Methods with Binary Search
 * Time Complexity: O(n² log n)
 * Space Complexity: O(n²)
 */
function longestDupSubstringBuiltIn(s) {
    let left = 1;
    let right = s.length - 1;
    let result = "";
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const found = searchWithBuiltIn(s, mid);
        
        if (found !== "") {
            result = found;
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return result;
}

function searchWithBuiltIn(s, len) {
    const seen = new Set();
    
    for (let i = 0; i <= s.length - len; i++) {
        const substr = s.substring(i, i + len);
        
        if (seen.has(substr)) {
            return substr;
        }
        
        seen.add(substr);
    }
    
    return "";
}

// Test cases
function runTests() {
    const testCases = [
        { s: "banana", expected: ["ana"] },
        { s: "abcd", expected: [""] },
        { s: "aaaaa", expected: ["aaaa"] },
        { s: "abcdeabcde", expected: ["abcde"] },
        { s: "bananabanana", expected: ["anana"] },
        { s: "a", expected: [""] },
        { s: "aa", expected: ["a"] },
        { s: "abababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababababab" }
    ];
    
    const functions = [
        { name: "Rabin-Karp", fn: longestDupSubstringRabinKarp },
        { name: "Suffix Array", fn: longestDupSubstringSuffixArray },
        { name: "Trie", fn: longestDupSubstringTrie },
        { name: "Suffix Automaton", fn: longestDupSubstringSuffixAutomaton },
        { name: "Optimized Hash", fn: longestDupSubstringOptimized },
        { name: "Built-in Methods", fn: longestDupSubstringBuiltIn }
    ];
    
    functions.forEach(({ name, fn }) => {
        console.log(`\nTesting ${name}:`);
        let allPassed = true;
        
        testCases.forEach((test, i) => {
            const result = fn(test.s);
            const passed = test.expected.includes(result);
            if (!passed) allPassed = false;
            
            console.log(`  Test ${i + 1}: ${passed ? 'PASS' : 'FAIL'}`);
            if (!passed) {
                console.log(`    Input: "${test.s}"`);
                console.log(`    Expected one of: [${test.expected.map(s => `"${s}"`).join(', ')}]`);
                console.log(`    Got: "${result}"`);
            }
        });
        
        console.log(`  ${allPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);
    });
}

// Run the tests
console.log('=== Longest Duplicate Substring ===');
runTests();

// Export functions for use in other modules
module.exports = {
    longestDupSubstringRabinKarp,
    longestDupSubstringSuffixArray,
    longestDupSubstringTrie,
    longestDupSubstringSuffixAutomaton,
    longestDupSubstringOptimized,
    longestDupSubstringBuiltIn
};
