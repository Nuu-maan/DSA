/**
 * Selection Sort Implementation
 * 
 * Problem: Implement the Selection Sort algorithm to sort an array of numbers in ascending order.
 * Source: https://www.geeksforgeeks.org/selection-sort/
 * 
 * Approach 1: Standard Selection Sort
 * Time Complexity: O(n²) in all cases (best, average, worst)
 * Space Complexity: O(1) - In-place sorting
 */
function selectionSortStandard(arr) {
    const n = arr.length;
    const result = [...arr];
    
    for (let i = 0; i < n - 1; i++) {
        // Find the minimum element in the unsorted array
        let minIdx = i;
        for (let j = i + 1; j < n; j++) {
            if (result[j] < result[minIdx]) {
                minIdx = j;
            }
        }
        
        // Swap the found minimum element with the first element
        if (minIdx !== i) {
            [result[i], result[minIdx]] = [result[minIdx], result[i]];
        }
    }
    
    return result;
}

/**
 * Approach 2: Selection Sort with Min-Max
 * Finds both minimum and maximum in each pass to reduce the number of passes
 * Still O(n²) but with slightly better performance on large arrays
 */
function selectionSortMinMax(arr) {
    const n = arr.length;
    const result = [...arr];
    
    for (let i = 0; i < Math.floor(n / 2); i++) {
        let minIdx = i;
        let maxIdx = i;
        
        // Find min and max in the unsorted part
        for (let j = i; j < n - i; j++) {
            if (result[j] < result[minIdx]) {
                minIdx = j;
            }
            if (result[j] > result[maxIdx]) {
                maxIdx = j;
            }
        }
        
        // Place min at the beginning and max at the end
        if (minIdx !== i) {
            [result[i], result[minIdx]] = [result[minIdx], result[i]];
            
            // If max was at i, it's now at minIdx
            if (maxIdx === i) {
                maxIdx = minIdx;
            }
        }
        
        if (maxIdx !== n - 1 - i) {
            [result[n - 1 - i], result[maxIdx]] = [result[maxIdx], result[n - 1 - i]];
        }
    }
    
    return result;
}

/**
 * Approach 3: Recursive Selection Sort
 * Demonstrates recursive approach (not recommended for large arrays due to call stack)
 */
function selectionSortRecursive(arr, start = 0) {
    if (start >= arr.length - 1) return [...arr];
    
    const result = [...arr];
    let minIdx = start;
    
    // Find the minimum element in the unsorted array
    for (let i = start + 1; i < result.length; i++) {
        if (result[i] < result[minIdx]) {
            minIdx = i;
        }
    }
    
    // Swap if needed
    if (minIdx !== start) {
        [result[start], result[minIdx]] = [result[minIdx], result[start]];
    }
    
    // Recur for remaining elements
    const remaining = selectionSortRecursive(result, start + 1);
    return remaining;
}

/**
 * Approach 4: Selection Sort with Custom Comparator
 * Allows sorting based on custom comparison function
 */
function selectionSortWithComparator(arr, compareFn = (a, b) => a - b) {
    const n = arr.length;
    const result = [...arr];
    
    for (let i = 0; i < n - 1; i++) {
        let minIdx = i;
        
        // Find the minimum element in the unsorted array
        for (let j = i + 1; j < n; j++) {
            if (compareFn(result[j], result[minIdx]) < 0) {
                minIdx = j;
            }
        }
        
        // Swap the found minimum element with the first element
        if (minIdx !== i) {
            [result[i], result[minIdx]] = [result[minIdx], result[i]];
        }
    }
    
    return result;
}

// Test cases
function runTests() {
    const testCases = [
        { input: [64, 25, 12, 22, 11], expected: [11, 12, 22, 25, 64] },
        { input: [5, 1, 4, 2, 8], expected: [1, 2, 4, 5, 8] },
        { input: [1, 2, 3, 4, 5], expected: [1, 2, 3, 4, 5] }, // Already sorted
        { input: [5, 4, 3, 2, 1], expected: [1, 2, 3, 4, 5] }, // Reverse sorted
        { input: [1], expected: [1] }, // Single element
        { input: [], expected: [] }, // Empty array
        { input: [2, 2, 2, 2], expected: [2, 2, 2, 2] } // All same elements
    ];
    
    const functions = [
        { name: 'Standard Selection Sort', fn: selectionSortStandard },
        { name: 'Min-Max Selection Sort', fn: selectionSortMinMax },
        { name: 'Recursive Selection Sort', fn: selectionSortRecursive },
        { name: 'Selection Sort with Comparator', fn: (arr) => 
            selectionSortWithComparator(arr, (a, b) => a - b) }
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
console.log('=== Selection Sort Implementations ===');
runTests();

// Export functions for use in other modules
module.exports = {
    selectionSortStandard,
    selectionSortMinMax,
    selectionSortRecursive,
    selectionSortWithComparator
};