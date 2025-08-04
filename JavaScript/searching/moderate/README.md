# Moderate Searching Algorithms

This directory contains moderate-level searching algorithm problems and their solutions in JavaScript. Each problem is solved using multiple approaches with detailed explanations and performance analysis.

## Problems

### 1. Median of Two Sorted Arrays
- **Problem**: Given two sorted arrays `nums1` and `nums2` of size `m` and `n` respectively, return the median of the two sorted arrays.
- **Source**: [LeetCode - Median of Two Sorted Arrays](https://leetcode.com/problems/median-of-two-sorted-arrays/)
- **Approaches**:
  1. Merge and Find Median (Naive) - O(m + n) time, O(m + n) space
  2. Two Pointers (Optimized Space) - O(m + n) time, O(1) space
  3. Binary Search (Optimal) - O(log(min(m, n))) time, O(1) space
  4. Using JavaScript Built-in Sort - O((m + n) log(m + n)) time, O(m + n) space
  5. Recursive Binary Search - O(log(min(m, n))) time, O(log(min(m, n))) space
  6. QuickSelect Algorithm - O(log(m + n)) average, O((m+n)²) worst case

### 2. Find in Mountain Array
- **Problem**: Given a mountain array, find the minimum index such that `mountainArr.get(index) == target`.
- **Source**: [LeetCode - Find in Mountain Array](https://leetcode.com/problems/find-in-mountain-array/)
- **Approaches**:
  1. Three Binary Searches (Find Peak, Search Left, Search Right)
  2. One Binary Search with Peak Detection
  3. Using Array Methods (Non-optimal)
  4. Recursive Binary Search with Peak
  5. Iterative Binary Search with Custom Comparison
  6. Hybrid Approach with Caching

### 3. Split Array Largest Sum
- **Problem**: Given an array `nums` and an integer `m`, split the array into `m` non-empty continuous subarrays such that the largest sum among these subarrays is minimized.
- **Source**: [LeetCode - Split Array Largest Sum](https://leetcode.com/problems/split-array-largest-sum/)
- **Approaches**:
  1. Binary Search with Greedy Partitioning
  2. Dynamic Programming Approach
  3. Top-down Memoization
  4. Bottom-up DP
  5. Binary Search with Custom Checker
  6. Optimized Greedy with Early Termination

## Running the Tests

Each solution file includes test cases that can be run using Node.js:

```bash
# Navigate to the moderate directory
cd JavaScript/searching/moderate/

# Run the tests for a specific problem
node answer1.js
node answer2.js
node answer3.js
```

## Performance Considerations

### Median of Two Sorted Arrays
- **Optimal Solution**: Binary Search approach (O(log(min(m, n))))
- **Space Optimization**: Two Pointers approach (O(1) space)
- **Edge Cases**:
  - One array is empty
  - Arrays have different lengths
  - All elements in one array are smaller than the other
  - Arrays with duplicate values

### Find in Mountain Array
- **Key Insight**: First find the peak, then perform binary search on both sides
- **Optimization**: Cache the results of mountain array gets
- **Edge Cases**:
  - Target is the peak
  - Target is not in the array
  - Small arrays (size 1 or 2)
  - Duplicate values

### Split Array Largest Sum
- **Binary Search Range**: Between max(nums) and sum(nums)
- **Greedy Partitioning**: Count subarrays while keeping sum <= mid
- **Edge Cases**:
  - m = 1 (entire array is one subarray)
  - m = n (each element is a subarray)
  - All elements are the same
  - Large input sizes (performance testing)

## Best Practices

1. **Choose the Right Approach**: 
   - For sorted arrays, always consider binary search first
   - For problems with constraints (like mountain array), adapt binary search accordingly
   - For optimization problems, consider binary search on the answer space

2. **Handle Edge Cases**:
   - Empty arrays
   - Single element arrays
   - Arrays with all identical elements
   - Arrays with negative numbers (if applicable)

3. **Optimize for Space**:
   - Prefer iterative solutions over recursive ones for space efficiency
   - Use pointers instead of creating new arrays when possible
   - Consider in-place modifications if allowed

4. **Test Thoroughly**:
   - Test with minimum and maximum input sizes
   - Test with edge cases specific to the problem
   - Include performance tests for large inputs

## Contributing

Feel free to contribute additional approaches or optimizations. Please ensure all tests pass and follow the existing code style.
