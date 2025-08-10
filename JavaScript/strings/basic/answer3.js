/**
 * Longest Common Prefix - Multiple Approaches
 * 
 * Problem: Find the longest common prefix string amongst an array of strings.
 * 
 * Example:
 * Input: ["flower","flow","flight"]
 * Output: "fl"
 */

/**
 * Approach 1: Horizontal Scanning
 * Time Complexity: O(S), where S is the sum of all characters in all strings
 * Space Complexity: O(1)
 */
const longestCommonPrefix1 = (strs) => {
    if (!strs || strs.length === 0) return '';
    
    let prefix = strs[0];
    
    for (let i = 1; i < strs.length; i++) {
        while (strs[i].indexOf(prefix) !== 0) {
            prefix = prefix.substring(0, prefix.length - 1);
            if (prefix === '') return '';
        }
    }
    
    return prefix;
};

/**
 * Approach 2: Vertical Scanning
 * Time Complexity: O(S), where S is the sum of all characters in all strings
 * Space Complexity: O(1)
 */
const longestCommonPrefix2 = (strs) => {
    if (!strs || strs.length === 0) return '';
    
    for (let i = 0; i < strs[0].length; i++) {
        const char = strs[0][i];
        for (let j = 1; j < strs.length; j++) {
            if (i === strs[j].length || strs[j][i] !== char) {
                return strs[0].substring(0, i);
            }
        }
    }
    
    return strs[0];
};

/**
 * Approach 3: Divide and Conquer
 * Time Complexity: O(S), where S is the number of all characters in the array
 * Space Complexity: O(m * log n), where n is the number of strings and m is the length of the longest string
 */
const longestCommonPrefix3 = (strs) => {
    if (!strs || strs.length === 0) return '';
    
    const divideAndConquer = (left, right) => {
        if (left === right) return strs[left];
        
        const mid = Math.floor((left + right) / 2);
        const lcpLeft = divideAndConquer(left, mid);
        const lcpRight = divideAndConquer(mid + 1, right);
        
        return commonPrefix(lcpLeft, lcpRight);
    };
    
    const commonPrefix = (left, right) => {
        const min = Math.min(left.length, right.length);
        for (let i = 0; i < min; i++) {
            if (left[i] !== right[i]) {
                return left.substring(0, i);
            }
        }
        return left.substring(0, min);
    };
    
    return divideAndConquer(0, strs.length - 1);
};

/**
 * Approach 4: Binary Search
 * Time Complexity: O(S * log m), where S is the sum of all characters in all strings
 * Space Complexity: O(1)
 */
const longestCommonPrefix4 = (strs) => {
    if (!strs || strs.length === 0) return '';
    
    let minLen = Number.MAX_SAFE_INTEGER;
    for (const str of strs) {
        minLen = Math.min(minLen, str.length);
    }
    
    let low = 1;
    let high = minLen;
    
    const isCommonPrefix = (length) => {
        const str1 = strs[0].substring(0, length);
        for (let i = 1; i < strs.length; i++) {
            if (!strs[i].startsWith(str1)) {
                return false;
            }
        }
        return true;
    };
    
    while (low <= high) {
        const middle = Math.floor((low + high) / 2);
        if (isCommonPrefix(middle)) {
            low = middle + 1;
        } else {
            high = middle - 1;
        }
    }
    
    return strs[0].substring(0, Math.floor((low + high) / 2));
};

// Test cases
const testCases = [
    { input: ["flower","flow","flight"], expected: "fl" },
    { input: ["dog","racecar","car"], expected: "" },
    { input: ["interspecies", "interstellar", "interstate"], expected: "inters" },
    { input: [""], expected: "" },
    { input: [], expected: "" },
    { input: ["a"], expected: "a" },
    { input: ["", ""], expected: "" },
    { input: ["c", "c"], expected: "c" },
    { input: ["aa", "aa"], expected: "aa" },
    { input: ["aaa", "aa", "aaa"], expected: "aa" },
];

// Run tests
const runTests = () => {
    const functions = [longestCommonPrefix1, longestCommonPrefix2, longestCommonPrefix3, longestCommonPrefix4];
    const functionNames = ['Horizontal', 'Vertical', 'Divide & Conquer', 'Binary Search'];
    
    functions.forEach((fn, index) => {
        console.log(`\nTesting ${functionNames[index]} approach:`);
        testCases.forEach((test, i) => {
            const result = fn(test.input);
            const passed = result === test.expected;
            console.log(`Test ${i + 1}: ${passed ? 'PASS' : 'FAIL'}`);
            if (!passed) {
                console.log(`  Input: [${test.input.map(s => `"${s}"`).join(', ')}]`);
                console.log(`  Expected: "${test.expected}"`);
                console.log(`  Got: "${result}"`);
            }
        });
    });
};

// Performance comparison
const measurePerformance = () => {
    const longStrs = [
        'a'.repeat(1000) + 'b',
        'a'.repeat(1000) + 'c',
        'a'.repeat(1000) + 'd'
    ];
    
    console.log('\nPerformance Comparison (long strings):');
    
    const functions = [longestCommonPrefix1, longestCommonPrefix2, longestCommonPrefix3, longestCommonPrefix4];
    const functionNames = ['Horizontal', 'Vertical', 'Divide & Conquer', 'Binary Search'];
    
    functions.forEach((fn, index) => {
        const start = performance.now();
        const result = fn(longStrs);
        const end = performance.now();
        console.log(`${functionNames[index]}: ${(end - start).toFixed(4)}ms`);
    });
};

// Run tests and performance comparison
console.log('=== Longest Common Prefix ===');
runTests();
measurePerformance();
