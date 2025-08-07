# Advanced Stack Problems

This directory contains solutions to advanced-level stack problems, primarily sourced from LeetCode's most challenging stack problems. Each problem includes multiple solution approaches with detailed analysis.

## Problems

### 1. Maximum Frequency Stack

**Problem Statement:** Design a stack-like data structure that supports push, pop, and retrieving the most frequent element. If there is a tie for the most frequent element, the element closest to the top of the stack should be returned.

**Source:** [LeetCode #895](https://leetcode.com/problems/maximum-frequency-stack/)

**Approaches:**
1. **Stack of Stacks** - O(1) time for all operations, O(n) space
2. **Priority Queue (Max Heap)** - O(log n) for push, O(1) for pop (amortized), O(n) space
3. **Optimized Map of Stacks** - O(1) time for all operations, O(n) space

### 2. Number of Visible People in a Queue

**Problem Statement:** There are n people standing in a queue, and each person has a unique height. A person can see another person to their right in the queue if everybody in between is shorter than both of them. Return an array where answer[i] is the number of people the ith person can see to their right in the queue.

**Source:** [LeetCode #1944](https://leetcode.com/problems/number-of-visible-people-in-a-queue/)

**Approaches:**
1. **Monotonic Stack (Right to Left)** - O(n) time, O(n) space
2. **Next Greater Element with Stack** - O(n) time, O(n) space
3. **Monotonic Stack with Pairs** - O(n) time, O(n) space

### 3. Constrained Subsequence Sum

**Problem Statement:** Given an integer array nums and an integer k, return the maximum sum of a non-empty subsequence of that array such that for every two consecutive integers in the subsequence, nums[i] and nums[j], where i < j, the condition j - i <= k is satisfied.

**Source:** [LeetCode #1425](https://leetcode.com/problems/constrained-subsequence-sum/)

**Approaches:**
1. **Dynamic Programming with Monotonic Queue** - O(n) time, O(k) space
2. **Dynamic Programming with Max Heap** - O(n log n) time, O(n) space
3. **Optimized DP with Deque** - O(n) time, O(k) space

## Running the Tests

Each solution file includes test cases that can be run using Node.js. For example:

```bash
node answer1.js  # Tests for Maximum Frequency Stack
node answer2.js  # Tests for Number of Visible People in a Queue
node answer3.js  # Tests for Constrained Subsequence Sum
```

## Performance Considerations

- The monotonic stack/queue based solutions generally provide the best time complexity for these problems.
- For problems requiring tracking of maximum elements in a sliding window, the deque-based approach is often optimal.
- The heap-based solutions have higher time complexity but are sometimes more intuitive to implement.

## Additional Notes

- All solutions are implemented using modern JavaScript (ES6+) features.
- Each solution includes detailed comments explaining the approach and time/space complexity.
- Test cases cover edge cases and typical scenarios to ensure correctness.
- The solutions demonstrate various advanced stack techniques including monotonic stacks, frequency counting, and sliding window maximum.
