/**
 * Binary Search Implementation
 * 
 * Problem: Given a sorted array of n elements, write a function to search a given element x in the array.
 * Source: https://www.geeksforgeeks.org/binary-search/
 * 
 * Approach 1: Iterative Binary Search
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
function binarySearchIterative(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;
}

/**
 * Approach 2: Recursive Binary Search
 * Time Complexity: O(log n)
 * Space Complexity: O(log n) due to call stack
 */
function binarySearchRecursive(arr, target, left = 0, right = arr.length - 1) {
    if (left > right) return -1;
    
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) {
        return binarySearchRecursive(arr, target, mid + 1, right);
    } else {
        return binarySearchRecursive(arr, target, left, mid - 1);
    }
}

/**
 * Approach 3: Using Array.findIndex (Functional Approach)
 * Time Complexity: O(n) - Not optimal for large arrays
 * Space Complexity: O(1)
 */
function binarySearchFindIndex(arr, target) {
    return arr.findIndex(x => x === target);
}

/**
 * Approach 4: Using Array.indexOf (Built-in)
 * Time Complexity: O(n) - Not optimal for large arrays
 * Space Complexity: O(1)
 */
function binarySearchIndexOf(arr, target) {
    return arr.indexOf(target);
}

/**
 * Approach 5: Binary Search with Custom Comparator
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
function binarySearchWithComparator(arr, target, comparator = (a, b) => a - b) {
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const comparison = comparator(arr[mid], target);
        
        if (comparison === 0) return mid;
        if (comparison < 0) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;
}

/**
 * Approach 6: Binary Search with Early Exit for Edge Cases
 * Time Complexity: O(log n) average, O(1) best case
 * Space Complexity: O(1)
 */
function binarySearchOptimized(arr, target) {
    // Edge cases
    if (!arr.length) return -1;
    if (arr[0] === target) return 0;
    if (arr[arr.length - 1] === target) return arr.length - 1;
    
    let left = 0;
    let right = arr.length - 1;
    
    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        
        if (arr[mid] === target) return mid;
        if (mid > 0 && arr[mid - 1] === target) return mid - 1;
        if (mid < arr.length - 1 && arr[mid + 1] === target) return mid + 1;
        
        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;
}

// Test cases
const testCases = [
    { arr: [2, 3, 4, 10, 40], target: 10, expected: 3 },
    { arr: [2, 3, 4, 10, 40], target: 5, expected: -1 },
    { arr: [1, 2, 3, 4, 5, 6, 7, 8, 9], target: 1, expected: 0 },
    { arr: [1, 2, 3, 4, 5, 6, 7, 8, 9], target: 9, expected: 8 },
    { arr: [1], target: 1, expected: 0 },
    { arr: [], target: 1, expected: -1 },
];

// Run tests
function runTests() {
    const functions = [
        binarySearchIterative,
        binarySearchRecursive,
        binarySearchFindIndex,
        binarySearchIndexOf,
        binarySearchWithComparator,
        binarySearchOptimized
    ];
    
    functions.forEach((func, index) => {
        console.log(`\nTesting ${func.name}:`);
        let allPassed = true;
        
        testCases.forEach((test, i) => {
            const result = func(test.arr, test.target);
            const passed = result === test.expected;
            if (!passed) allPassed = false;
            
            console.log(`  Test ${i + 1}: ${passed ? 'PASS' : 'FAIL'}`);
            if (!passed) {
                console.log(`    Input: [${test.arr}], Target: ${test.target}`);
                console.log(`    Expected: ${test.expected}, Got: ${result}`);
            }
        });
        
        console.log(`  ${allPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);
    });
}

// Run the tests
console.log('=== Binary Search Implementations ===');
runTests();

// Export functions for use in other modules
module.exports = {
    binarySearchIterative,
    binarySearchRecursive,
    binarySearchFindIndex,
    binarySearchIndexOf,
    binarySearchWithComparator,
    binarySearchOptimized
};
