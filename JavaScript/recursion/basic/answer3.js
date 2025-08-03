/**
 * Calculate the factorial of a number using recursion
 * 
 * @param {number} n - The input number
 * @returns {number} - The factorial of n (n!)
 */

// Approach 1: Basic recursion
// Time complexity: O(n)
// Space complexity: O(n) - due to call stack
function factorial_v1(n) {
    if (n <= 1) return 1;
    return n * factorial_v1(n - 1);
}

// Approach 2: Tail recursion optimization
// Time complexity: O(n)
// Space complexity: O(1) - with proper tail call optimization (TCO)
function factorial_v2(n, acc = 1) {
    if (n <= 1) return acc;
    return factorial_v2(n - 1, n * acc);
}

// Approach 3: Iterative approach
// Time complexity: O(n)
// Space complexity: O(1)
function factorial_v3(n) {
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}

// Approach 4: Using array reduce (functional approach)
// Time complexity: O(n)
// Space complexity: O(n) - creates an array of size n
function factorial_v4(n) {
    if (n <= 1) return 1;
    return Array.from({ length: n }, (_, i) => i + 1).reduce((acc, num) => acc * num, 1);
}

// Approach 5: Using generator function
// Time complexity: O(n)
// Space complexity: O(1) - constant space for the generator
function* rangeGenerator(start, end) {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}

function factorial_v5(n) {
    if (n <= 1) return 1;
    let result = 1;
    for (const num of rangeGenerator(2, n)) {
        result *= num;
    }
    return result;
}

// Approach 6: Memoization
// Time complexity: O(n) after first call for same n, O(1) for subsequent calls with same or smaller n
// Space complexity: O(n) - for the cache
const factorial_v6 = (() => {
    const cache = new Map();
    
    return function factorial(n) {
        if (n <= 1) return 1;
        if (cache.has(n)) return cache.get(n);
        
        const result = n * factorial(n - 1);
        cache.set(n, result);
        return result;
    };
})();

// Testing the functions
const testCases = [
    { input: 0, expected: 1 },     // 0! = 1
    { input: 1, expected: 1 },     // 1! = 1
    { input: 5, expected: 120 },   // 5! = 120
    { input: 7, expected: 5040 },  // 7! = 5040
    { input: 10, expected: 3628800 } // 10! = 3,628,800
];

function runTests() {
    console.log('Running tests for factorial functions...\n');
    
    const versions = [
        { name: 'v1', fn: factorial_v1 },
        { name: 'v2', fn: factorial_v2 },
        { name: 'v3', fn: factorial_v3 },
        { name: 'v4', fn: factorial_v4 },
        { name: 'v5', fn: factorial_v5 },
        { name: 'v6', fn: factorial_v6 }
    ];
    
    for (const version of versions) {
        console.log(`Testing ${version.name}:`);
        for (const test of testCases) {
            try {
                const result = version.fn(test.input);
                const status = result === test.expected ? '✅ PASS' : '❌ FAIL';
                console.log(`  Input: ${test.input}!, Result: ${result}, Expected: ${test.expected} - ${status}`);
            } catch (e) {
                console.log(`  Input: ${test.input}!, Error: ${e.message} - ❌ ERROR`);
            }
        }
        console.log();
    }
}

// Run the tests
runTests();

// Export all versions for potential use in other files
module.exports = {
    factorial_v1,
    factorial_v2,
    factorial_v3,
    factorial_v4,
    factorial_v5,
    factorial_v6,
    rangeGenerator
};
