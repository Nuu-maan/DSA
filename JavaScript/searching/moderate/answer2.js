/**
 * Find in Mountain Array
 * 
 * Problem: Given a mountain array, find the minimum index such that mountainArr.get(index) == target.
 * Source: https://leetcode.com/problems/find-in-mountain-array/
 * 
 * Approach 1: Three Binary Searches (Find Peak, Search Left, Search Right)
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */

// MountainArray interface simulation
class MountainArray {
    constructor(arr) {
        this.arr = arr;
        this.getCount = 0;
    }
    
    get(index) {
        this.getCount++;
        return this.arr[index];
    }
    
    length() {
        return this.arr.length;
    }
}

function findInMountainArray(target, mountainArr) {
    const n = mountainArr.length();
    
    // Find peak index
    let left = 0;
    let right = n - 1;
    let peak = 0;
    
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (mountainArr.get(mid) < mountainArr.get(mid + 1)) {
            left = mid + 1;
            peak = mid + 1;
        } else {
            right = mid;
        }
    }
    
    // Binary search on increasing part
    const leftSearch = binarySearch(mountainArr, target, 0, peak, true);
    if (leftSearch !== -1) return leftSearch;
    
    // Binary search on decreasing part
    return binarySearch(mountainArr, target, peak, n - 1, false);
}

function binarySearch(arr, target, left, right, isIncreasing) {
    target = target;
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const midVal = arr.get(mid);
        
        if (midVal === target) {
            return mid;
        }
        
        if (isIncreasing) {
            if (midVal < target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        } else {
            if (midVal > target) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }
    return -1;
}

/**
 * Approach 2: One Binary Search with Peak Detection
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
function findInMountainArrayOnePass(target, mountainArr) {
    const n = mountainArr.length();
    let left = 0;
    let right = n - 1;
    
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        const midVal = mountainArr.get(mid);
        const nextVal = mountainArr.get(mid + 1);
        
        if (midVal < nextVal) {
            if (midVal === target) return mid;
            if (midVal < target) {
                left = mid + 1;
            } else {
                // Search left
                const leftSearch = binarySearch(mountainArr, target, 0, mid - 1, true);
                if (leftSearch !== -1) return leftSearch;
                // Search right
                return binarySearch(mountainArr, target, mid + 1, n - 1, true);
            }
        } else {
            right = mid;
        }
    }
    
    // Check if peak is the target
    if (mountainArr.get(left) === target) return left;
    
    // Search both sides
    const leftSearch = binarySearch(mountainArr, target, 0, left - 1, true);
    if (leftSearch !== -1) return leftSearch;
    
    return binarySearch(mountainArr, target, left + 1, n - 1, false);
}

/**
 * Approach 3: Using Array Methods (Non-optimal)
 * Time Complexity: O(n)
 * Space Complexity: O(1)
 */
function findInMountainArrayNaive(target, mountainArr) {
    const n = mountainArr.length();
    
    // Find peak using linear scan
    let peak = 0;
    for (let i = 0; i < n - 1; i++) {
        if (mountainArr.get(i) > mountainArr.get(i + 1)) {
            peak = i;
            break;
        }
    }
    
    // Search left of peak (increasing)
    for (let i = 0; i <= peak; i++) {
        if (mountainArr.get(i) === target) return i;
    }
    
    // Search right of peak (decreasing)
    for (let i = peak + 1; i < n; i++) {
        if (mountainArr.get(i) === target) return i;
    }
    
    return -1;
}

/**
 * Approach 4: Recursive Binary Search with Peak
 * Time Complexity: O(log n)
 * Space Complexity: O(log n) due to call stack
 */
function findInMountainArrayRecursive(target, mountainArr) {
    const n = mountainArr.length();
    
    function findPeak(left, right) {
        if (left === right) return left;
        
        const mid = Math.floor((left + right) / 2);
        if (mountainArr.get(mid) < mountainArr.get(mid + 1)) {
            return findPeak(mid + 1, right);
        } else {
            return findPeak(left, mid);
        }
    }
    
    function binarySearch(left, right, isIncreasing) {
        if (left > right) return -1;
        
        const mid = Math.floor((left + right) / 2);
        const midVal = mountainArr.get(mid);
        
        if (midVal === target) return mid;
        
        if ((isIncreasing && midVal < target) || (!isIncreasing && midVal > target)) {
            return binarySearch(mid + 1, right, isIncreasing);
        } else {
            return binarySearch(left, mid - 1, isIncreasing);
        }
    }
    
    const peak = findPeak(0, n - 1);
    
    // Search left of peak (increasing)
    const leftSearch = binarySearch(0, peak, true);
    if (leftSearch !== -1) return leftSearch;
    
    // Search right of peak (decreasing)
    return binarySearch(peak + 1, n - 1, false);
}

/**
 * Approach 5: Iterative Binary Search with Custom Comparison
 * Time Complexity: O(log n)
 * Space Complexity: O(1)
 */
function findInMountainArrayIterative(target, mountainArr) {
    const n = mountainArr.length();
    
    // Find peak
    let left = 0;
    let right = n - 1;
    let peak = 0;
    
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        if (mountainArr.get(mid) < mountainArr.get(mid + 1)) {
            left = mid + 1;
            peak = mid + 1;
        } else {
            right = mid;
        }
    }
    
    // Search in left part (increasing)
    left = 0;
    right = peak;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const midVal = mountainArr.get(mid);
        
        if (midVal === target) return mid;
        
        if (midVal < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    // Search in right part (decreasing)
    left = peak;
    right = n - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const midVal = mountainArr.get(mid);
        
        if (midVal === target) return mid;
        
        if (midVal > target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;
}

/**
 * Approach 6: Hybrid Approach with Caching
 * Time Complexity: O(log n)
 * Space Complexity: O(log n) for cache
 */
function findInMountainArrayCached(target, mountainArr) {
    const cache = new Map();
    const n = mountainArr.length();
    
    function getCached(index) {
        if (!cache.has(index)) {
            cache.set(index, mountainArr.get(index));
        }
        return cache.get(index);
    }
    
    // Find peak
    let left = 0;
    let right = n - 1;
    let peak = 0;
    
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        const midVal = getCached(mid);
        const nextVal = getCached(mid + 1);
        
        if (midVal < nextVal) {
            left = mid + 1;
            peak = mid + 1;
        } else {
            right = mid;
        }
    }
    
    // Search in left part (increasing)
    left = 0;
    right = peak;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const midVal = getCached(mid);
        
        if (midVal === target) return mid;
        
        if (midVal < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    // Search in right part (decreasing)
    left = peak;
    right = n - 1;
    
    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const midVal = getCached(mid);
        
        if (midVal === target) return mid;
        
        if (midVal > target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    
    return -1;
}

// Test cases
function runTests() {
    const testCases = [
        {
            arr: [1, 2, 3, 4, 5, 3, 1],
            target: 3,
            expected: 2
        },
        {
            arr: [0, 1, 2, 4, 2, 1],
            target: 3,
            expected: -1
        },
        {
            arr: [1, 5, 2],
            target: 2,
            expected: 2
        },
        {
            arr: [1, 2, 3, 5, 3],
            target: 5,
            expected: 3
        },
        {
            arr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 9, 8, 7, 6, 5, 4, 3, 2],
            target: 7,
            expected: 6
        },
        {
            arr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2],
            target: 15,
            expected: 14
        },
        {
            arr: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2],
            target: 20,
            expected: -1
        }
    ];
    
    const functions = [
        findInMountainArray,
        findInMountainArrayOnePass,
        findInMountainArrayNaive,
        findInMountainArrayRecursive,
        findInMountainArrayIterative,
        findInMountainArrayCached
    ];
    
    functions.forEach((func, index) => {
        console.log(`\nTesting ${func.name}:`);
        let allPassed = true;
        
        testCases.forEach((test, i) => {
            const mountainArr = new MountainArray([...test.arr]);
            const result = func(test.target, mountainArr);
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
console.log('=== Find in Mountain Array ===');
runTests();

// Export functions for use in other modules
module.exports = {
    MountainArray,
    findInMountainArray,
    findInMountainArrayOnePass,
    findInMountainArrayNaive,
    findInMountainArrayRecursive,
    findInMountainArrayIterative,
    findInMountainArrayCached
};
