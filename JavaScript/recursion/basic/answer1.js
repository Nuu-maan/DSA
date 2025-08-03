/**
 * Print numbers from 1 to n using recursion
 * 
 * @param {number} n - The upper limit (inclusive)
 * @returns {number[]} - Array containing numbers from 1 to n
 */

// Approach 1: Basic recursion with helper function
// Time complexity: O(n)
// Space complexity: O(n) - due to call stack
function print1ToN_v1(n) {
    const result = [];
    
    function helper(current) {
        if (current > n) return;
        result.push(current);
        helper(current + 1);
    }
    
    helper(1);
    return result;
}

// Approach 2: Pure recursion without helper
// Time complexity: O(n)
// Space complexity: O(n) - due to call stack
function print1ToN_v2(n, current = 1, result = []) {
    if (current > n) return result;
    result.push(current);
    return print1ToN_v2(n, current + 1, result);
}

// Approach 3: Using array constructor and map
// Time complexity: O(n)
// Space complexity: O(n)
function print1ToN_v3(n) {
    return Array.from({ length: n }, (_, i) => i + 1);
}

// Approach 4: Using generator function
// Time complexity: O(n)
// Space complexity: O(1) - constant space for the generator
function* print1ToN_v4(n) {
    for (let i = 1; i <= n; i++) {
        yield i;
    }
}

// Approach 5: Using array spread and recursion
// Time complexity: O(n)
// Space complexity: O(n)
function print1ToN_v5(n) {
    return n === 0 ? [] : [...print1ToN_v5(n - 1), n];
}

// Approach 6: Using Array.fill and map (most concise)
// Time complexity: O(n)
// Space complexity: O(n)
const print1ToN_v6 = n => n ? [...print1ToN_v6(n - 1), n] : [];

// Testing the functions
const testCases = [
    { input: 5, expected: [1, 2, 3, 4, 5] },
    { input: 3, expected: [1, 2, 3] },
    { input: 1, expected: [1] },
    { input: 0, expected: [] },
];

function runTests() {
    console.log('Running tests for print1ToN functions...\n');
    
    // Test all versions
    const versions = [
        { name: 'v1', fn: print1ToN_v1 },
        { name: 'v2', fn: print1ToN_v2 },
        { name: 'v3', fn: print1ToN_v3 },
        { name: 'v5', fn: print1ToN_v5 },
        { name: 'v6', fn: print1ToN_v6 }
    ];
    
    for (const version of versions) {
        console.log(`Testing ${version.name}:`);
        for (const test of testCases) {
            const result = version.fn(test.input);
            const status = JSON.stringify(result) === JSON.stringify(test.expected) ? '✅ PASS' : '❌ FAIL';
            console.log(`  Input: ${test.input}, Result: [${result}], Expected: [${test.expected}] - ${status}`);
        }
        console.log();
    }
    
    // Test generator version (v4) separately
    console.log('Testing v4 (generator):');
    for (const test of testCases) {
        const result = [...print1ToN_v4(test.input)];
        const status = JSON.stringify(result) === JSON.stringify(test.expected) ? '✅ PASS' : '❌ FAIL';
        console.log(`  Input: ${test.input}, Result: [${result}], Expected: [${test.expected}] - ${status}`);
    }
}

// Run the tests
runTests();

// Export all versions for potential use in other files
module.exports = {
    print1ToN_v1,
    print1ToN_v2,
    print1ToN_v3,
    print1ToN_v4,
    print1ToN_v5,
    print1ToN_v6
};
