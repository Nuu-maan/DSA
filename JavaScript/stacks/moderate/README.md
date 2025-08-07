# Stack Problems (Moderate Level)

This directory contains solutions to moderate-level stack problems, primarily sourced from LeetCode Hard problems. Each problem includes multiple solution approaches with detailed analysis.

## Problems

### 1. Largest Rectangle in Histogram

**Problem Statement:** Given an array of integers `heights` representing the histogram's bar height where the width of each bar is 1, return the area of the largest rectangle in the histogram.

**Source:** [LeetCode #84](https://leetcode.com/problems/largest-rectangle-in-histogram/)

**Approaches:**
1. **Brute Force** - O(n²) time, O(1) space
2. **Stack-based** - O(n) time, O(n) space
3. **Divide and Conquer with Segment Tree** - O(n log n) average case
4. **Dynamic Programming with Left/Right Boundaries** - O(n) time, O(n) space

### 2. Maximal Rectangle

**Problem Statement:** Given a 2D binary matrix filled with 0's and 1's, find the largest rectangle containing only 1's and return its area.

**Source:** [LeetCode #85](https://leetcode.com/problems/maximal-rectangle/)

**Approaches:**
1. **Using Largest Rectangle in Histogram** - O(rows * cols) time, O(cols) space
2. **Dynamic Programming with Left/Right/Height Arrays** - O(rows * cols) time, O(cols) space
3. **Optimized Dynamic Programming** - O(rows * cols) time, O(cols) space

### 3. Trapping Rain Water

**Problem Statement:** Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it can trap after raining.

**Source:** [LeetCode #42](https://leetcode.com/problems/trapping-rain-water/)

**Approaches:**
1. **Stack-based** - O(n) time, O(n) space
2. **Two Pointers (Optimal)** - O(n) time, O(1) space
3. **Dynamic Programming** - O(n) time, O(n) space
4. **Brute Force** - O(n²) time, O(1) space

## Running the Tests

Each solution file includes test cases that can be run using Node.js. For example:

```bash
node answer1.js  # Tests for Largest Rectangle in Histogram
node answer2.js  # Tests for Maximal Rectangle
node answer3.js  # Tests for Trapping Rain Water
```

## Performance Considerations

- For most problems, the stack-based or two-pointer solutions provide optimal time and space complexity.
- The brute force solutions are included for educational purposes but should be avoided in production for large inputs.
- The dynamic programming approaches often provide a good balance between readability and performance.

## Additional Notes

- All solutions are implemented using modern JavaScript (ES6+) features.
- Each solution includes detailed comments explaining the approach and time/space complexity.
- Test cases cover edge cases and typical scenarios to ensure correctness.
