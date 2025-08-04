/**
 * Median of Two Sorted Arrays
 * 
 * Problem: Given two sorted arrays nums1 and nums2 of size m and n respectively,
 * return the median of the two sorted arrays.
 * Source: https://leetcode.com/problems/median-of-two-sorted-arrays/
 * 
 * Approach 1: Merge and Find Median (Naive)
 * Time Complexity: O(m + n)
 * Space Complexity: O(m + n)
 */
function findMedianSortedArraysNaive(nums1, nums2) {
    const merged = [];
    let i = 0, j = 0;
    
    while (i < nums1.length && j < nums2.length) {
        if (nums1[i] <= nums2[j]) {
            merged.push(nums1[i++]);
        } else {
            merged.push(nums2[j++]);
        }
    }
    
    while (i < nums1.length) merged.push(nums1[i++]);
    while (j < nums2.length) merged.push(nums2[j++]);
    
    const mid = Math.floor(merged.length / 2);
    return merged.length % 2 === 0 
        ? (merged[mid - 1] + merged[mid]) / 2 
        : merged[mid];
}

/**
 * Approach 2: Two Pointers (Optimized Space)
 * Time Complexity: O(m + n)
 * Space Complexity: O(1)
 */
function findMedianSortedArraysTwoPointers(nums1, nums2) {
    const totalLength = nums1.length + nums2.length;
    const isEven = totalLength % 2 === 0;
    const medianPos = Math.floor(totalLength / 2);
    
    let prev = 0, curr = 0;
    let i = 0, j = 0, count = 0;
    
    while (count <= medianPos) {
        prev = curr;
        
        if (i < nums1.length && (j >= nums2.length || nums1[i] <= nums2[j])) {
            curr = nums1[i++];
        } else {
            curr = nums2[j++];
        }
        
        count++;
    }
    
    return isEven ? (prev + curr) / 2 : curr;
}

/**
 * Approach 3: Binary Search (Optimal)
 * Time Complexity: O(log(min(m, n)))
 * Space Complexity: O(1)
 */
function findMedianSortedArraysBinarySearch(nums1, nums2) {
    // Ensure nums1 is the smaller array
    if (nums1.length > nums2.length) {
        [nums1, nums2] = [nums2, nums1];
    }
    
    const m = nums1.length;
    const n = nums2.length;
    const total = m + n;
    const half = Math.floor((total + 1) / 2);
    
    let left = 0;
    let right = m;
    
    while (left <= right) {
        const i = Math.floor((left + right) / 2); // Partition for nums1
        const j = half - i; // Partition for nums2
        
        const maxLeft1 = i === 0 ? -Infinity : nums1[i - 1];
        const minRight1 = i === m ? Infinity : nums1[i];
        const maxLeft2 = j === 0 ? -Infinity : nums2[j - 1];
        const minRight2 = j === n ? Infinity : nums2[j];
        
        if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
            // Found the correct partition
            if (total % 2 === 0) {
                return (Math.max(maxLeft1, maxLeft2) + Math.min(minRight1, minRight2)) / 2;
            } else {
                return Math.max(maxLeft1, maxLeft2);
            }
        } else if (maxLeft1 > minRight2) {
            right = i - 1;
        } else {
            left = i + 1;
        }
    }
    
    throw new Error("Input arrays are not sorted.");
}

/**
 * Approach 4: Using JavaScript Built-in Sort
 * Time Complexity: O((m + n) log(m + n))
 * Space Complexity: O(m + n)
 */
function findMedianSortedArraysBuiltIn(nums1, nums2) {
    const merged = [...nums1, ...nums2].sort((a, b) => a - b);
    const mid = Math.floor(merged.length / 2);
    
    return merged.length % 2 === 0 
        ? (merged[mid - 1] + merged[mid]) / 2 
        : merged[mid];
}

/**
 * Approach 5: Recursive Binary Search
 * Time Complexity: O(log(min(m, n)))
 * Space Complexity: O(log(min(m, n))) due to call stack
 */
function findMedianSortedArraysRecursive(nums1, nums2) {
    if (nums1.length > nums2.length) {
        return findMedianSortedArraysRecursive(nums2, nums1);
    }
    
    const m = nums1.length;
    const n = nums2.length;
    const total = m + n;
    const half = Math.floor((total + 1) / 2);
    
    function binarySearch(left, right) {
        if (left > right) return -1;
        
        const i = Math.floor((left + right) / 2);
        const j = half - i;
        
        const maxLeft1 = i === 0 ? -Infinity : nums1[i - 1];
        const minRight1 = i === m ? Infinity : nums1[i];
        const maxLeft2 = j === 0 ? -Infinity : nums2[j - 1];
        const minRight2 = j === n ? Infinity : nums2[j];
        
        if (maxLeft1 <= minRight2 && maxLeft2 <= minRight1) {
            if (total % 2 === 0) {
                return (Math.max(maxLeft1, maxLeft2) + Math.min(minRight1, minRight2)) / 2;
            } else {
                return Math.max(maxLeft1, maxLeft2);
            }
        } else if (maxLeft1 > minRight2) {
            return binarySearch(left, i - 1);
        } else {
            return binarySearch(i + 1, right);
        }
    }
    
    return binarySearch(0, m);
}

/**
 * Approach 6: Using QuickSelect Algorithm
 * Time Complexity: O(log(m + n)) average, O((m+n)²) worst case
 * Space Complexity: O(1)
 */
function findMedianSortedArraysQuickSelect(nums1, nums2) {
    const arr = [...nums1, ...nums2];
    const n = arr.length;
    const isEven = n % 2 === 0;
    
    function quickSelect(left, right, k) {
        if (left === right) return arr[left];
        
        const pivotIndex = partition(left, right);
        
        if (k === pivotIndex) {
            return arr[k];
        } else if (k < pivotIndex) {
            return quickSelect(left, pivotIndex - 1, k);
        } else {
            return quickSelect(pivotIndex + 1, right, k);
        }
    }
    
    function partition(left, right) {
        const pivot = arr[right];
        let i = left;
        
        for (let j = left; j < right; j++) {
            if (arr[j] <= pivot) {
                [arr[i], arr[j]] = [arr[j], arr[i]];
                i++;
            }
        }
        
        [arr[i], arr[right]] = [arr[right], arr[i]];
        return i;
    }
    
    if (isEven) {
        const mid1 = quickSelect(0, n - 1, Math.floor(n / 2) - 1);
        const mid2 = quickSelect(0, n - 1, Math.floor(n / 2));
        return (mid1 + mid2) / 2;
    } else {
        return quickSelect(0, n - 1, Math.floor(n / 2));
    }
}

// Test cases
const testCases = [
    { nums1: [1, 3], nums2: [2], expected: 2.0 },
    { nums1: [1, 2], nums2: [3, 4], expected: 2.5 },
    { nums1: [0, 0], nums2: [0, 0], expected: 0.0 },
    { nums1: [], nums2: [1], expected: 1.0 },
    { nums1: [2], nums2: [], expected: 2.0 },
    { nums1: [1, 3, 8, 9, 15], nums2: [7, 11, 19, 21, 25], expected: 10.0 },
];

// Run tests
function runTests() {
    const functions = [
        findMedianSortedArraysNaive,
        findMedianSortedArraysTwoPointers,
        findMedianSortedArraysBinarySearch,
        findMedianSortedArraysBuiltIn,
        findMedianSortedArraysRecursive,
        findMedianSortedArraysQuickSelect
    ];
    
    functions.forEach((func, index) => {
        console.log(`\nTesting ${func.name}:`);
        let allPassed = true;
        
        testCases.forEach((test, i) => {
            const result = func([...test.nums1], [...test.nums2]);
            const passed = Math.abs(result - test.expected) < 0.00001;
            if (!passed) allPassed = false;
            
            console.log(`  Test ${i + 1}: ${passed ? 'PASS' : 'FAIL'}`);
            if (!passed) {
                console.log(`    Input: [${test.nums1}], [${test.nums2}]`);
                console.log(`    Expected: ${test.expected}, Got: ${result}`);
            }
        });
        
        console.log(`  ${allPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);
    });
}

// Run the tests
console.log('=== Median of Two Sorted Arrays ===');
runTests();

// Export functions for use in other modules
module.exports = {
    findMedianSortedArraysNaive,
    findMedianSortedArraysTwoPointers,
    findMedianSortedArraysBinarySearch,
    findMedianSortedArraysBuiltIn,
    findMedianSortedArraysRecursive,
    findMedianSortedArraysQuickSelect
};
