/**
 * Split Array Largest Sum
 * 
 * Problem: Given an array nums which consists of non-negative integers and an integer m,
 * split the array into m non-empty continuous subarrays such that the largest sum among
 * these m subarrays is minimized.
 * Source: https://leetcode.com/problems/split-array-largest-sum/
 * 
 * Approach 1: Binary Search with Greedy Partitioning
 * Time Complexity: O(n * log(sum of array))
 * Space Complexity: O(1)
 */
function splitArrayBinarySearch(nums, m) {
    let left = Math.max(...nums);
    let right = nums.reduce((sum, num) => sum + num, 0);
    
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        
        // Count how many subarrays we need
        let count = 1;
        let currentSum = 0;
        
        for (const num of nums) {
            if (currentSum + num > mid) {
                count++;
                currentSum = num;
                if (count > m) break;
            } else {
                currentSum += num;
            }
        }
        
        if (count > m) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    
    return left;
}

/**
 * Approach 2: Dynamic Programming
 * Time Complexity: O(n² * m)
 * Space Complexity: O(n * m)
 */
function splitArrayDP(nums, m) {
    const n = nums.length;
    
    // dp[i][j] = minimum largest sum for first i elements split into j parts
    const dp = Array.from({ length: n + 1 }, () => Array(m + 1).fill(Infinity));
    const prefixSum = [0];
    
    // Calculate prefix sums
    for (const num of nums) {
        prefixSum.push(prefixSum[prefixSum.length - 1] + num);
    }
    
    // Base case: 0 subarrays, sum is 0
    for (let i = 0; i <= n; i++) {
        dp[i][0] = 0;
    }
    
    // Base case: 1 subarray, sum is the sum of elements
    for (let i = 1; i <= n; i++) {
        dp[i][1] = prefixSum[i];
    }
    
    // Fill the dp table
    for (let i = 1; i <= n; i++) {
        for (let j = 2; j <= Math.min(i, m); j++) {
            for (let k = j - 1; k < i; k++) {
                const currentMax = Math.max(dp[k][j - 1], prefixSum[i] - prefixSum[k]);
                dp[i][j] = Math.min(dp[i][j], currentMax);
            }
        }
    }
    
    return dp[n][m];
}

/**
 * Approach 3: Top-down Memoization
 * Time Complexity: O(n² * m)
 * Space Complexity: O(n * m) for memoization
 */
function splitArrayMemoization(nums, m) {
    const n = nums.length;
    const memo = new Map();
    const prefixSum = [0];
    
    // Calculate prefix sums
    for (const num of nums) {
        prefixSum.push(prefixSum[prefixSum.length - 1] + num);
    }
    
    function dfs(start, parts) {
        const key = `${start},${parts}`;
        
        if (memo.has(key)) return memo.get(key);
        
        // Base case: only one part, return the sum from start to end
        if (parts === 1) {
            return prefixSum[n] - prefixSum[start];
        }
        
        let minLargestSum = Infinity;
        let currentSum = 0;
        
        // Try all possible splits
        for (let i = start; i <= n - parts; i++) {
            currentSum += nums[i];
            const largestSum = Math.max(currentSum, dfs(i + 1, parts - 1));
            minLargestSum = Math.min(minLargestSum, largestSum);
            
            // Early termination if we can't get a better result
            if (currentSum >= minLargestSum) break;
        }
        
        memo.set(key, minLargestSum);
        return minLargestSum;
    }
    
    return dfs(0, m);
}

/**
 * Approach 4: Bottom-up DP with Space Optimization
 * Time Complexity: O(n² * m)
 * Space Complexity: O(n)
 */
function splitArrayDPOptimized(nums, m) {
    const n = nums.length;
    
    // dp[i] represents the minimum largest sum for the first i elements
    let dp = new Array(n + 1).fill(Infinity);
    dp[0] = 0;
    
    // Calculate prefix sums
    const prefixSum = [0];
    for (const num of nums) {
        prefixSum.push(prefixSum[prefixSum.length - 1] + num);
    }
    
    for (let parts = 1; parts <= m; parts++) {
        const newDp = new Array(n + 1).fill(Infinity);
        
        for (let i = 1; i <= n; i++) {
            for (let j = 0; j < i; j++) {
                const currentSum = prefixSum[i] - prefixSum[j];
                newDp[i] = Math.min(newDp[i], Math.max(dp[j], currentSum));
            }
        }
        
        dp = newDp;
    }
    
    return dp[n];
}

/**
 * Approach 5: Binary Search with Custom Checker
 * Time Complexity: O(n * log(sum of array))
 * Space Complexity: O(1)
 */
function splitArrayBinarySearchOptimized(nums, m) {
    function canSplit(maxSum) {
        let count = 1;
        let currentSum = 0;
        
        for (const num of nums) {
            if (currentSum + num > maxSum) {
                count++;
                currentSum = num;
                if (count > m) return false;
            } else {
                currentSum += num;
            }
        }
        
        return true;
    }
    
    let left = Math.max(...nums);
    let right = nums.reduce((sum, num) => sum + num, 0);
    
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        
        if (canSplit(mid)) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    
    return left;
}

/**
 * Approach 6: Greedy with Early Termination
 * Time Complexity: O(n * log(sum of array))
 * Space Complexity: O(1)
 */
function splitArrayGreedy(nums, m) {
    function canSplit(maxSum) {
        let count = 1;
        let currentSum = 0;
        
        for (const num of nums) {
            if (num > maxSum) return false;
            
            if (currentSum + num > maxSum) {
                count++;
                currentSum = num;
                if (count > m) return false;
            } else {
                currentSum += num;
            }
        }
        
        return true;
    }
    
    let left = 0;
    let right = 0;
    
    // Calculate the search range
    for (const num of nums) {
        left = Math.max(left, num);
        right += num;
    }
    
    // Early exit if m is 1 or equal to array length
    if (m === 1) return right;
    if (m === nums.length) return left;
    
    // Binary search
    while (left < right) {
        const mid = Math.floor((left + right) / 2);
        
        if (canSplit(mid)) {
            right = mid;
        } else {
            left = mid + 1;
        }
    }
    
    return left;
}

// Test cases
function runTests() {
    const testCases = [
        { nums: [7, 2, 5, 10, 8], m: 2, expected: 18 },
        { nums: [1, 2, 3, 4, 5], m: 2, expected: 9 },
        { nums: [1, 4, 4], m: 3, expected: 4 },
        { nums: [1, 2, 3, 4, 5], m: 1, expected: 15 },
        { nums: [1, 2, 3, 4, 5], m: 5, expected: 5 },
        { nums: [2, 3, 1, 2, 4, 3], m: 5, expected: 4 },
        { nums: [10, 5, 13, 4, 8, 4, 5, 11, 14, 9, 16, 10, 20, 8], m: 8, expected: 25 },
    ];
    
    const functions = [
        splitArrayBinarySearch,
        splitArrayDP,
        splitArrayMemoization,
        splitArrayDPOptimized,
        splitArrayBinarySearchOptimized,
        splitArrayGreedy
    ];
    
    functions.forEach((func, index) => {
        console.log(`\nTesting ${func.name}:`);
        let allPassed = true;
        
        testCases.forEach((test, i) => {
            const result = func([...test.nums], test.m);
            const passed = result === test.expected;
            if (!passed) allPassed = false;
            
            console.log(`  Test ${i + 1}: ${passed ? 'PASS' : 'FAIL'}`);
            if (!passed) {
                console.log(`    Input: [${test.nums}], m = ${test.m}`);
                console.log(`    Expected: ${test.expected}, Got: ${result}`);
            }
        });
        
        console.log(`  ${allPassed ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'}`);
    });
}

// Run the tests
console.log('=== Split Array Largest Sum ===');
runTests();

// Export functions for use in other modules
module.exports = {
    splitArrayBinarySearch,
    splitArrayDP,
    splitArrayMemoization,
    splitArrayDPOptimized,
    splitArrayBinarySearchOptimized,
    splitArrayGreedy
};
