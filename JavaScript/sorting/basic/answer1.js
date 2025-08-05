/**
 * Bubble Sort Implementation
 * 
 * Problem: Implement the Bubble Sort algorithm to sort an array of numbers in ascending order.
 * Source: https://www.geeksforgeeks.org/bubble-sort/
 * 
 * Approach 1: Standard Bubble Sort
 * Time Complexity: O(n²) in worst and average cases, O(n) in best case (already sorted)
 * Space Complexity: O(1) - In-place sorting
 */
function bubbleSortStandard(arr) {
    const n = arr.length;
    // Make a copy to avoid mutating the original array
    const result = [...arr];
    
    for (let i = 0; i < n - 1; i++) {
        // Last i elements are already in place
        for (let j = 0; j < n - i - 1; j++) {
            // Swap if the element found is greater than the next element
            if (result[j] > result[j + 1]) {
                [result[j], result[j + 1]] = [result[j + 1], result[j]];
            }
        }
    }
    
    return result;
}

/**
 * Approach 2: Optimized Bubble Sort with Early Exit
 * Improves best case time complexity to O(n) when array is already sorted
 */
function bubbleSortOptimized(arr) {
    const n = arr.length;
    const result = [...arr];
    let swapped;
    
    for (let i = 0; i < n - 1; i++) {
        swapped = false;
        
        for (let j = 0; j < n - i - 1; j++) {
            if (result[j] > result[j + 1]) {
                [result[j], result[j + 1]] = [result[j + 1], result[j]];
                swapped = true;
            }
        }
        
        // If no two elements were swapped, array is sorted
        if (!swapped) break;
    }
    
    return result;
}

/**
 * Approach 3: Recursive Bubble Sort
 * Demonstrates recursive approach (not recommended for large arrays due to call stack)
 */
function bubbleSortRecursive(arr, n = arr.length) {
    // Base case
    if (n === 1) return [...arr];
    
    const result = [...arr];
    
    // One pass of bubble sort
    for (let i = 0; i < n - 1; i++) {
        if (result[i] > result[i + 1]) {
            [result[i], result[i + 1]] = [result[i + 1], result[i]];
        }
    }
    
    // Recur for remaining elements
    return bubbleSortRecursive(result, n - 1);
}

/**
 * Approach 4: Bubble Sort with Custom Comparator
 * Allows sorting based on custom comparison function
 */
function bubbleSortWithComparator(arr, compareFn = (a, b) => a - b) {
    const n = arr.length;
    const result = [...arr];
    let swapped;
    
    for (let i = 0; i < n - 1; i++) {
        swapped = false;
        
        for (let j = 0; j < n - i - 1; j++) {
            if (compareFn(result[j], result[j + 1]) > 0) {
                [result[j], result[j + 1]] = [result[j + 1], result[j]];
                swapped = true;
            }
        }
        
        if (!swapped) break;
    }
    
    return result;
}

// Test cases
function runTests() {
    const testCases = [
        { input: [64, 34, 25, 12, 22, 11, 90], expected: [11, 12, 22, 25, 34, 64, 90] },
        { input: [5, 1, 4, 2, 8], expected: [1, 2, 4, 5, 8] },
        { input: [1, 2, 3, 4, 5], expected: [1, 2, 3, 4, 5] }, // Already sorted
        { input: [5, 4, 3, 2, 1], expected: [1, 2, 3, 4, 5] }, // Reverse sorted
        { input: [1], expected: [1] }, // Single element
        { input: [], expected: [] }, // Empty array
        { input: [2, 2, 2, 2], expected: [2, 2, 2, 2] } // All same elements
    ];
    
    const functions = [
        { name: 'Standard Bubble Sort', fn: bubbleSortStandard },
        { name: 'Optimized Bubble Sort', fn: bubbleSortOptimized },
        { name: 'Recursive Bubble Sort', fn: bubbleSortRecursive },
        { name: 'Bubble Sort with Comparator', fn: (arr) => 
            bubbleSortWithComparator(arr, (a, b) => a - b) }
    ];
    
    functions.forEach(({ name, fn }) => {
        console.log(`\nTesting ${name}:`);
        let allPassed = true;
        
        testCases.forEach((test, i) => {
            const result = fn(test.input);
            const passed = JSON.stringify(result) === JSON.stringify(test.expected);
            if (!passed) allPassed = false;
            
            console.log(`  Test ${i + 1}: ${passed ? 'PASS' : 'FAIL'}`);
            if (!passed) {
                console.log(`    Input: [${test.input}]`);
                console.log(`    Expected: [${test.expected}]`);
                console.log(`    Got: [${result}]`);
            }
        });
        
        console.log(`  ${allPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);
    });
}

// Run the tests
console.log('=== Bubble Sort Implementations ===');
runTests();

// Export functions for use in other modules
module.exports = {
    bubbleSortStandard,
    bubbleSortOptimized,
    bubbleSortRecursive,
    bubbleSortWithComparator
};
