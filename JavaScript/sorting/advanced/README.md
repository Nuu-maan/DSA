# Advanced Level Sorting Problems

This directory contains solutions to advanced-level sorting problems from LeetCode. Each problem is solved using multiple approaches with detailed explanations of time and space complexity.

## Table of Contents

1. [Count of Range Sum](#count-of-range-sum)
2. [Create Sorted Array through Instructions](#create-sorted-array-through-instructions)
3. [Max Sum of Rectangle No Larger Than K](#max-sum-of-rectangle-no-larger-than-k)
4. [Running Tests](#running-tests)
5. [Performance Comparison](#performance-comparison)
6. [Contributing](#contributing)

## Count of Range Sum

### Problem
Given an integer array `nums` and two integers `lower` and `upper`, return the number of range sums that lie in `[lower, upper]` inclusive.

### Approaches

1. **Merge Sort with Prefix Sum**
   - Calculate prefix sums and use merge sort to count valid ranges
   - Time Complexity: O(n log n)
   - Space Complexity: O(n)

2. **Binary Indexed Tree (Fenwick Tree)**
   - Use coordinate compression and Fenwick Tree for efficient range queries
   - Time Complexity: O(n log n)
   - Space Complexity: O(n)

3. **Segment Tree**
   - Alternative approach using Segment Tree for range queries
   - Time Complexity: O(n log n)
   - Space Complexity: O(n)

## Create Sorted Array through Instructions

### Problem
Given an array of instructions, create a sorted array and calculate the total cost of insertion where the cost is the minimum of the number of elements less than or greater than the current instruction.

### Approaches

1. **Binary Search with Sorted Array**
   - Maintain a sorted array and use binary search for insertion
   - Time Complexity: O(n²) in worst case
   - Space Complexity: O(n)

2. **Binary Indexed Tree (Fenwick Tree)**
   - Efficiently track counts of elements less than/greater than current
   - Time Complexity: O(n log M) where M is the maximum value
   - Space Complexity: O(M)

3. **Segment Tree**
   - Alternative approach using Segment Tree for range queries
   - Time Complexity: O(n log M)
   - Space Complexity: O(M)

## Max Sum of Rectangle No Larger Than K

### Problem
Given an m x n matrix and an integer k, return the max sum of a rectangle in the matrix such that its sum is no larger than k.

### Approaches

1. **Brute Force with Prefix Sum**
   - Calculate all possible rectangle sums using prefix sums
   - Time Complexity: O((m*n)³)
   - Space Complexity: O(m*n)

2. **Kadane's Algorithm with Binary Search**
   - Use Kadane's algorithm for finding maximum subarray sum
   - Combine with binary search for sums ≤ k
   - Time Complexity: O(min(m,n)² * max(m,n) log max(m,n))
   - Space Complexity: O(max(m,n))

3. **Optimized with TreeSet**
   - More efficient implementation using TreeSet simulation
   - Better handling of prefix sums
   - Time Complexity: O(min(m,n)² * max(m,n) log max(m,n))
   - Space Complexity: O(max(m,n))

## Running Tests

Each solution file includes test cases that can be run using Node.js:

```bash
# Run tests for Count of Range Sum
node answer1.js

# Run tests for Create Sorted Array through Instructions
node answer2.js

# Run tests for Max Sum of Rectangle No Larger Than K
node answer3.js
```

## Performance Comparison

| Problem | Approach | Time Complexity | Space Complexity | Best For |
|---------|----------|----------------|------------------|----------|
| Count of Range Sum | Merge Sort | O(n log n) | O(n) | General case |
| Count of Range Sum | BIT | O(n log n) | O(n) | When values have large range |
| Create Sorted Array | Naive | O(n²) | O(n) | Small inputs |
| Create Sorted Array | BIT/Segment Tree | O(n log M) | O(M) | Large inputs with reasonable M |
| Max Sum Rectangle | Brute Force | O((mn)³) | O(mn) | Very small matrices |
| Max Sum Rectangle | Kadane + BS | O(min(m,n)² * max(m,n) log max(m,n)) | O(max(m,n)) | General case |

## Contributing

Contributions are welcome! Please ensure that any new implementations:

1. Include proper documentation
2. Follow the existing code style
3. Include test cases
4. Have time and space complexity analysis
5. Include multiple approaches with optimizations

## Sources

- [LeetCode - Count of Range Sum](https://leetcode.com/problems/count-of-range-sum/)
- [LeetCode - Create Sorted Array through Instructions](https://leetcode.com/problems/create-sorted-array-through-instructions/)
- [LeetCode - Max Sum of Rectangle No Larger Than K](https://leetcode.com/problems/max-sum-of-rectangle-no-larger-than-k/)
