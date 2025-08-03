/**
 * Calculate the sum of first n natural numbers using recursion
 * 
 * @param {number} n - The upper limit (inclusive)
 * @returns {number} - The sum of numbers from 1 to n
 */

// Approach 1: Basic recursion
// Time complexity: O(n)
// Space complexity: O(n) - due to call stack
function sumOfN_v1(n) {
    if (n <= 0) return 0;
    return n + sumOfN_v1(n - 1);
}

// Approach 2: Tail recursion optimization
// Time complexity: O(n)
// Space complexity: O(1) - with proper tail call optimization (TCO)
function sumOfN_v2(n, acc = 0) {
    if (n <= 0) return acc;
    return sumOfN_v2(n - 1, acc + n);
}

// Approach 3: Using mathematical formula (most efficient)
// Time complexity: O(1)
// Space complexity: O(1)
function sumOfN_v3(n) {
    return (n * (n + 1)) / 2;
}

// Approach 4: Using array reduce (functional approach)
// Time complexity: O(n)
// Space complexity: O(n) - creates an array of size n
function sumOfN_v4(n) {
    return Array.from({ length: n }, (_, i) => i + 1).reduce((sum, num) => sum + num, 0);
}

// Approach 5: Using generator function
// Time complexity: O(n)
// Space complexity: O(1) - constant space for the generator
function* rangeGenerator(n) {
    for (let i = 1; i <= n; i++) {
        yield i;
    }
}

function sumOfN_v5(n) {
    let sum = 0;
    for (const num of rangeGenerator(n)) {
        sum += num;
    }
    return sum;
}

// Approach 6: Using bitwise operations (just for fun, not recommended for clarity)
// Time complexity: O(1)
// Space complexity: O(1)
function sumOfN_v6(n) {
    return (n * (n | 0) + n) >> 1;
}

// Testing the functions
const testCases = [
    { input: 5, expected: 15 },    // 1+2+3+4+5 = 15
    { input: 10, expected: 55 },   // 1+2+...+10 = 55
    { input: 1, expected: 1 },     // 1 = 1
    { input: 0, expected: 0 },     // sum of first 0 numbers is 0
    { input: 100, expected: 5050 } // 1+2+...+100 = 5050
];

function runTests() {
    console.log('Running tests for sumOfN functions...\n');
    
    const versions = [
        { name: 'v1', fn: sumOfN_v1 },
        { name: 'v2', fn: sumOfN_v2 },
        { name: 'v3', fn: sumOfN_v3 },
        { name: 'v4', fn: sumOfN_v4 },
        { name: 'v5', fn: sumOfN_v5 },
        { name: 'v6', fn: sumOfN_v6 }
    ];
    
    for (const version of versions) {
        console.log(`Testing ${version.name}:`);
        for (const test of testCases) {
            const result = version.fn(test.input);
            const status = result === test.expected ? '✅ PASS' : '❌ FAIL';
            console.log(`  Input: ${test.input}, Result: ${result}, Expected: ${test.expected} - ${status}`);
        }
        console.log();
    }
}

// Run the tests
runTests();

// Export all versions for potential use in other files
module.exports = {
    sumOfN_v1,
    sumOfN_v2,
    sumOfN_v3,
    sumOfN_v4,
    sumOfN_v5,
    sumOfN_v6,
    rangeGenerator
};
