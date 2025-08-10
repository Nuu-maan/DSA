/**
 * Check for Anagrams - Multiple Approaches
 * 
 * Problem: Given two strings, determine if they are anagrams of each other.
 * An anagram is a word formed by rearranging letters of another word.
 * 
 * Example:
 * Input: s = "anagram", t = "nagaram"
 * Output: true
 */

/**
 * Approach 1: Sorting and Comparison
 * Time Complexity: O(n log n) - due to sorting
 * Space Complexity: O(n) - due to array conversion
 */
const isAnagram1 = (s, t) => {
    if (s.length !== t.length) return false;
    return [...s].sort().join('') === [...t].sort().join('');
};

/**
 * Approach 2: Character Frequency Count (Array)
 * Time Complexity: O(n)
 * Space Complexity: O(1) - fixed size array (26 for English letters)
 */
const isAnagram2 = (s, t) => {
    if (s.length !== t.length) return false;
    
    const count = new Array(26).fill(0);
    
    for (let i = 0; i < s.length; i++) {
        count[s.charCodeAt(i) - 'a'.charCodeAt(0)]++;
        count[t.charCodeAt(i) - 'a'.charCodeAt(0)]--;
    }
    
    return count.every(c => c === 0);
};

/**
 * Approach 3: Character Frequency Count (Map)
 * Time Complexity: O(n)
 * Space Complexity: O(k), where k is the number of unique characters
 */
const isAnagram3 = (s, t) => {
    if (s.length !== t.length) return false;
    
    const charMap = new Map();
    
    // Count characters in first string
    for (const char of s) {
        charMap.set(char, (charMap.get(char) || 0) + 1);
    }
    
    // Decrement counts for second string
    for (const char of t) {
        if (!charMap.has(char)) return false;
        const count = charMap.get(char) - 1;
        if (count === 0) {
            charMap.delete(char);
        } else {
            charMap.set(char, count);
        }
    }
    
    return charMap.size === 0;
};

/**
 * Approach 4: Unicode Compatible Solution
 * Time Complexity: O(n)
 * Space Complexity: O(k), where k is the number of unique characters
 */
const isAnagram4 = (s, t) => {
    if (s.length !== t.length) return false;
    
    const charCount = new Map();
    
    // Count characters in first string
    for (const char of s) {
        charCount.set(char, (charCount.get(char) || 0) + 1);
    }
    
    // Verify counts in second string
    for (const char of t) {
        if (!charCount.has(char)) return false;
        const count = charCount.get(char) - 1;
        if (count === 0) {
            charCount.delete(char);
        } else {
            charCount.set(char, count);
        }
    }
    
    return charCount.size === 0;
};

// Test cases
const testCases = [
    { s: "anagram", t: "nagaram", expected: true },
    { s: "rat", t: "car", expected: false },
    { s: "listen", t: "silent", expected: true },
    { s: "aacc", t: "ccac", expected: false },
    { s: "", t: "", expected: true },
    { s: "a", t: "a", expected: true },
    { s: "a", t: "b", expected: false },
    { s: "cinema", t: "iceman", expected: true },
    { s: "hello", t: "world", expected: false },
    { s: "anagram", t: "Anagram", expected: false },
];

// Run tests
const runTests = () => {
    const functions = [isAnagram1, isAnagram2, isAnagram3, isAnagram4];
    const functionNames = ['Sorting', 'Array Count', 'Map Count', 'Unicode'];
    
    functions.forEach((fn, index) => {
        console.log(`\nTesting ${functionNames[index]} approach:`);
        testCases.forEach((test, i) => {
            const result = fn(test.s, test.t);
            const passed = result === test.expected;
            console.log(`Test ${i + 1}: ${passed ? 'PASS' : 'FAIL'}`);
            if (!passed) {
                console.log(`  Input: "${test.s}", "${test.t}"`);
                console.log(`  Expected: ${test.expected}`);
                console.log(`  Got: ${result}`);
            }
        });
    });
};

// Performance comparison
const measurePerformance = () => {
    const longStr1 = 'a'.repeat(1000000) + 'b';
    const longStr2 = 'b' + 'a'.repeat(1000000);
    
    console.log('\nPerformance Comparison (long strings):');
    
    const functions = [isAnagram1, isAnagram2, isAnagram3, isAnagram4];
    const functionNames = ['Sorting', 'Array Count', 'Map Count', 'Unicode'];
    
    functions.forEach((fn, index) => {
        const start = performance.now();
        const result = fn(longStr1, longStr2);
        const end = performance.now();
        console.log(`${functionNames[index]}: ${(end - start).toFixed(4)}ms`);
    });
};

// Run tests and performance comparison
console.log('=== Check for Anagrams ===');
runTests();
measurePerformance();
