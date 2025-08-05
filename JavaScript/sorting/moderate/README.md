# Moderate Level Sorting Problems

This directory contains solutions to moderate-level sorting problems from LeetCode. Each problem is solved using multiple approaches with detailed explanations of time and space complexity.

## Table of Contents

1. [Merge k Sorted Lists](#merge-k-sorted-lists)
2. [Find the Kth Smallest Sum of a Matrix With Sorted Rows](#find-the-kth-smallest-sum-of-a-matrix-with-sorted-rows)
3. [Maximum Number of Visible Points](#maximum-number-of-visible-points)
4. [Running Tests](#running-tests)
5. [Contributing](#contributing)

## Merge k Sorted Lists

### Problem
You are given an array of k linked-lists lists, each linked-list is sorted in ascending order. Merge all the linked-lists into one sorted linked-list and return it.

### Approaches

1. **Brute Force - Collect and Sort**
   - Collect all values into an array, sort it, and create a new linked list
   - Time Complexity: O(N log N) where N is the total number of nodes
   - Space Complexity: O(N)

2. **Min-Heap (Priority Queue)**
   - Use a min-heap to always get the smallest element from all lists
   - Time Complexity: O(N log k) where k is the number of linked lists
   - Space Complexity: O(k) for the heap

3. **Merge One by One**
   - Merge lists one by one iteratively
   - Time Complexity: O(kN) where k is the number of linked lists
   - Space Complexity: O(1)

4. **Divide and Conquer (Merge Sort Style)**
   - Merge pairs of lists until only one list remains
   - Time Complexity: O(N log k)
   - Space Complexity: O(1)

## Find the Kth Smallest Sum of a Matrix With Sorted Rows

### Problem
Given an m x n matrix that is sorted in non-decreasing order, and an integer k, find the kth smallest array among all possible arrays built from elements of each row in the matrix where rows are sorted in ascending order.

### Approaches

1. **Min-Heap with BFS**
   - Use a min-heap to explore sums in order
   - Time Complexity: O(k * m * log(k * m))
   - Space Complexity: O(k * m)

2. **Binary Search on Possible Sums**
   - Binary search the possible sum range
   - Count the number of arrays with sum <= mid
   - Time Complexity: O(m * n * log(maxSum - minSum) * log k)
   - Space Complexity: O(m)

3. **Optimized Priority Queue**
   - Optimized version with better pruning
   - Uses both min-heap and max-heap for efficient kth element finding
   - Time Complexity: O(k * m * log k)
   - Space Complexity: O(k * m)

## Maximum Number of Visible Points

### Problem
Given an array of points, an angle, and your location, find the maximum number of points you can see. You can see some set of points if they are at most the given angle degrees apart in your field of view.

### Approaches

1. **Sliding Window on Sorted Angles**
   - Calculate angles of all points relative to the location
   - Sort the angles and use sliding window to find the maximum visible points
   - Time Complexity: O(n log n)
   - Space Complexity: O(n)

2. **Binary Search for Each Point**
   - For each point, use binary search to find the rightmost visible point
   - Time Complexity: O(n log n)
   - Space Complexity: O(n)

3. **Optimized Sliding Window with Angle Normalization**
   - Optimized version with angle normalization and early termination
   - Handles edge cases like points at the same location
   - Time Complexity: O(n log n)
   - Space Complexity: O(n)

## Running Tests

Each solution file includes test cases that can be run using Node.js:

```bash
# Run tests for Merge k Sorted Lists
node answer1.js

# Run tests for Kth Smallest Sum of a Matrix
node answer2.js

# Run tests for Maximum Number of Visible Points
node answer3.js
```

## Contributing

Contributions are welcome! Please ensure that any new implementations:

1. Include proper documentation
2. Follow the existing code style
3. Include test cases
4. Have time and space complexity analysis
5. Include multiple approaches with optimizations

## Sources

- [LeetCode - Merge k Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/)
- [LeetCode - Find the Kth Smallest Sum of a Matrix With Sorted Rows](https://leetcode.com/problems/find-the-kth-smallest-sum-of-a-matrix-with-sorted-rows/)
- [LeetCode - Maximum Number of Visible Points](https://leetcode.com/problems/maximum-number-of-visible-points/)
