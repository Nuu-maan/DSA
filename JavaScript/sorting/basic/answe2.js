/**
 * Insertion Sort Implementation
 * 
 * Problem: Implement the Insertion Sort algorithm to sort an array of numbers in ascending order.
 * Source: https://www.geeksforgeeks.org/insertion-sort/
 * 
 * Approach 1: Standard Insertion Sort
 * Time Complexity: O(n²) in worst and average cases, O(n) in best case (already sorted)
 * Space Complexity: O(1) - In-place sorting
 */
function insertionSortStandard(arr) {
    const n = arr.length;
    const result = [...arr];
    
    for (let i = 1; i < n; i++) {
        const key = result[i];
        let j = i - 1;
        
        // Move elements of result[0..i-1] that are greater than key
        // to one position ahead of their current position
        while (j >= 0 && result[j] > key) {
            result[j + 1] = result[j];
            j--;
        }
        result[j + 1] = key;
    }
    
    return result;
}

/**
 * Approach 2: Binary Insertion Sort
 * Uses binary search to find the proper location to insert the selected item
 * Reduces number of comparisons but not swaps, still O(n²) time complexity
 */
function insertionSortBinary(arr) {
    const n = arr.length;
    const result = [...arr];
    
    for (let i = 1; i < n; i++) {
        const key = result[i];
        
        // Find the location to insert using binary search
        let left = 0;
        let right = i - 1;
        let pos = i;
        
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            if (result[mid] > key) {
                pos = mid;
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }
        
        // Shift elements to make space for key
        for (let j = i; j > pos; j--) {
            result[j] = result[j - 1];
        }
        result[pos] = key;
    }
    
    return result;
}

/**
 * Approach 3: Recursive Insertion Sort
 * Demonstrates recursive approach (not recommended for large arrays due to call stack)
 */
function insertionSortRecursive(arr, n = arr.length) {
    // Base case
    if (n <= 1) return [...arr];
    
    // Sort first n-1 elements
    const result = insertionSortRecursive(arr, n - 1);
    
    // Insert last element at its correct position in sorted array
    const last = result[n - 1];
    let j = n - 2;
    
    while (j >= 0 && result[j] > last) {
        result[j + 1] = result[j];
        j--;
    }
    result[j + 1] = last;
    
    return result;
}

/**
 * Approach 4: Insertion Sort with Custom Comparator
 * Allows sorting based on custom comparison function
 */
function insertionSortWithComparator(arr, compareFn = (a, b) => a - b) {
    const n = arr.length;
    const result = [...arr];
    
    for (let i = 1; i < n; i++) {
        const key = result[i];
        let j = i - 1;
        
        // Move elements of result[0..i-1] according to compareFn
        while (j >= 0 && compareFn(result[j], key) > 0) {
            result[j + 1] = result[j];
            j--;
        }
        result[j + 1] = key;
    }
    
    return result;
}

// Test cases
function runTests() {
    const testCases = [
        { input: [12, 11, 13, 5, 6], expected: [5, 6, 11, 12, 13] },
        { input: [5, 1, 4, 2, 8], expected: [1, 2, 4, 5, 8] },
        { input: [1, 2, 3, 4, 5], expected: [1, 2, 3, 4, 5] }, // Already sorted
        { input: [5, 4, 3, 2, 1], expected: [1, 2, 3, 4, 5] }, // Reverse sorted
        { input: [1], expected: [1] }, // Single element
        { input: [], expected: [] }, // Empty array
        { input: [2, 2, 2, 2], expected: [2, 2, 2, 2] } // All same elements
    ];
    
    const functions = [
        { name: 'Standard Insertion Sort', fn: insertionSortStandard },
        { name: 'Binary Insertion Sort', fn: insertionSortBinary },
        { name: 'Recursive Insertion Sort', fn: insertionSortRecursive },
        { name: 'Insertion Sort with Comparator', fn: (arr) => 
            insertionSortWithComparator(arr, (a, b) => a - b) }
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
console.log('=== Insertion Sort Implementations ===');
runTests();

// Export functions for use in other modules
module.exports = {
    insertionSortStandard,
    insertionSortBinary,
    insertionSortRecursive,
    insertionSortWithComparator
};
