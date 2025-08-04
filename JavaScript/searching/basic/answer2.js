/**
 * Find First and Last Occurrences in Sorted Array
 * 
 * Problem: Given a sorted array with possibly duplicate elements, find the first and last
 * positions of an element x in the given array.
 * Source: https://www.geeksforgeeks.org/find-first-and-last-positions-of-an-element-in-a-sorted-array/
 */

/**
 * Approach 1: Two Binary Searches (Optimal)
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
function findFirstLastOccurrences(arr, target) {
    function findFirst() {
        let left = 0;
        let right = arr.length - 1;
        let result = -1;
        
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            
            if (arr[mid] === target) {
                result = mid;
                right = mid - 1; // Look for first occurrence in left half
            } else if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return result;
    }
    
    function findLast() {
        let left = 0;
        let right = arr.length - 1;
        let result = -1;
        
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            
            if (arr[mid] === target) {
                result = mid;
                left = mid + 1; // Look for last occurrence in right half
            } else if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return result;
    }
    
    const first = findFirst();
    if (first === -1) return [-1, -1];
    
    return [first, findLast()];
}

/**
 * Approach 2: Linear Scan after Binary Search
 * Time Complexity: O(log n + k) where k is the count of target elements
 * Space Complexity: O(1)
 */
function findFirstLastLinear(arr, target) {
    // First find any occurrence
    let left = 0;
    let right = arr.length - 1;
    let found = -1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        
        if (arr[mid] === target) {
            found = mid;
            break;
        } else if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    if (found === -1) return [-1, -1];
    
    // Expand to find first and last
    let first = found;
    let last = found;
    
    while (first > 0 && arr[first - 1] === target) first--;
    while (last < arr.length - 1 && arr[last + 1] === target) last++;
    
    return [first, last];
}

/**
 * Approach 3: Using indexOf and lastIndexOf
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function findFirstLastBuiltIn(arr, target) {
    const first = arr.indexOf(target);
    if (first === -1) return [-1, -1];
    return [first, arr.lastIndexOf(target)];
}

/**
 * Approach 4: Recursive Binary Search with Range
 * Time Complexity: O(log n)
 * Space Complexity: O(log n) due to call stack
 */
function findFirstLastRecursive(arr, target) {
    function findFirstRec(left, right) {
        if (left > right) return -1;
        
        const mid = Math.floor((left + right) / 2);
        
        if ((mid === 0 || arr[mid - 1] < target) && arr[mid] === target) {
            return mid;
        } else if (arr[mid] < target) {
            return findFirstRec(mid + 1, right);
        } else {
            return findFirstRec(left, mid - 1);
        }
    }
    
    function findLastRec(left, right) {
        if (left > right) return -1;
        
        const mid = Math.floor((left + right) / 2);
        
        if ((mid === arr.length - 1 || arr[mid + 1] > target) && arr[mid] === target) {
            return mid;
        } else if (arr[mid] > target) {
            return findLastRec(left, mid - 1);
        } else {
            return findLastRec(mid + 1, right);
        }
    }
    
    const first = findFirstRec(0, arr.length - 1);
    if (first === -1) return [-1, -1];
    
    return [first, findLastRec(first, arr.length - 1)];
}

/**
 * Approach 5: Using Binary Search with Custom Comparator
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
function findFirstLastWithComparator(arr, target) {
    function binarySearch(comparator) {
        let left = 0;
        let right = arr.length - 1;
        let result = -1;
        
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            const comparison = comparator(mid);
            
            if (comparison === 0) {
                result = mid;
                right = mid - 1; // For first occurrence
            } else if (comparison < 0) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return result;
    }
    
    const first = binarySearch(mid => {
        if (arr[mid] < target) return -1;
        if (arr[mid] > target) return 1;
        return mid === 0 || arr[mid - 1] < target ? 0 : -1;
    });
    
    if (first === -1) return [-1, -1];
    
    const last = binarySearch(mid => {
        if (arr[mid] < target) return -1;
        if (arr[mid] > target) return 1;
        return mid === arr.length - 1 || arr[mid + 1] > target ? 0 : 1;
    });
    
    return [first, last];
}

/**
 * Approach 6: Using Generator Function for All Occurrences
 * Time Complexity: O(log n + k) where k is the count of target elements
 * Space Complexity: O(1)
 */
function* findAllOccurrences(arr, target) {
    function binarySearch(left, right, findFirst) {
        let result = -1;
        
        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            
            if (arr[mid] === target) {
                result = mid;
                if (findFirst) {
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            } else if (arr[mid] < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        return result;
    }
    
    const first = binarySearch(0, arr.length - 1, true);
    if (first === -1) return;
    
    const last = binarySearch(first, arr.length - 1, false);
    
    for (let i = first; i <= last; i++) {
        yield i;
    }
}

function findFirstLastGenerator(arr, target) {
    const iterator = findAllOccurrences(arr, target);
    const result = [...iterator];
    
    if (result.length === 0) return [-1, -1];
    return [result[0], result[result.length - 1]];
}

// Test cases
const testCases = [
    { arr: [1, 3, 5, 5, 5, 5, 67, 123, 125], target: 5, expected: [2, 5] },
    { arr: [1, 3, 5, 5, 5, 5, 7, 123, 125], target: 7, expected: [6, 6] },
    { arr: [1, 3, 5, 5, 5, 5, 7, 123, 125], target: 1, expected: [0, 0] },
    { arr: [1, 1, 1, 1, 1, 1, 1], target: 1, expected: [0, 6] },
    { arr: [1, 1, 1, 1, 1, 1, 1], target: 2, expected: [-1, -1] },
    { arr: [], target: 5, expected: [-1, -1] },
    { arr: [2, 2], target: 2, expected: [0, 1] },
];

// Run tests
function runTests() {
    const functions = [
        findFirstLastOccurrences,
        findFirstLastLinear,
        findFirstLastBuiltIn,
        findFirstLastRecursive,
        findFirstLastWithComparator,
        findFirstLastGenerator
    ];
    
    functions.forEach((func, index) => {
        console.log(`\nTesting ${func.name}:`);
        let allPassed = true;
        
        testCases.forEach((test, i) => {
            const result = func(test.arr, test.target);
            const passed = JSON.stringify(result) === JSON.stringify(test.expected);
            if (!passed) allPassed = false;
            
            console.log(`  Test ${i + 1}: ${passed ? 'PASS' : 'FAIL'}`);
            if (!passed) {
                console.log(`    Input: [${test.arr}], Target: ${test.target}`);
                console.log(`    Expected: [${test.expected}], Got: [${result}]`);
            }
        });
        
        console.log(`  ${allPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);
    });
}

// Run the tests
console.log('=== Find First and Last Occurrences ===');
runTests();

// Export functions for use in other modules
module.exports = {
    findFirstLastOccurrences,
    findFirstLastLinear,
    findFirstLastBuiltIn,
    findFirstLastRecursive,
    findFirstLastWithComparator,
    findFirstLastGenerator,
    findAllOccurrences
};
