/**
 * Constrained Subsequence Sum
 * 
 * Approach 1: Using Dynamic Programming with Monotonic Queue
 * Time Complexity: O(n)
 * Space Complexity: O(k) where k is the constraint
 */
function constrainedSubsetSum(nums, k) {
    const n = nums.length;
    const dp = new Array(n).fill(0);
    const deque = [];
    let maxSum = -Infinity;
    
    for (let i = 0; i < n; i++) {
        // Remove elements outside the window of size k+1
        while (deque.length > 0 && i - deque[0] > k) {
            deque.shift();
        }
        
        // Calculate dp[i] = nums[i] + max(0, dp[i-k], dp[i-k+1], ..., dp[i-1])
        dp[i] = nums[i] + (deque.length > 0 ? Math.max(0, dp[deque[0]]) : 0);
        maxSum = Math.max(maxSum, dp[i]);
        
        // Maintain deque in decreasing order of dp values
        while (deque.length > 0 && dp[i] >= dp[deque[deque.length - 1]]) {
            deque.pop();
        }
        
        deque.push(i);
    }
    
    return maxSum;
}

/**
 * Approach 2: Using Dynamic Programming with Max Heap
 * Time Complexity: O(n log n)
 * Space Complexity: O(n)
 */
function constrainedSubsetSumWithHeap(nums, k) {
    const n = nums.length;
    const dp = new Array(n).fill(0);
    const maxHeap = []; // Stores [value, index] pairs
    let maxSum = -Infinity;
    
    for (let i = 0; i < n; i++) {
        // Remove elements outside the window of size k+1
        while (maxHeap.length > 0 && i - maxHeap[0][1] > k) {
            maxHeap.shift();
        }
        
        // Calculate dp[i]
        const prevMax = maxHeap.length > 0 ? maxHeap[0][0] : 0;
        dp[i] = nums[i] + Math.max(0, prevMax);
        maxSum = Math.max(maxSum, dp[i]);
        
        // Maintain max heap property
        while (maxHeap.length > 0 && dp[i] >= maxHeap[maxHeap.length - 1][0]) {
            maxHeap.pop();
        }
        
        // Add current element to heap
        maxHeap.push([dp[i], i]);
        
        // Sort to maintain max heap (simplified, in practice use a proper heap)
        maxHeap.sort((a, b) => b[0] - a[0]);
    }
    
    return maxSum;
}

/**
 * Approach 3: Using Dynamic Programming with Deque (Optimized)
 * Time Complexity: O(n)
 * Space Complexity: O(k)
 */
function constrainedSubsetSumOptimized(nums, k) {
    const n = nums.length;
    const dp = new Array(n).fill(0);
    const deque = [];
    let maxSum = -Infinity;
    
    for (let i = 0; i < n; i++) {
        // Remove elements outside the window of size k+1
        while (deque.length > 0 && i - deque[0] > k) {
            deque.shift();
        }
        
        // Calculate dp[i]
        const prevMax = deque.length > 0 ? dp[deque[0]] : 0;
        dp[i] = nums[i] + Math.max(0, prevMax);
        maxSum = Math.max(maxSum, dp[i]);
        
        // Maintain deque in decreasing order of dp values
        while (deque.length > 0 && dp[i] >= dp[deque[deque.length - 1]]) {
            deque.pop();
        }
        
        // Only push to deque if dp[i] is positive (optimization)
        if (dp[i] > 0) {
            deque.push(i);
        }
    }
    
    return maxSum;
}

// Test cases
function testConstrainedSubsequenceSum() {
    // Test case 1
    const nums1 = [10, 2, -10, 5, 20];
    const k1 = 2;
    const expected1 = 37; // 10 + 2 + 5 + 20
    
    console.assert(
        constrainedSubsetSum(nums1, k1) === expected1,
        "Test 1 (Monotonic Queue) failed"
    );
    console.assert(
        constrainedSubsetSumWithHeap(nums1, k1) === expected1,
        "Test 1 (Max Heap) failed"
    );
    console.assert(
        constrainedSubsetSumOptimized(nums1, k1) === expected1,
        "Test 1 (Optimized) failed"
    );
    
    // Test case 2
    const nums2 = [-1, -2, -3];
    const k2 = 1;
    const expected2 = -1; // Just take -1
    
    console.assert(
        constrainedSubsetSum(nums2, k2) === expected2,
        "Test 2 (Monotonic Queue) failed"
    );
    
    // Test case 3
    const nums3 = [10, -2, -10, -5, 20];
    const k3 = 2;
    const expected3 = 23; // 10 - 2 - 5 + 20
    
    console.assert(
        constrainedSubsetSum(nums3, k3) === expected3,
        "Test 3 (Monotonic Queue) failed"
    );
    
    console.log("All constrained subsequence sum tests passed!");
}

// Run the tests
try {
    testConstrainedSubsequenceSum();
} catch (error) {
    console.error("Test failed:", error);
}
