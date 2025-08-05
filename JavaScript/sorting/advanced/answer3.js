/**
 * Max Sum of Rectangle No Larger Than K
 * 
 * Problem: Given an m x n matrix and an integer k, return the max sum of a rectangle 
 * in the matrix such that its sum is no larger than k.
 * 
 * Approach 1: Brute Force with Prefix Sum
 * Time Complexity: O((m*n)^3)
 * Space Complexity: O(m*n)
 */
function maxSumSubmatrixBruteForce(matrix, k) {
    const m = matrix.length;
    const n = matrix[0].length;
    
    // Create prefix sum matrix
    const prefix = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            prefix[i][j] = matrix[i-1][j-1] + prefix[i-1][j] + prefix[i][j-1] - prefix[i-1][j-1];
        }
    }
    
    let maxSum = -Infinity;
    
    // Try all possible rectangles
    for (let i1 = 0; i1 < m; i1++) {
        for (let j1 = 0; j1 < n; j1++) {
            for (let i2 = i1; i2 < m; i2++) {
                for (let j2 = j1; j2 < n; j2++) {
                    // Calculate sum of rectangle (i1,j1) to (i2,j2)
                    const sum = prefix[i2+1][j2+1] - prefix[i1][j2+1] - prefix[i2+1][j1] + prefix[i1][j1];
                    
                    if (sum <= k && sum > maxSum) {
                        maxSum = sum;
                        // Early exit if we find the exact sum
                        if (maxSum === k) return k;
                    }
                }
            }
        }
    }
    
    return maxSum;
}

/**
 * Approach 2: Kadane's Algorithm with Prefix Sum and Binary Search
 * Time Complexity: O(min(m,n)^2 * max(m,n) log max(m,n))
 * Space Complexity: O(max(m,n))
 */
function maxSumSubmatrixKadane(matrix, k) {
    const m = matrix.length;
    const n = matrix[0].length;
    let result = -Infinity;
    
    // Try all possible row ranges
    for (let top = 0; top < m; top++) {
        const colSums = new Array(n).fill(0);
        
        for (let bottom = top; bottom < m; bottom++) {
            // Update column sums for current row range
            for (let col = 0; col < n; col++) {
                colSums[col] += matrix[bottom][col];
            }
            
            // Find max subarray sum <= k in colSums
            result = Math.max(result, maxSubarraySumNoLargerThanK(colSums, k));
            
            // Early exit if we find the exact sum
            if (result === k) return k;
        }
    }
    
    return result;
}

// Helper function to find max subarray sum <= k using Kadane's algorithm with a set
function maxSubarraySumNoLargerThanK(nums, k) {
    const prefixSums = [0];
    let prefixSum = 0;
    let maxSum = -Infinity;
    
    for (const num of nums) {
        prefixSum += num;
        
        // Find the smallest prefix sum >= (prefixSum - k)
        let left = 0;
        let right = prefixSums.length;
        
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (prefixSums[mid] >= prefixSum - k) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }
        
        if (left < prefixSums.length) {
            const sum = prefixSum - prefixSums[left];
            if (sum <= k && sum > maxSum) {
                maxSum = sum;
                if (maxSum === k) return k;
            }
        }
        
        // Insert current prefix sum in sorted order
        let insertPos = 0;
        while (insertPos < prefixSums.length && prefixSums[insertPos] < prefixSum) {
            insertPos++;
        }
        prefixSums.splice(insertPos, 0, prefixSum);
    }
    
    return maxSum;
}

/**
 * Approach 3: Optimized with TreeSet for Prefix Sums
 * Time Complexity: O(min(m,n)^2 * max(m,n) log max(m,n))
 * Space Complexity: O(max(m,n))
 */
function maxSumSubmatrixOptimized(matrix, k) {
    const m = matrix.length;
    const n = matrix[0].length;
    let result = -Infinity;
    
    // Make sure we have more columns than rows for better performance
    const isColLarger = n > m;
    const rows = isColLarger ? m : n;
    const cols = isColLarger ? n : m;
    
    for (let i = 0; i < rows; i++) {
        const colSums = new Array(cols).fill(0);
        
        for (let j = i; j < rows; j++) {
            // Update column sums for current row range
            for (let c = 0; c < cols; c++) {
                colSums[c] += isColLarger ? matrix[j][c] : matrix[c][j];
            }
            
            // Find max subarray sum <= k in colSums using TreeSet simulation
            result = Math.max(result, maxSubarraySumWithTreeSet(colSums, k));
            
            // Early exit if we find the exact sum
            if (result === k) return k;
        }
    }
    
    return result;
}

// Helper function to find max subarray sum <= k using TreeSet simulation
function maxSubarraySumWithTreeSet(nums, k) {
    const prefixSums = [0];
    let prefixSum = 0;
    let maxSum = -Infinity;
    
    for (const num of nums) {
        prefixSum += num;
        
        // Find the smallest prefix sum >= (prefixSum - k)
        let left = 0;
        let right = prefixSums.length;
        
        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (prefixSums[mid] >= prefixSum - k) {
                right = mid;
            } else {
                left = mid + 1;
            }
        }
        
        if (left < prefixSums.length) {
            const sum = prefixSum - prefixSums[left];
            if (sum <= k && sum > maxSum) {
                maxSum = sum;
                if (maxSum === k) return k;
            }
        }
        
        // Insert current prefix sum in sorted order
        let insertPos = 0;
        while (insertPos < prefixSums.length && prefixSums[insertPos] < prefixSum) {
            insertPos++;
        }
        
        // Only insert if it's not a duplicate (for better performance)
        if (insertPos === prefixSums.length || prefixSums[insertPos] !== prefixSum) {
            prefixSums.splice(insertPos, 0, prefixSum);
        }
    }
    
    return maxSum;
}

// Test cases
function runTests() {
    const testCases = [
        {
            matrix: [[1, 0, 1], [0, -2, 3]],
            k: 2,
            expected: 2,
            name: 'Example 1'
        },
        {
            matrix: [[2, 2, -1]],
            k: 3,
            expected: 3,
            name: 'Example 2'
        },
        {
            matrix: [[5, -4, -3, 4], [-3, -4, 4, 5], [5, 1, 5, -4]],
            k: 8,
            expected: 8,
            name: 'Example 3'
        },
        {
            matrix: [[1, 0, 1], [0, -2, 3]],
            k: 100,
            expected: 4,
            name: 'Entire matrix sum'
        },
        {
            matrix: [[2, 2, -1]],
            k: 0,
            expected: -1,
            name: 'Negative k'
        },
        {
            matrix: [[1, 2, 3], [4, 5, 6], [7, 8, 9]],
            k: 20,
            expected: 20,
            name: 'Large k'
        },
        {
            matrix: [[-1, -2, -3], [-4, -5, -6], [-7, -8, -9]],
            k: -1,
            expected: -1,
            name: 'All negative numbers'
        }
    ];
    
    const functions = [
        { name: 'Brute Force', fn: maxSumSubmatrixBruteForce },
        { name: 'Kadane\'s Algorithm', fn: maxSumSubmatrixKadane },
        { name: 'Optimized with TreeSet', fn: maxSumSubmatrixOptimized }
    ];
    
    functions.forEach(({ name, fn }) => {
        console.log(`\nTesting ${name}:`);
        let allPassed = true;
        
        testCases.forEach((test, i) => {
            // Create a deep copy of the matrix to avoid modifying the original
            const matrixCopy = test.matrix.map(row => [...row]);
            const result = fn(matrixCopy, test.k);
            const passed = result === test.expected;
            
            if (!passed) allPassed = false;
            
            console.log(`  Test ${i + 1} (${test.name}): ${passed ? 'PASS' : 'FAIL'}`);
            if (!passed) {
                console.log(`    Expected: ${test.expected}`);
                console.log(`    Got: ${result}`);
                console.log(`    Matrix: ${JSON.stringify(test.matrix)}, k: ${test.k}`);
            }
        });
        
        console.log(`  ${allPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);
    });
}

// Run the tests
console.log('=== Max Sum of Rectangle No Larger Than K ===');
runTests();

// Export functions for use in other modules
module.exports = {
    maxSumSubmatrixBruteForce,
    maxSumSubmatrixKadane,
    maxSumSubmatrixOptimized
};
