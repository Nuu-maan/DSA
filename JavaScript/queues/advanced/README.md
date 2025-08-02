# JavaScript Queues - Advanced Level

This section covers advanced difficulty queue problems from LeetCode, implemented using modern ES6+ JavaScript features.

## Problems

1. [Number of Visible People in a Queue](question1.txt)
2. [Shortest Subarray with Sum at Least K](question2.txt)
3. [Find the Most Competitive Subsequence](question3.txt)

## Approaches

Each problem is solved using multiple approaches showcasing different JavaScript features and patterns:

### Problem 1: Number of Visible People in a Queue

- **Approach 1**: Stack-based Solution (Optimal)
- **Approach 2**: Brute Force Solution
- **Approach 3**: Monotonic Stack Solution with Detailed Tracking
- **Approach 4**: Functional Programming Solution
- **Approach 5**: Recursive Solution with Memoization
- **Approach 6**: Generator-based Solution with Step-by-Step Visualization

### Problem 2: Shortest Subarray with Sum at Least K

- **Approach 1**: Deque-based Solution (Optimal)
- **Approach 2**: Brute Force Solution
- **Approach 3**: Sliding Window with Prefix Sums
- **Approach 4**: Functional Programming Solution
- **Approach 5**: Priority Queue Solution
- **Approach 6**: Generator-based Solution with Step-by-Step Visualization

### Problem 3: Find the Most Competitive Subsequence

- **Approach 1**: Stack-based Solution (Optimal)
- **Approach 2**: Brute Force Solution
- **Approach 3**: Monotonic Stack Solution with Detailed Tracking
- **Approach 4**: Functional Programming Solution
- **Approach 5**: Recursive Solution with Memoization
- **Approach 6**: Generator-based Solution with Step-by-Step Visualization

## Key JavaScript Features Used

- ES6+ syntax (arrow functions, destructuring, spread operator)
- Modern data structures (Map, Set)
- Functional programming patterns
- Factory functions
- Custom iterators with Symbol.iterator
- Generator functions for step-by-step visualization
- Performance testing utilities
- Comprehensive documentation with time/space complexity analysis

## Usage

Each implementation file can be run independently to see the implementation in action:

```bash
node answer1.js
node answer2.js
node answer3.js
```

## Performance Comparison

All implementations include performance testing utilities to compare different approaches:

```javascript
// Performance comparison utility
const performanceTest = (func, name, nums, k) => {
  const start = performance.now();
  func([...nums], k);
  const end = performance.now();
  console.log(`${name}: ${end - start}ms for array of size ${nums.length} with k=${k}`);
};
```

## Source

Problems from LeetCode Very Hard:
- https://leetcode.com/problems/number-of-visible-people-in-a-queue/
- https://leetcode.com/problems/shortest-subarray-with-sum-at-least-k/
- https://leetcode.com/problems/find-the-most-competitive-subsequence/
