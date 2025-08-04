/**
 * Find Missing Number in Sorted Array
 * 
 * Problem: Given a list of n-1 integers in the range of 1 to n with no duplicates,
 * find the missing number in the sorted array.
 * Source: https://www.geeksforgeeks.org/find-the-missing-number-in-a-sorted-array/
 */

/**
 * Approach 1: Binary Search (Optimal)
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
function findMissingNumberBinarySearch(arr) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        // If the middle element is not at the correct position
        if (arr[mid] !== mid + 1 && (mid === 0 || arr[mid - 1] === mid)) {
            return mid + 1;
        }
        
        // If all elements up to mid are correct, search right
        if (arr[mid] === mid + 1) {
            left = mid + 1;
        } else { // Else search left
            right = mid - 1;
        }
    }
    
    // If no missing number found, return the next expected number
    return arr.length + 1;
}

/**
 * Approach 2: Sum of First n Natural Numbers
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function findMissingNumberSum(arr) {
    const n = arr.length + 1; // Since one number is missing
    const expectedSum = (n * (n + 1)) / 2;
    const actualSum = arr.reduce((sum, num) => sum + num, 0);
    
    return expectedSum - actualSum;
}

/**
 * Approach 3: XOR Operation
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function findMissingNumberXOR(arr) {
    let xor1 = 0; // XOR of all elements from 1 to n+1
    let xor2 = 0; // XOR of all elements in array
    
    // XOR all numbers from 1 to n+1
    for (let i = 1; i <= arr.length + 1; i++) {
        xor1 ^= i;
    }
    
    // XOR all elements in array
    for (const num of arr) {
        xor2 ^= num;
    }
    
    // The missing number is the XOR of the two results
    return xor1 ^ xor2;
}

/**
 * Approach 4: Linear Search
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function findMissingNumberLinear(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] !== i + 1) {
            return i + 1;
        }
    }
    return arr.length + 1;
}

/**
 * Approach 5: Using Array.findIndex
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function findMissingNumberFindIndex(arr) {
    const missingIndex = arr.findIndex((num, index) => num !== index + 1);
    return missingIndex === -1 ? arr.length + 1 : missingIndex + 1;
}

/**
 * Approach 6: Mathematical Approach with Formula (Variation of Sum)
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function findMissingNumberFormula(arr) {
    const n = arr.length + 1;
    // Calculate expected sum using formula for sum of first n natural numbers
    const expectedSum = (n * (n + 1)) / 2;
    
    // Calculate actual sum
    let actualSum = 0;
    for (const num of arr) {
        actualSum += num;
    }
    
    return expectedSum - actualSum;
}

// Test cases
const testCases = [
    { arr: [1, 2, 3, 5, 6, 7, 8], expected: 4 },
    { arr: [1, 2, 3, 4, 5, 6, 8], expected: 7 },
    { arr: [2, 3, 4, 5, 6, 7, 8], expected: 1 },
    { arr: [1, 2, 3, 4, 5, 6, 7], expected: 8 },
    { arr: [1], expected: 2 },
    { arr: [2], expected: 1 },
    { arr: [], expected: 1 },
];

// Run tests
function runTests() {
    const functions = [
        findMissingNumberBinarySearch,
        findMissingNumberSum,
        findMissingNumberXOR,
        findMissingNumberLinear,
        findMissingNumberFindIndex,
        findMissingNumberFormula
    ];
    
    functions.forEach((func, index) => {
        console.log(`\nTesting ${func.name}:`);
        let allPassed = true;
        
        testCases.forEach((test, i) => {
            const result = func(test.arr);
            const passed = result === test.expected;
            if (!passed) allPassed = false;
            
            console.log(`  Test ${i + 1}: ${passed ? 'PASS' : 'FAIL'}`);
            if (!passed) {
                console.log(`    Input: [${test.arr}]`);
                console.log(`    Expected: ${test.expected}, Got: ${result}`);
            }
        });
        
        console.log(`  ${allPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);
    });
}

// Run the tests
console.log('=== Find Missing Number in Sorted Array ===');
runTests();

// Export functions for use in other modules
module.exports = {
    findMissingNumberBinarySearch,
    findMissingNumberSum,
    findMissingNumberXOR,
    findMissingNumberLinear,
    findMissingNumberFindIndex,
    findMissingNumberFormula
};
